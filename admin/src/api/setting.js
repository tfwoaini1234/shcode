import request from '@/utils/request'

export function changePass(data) {
  return request({
    url: '/update_user_pass',
    method: 'post',
    data
  })
}
