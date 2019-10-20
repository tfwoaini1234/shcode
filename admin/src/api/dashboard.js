import request from '@/utils/request'

/**
 * Dashbord统计订单数量
 */
export function getCount() {
  return request({
    url: '/admin/active/count',
    method: 'get'
  })
}
