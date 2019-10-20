import request from '@/utils/request'

/**
 * 获取列表
 * @param params
 */
export function getList(params) {
  return request({
    url: '/proxy/active/list',
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

/**
 * 切换绑定
 * @param data
 */
export function changeBind(data) {
  return request({
    url: '/admin/active/changeBind',
    method: 'post',
    data
  })
}
