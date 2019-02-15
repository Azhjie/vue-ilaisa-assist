import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function loginByDynamic(username, randomCode, client) {
  const data = {
    username,
    randomCode,
    client
  }
  return request({
    url: '/dynamicLogin',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

