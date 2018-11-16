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
        mounted: function () {
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
        watch: {
            layers: function() {
                this.layers.forEach((layer) => {
                    layer.features.forEach((feature) => {
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

</style>