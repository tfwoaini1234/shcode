import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import Qs from 'qs'
// create an axios instance
const service = axios.create({
  baseURL: 'http://103.90.136.251:8080', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000, // request timeout
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }]
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authentication'] = getToken()
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['platform'] = 'DOCTOR'

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    //全局拦截位置
    // if the custom code is not 20000, it is judged as an error.
    return res
  },
  error => {
    console.log('server err:' + error) // for debug
    let msg = '系统未知错误'
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          msg = '错误请求'
          break;
        case 401:
          msg = '未授权，请重新登录'
          MessageBox.confirm('登录信息已过期, 您可以注销登录或者重新登录系统', '注销确认', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })

          break;
        case 403:
          msg = '拒绝访问'
          break;
        case 404:
          msg = '错误请求，未找到改资源'
          break;
        case 405:
          msg = '请求方法不允许'
          break;
        case 408:
          msg = '请求超时'
          break;
        case 500:
          if (error.response.data && error.response.data.message) {
            msg = error.response.data.message
          }
          break;
      }

    }
    Message({
      message: msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
