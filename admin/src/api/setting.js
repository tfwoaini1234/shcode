import request from '@/utils/request'


export function changePass(data) {
  return request({
    url: '/doctor/user/updatePassword',
    method: 'put',
    data
  })
}
