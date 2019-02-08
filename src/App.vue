<template>
    <v-app>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!--<v-text-field
                    prepend-inner-icon="search"
                    label="Search"
                    solo-inverted
                    class="ml-4 my-2"
                    flat
            ></v-text-field>-->
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-layout>
                    <leaflet-map ref="map" v-on:mapMove="refreshRestaurantsSnackbar = true"></leaflet-map>

                    <v-snackbar
                        v-model="refreshRestaurantsSnackbar"
                        :absolute="true"
                        :top="true"
                        :timeout="0"
                        @click="refreshRestaurants()"
                    >
                        <v-btn flat>
                            Tap to update restaurants
                        </v-btn>
                    </v-snackbar>
                </v-layout>
            </v-container>
        </v-content>
        <bottom-container></bottom-container>
    </v-app>
</template>

<script>
    import LeafletMap from './components/LeafletMap.vue';
    import BottomContainer from './components/BottomContainer.vue';

    export default {
        name: "App",
        data: function(){
            return {
                title: 'NoVaEats',
                refreshRestaurantsSnackbar: false
            }
        },
        components: {
            'leaflet-map': LeafletMap,
            'bottom-container': BottomContainer
        },
        computed: {
            // ...mapGetters(['allRestaurants'])
        },
        mounted() {
            this.$store.dispatch('fetchRestaurants');
        },
        methods: {
            refreshRestaurants: function(){
                console.log("doing refreshRestaurants() function");
                this.refreshRestaurantsSnackbar = false;
                this.$store.dispatch('fetchRestaurants');
            },
            handleMapMove(){
                console.log("starting handleMapChange handler function");
                this.refreshRestaurantsSnackbar = true;
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
        height: calc(100% - 56px);
        width: 100%;
    }
    @media screen and (min-width: 600px) and (max-width: 960px) {
        #map {
            height: calc(100% - 48px);
        }
    }
    @media screen and (min-width: 961px) and (max-width: 1264px) {
        #map {
            height: calc(100% - 64px);
        }
    }
</style>
