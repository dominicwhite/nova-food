<template>
    <div id="map" class="map"></div>
</template>

<script>
    import L from 'leaflet';
    export default {
        name: "LeafletMap",
        props: ['restaurants'],
        data: function(){
            return {
                map: null,
                tileLayer: null,
            };
        },
        computed: {
            layers: function () {
                return [
                    {
                        id: 0,
                        name: 'Restaurants',
                        active: false,
                        features: this.restaurants,
                    },
                ];
            }
        },
        methods: {
            updateLocation: function() {
                if ('geolocation' in navigator){
                    navigator.geolocation.getCurrentPosition((pos) => {
                        const coords = pos.coords;
                        this.map.flyTo([coords.latitude, coords.longitude], 14);
                    })
                }
            }
        },
        mounted: function () {
            this.map = L.map('map').setView([38.864720, -77.088544], 12);
            this.tileLayer = L.tileLayer(
                'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                {
                    maxZoom: 18,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
                }
            );
            this.tileLayer.addTo(this.map);
            this.updateLocation();
            this.map.on('moveend', () => {
                this.$emit('mapViewChange', {center: this.map.getCenter(), zoom: this.map.getZoom()});
            });
        },
        watch: {
            layers: function() {
                this.layers.forEach((layer) => {
                    layer.features.forEach((feature) => {
                        feature.leafletObject = L.marker([feature.lat, feature.long])
                            .bindPopup(feature.name)
                            .addTo(this.map)
                            .on('click', (e) => {
                                console.log('You clicked on', feature);
                                this.$emit('restaurant-click', feature.id);
                            });
                    });
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