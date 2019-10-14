import request from '@/utils/request'

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
