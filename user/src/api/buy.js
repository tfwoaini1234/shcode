import request from '@/utils/request'
/**
 * 获取列表
 * @param params
 */
export function getList(params) {
  return request({
    url: '/proxy/buy/list',
    method: 'get',
    params
  })
}

/**
 * 获取列表
 * @param
 */
export function getUserList() {
  return request({
    url: '/admin/user/all',
    method: 'get',

  })
}
