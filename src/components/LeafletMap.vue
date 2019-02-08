<template>
    <div id="map" class="map">

    </div>

</template>

<script>
    import L from 'leaflet';

    export default {
        name: "LeafletMap",
        data: function(){
            return {
                map: null,
                tileLayer: null,
                pinLayer: false
            };
        },
        computed: {
            restaurantData: function() {
                return this.$store.getters.clusteredRestaurants;
            }
        },
        methods: {
            // updateLocation: function() {
            //     if ('geolocation' in navigator){
            //         navigator.geolocation.getCurrentPosition((pos) => {
            //             const coords = pos.coords;
            //             // this.map.flyTo([coords.latitude, coords.longitude], 14);
            //         })
            //     }
            // }
        },
        mounted: function () {
            L.Control.include({
                _refocusOnMap: L.Util.falseFn // Do nothing.
            });
            this.map = L.map('map').setView([38.864720, -77.088544], 13);
            this.tileLayer = L.tileLayer(
                'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                {
                    maxZoom: 18,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                }
            );
            this.tileLayer.addTo(this.map);
            // this.updateLocation();
            this.map.on('moveend', () => {
                this.$store.commit('updateMap', {
                    lat: this.map.getCenter().lat,
                    long: this.map.getCenter().lng,
                    corners: this.map.getBounds()
                });
                this.$emit('mapMove');
            });
        },
        watch: {
            restaurantData: function() {
                console.log(this);
                if (this.pinLayer) {
                    this.pinLayer.clearLayers();
                }
                else {
                    this.pinLayer = L.layerGroup().addTo(this.map);
                }
                this.restaurantData.forEach(restaurant => {
                    let restaurantIcon = L.divIcon({
                        iconSize: null,
                        className: null,
                        html: `<div class="map-marker-wrapper">
                                   <div class="map-marker-content">${restaurant.length}</div>
                                   <div class="map-marker-arrow"></div>
                               </div>`,
                    });
                    this.pinLayer.addLayer(
                        L.marker([restaurant[0].lat, restaurant[0].long], {
                            icon: restaurantIcon
                        })
                        .on('click', (e) => {
                            console.log("Clicked on pin");
                            this.$store.commit('clickOnPin');
                            this.$store.commit('selectPin', restaurant);
                            event.stopPropagation();
                        })
                    );
                });
            }
        }
    }
</script>

<style>
    #map {
        z-index: 100;
    }
    .map-marker-wrapper {
        position: absolute;
        bottom: 0;left: -50%;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    /*Wrap the content of the divicon (text) in this class*/
    .map-marker-content {
        order: 1;
        position: relative; left: -50%;
        background-color: #fff;
        border-radius: 5px;
        border-width: 2px;
        border-style: solid;
        border-color: #444;
        padding: 3px 5px;
        white-space: nowrap;
        font-size: 1.25em;
        font-weight: bold;
    }
    /*Add this arrow*/
    .map-marker-arrow {
        order: 2;
        width: 0px; height: 0px; left: 50%;
        border-style: solid;
        border-color: #444 transparent transparent transparent;
        border-width: 10px 6px 0 6px; /*[first number is height, second/fourth are rigth/left width]*/
        margin-left: -6px;
    }
</style>