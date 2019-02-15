import localStore from 'store'

const TokenKey = 'username'

export function getToken() {
  return localStore.get(TokenKey)
}

export function setToken(token) {
  return localStore.set(TokenKey, token)
}

export function removeToken() {
  return localStore.remove(TokenKey)
}
