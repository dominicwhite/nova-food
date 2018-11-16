<template>
    <div id="map" class="map"></div>
</template>

<script>
    import L from 'leaflet';
    export default {
        name: "LeafletMap",
        props: ['layers'],
        data: function(){
            return {
                map: null,
                tileLayer: null,
            };
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
                console.log('creating layer');
                console.log('Starting data:', this.layers);
                this.layers.forEach((layer) => {
                    console.log('Working on layer:', layer);
                    layer.features.forEach((feature) => {
                        console.log(feature);
                        feature.leafletObject = L.marker([feature.lat, feature.long])
                            .bindPopup(feature.name)
                            .addTo(this.map);
                    });
                });
            }
        },
        methods: {
            initLayers() {
                console.log('creating layer');
                console.log(this.layers);
                this.layers.forEach((layer) => {
                    console.log(layer);
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

</style>