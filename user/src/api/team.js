import request from '@/utils/request'

/**
 * 获取团队树列表
 * @param params
 */
export function getTeamTreeList() {
  return request({
    url: '/doctor/hospital/users',
    method: 'get'
  })
}

/**
 * 获取团队信息
 */
export function getList(){
  return request({
    url:'/doctor/organization/users',
    method:'get'
  })
}

/**
 * 获取团队详情
 */
export function getTeamInfo() {
  return request({
    url:'/doctor/organization',
    method:'get'
  })
}

/**
 * 获取列表角色
 * @param params
 */
export function getRole() {
  return request({
    url: '/doctor/role',
    method: 'get'
  })
}
/**
 * 更新成员信息
 * @param params
 */
export function updateUser(data) {
  return request({
    url: '/doctor/user/update',
    method: 'put',
    data
  })
}

/**
 * 提现给医生
 */
export function cashOut(data){
  return request({
    url: '/doctor/user/cashOutToDoctor',
    method: 'post',
    data
  })
}


