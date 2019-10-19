import request from '@/utils/request'

/**
 * 获取列表
 * @param params
 */
export function getList(params) {
  return request({
    url: '/admin/active/list',
    method: 'get',
    params
  })
}
/**
 * 获取列表
 * @param params
 */
export function getTypeList(params) {
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
export function getUserList(params) {
  return request({
    url: '/admin/user/all',
    method: 'get',
    params
  })
}
