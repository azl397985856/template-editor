import Vue from 'vue'
import Vuex from 'vuex'
import leftPanel from '../components/leftPanel.vue';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
      count: 0,
  },
  mutations: {
    addItem(state, payload) {
        state.count++;
    }
  },
  actions: {
    addItem(state, payload) {
        state.commit('addItem', payload);
    }
  },
  strict: debug
})