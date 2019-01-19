<template>
    <v-app>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    prepend-inner-icon="search"
                    label="Search"
                    solo-inverted
                    class="ml-4 my-2"
                    flat
            ></v-text-field>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-layout>
                    <leaflet-map ref="map" :restaurants="restaurantsJSON" v-on:mapViewChange="updateViewData"></leaflet-map>
                </v-layout>
            </v-container>
        </v-content>
        <bottom-container :restaurants="restaurantsJSON"></bottom-container>
    </v-app>
</template>

<script>
    import {APIHelper} from './APIHelper';
    import LeafletMap from './components/LeafletMap.vue';
    import BottomContainer from './components/BottomContainer.vue';

    export default {
        name: "App",
        data: function(){
            return {
                title: 'NoVaEats',
                restaurantsJSON: []
            }
        },
        components: {
            'leaflet-map': LeafletMap,
            'bottom-container': BottomContainer
        },
        mounted() {
            this.fetchRestaurants();
        },
        methods: {
            fetchRestaurants: function(coords, zoom){
                if (coords && zoom) {
                    APIHelper.loadRestaurantsByLocation(coords.lat, coords.lng).then(r => {
                        this.restaurantsJSON = r.restaurants;
                    });
                } else {
                    APIHelper.loadRestaurantsByLocation().then(r => {
                        this.restaurantsJSON = r.restaurants;
                    });
                }
            },
            updateViewData(eventData){
                this.fetchRestaurants(eventData.center, eventData.zoom)
            }
        }
    }
</script>

<style scoped>
    body {
        margin: 0;
        padding: 0
    }
    nav {
        z-index: 1000;
    }
    .container {
        padding: 0;
        width: 100%;
        margin: 0;
    }
    #map {
        height: 85%;
        width: 100%;
    }
</style>