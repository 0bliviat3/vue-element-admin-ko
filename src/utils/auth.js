import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userId = 'userId'
const userName = 'userName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(userId)
}

export function setUserId(id) {
  return Cookies.set(userId, id)
}

export function removeUserId() {
  return Cookies.remove(userId)
}

export function getUserName() {
  return Cookies.get(userName)
}

export function setUserName(name) {
  return Cookies.set(userName, name)
}

export function removeUserName() {
  return Cookies.remove(userName)
}
