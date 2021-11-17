import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
  },
  mutations: {
    USER_INFO(state, info) {
      state.user = info
    },
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    saveUserInfo({ commit }, data) {
      commit('USER_INFO', data)
    },
  },
  modules: {},
})
