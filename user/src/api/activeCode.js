import request from '@/utils/request'

/**
 * 获取列表
 * @param data
 */
export function update(data) {
  return request({
    url: '/admin/activeType/save',
    method: 'post',
    data
  })
}
/**
 * 获取列表
 * @param params
 */
export function getList(params) {
  return request({
    url: '/admin/activeType/list',
    method: 'get',
    params
  })
}
/**
 * 获取列表
 * @param params
 */
export function getCodeList(params) {
  return request({
    url: '/proxy/activeCode/list',
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
    url: '/admin/activeCode/add',
    method: 'post',
    data
  })
}

/**
 * 获取列表
 * @param params
 */
export function getUserList(params) {
  return request({
    url: '/admin/user/all',
    method: 'get',
    params
  })
}
