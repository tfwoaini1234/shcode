import request from '@/utils/request'

/**
 * Dashbord统计订单数量
 */
export function getCount(params) {
  return request({
    url: '/proxy/active/count',
    method: 'get',
    params
  })
}
