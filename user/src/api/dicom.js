import request from '@/utils/request'


/**
 * patientName
 * @param params
 */
export function searchPatientList(params) {
  return request({
    url: '/doctor/patient/search',
    method: 'get',
    params
  })
}

/**
 * 获取dicom缓存区的文件列表
 * @param params
 */
export function getDicomListTemp(params) {
  return request({
    url: '/doctor/imageology-order/dicom',
    method: 'get',
    params
  })
}

/**
 * 获取影片检查类型
 * @param params
 */
export function getDicomcheckType(params) {
  return request({
    url: '/doctor/imageology-order/type',
    method: 'get',
    params
  })
}

/**
 * 获取收费档次
 * @param params orderType
 */
export function getDicomcheckCharge(params) {
  return request({
    url: '/doctor/imageology-order/charge',
    method: 'get',
    params
  })
}


/**
 * 创建dicom订单
 * @param data
 */
export function saveDicom(data) {
  return request({
    url: '/doctor/imageology-order',
    method: 'post',
    data
  })
}

/**
 * 取消订单
 * @param orderId
 */
export function canceDicom(data) {
  return request({
    url: '/doctor/imageology-order/cancel',
    method: 'put',
    data
  })
}

/**
 * 确认阅片
 * @param orderId
 */
export function confirmDicom(orderId) {
  return request({
    url: '/doctor/imageology-order/start/'+orderId,
    method: 'put'
  })
}



/**
 * 获取dicom列表
 * @param params
 * orderNo、orderType、orderGrade、orderCheckpoint、orderStatus、timeFrom、timeTo
 */
export function getDicomList(params) {
  return request({
    url: '/doctor/imageology-order',
    method: 'get',
    params
  })
}

/**
 * 获取dicom详情
 * @param orderNo 订单编号
 */
export function getDicomDetail(params) {
  return request({
    url: '/doctor/imageology-order/detail',
    method: 'get',
    params
  })
}

/**
 * 提交报告
 * @param data
 */
export function submitReport(data){
  return request({
    url: '/doctor/imageology-order/diagnosis',
    method: 'post',
    data
  })
}


/**
 * 审核报告
 * @param data
 */
export function submitVerifyReport(data){
  return request({
    url: '/doctor/imageology-order/verify',
    method: 'post',
    data
  })
}

/**
 * 退回报告
 * @param data
 */
export function submitBackVerifyReport(data){
  return request({
    url: '/doctor/imageology-order/verifyBack',
    method: 'put',
    data
  })
}

/**
 * 获取日志列表
 * @param orderNo
 */
export function getOrderLog(params){
  return request({
    url: '/doctor/imageology-order/log',
    method: 'get',
    params
  })
}

/**
 * 根据type获取列表
 * @param pendType pendType为数字   1表示待阅片   2表示待审核
 */
export function getDicomListByType(params) {
  return request({
    url: '/doctor/imageology-order/pending',
    method: 'get',
    params
  })
}

