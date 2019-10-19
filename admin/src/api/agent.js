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
    url: '/admin/user/List',
    method: 'get',
    params
  })
}
/**
 * 新增激活码
 * @param data
 */
export function save(data) {
  return request({
    url: '/admin/register',
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
 * 删除
 * @param params
 */
export function deleteUser(params) {
  return request({
    url: '/admin/user/delete',
    method: 'get',
    params
  })
}
