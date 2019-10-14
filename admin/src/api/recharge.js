import request from '@/utils/request'

/**
 * 获取列表
 * @param params
 */
export function update(params) {
  return request({
    url: '/active/imageology-order',
    method: 'get',
    params
  })
}
/**
 * 获取列表
 * @param params
 */
export function getList(params) {
  return request({
    url: '/active/imageology-order',
    method: 'get',
    params
  })
}
/**
 * 新增激活码
 * @param data
 */
export function addCode(data) {
  return request({
    url: '/doctor/imageology-order',
    method: 'post',
    data
  })
}

/**
 * 获取详情
 * @param params
 */
export function getInfo(params) {
  return request({
    url: '/active/imageology-order',
    method: 'get',
    params
  })
}
/**
 * 充值
 * @param data
 */
export function addAmount(data) {
  return request({
    url: '/active/imageology-order',
    method: 'psot',
    data
  })
}
