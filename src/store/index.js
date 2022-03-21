import { createStore } from 'vuex'

export default createStore({
  state: {
    showShipInfo: null
  },
  mutations: {
    onShowShipMenu(state, layload) {
      state.showShipInfo = layload
    }
  },
  actions: {
  },
  modules: {
  }
})
