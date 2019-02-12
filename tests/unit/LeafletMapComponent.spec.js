import Vue from "vue";
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import L from 'leaflet';

import LeafletMap from '../../src/components/LeafletMap';

describe('App', () => {
    let wrapper, store, actions, getters;
    beforeEach(() => {
        if (wrapper){
            wrapper.vm.$data.map.off();
            wrapper.vm.$data.map.remove();
        }
        // const localVue = createLocalVue();
        Vue.use(Vuetify);
        Vue.use(Vuex);
        actions = {
            fetchRestaurants: jest.fn(),
        };
        getters = {
            clusteredRestaurants: jest.fn( () =>
                [
                    [{name: 'Restaurant 1', lat: 38.864720, long: -77.088544, id: 1}]
                ]
            )
        };
        store = new Vuex.Store({
            state: {},
            actions,
            getters,
        });
        wrapper = mount(LeafletMap, {
            attachToDocument: true,
            store
        });
    });

    test('Leaflet component is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
        // expect(wrapper.vm.$data.tileLayer).toBeTruthy();
    });

    test('Leaflet component renders markers', () => {
        expect(wrapper.vm.$data.pinLayer).toBeTruthy();
    });

});
