import request from '@/utils/request'

/**
 * Dashbord统计订单数量
 * @param params
 */
export function getOrderCount() {
  return request({
    url: '/doctor/imageology-order/orderCount',
    method: 'get'
  })
}
