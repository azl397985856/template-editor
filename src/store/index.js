import Vue from 'vue'
import Vuex from 'vuex'
import leftPanel from '../components/leftPanel.vue';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
      printItems: [],
      currentStyle: {
        fontSize: 12,
        fontFamily: '扁桃体'
      }
  },
  mutations: {
    addItem(state, payload) {
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