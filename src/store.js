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
            console.log("Store function allRestaurants with data:", state.restaurants);
            return state.restaurants.map( (r) => [r] )
        },
        // TODO: uncomment and check implementation:
        // clusteredRestaurants: (state) => {
        //     let clusters = [];
        //     for (const new_restaurant of state.restaurants){
        //         for (const existing_restaurants of clusters){
        //             if (Math.abs(new_restaurant.lat - existing_restaurants[0].lat) < 0.00001 &&
        //                 Math.abs(new_restaurant.long - existing_restaurants[0].long) < 0.00001) {
        //                 existing_restaurants.push(new_restaurant);
        //             }
        //             else {
        //                 clusters.push(new_restaurant);
        //             }
        //         }
        //     }
        //     return clusters;
        // },

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
            let restaurants = fetch(`http://127.0.0.1:5000/restaurants/?filter=${filter}&radius=${radius}&lat=${state.mapCenter.lat}&long=${state.mapCenter.long}`)
                .then(r => r.json())
                .then(rj => {
                    console.log(rj);
                    commit('updateRestaurants', rj);
                });

        }
    }
});
