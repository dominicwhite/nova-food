import Vue from 'vue';
import Mapbox from 'mapbox-gl-vue';
import {APIHelper} from './APIHelper';

const app = new Vue({
    el: '#app',
    data: {
        title: 'NoVaEats',
        mapboxKey: __MAPBOX_KEY__,
        isDataLoaded: false,
        restaurantsGeojson: {}
    },
    components: {
        Mapbox
    },
    mounted: function() {
        let geojsonData = {'type': 'FeatureCollection'};
        APIHelper.loadTestData().then( json => {
            geojsonData.features = json.restaurants.map(function (restaurant) {
                return {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [restaurant.long, restaurant.lat]
                    },
                    'properties': {
                        'title': restaurant.name,
                        'icon': 'restaurant'
                    }
                }
            });
            this.restaurantsGeojson = geojsonData;
            this.$emit('restaurants-updated');
        });
    },
    methods: {
        drawRestaurants(map) {
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': {
                    'type': 'geojson',
                    'data': this.restaurantsGeojson
                },
                'layout': {
                    'icon-image': '{icon}-15',
                    'text-field': '{title}',
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top'
                }
            });
        }
    }
});