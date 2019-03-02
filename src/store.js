import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.config.devtools = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    state: {
        restaurants: [],
        mapCenter: {lat: 38.864720, long: -77.088544},
        mapSides: {top: 38.9, bottom: 38.8, left: -77.1, right: -77.05},
        isPinSelected: false,
        selectedPinIndex: null,
        isClickOnAnotherPin: false,
        displayRestaurants: [],
        restaurantInfo: {},
    },
    getters: {
        allRestaurants: (state) => {
            return state.restaurants.map( (r) => [r] )
        },
        clusteredRestaurants: (state) => {
            /* Condense raw restaurants from API to cluster locations with identical lat & long */
            const condensedRestaurants = [];
            for (const newRestaurant of state.restaurants){
                let similarExists = false;
                for (const addedRestaurantList of condensedRestaurants){
                    if (newRestaurant.lat === addedRestaurantList[0].lat && newRestaurant.long === addedRestaurantList[0].long) {
                        addedRestaurantList.push(newRestaurant);
                        similarExists = true;
                    }
                }
                if (!similarExists) { condensedRestaurants.push([newRestaurant])}
            }
            return condensedRestaurants;
        },

        mapSize: (state) =>
            Math.min(Math.abs(state.mapSides.top - state.mapSides.bottom), Math.abs(state.mapSides.left - state.mapSides.right))
    },

    mutations: {
        updateRestaurants: (state, payload) => {
            console.log("Vuex: running updateRestaurants() mutation with", payload);
            state.restaurants = payload.restaurants;
        },
        updateMap: (state, payload) => {
            console.log("Vuex: running updateMap() mutation");
            state.mapCenter.lat = payload.lat;
            state.mapCenter.long = payload.long;
            state.mapSides.top = payload.corners._northEast.lat;
            state.mapSides.right = payload.corners._northEast.lng;
            state.mapSides.bottom = payload.corners._southWest.lat;
            state.mapSides.left = payload.corners._southWest.lng;
        },
        selectPin: (state, payload) => {
            console.log('Committing pin:', payload);
            state.displayRestaurants = payload.restaurant;
            state.isPinSelected = true;
            state.selectedPinIndex = payload.idx;
        },
        deselectPin: (state, payload) => {
            state.isPinSelected = false;
            state.selectedPinIndex = null;
        },
        updateRestaurantInfo: (state, payload) => {
            let restaurantID = payload[0].restaurant_id;
            let restaurantInspections = [];
            for (const inspection of payload){
                if (inspection.restaurant_id === restaurantID) {
                    restaurantInspections.push(inspection);
                }
                else {
                    state.restaurantInfo[restaurantID] = restaurantInspections;
                    restaurantInspections = [inspection];
                    restaurantID = inspection.restaurant_id;
                }
            }
            state.restaurantInfo[restaurantID] = restaurantInspections;
        },
        clickOffPin: (state) => {
            console.log("existing pinClick tracker is", state.isClickOnAnotherPin, "setting to false");
            state.isClickOnAnotherPin  = false;
        },
        clickOnPin: (state) => {
            console.log("existing pinClick tracker is", state.isClickOnAnotherPin, "setting to true");
            state.isClickOnAnotherPin  = true;
        }
    },

    actions: {
        fetchRestaurants: function({commit, state, getters, dispatch}, {radius: radius, filter: filter} = {filter:"distance", radius: 0.5})
        {
            let restaurants = fetch(`${process.env.apiEndpoint}/restaurants/?filter=${filter}&radius=${getters.mapSize / 2}&lat=${state.mapCenter.lat}&long=${state.mapCenter.long}`)
                .then(r => r.json())
                .then(rj => {
                    commit('updateRestaurants', rj);
                    return rj;
                })
                .then(rj => rj.restaurants.map(r => r.id))
                .then(rj => {
                        dispatch('fetchMultipleRestaurantInspections', rj);
                    }
                );
        },
        fetchMultipleRestaurantInspections: function({commit, state}, restaurantIDList) {
            let newRestaurants = restaurantIDList.filter(id => !(id in state.restaurantInfo));
            let queryString = newRestaurants.join(',');
            let restaurantData = fetch(`${process.env.apiEndpoint}/restaurants/inspections/?restaurants=${queryString}`)
                .then( r => r.json())
                .then(rj => {
                    if (rj.length > 0) {
                        commit('updateRestaurantInfo', rj);
                    }
                })
        }
    }
});
