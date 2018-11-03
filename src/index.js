import Vue from 'vue';
import Vuetify from 'vuetify/es5/components/Vuetify';
import VApp from 'vuetify/es5/components/VApp';
import VCard from 'vuetify/es5/components/VCard';
import VContainer from 'vuetify/es5/components/VGrid';
import VContent from 'vuetify/es5/components/VGrid';
import VSpacer from 'vuetify/es5/components/VGrid';
import VTextField from 'vuetify/es5/components/VTextField';
import VToolbar from 'vuetify/es5/components/VToolbar';
import App from './App.vue';

import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
    components: {
        VApp,
        VCard,
        VContainer,
        VContent,
        VSpacer,
        VTextField,
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