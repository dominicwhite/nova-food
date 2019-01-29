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
            // TODO: update borders as well
            console.log("Vuex: running updateMap() mutation");
            state.mapCenter.lat = payload.lat;
            state.mapCenter.long = payload.long;
        }
    },

    actions: {
        fetchRestaurants: function({commit, state}, {radius: radius, filter: filter} = {filter:"distance", radius:0.5})
        {
            let restaurants = fetch(`${process.env.apiEndpoint}/restaurants/?filter=${filter}&radius=${radius}&lat=${state.mapCenter.lat}&long=${state.mapCenter.long}`)
                .then(r => r.json())
                .then(rj => {
                    console.log(rj);
                    commit('updateRestaurants', rj);
                });

        }
    }
});
