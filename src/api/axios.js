import axios from 'axios'
import qs from 'qs'
import router from '../router'
import config from '../config'
import api from './api'
import { getToken } from '../utils/token'
import { Toast } from "cube-ui"
import _ from 'lodash'

const _axios = axios.create({
  baseURL: config.baseUrl,
  // withCredentials : false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 30000
})

_axios.interceptors.request.use(
  config => {
    const accessToken = getToken()
    if (accessToken) {
      config.headers['access-token'] = accessToken
    }
    
    if (config.method === 'post') {
      const params = qs.stringify(config.data)
      config.data = params
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  response => {
    if (response.data.code === 'success') {
    } else if (response.data.code === 'fail_auth_check') {

    } else if (response.data.code === 'fail_account_lock') {
      
    } else {
      
    }
  },
  error => {
    // 判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      error.message = '请求超时,请重试'
      showError(error.message)
      return Promise.reject(error)
    }
    
    // 重定向到错误页面
    
    return Promise.reject(error)
  }
)

function showError(errorMessage) {
  Toast.$create({
    txt: errorMessage,
    type: 'error',
    time: 1500
  }).show()
}

/**
 * @param name
 * @param params
 * @returns {AxiosPromise}
 */
export function get(name, params = {}) {
  let url = api[name]
  return _axios({
    method: 'get',
    url,
    params,
  })
}

/**
 *
 * @param name
 * @param data
 * @param params
 * @returns {AxiosPromise}
 */
export function post(name, data = {}, params = {}) {
  let url = api[name]
  return _axios({
    method: 'post',
    url,
    data,
    params,
  })
}
