import request from '@/utils/request'

export function getAllList(params) {
  return request({
    url: '/doctor/message',
    method: 'get',
    params
  })
}
export function getItem(id) {
  return request({
    url: '/doctor/message/'+id,
    method: 'get'
  })
}
export function deleteItems(paramStr) {
  return request({
    url: '/doctor/message/?relationIds='+paramStr,
    method: 'delete'
  })
}

export function readItems(paramStr) {
  return request({
    url: '/doctor/message/?relationIds='+paramStr,
    method: 'put'
  })
}

export function readAllItems() {
  return request({
    url: '/doctor/message/all',
    method: 'put'
  })
}
