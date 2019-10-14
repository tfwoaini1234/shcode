
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 校验手机号
 * @param {string} str
 * @returns {Boolean}
 */
export function validMobile(str) {
  var myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(str.trim())) {
    return false;
  } else {
    return true;
  }
}

/**
 * 校验身份证
 * @param card
 * @returns {boolean}
 */
export function validIDCode(card) {
  var reg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/

  if (reg.test(card)===true){
    return true
  }
  else{
    return false
  }

}
