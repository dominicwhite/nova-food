import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store'

import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify);
Vue.use(Vuex);



new Vue({
    el: '#app',
    store,
    render: h => h(App)
});