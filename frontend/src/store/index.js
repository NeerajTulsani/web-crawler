import Vue from 'vue'
import Vuex from 'vuex'

// import files here each time you make a new module store file
import Clients from './clients'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    Clients
  },
  state () {
    return {
      showLoading: false
    }
  },
  mutations: {
    LOADING_SPINNER_SHOW_MUTATION: (state, payload) => {
      state.showLoading = payload
    },
    updateAnyState (state, payload) {
      let obj = state
      let nmState = payload.shift()
      let nms = nmState.split('/')
      payload.unshift(...nms)
      let val = payload.pop()
      let key = payload.pop()
      payload.forEach(p => { obj = obj[p] })
      obj[key] = val
    }
  },
  actions: {}
})
