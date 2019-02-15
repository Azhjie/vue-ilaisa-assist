import request from '@/utils/request'

// banner图
export function banner(data) {
  return request({
    url: '/banner/getBanner',
    method: 'post',
    data
  })
}

// 商品列表
export function homeList(data) {
  return request({
    url: '/pawsIndex/getHomeList',
    method: 'post',
    data
  })
}
