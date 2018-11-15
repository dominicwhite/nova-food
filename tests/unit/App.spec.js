import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VApp from 'vuetify/es5/components/VApp';

import App from '../../src/App';

describe('App', () => {
    let wrapper;
    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount(App, {
            localVue: localVue,
        });
    });

    test('is a Vue instance', () => {
        // const wrapper = mount(App);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('toolbar is rendered', () => {
        expect(wrapper.contains('nav.v-toolbar')).toBeTruthy();
    });
});