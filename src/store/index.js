import Vue from 'vue';
import Vuex from 'vuex';

import leftPanel from '../components/leftPanel.vue';

import { DEFAULT_STYLE } from '../config/index';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// get uuid
function guid () {
	function s4 () {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}
export default new Vuex.Store({
	state: {
		printItems: [],
		editStyle: DEFAULT_STYLE
	},
	mutations: {
		addItem (state, payload) {
			state.printItems.push({
				...payload,
				id: guid()
			});
		},
		editStyle (state, payload) {
			state.printItems = state.printItems.map(item => {
				// edit active item
				if (item.active) {
					const editStyle = { ...item.editStyle, ...payload }
					item.editStyle = editStyle;
					state.editStyle = editStyle;
				}
				return item;
			});
		}
	},
	actions: {
		addItem (state, payload) {
			state.commit('addItem', payload);
		},
		editStyle (state, payload) {
			state.commit('editStyle', payload);
		}
	},
	strict: debug
});
