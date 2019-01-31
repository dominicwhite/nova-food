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
            restaurantData: function(){
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
            this.map = L.map('map').setView([38.864720, -77.088544], 12);
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
                console.log("Map watcher detected change in restaurant data");
                console.log(this);
                if (this.pinLayer) {
                    this.pinLayer.clearLayers();
                }
                else {
                    this.pinLayer = L.layerGroup().addTo(this.map);
                }
                this.restaurantData.forEach(restaurant => {
                    this.pinLayer.addLayer(
                        L.marker([restaurant[0].lat, restaurant[0].long])
                        .on('click', (e) => {
                            console.log("Clicked on", restaurant);
                            this.$emit('restaurantClick', restaurant.id);
                        })
                        .bindPopup(
                            restaurant.reduce((acc, val, idx, src) => idx+1 == src.length ? acc + val.name : acc + val.name + '<br>', '')
                        )
                    );
                });
            }
        }
    }
</script>

<style scoped>
    #map {
        z-index: 100;
    }
</style>