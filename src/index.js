import Vue from 'vue';
import Mapbox from 'mapbox-gl-vue';

console.log(__MAPBOX_KEY__);

const app = new Vue({
    el: '#app',
    data: {
        title: 'NoVaEats',
        mapboxKey: __MAPBOX_KEY__
    },
    components: {
        Mapbox
    }
});