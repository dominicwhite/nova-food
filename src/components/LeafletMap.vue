<template>
    <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        :options="{zoomControl: false, attributionControl: false}"
    >

        <l-control-attribution
                position="bottomright"
                prefix='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
        ></l-control-attribution>
        <l-control-zoom position="bottomright"  ></l-control-zoom>
        <l-control class="custom-control-container center-user-location" position="bottomright">
            <v-btn icon id="location-button" @click="turnOnLocation(true)">
                <v-icon>my_location</v-icon>
            </v-btn>
        </l-control>

        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
                v-for="(restaurant, idx) in restaurantData"
                :lat-lng="[restaurant[0].lat, restaurant[0].long]"
                @click="selectMarker(restaurant, idx)"
        >
            <l-icon
                v-if="selectedPin===idx"
                icon-url="leaflet-red-marker.png"
                :shadow-url="defaultShadowUrl"
                icon-retina-url="leaflet-red-marker-2x.png"
            ></l-icon>
        </l-marker>
        <l-marker
            v-if="userLocation"
            :lat-lng="userLocation"
            :icon="userIcon"
        >

        </l-marker>
        <l-control class="custom-control-container" position="bottomleft">
            <div class="body-2 font-weight-bold mb-0">Search by:</div>
            <v-radio-group v-model="searchBy" class="my-1">
                <v-radio
                    v-for="n in 2"
                    :key="n"
                    :label="searchRadio[n-1].label"
                    :value="searchRadio[n-1].value"
                ></v-radio>
            </v-radio-group>
            <div class="body-2 font-weight-bold ma-1">Show my location:</div>
            <div style="display: inline-block;">
                <v-switch
                        height="4"
                        v-model="showLocation"
                ></v-switch>
            </div>
            <div>
                <v-btn color="info" @click="$emit('show-info')">About</v-btn>
            </div>

        </l-control>

    </l-map>

</template>

<script>
    import {LMap, LTileLayer, LMarker, LControl, LControlAttribution, LControlZoom, LIcon} from 'vue2-leaflet';
    let defaultShadowUrl = require('leaflet/dist/images/marker-shadow.png');

    export default {
        name: "LeafletMap",
        components: {
            LControlAttribution,
            LControl,
            LMap,
            LTileLayer,
            LMarker,
            LControlZoom,
            LIcon
        },
        data: function(){
            return {
                url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                defaultShadowUrl,
                showLocation: false,
                userLocation: false,
                userIcon: L.divIcon({className:"", iconSize:null, html: '<div id="user-icon"></div>'}),
                searchRadio: [{label: 'Distance', value: 'distance'}, {label: 'Recent', value: "recent"}],
            };
        },
        computed: {
            restaurantData (){
                return this.$store.getters.clusteredRestaurants;
            },
            selectedPin (){
                return this.$store.state.selectedPinIndex;
            },
            zoom (){
                return this.$store.state.mapZoom;
            },
            center (){
                return [this.$store.state.mapCenter.lat, this.$store.state.mapCenter.long];
            },
            bounds (){
                return {
                    _southWest: {
                        lat: this.$store.state.mapSides.bottom,
                        long: this.$store.state.mapSides.left
                    },
                    _northEast: {
                        lat: this.$store.state.mapSides.top,
                        long: this.$store.state.mapSides.right
                    }
                }
            },
            searchBy: {
                get: function () {
                    return this.$store.state.searchBy;
                },
                set: function (newValue) {
                    this.$store.commit('updateSearchBy', newValue);
                    this.$store.dispatch('fetchRestaurants', {});
                }
            }
        },
        methods: {
            zoomUpdated(zoom) {
                this.$store.commit('updateMapZoom', {
                    zoom: zoom,
                });
                this.$emit('mapMove');
            },
            centerUpdated(center) {
                this.$store.commit('updateMapCenter', {
                    lat: center.lat,
                    long: center.lng,
                });
                this.$emit('mapMove');
            },
            boundsUpdated(bounds) {
                this.$store.commit('updateMapEdges', {
                    corners: bounds,
                });
                this.$emit('mapMove');
            },
            selectMarker(restaurant, idx){
                this.$store.commit('clickOnPin');
                this.$store.commit('selectPin', {restaurant, idx});
                event.stopPropagation();
            },
            turnOnLocation(flyTo=false) {
                if ('geolocation' in navigator){
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            this.showLocation = true;
                            this.userLocation = [pos.coords.latitude, pos.coords.longitude];
                            if (flyTo) this.map.flyTo([pos.coords.latitude, pos.coords.longitude], 15);
                        },
                        (err) => {
                            this.showLocation = false;
                            this.userLocation = false;
                            this.$emit('show-location-warning');
                        }
                    );
                }
                else {
                    this.showLocation = false;
                    this.userLocation = false;
                    this.$emit('show-location-warning');
                }
            },
        },
        mounted: function () {
            this.$nextTick(() => {
                this.map = this.$refs.map.mapObject;
            });
        },
        watch: {
            showLocation: function () {
                if (this.showLocation === true) {
                    this.turnOnLocation(false);
                }
                else {
                    this.userLocation = null;
                }
            }
        }
    }
</script>

<style>
    .vue2leaflet-map {
        z-index: 100;
    }

    .custom-control-container {
        box-shadow: 0 0 1px 2px #b4b4b4;
        padding: 3px;
        text-align: center;
        background-color: white;
        border-radius: 1px;
    }

    .center-user-location {
        border-radius: 50%;
        margin: -5px;
        max-height: 42px;
        max-width: 42px;
    }

    #location-button {
        position: relative;
        left: -8px;
        top: -6px;
    }

    #user-icon {
        height: 20px;
        width: 20px;
        box-shadow: 0 0 10px 3px dimgray;
        border-radius: 50%;
        background-image: radial-gradient(pink, red);
        border: 2px solid darkred;
    }
</style>