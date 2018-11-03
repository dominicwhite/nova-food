<template>
    <v-app>

        <v-toolbar color="indigo" dark fixed app>
            <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
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
            <v-container fluid fill-height>
                <v-layout>
                    <div id="map" class="map"></div>
                </v-layout>
            </v-container>
        </v-content>
        <!--<v-toolbar-->
                <!--dense-->
                <!--floating-->
        <!--&gt;Hello</v-toolbar>-->
        <!--<v-content></v-content>-->
    </v-app>
</template>

<script>
    // import Vue from 'vue';
    import L from 'leaflet';
    import {APIHelper} from './APIHelper';
    export default {
        name: "App",
        data: function(){
            return {
                title: 'NoVaEats',
                map: null,
                tileLayer: null,
                restaurantsJSON: []
            }
        },
        components: {},
        computed: {
            layers: function () {
                return [
                    {
                        id: 0,
                        name: 'Restaurants',
                        active: false,
                        features: this.restaurantsJSON,
                    },
                ];
            }
        },
        mounted() {
            this.initMap();
            APIHelper.loadTestData().then(r => {
                console.log(r);
                this.restaurantsJSON = r.restaurants;
                console.log(this.restaurantsJSON);
                this.initLayers();
            });
        },
        methods: {
            initMap() {
                this.map = L.map('map').setView([38.864728, -77.088544], 13);
                this.tileLayer = L.tileLayer(
                    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                    {
                        maxZoom: 18,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                    }
                );
                this.tileLayer.addTo(this.map);
            },
            initLayers() {
                console.log('creating layer');
                console.log(this.layers);
                this.layers.forEach((layer) => {
                    console.log(layer);
                    // const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
                    layer.features.forEach((feature) => {
                        console.log(feature);
                        feature.leafletObject = L.marker([feature.lat, feature.long])
                            .bindPopup(feature.name)
                            .addTo(this.map);
                    });
                });
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
        padding-left: 0!important;
        padding-right: 0!important;
        padding-top: 0!important;
     }
    #map {
        /*height: 100%;*/
        width: 100%;
        /*margin-top: 60px;*/
    }
</style>