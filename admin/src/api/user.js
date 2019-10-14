import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/doctor/user/info',
    method: 'get',
    params: { }
  })
}
export function getCheckInfo(params) {
  return request({
    url: '/doctor/user/check/info',
    method: 'get',
    params
  })
}

/**
 * 获取钱包信息
 * @param token
 */
export function getWallet() {
  return request({
    url: '/doctor/user/wallet',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

/**
 * 获取列表
 * @param token
 */
export function getRecordList() {
  return request({
    url: '/doctor/user/account-record',
    method: 'get',
  })
}

export function saveStep(data){
  return request({
    url: '/doctor/user/update/detail',
    method: 'post',
    data
  })
}
export function checkSuccessRequest(data){
  return request({
    url: '/doctor/user/check/success',
    method: 'put',
    data
  })
}

