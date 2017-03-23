import Vue from 'vue'
import Vuex from 'vuex'
import leftPanel from '../components/leftPanel.vue';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
      printItems: [],
  },
  mutations: {
    addItem(state, payload) {
        state.printItems.push(payload);
    },
     editStyle(state, payload) {
        state.printItems = state.printItems.map(item => {
          if (item.active) {
            item.editStyle = { ...item.editStyle, ...payload }
          }
          return item;
        });
    }
  },
  actions: {
    addItem(state, payload) {
        state.commit('addItem', payload);
    },
    editStyle(state, payload) {
      state.commit('editStyle', payload);
    }
  },
  strict: debug
})