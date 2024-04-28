import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Config from '../config/development'
import { getMockError, isMockError, getMockResponse } from '../mock'

const errorResponseHandler = error => {
  // Check if the request came from a mocked API
  if (isMockError(error)) {
    return getMockResponse(error)
  }
  console.log('Error in Axios call', error)
  // check for errorHandle config
  if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
    return Promise.reject(error)
  }

  // if has response show the error
  if (error.response) {
    // console.log(error.status, error.message, error.response);
    if ([200, 201, 208, 400, 401].includes(error.response.status)) {
      return error.response
    }
    if (error.response.status === 404) {
      console.log(error.response.data.message)
      return { data: { data: [], results: [] } }
    } else {
      Vue.prototype.$toast.add({ summary: 'Unable to take your request, Please try again in some time!' })
      return { data: { data: [], results: [] } } // temp fix need to check R&D on more promises concepts
    }
  } else if (error.message) {
    Vue.prototype.$toast.add({ summary: 'Unable to take your request, Please try again in some time!' })
    return { data: { data: [], results: [] } } // temp fix need to check R&D on more promises concepts
    // Network error will generally come here
  }
}

let axiosWebApi = axios.create({
  baseURL: Config.Backend_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.Accesstoken}`,
    authorization: localStorage.Accesstoken,
    oauthAuthorization: localStorage.msalaccessToken
  }
})

// apply interceptor on request
axiosWebApi.interceptors.request.use(request => {
  // TODO: Authentication for routing can be done here

  // Logic to catch request from a mocked API
  if (!request.data) request.data = {}
  request.data.loggedVia = localStorage.getItem('loggedVia')
  request.headers.oauthAuthorization = localStorage.getItem('msalaccessToken')
  request.headers.authorization = localStorage.getItem('Accesstoken')
  if (Config.mock || request.isMock) {
    return getMockError(request)
  } else {
    if (Config.isBasic || request.isBasic) {
      var basicAuth = Config.basicAuth || request.basicAuth
    }
    return request
  }
})

// apply interceptor on response
axiosWebApi.interceptors.response.use(
  response => response,
  errorResponseHandler
)

Vue.use(VueAxios, axiosWebApi)

export default axiosWebApi
