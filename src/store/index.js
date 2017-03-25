import Vue from 'vue';
import Vuex from 'vuex';

import { DEFAULT_STYLE, mapper } from '../config/index';

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
					const style = { ...item.style, ...payload }
					item.style = style;
					state.editStyle = style;
					const { fontWeight, fontStyle, textDecoration } = style;
					state.editStyle.fw = [mapper[fontStyle], mapper[fontWeight], mapper[textDecoration]];
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
