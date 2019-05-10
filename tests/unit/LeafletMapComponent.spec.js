import Vue from "vue";
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import L from 'leaflet';

import store from '../../src/store.js';

import { actions, getters, state} from '../__mocks__/vuexStoreMock'

import LeafletMap from '../../src/components/LeafletMap';
import violations from "../../src/data/violations";
import boundaryCoords from "../../src/data/boundaries";

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => {
        return {
            fillRect: function() {},
            clearRect: function(){},
            putImageData: function() {},
            createImageData: function(){ return []},
            setTransform: function(){},
            drawImage: function(){},
            save: function(){},
            fillText: function(){},
            restore: function(){},
            beginPath: function(){},
            moveTo: function(){},
            lineTo: function(){},
            closePath: function(){},
            stroke: function(){},
            translate: function(){},
            scale: function(){},
            rotate: function(){},
            arc: function(){},
            fill: function(){},
            transform: function(){},
            rect: function(){},
            clip: function(){},
        }
    }
});


describe('App', () => {
    let wrapper, store; //, actions, getters, state; //store,
    beforeEach(() => {
        if (wrapper){
            wrapper.vm.$data.map.off();
            wrapper.vm.$data.map.remove();
        }
        // const localVue = createLocalVue();
        Vue.use(Vuetify);
        Vue.use(Vuex);
        // actions = {
        //     fetchRestaurants: jest.fn(),
        // };
        // getters = {
        //     clusteredRestaurants: jest.fn( () =>
        //         [
        //             [{name: 'Restaurant 1', lat: 38.864720, long: -77.088544, id: 1}]
        //         ]
        //     )
        // };
        // state = {
        //     restaurants: [],
        //     mapCenter: {lat: 38.864720, long: -77.088544},
        //     mapSides: {top: 38.9, bottom: 38.8, left: -77.1, right: -77.05},
        //     mapZoom: 13,
        //     isPinSelected: false,
        //     selectedPinIndex: null,
        //     isClickOnAnotherPin: false,
        //     displayRestaurants: [],
        //     restaurantInfo: {},
        //     searchBy: "recent",
        //     violations: {},
        //     boundaries: {'Arlington': []}
        // };
        store = new Vuex.Store({
            state,
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
    });

    test('Leaflet component has a map', () => {
        expect(wrapper.vm.$data.map).toBeTruthy();
    });

    test('Default map settings initialize correctly', () => {
        expect(wrapper.vm.zoom).toEqual(13);
        expect(wrapper.vm.center[0]).toEqual(38.86472);
        expect(wrapper.vm.center[1]).toEqual(-77.088544);
        expect(wrapper.vm.bounds._southWest.lat).toEqual(38.8);
        expect(wrapper.vm.bounds._southWest.long).toEqual(-77.1);
        expect(wrapper.vm.bounds._northEast.lat).toEqual(38.9);
        expect(wrapper.vm.bounds._northEast.long).toEqual(-77.05);
    });

});
