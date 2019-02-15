import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { Toast, Dialog } from 'vant'
import resMessage from '@/utils/resMessage'
import { typeCheck } from '@/utils'
import cryptoConfig from '@/utils/cryptoConfig'
// create an axios instance

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true, // 允许携带cookie
  timeout: 300000 // request timeout
})

// 请求拦截
service.interceptors.request.use(config => {

  config.data = config.data || {}
  const megeCofig = Object.assign({},  {
    ClientSource: 3,
    ClientSystem: navigator.appVersion,
    Version: 3.1,
    app_key:'a1d658379636c28e83b745147b35c8dd',
    ticket:'0F3F023AE-EFDC-CB05-3914-4F2FDB10833F',
  },
    config.data || {},
  )
  const sign = cryptoConfig(megeCofig)

  config.data = Object.assign({}, {sign:sign},megeCofig,)


  config.data = config.data ? qs.stringify(config.data) : null
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 返回拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.error_code && res.error_code !== 0) {
      return Promise.reject(response) // 报错给promise catch
    } else {
      return res
    }
  },
  error => {
    console.log(error.message)

    return Promise.reject(error)
  })

export default service
