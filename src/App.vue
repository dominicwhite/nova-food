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
                    <leaflet-map ref="map" :layers="layers"></leaflet-map>
                </v-layout>
            </v-container>
        </v-content>
        <v-bottom-sheet v-model="sheet">
            <div>Some stuff</div>
        </v-bottom-sheet>
    </v-app>
</template>

<script>
    import {APIHelper} from './APIHelper';
    import LeafletMap from './components/LeafletMap.vue';

    export default {
        name: "App",
        data: function(){
            return {
                title: 'NoVaEats',
                restaurantsJSON: [],
                sheet: false
            }
        },
        components: { 'leaflet-map': LeafletMap },
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
            APIHelper.loadTestData().then(r => {
                console.log('Loaded from API:', r);
                this.restaurantsJSON = r.restaurants;
                console.log('Stored in restaurantsJSON:', this.restaurantsJSON);
                // this.$refs.map.initLayers();
            });
        },
        methods: {
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
        height: 90%;
        width: 100%;
    }
</style>