import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';

import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify);

new Vue({
    el: '#app',
    render: h => h(App)
});