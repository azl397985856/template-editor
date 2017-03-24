import Vue from 'vue'
import Vuex from 'vuex'
import leftPanel from '../components/leftPanel.vue';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// get uuid
function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}
const DEFAULT_STYLE =  {
  fontSize: 12,
  fontFamily: '扁桃体',
  fw: ['']
}
export default new Vuex.Store({
  state: {
      printItems: [],
      currentStyle: DEFAULT_STYLE
  },
  mutations: {
    addItem(state, payload) {
        payload.key += guid()
        state.printItems.push(payload);
    },
    editStyle(state, payload) {
        state.printItems = state.printItems.map(item => {
          if (item.active) {
            const currentStyle = { ...item.editStyle, ...payload }
            item.editStyle = currentStyle;
            state.currentStyle = currentStyle;
          }
          return item;
        });
    },
    currentStyle(state, payload) {
      state.currentStyle = payload;
    }
  },
  actions: {
    addItem(state, payload) {
        state.commit('addItem', payload);
    },
    editStyle(state, payload) {
      state.commit('editStyle', payload);
    },
    currentStyle(state, payload) {
      state.commit('currentStyle', payload);
    }
  },
  strict: debug
})