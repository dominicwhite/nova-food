import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store'

import 'vuetify/src/stylus/app.styl';
import 'leaflet/dist/leaflet.css';

// Vue Leaflet library: these lines resolve an issue where the markers would not appear
import { Icon }  from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


Vue.use(Vuetify);
Vue.use(Vuex);

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});