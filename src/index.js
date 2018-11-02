import Vue from 'vue';
import Vuetify from 'vuetify/es5/components/Vuetify';
import VApp from 'vuetify/es5/components/VApp';
import VToolbar from 'vuetify/es5/components/VToolbar';
import App from './App.vue';

import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
    components: {
        VApp,
        VToolbar
    }
});

new Vue({
    el: '#app',
    render: h => h(App)
});

// const app = new Vue({
//     el: '#app',
//     }
// });