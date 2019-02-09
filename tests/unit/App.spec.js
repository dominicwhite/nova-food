import Vue from "vue";
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import App from '../../src/App';

describe('App', () => {
    let wrapper, store, actions;
    beforeEach(() => {
        // const localVue = createLocalVue();
        Vue.use(Vuetify);
        Vue.use(Vuex);
        actions = {
            fetchRestaurants: jest.fn(),
        };
        store = new Vuex.Store({
            state: {},
            actions
        });
        wrapper = shallowMount(App, {
            // localVue: localVue,
            store
        });
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('toolbar is rendered', () => {
        expect(wrapper.contains('nav.v-toolbar')).toBeTruthy();
    });
});
