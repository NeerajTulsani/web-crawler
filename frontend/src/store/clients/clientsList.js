/* eslint-disable camelcase */
import Vue from 'vue'
import API from '../../config/development'

const state = {
}

const getters = {

}

const mutations = {

}

const actions = {
  async getClientsList ({ commit }) {
    commit('LOADING_SPINNER_SHOW_MUTATION', false, { root: true })
    try {
      const resp = await Vue.axios.get(`${API.Backend_URL}/`)
      return resp.data
    } catch (error) {
      console.log(error)
      commit('LOADING_SPINNER_SHOW_MUTATION', false, { root: true })
    }
  },
  async deleteClient ({ commit }, id) {
    commit('LOADING_SPINNER_SHOW_MUTATION', false, { root: true })
    try {
      await Vue.axios.delete(`${API.Backend_URL}/${id}`)
    } catch (error) {
      console.log(error)
      commit('LOADING_SPINNER_SHOW_MUTATION', false, { root: true })
    }
  },
  async getSearchClients ({ commit }, search) {
    commit('LOADING_SPINNER_SHOW_MUTATION', false, { root: true })
    try {
      const resp = await Vue.axios.get(`${API.Backend_URL}/search?q=${search}`)
      return resp.data
    } catch (error) {
      console.log(error)
      commit('LOADING_SPINNER_SHOW_MUTATION', false, { root: true })
    }
  },
  async addUpdateClient ({ commit }, data) {
    commit('LOADING_SPINNER_SHOW_MUTATION', false, { root: true })
    try {
      let url = `${API.Backend_URL}/`
      if (data.id) {
        url += data.id
        delete data.id
      }
      const resp = await Vue.axios.post(url, data)
      return resp.data
    } catch (error) {
      console.log(error)
      commit('LOADING_SPINNER_SHOW_MUTATION', false, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
