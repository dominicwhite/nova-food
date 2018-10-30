import Vue from 'vue';
import L from 'leaflet';
import {APIHelper} from './APIHelper';

const app = new Vue({
    el: '#app',
    data: {
        title: 'NoVaEats',
        map: null,
        tileLayer: null,
        restaurantsJSON: []
    },
    components: {
    },
    computed: {
        layers: function() {
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
        APIHelper.loadTestData().then( r => {
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
});