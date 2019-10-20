import request from '@/utils/request'

/**
 * 登录
 * @param data
 */
export function login(data) {
  return request({
    url: '/proxy/login',
    method: 'post',
    data
  })
}
