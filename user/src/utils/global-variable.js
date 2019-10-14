/**
 * define global variable
 */

/**
 * 取消订单原因
 * @type {string[]}
 */
const canceOrderReason=()=>{
  return ['影像图像不全','影像和订单描述不匹配','影像打不开']
}
/**
 * 回退报告原因
 * @returns {string[]}
 */
const backOrderReason=()=>{
  return ['报告不匹配','报告描述不正确']
}

const defaultSetting = {pageType: '16', listSize: 'mini', formSize: 'mini', pageTmpType:'1'}
/**
 * Table  header style
 * @type {{backgroundColor: string, color: string, fontSize: string, fontWeight: string}}
 */
const tableHeaderStyle = {backgroundColor:'#f6f8fc',color:'#606266',fontSize:'14px',fontWeight:'300'}

/**
 * Page list size
 * @type {number[]}
 */
const pageSizesList= [10,16,20,30,40,50,60,70,80,100,200,500]

/**
 * Page Current size
 * @returns {number}
 */
const pageSize=()=>{
  //form local
  try {
    let jsonStr =  localStorage.getItem("setting");
    let jObj;
    if(jsonStr && jsonStr!=''){
      jObj =  JSON.parse(jsonStr);
    }else{
      jObj =defaultSetting;
    }

    return parseInt(jObj.pageType);
  }catch (e) {
    return 16;
  }
}
/**
 * Page Templete
 * pager,next,sizes
 * prev,pager,next,sizes,jumper
 * total,prev, pager, next,sizes,jumper
 */
const pageTmplete=()=>{
  try {
    let jsonStr =  localStorage.getItem("setting");
    let jObj;
    if(jsonStr && jsonStr!=''){
      jObj =  JSON.parse(jsonStr);
    }else{
      jObj =defaultSetting;
    }
    switch (jObj.pageTmpType){
      case '0':
        return "pager,next,sizes";
        break;
      case '1':
        return "prev,pager,next,sizes,jumper";
        break;
      case '2':
        return "total,prev, pager, next,sizes,jumper";
        break;
    }
  }catch (e) {
    return "prev,pager,next,sizes,jumper";
  }
}
/**
 * form Size
 */
const formSize=()=>{
  //medium / small / mini
  try {
    let jsonStr = localStorage.getItem("setting");
    let jObj;
    if(jsonStr && jsonStr!=''){
      jObj =  JSON.parse(jsonStr);
    }else{
      jObj =defaultSetting;
    }
    return jObj.formSize;
  }catch (e) {
    return "mini";
  }
}

/**
 * list Size
 */
const listSize=()=>{
  //medium / small / mini
  try {
    let jsonStr = localStorage.getItem("setting");
    let jObj;
    if(jsonStr && jsonStr!=''){
      jObj =  JSON.parse(jsonStr);
    }else{
      jObj =defaultSetting;
    }
    return jObj.listSize;
  }catch (e) {
    return "mini";
  }
}

/**
 * Save Setting
 */
const saveSetting=(jsonStr)=>{
  localStorage.setItem("setting", jsonStr);
}

/**
 * save page size
 * @param pageSize
 */
const savePage=(pageSize)=>{
  let jsonStr = localStorage.getItem("setting");
  let jObj;
  if(jsonStr && jsonStr!=''){
    jObj =  JSON.parse(jsonStr);
  }else{
    jObj =defaultSetting;
  }
  jObj.pageType = pageSize;
  saveSetting(JSON.stringify(jObj));
}

export default {
  tableHeaderStyle,
  pageSizesList,
  pageSize,
  formSize,
  listSize,
  pageTmplete,
  saveSetting,
  savePage,
  canceOrderReason,
  backOrderReason
}
