import Cookies from 'js-cookie'

const TokenKey = 'medical_doctor_template_token'
const PermissionsKey = 'medical_doctor_template_token_permissions'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getPermissions() {
  return Cookies.get(PermissionsKey)
}

export function setPermissions(token) {
  return Cookies.set(PermissionsKey, token)
}

export function removePermissions() {
  return Cookies.remove(PermissionsKey)
}
