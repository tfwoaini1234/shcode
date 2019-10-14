/**
 * creat by starter
 * hospital
 */
import request from '@/utils/request'

/**
 * 获取医院基本信息
 */
export function getInfo() {
  return request({
    url: '/doctor/organization',
    method: 'get'
  })
}

/**
 * 获取医院充值记录
 */
export function getPayList(params) {
  return request({
    url: '/doctor/hospital/account-record',
    method: 'get',
    params
  })
}

/**
 * 获取机构的消费记录
 * @param params
 */
export function getRecordList(params) {
  return request({
    url: '/doctor/organization/account-record',
    method: 'get',
    params
  })
}

/**
 * 获取字典类型
 * @param param tableName、fieldName
 */
export function getDict(params) {
  return request({
    url: '/doctor/dict',
    method: 'get',
    params
  })
}
