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
            },
            selectedPin: function() {
                return this.$store.state.selectedPinIndex;
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
            // },
            drawRestaurants: function() {
                const standardIcon = L.icon({
                        iconUrl: 'blue-pin.png',
                        iconSize:     [28, 28],
                        shadowSize:   [50, 64],
                        iconAnchor:   [14, 28],
                        shadowAnchor: [4, 62],
                        popupAnchor:  [-3, -76]
                    });
                this.restaurantData.forEach((restaurant, idx) => {
                    let pinIcon = standardIcon;
                    if (idx === this.selectedPin) {
                        pinIcon = L.icon({
                            iconUrl: 'red-pin.png',
                            iconSize:     [28, 28],
                            shadowSize:   [50, 64],
                            iconAnchor:   [14, 28],
                            shadowAnchor: [4, 62],
                            popupAnchor:  [-3, -76]
                        });
                    }
                    this.pinLayer.addLayer(
                        L.marker([restaurant[0].lat, restaurant[0].long], {
                            icon: pinIcon
                        })
                            .on('click', (e) => {
                                console.log("Clicked on pin", idx);
                                this.$store.commit('clickOnPin');
                                this.$store.commit('selectPin', {restaurant, idx});
                                event.stopPropagation();
                            })
                    );
                });
            }
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
                this.drawRestaurants();
            },
            selectedPin: function() {
                this.drawRestaurants();
            }
        }
    }
</script>

<style>
    #map {
        z-index: 100;
    }
</style>