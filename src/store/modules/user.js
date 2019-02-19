import localStore from 'store'

const user = {
  state: {
    user: localStore.get('user') || {},
    userinfo: localStore.get('userinfo') || {},
    status: '',
    code: '',
    defaultAddress: {}, // 默认地址
    defaultPayment: {},
    dynamic_title: localStore.get('dynamic_title'),
    token: localStore.get('loginname'),
    username: localStore.get('username'),
    userId: localStore.get('userId'),
    signature: localStore.get('signature'),
    avatar: localStore.get('avatar'),
    createTime: localStore.get('createTime'),
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    country: localStore.get('country') ||
      {
        chinese_initial: 'ZGDL',
        code_area: '86',
        code_name: 'CN',
        id: 216,
        nation_cn: '中国大陆',
        nation_en: 'China'
      }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_USER: (state, user) => {
      state.user = user
      localStore.set('user', user)
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
      localStore.set('userinfo', userinfo)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
      localStore.set('userId', userId)
    },
    SET_USERNAME: (state, username) => {
      state.username = username
      localStore.set('username', username)
    },
    SET_SIGNATURE: (state, signature) => {
      state.signature = signature
      localStore.set('signature', signature)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      localStore.set('avatar', avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_COUNTRY: (state, country) => {
      state.country = country
      localStore.set('country', country)
    },
    SET_DEFAULTADDRESS: (state, defaultAddress) => {
      state.defaultAddress = defaultAddress
    },
    SET_DEFAULTPAYMENT: (state, defaultPayment) => {
      state.defaultPayment = defaultPayment
    },
    SET_DYNAMIC_TITLE: (state, dynamic_title) => {
      state.dynamic_title = dynamic_title
      localStore.set('dynamic_title', dynamic_title)
    },
    SET_REGISTERTIME: (state, createTime) => {
      state.createTime = createTime
      localStore.set('createTime', createTime)
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const form = {
        username: userInfo.username.trim(),
        password: window.md5(userInfo.password),
        client: userInfo.client
      }
      return new Promise((resolve, reject) => {
        // loginByUsername(form).then(response => {
        //   if (response.error_code !== 0) { // 未入职不给登录呢
        //     reject(response)
        //     return
        //   }
        //   commit('SET_TOKEN', response.loginname)
        //   commit('SET_USERID', response.userId)
        //   commit('SET_USERNAME', response.username)
        //   commit('SET_SIGNATURE', response.signature)
        //   commit('SET_REGISTERTIME', response.createTime)
        //   commit('SET_AVATAR', response.userImg ? response.userImg : '')
        //   localStore.set('loginname', response.loginname)
        //   response.userImg && localStore.set('avatar', response.userImg)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 动态登陆
    LoginByDynamic({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const randomCode = userInfo.randomCode.trim()
      const client = userInfo.client
      return new Promise((resolve, reject) => {
        // loginByDynamic(username, randomCode, client).then(response => {
        //   if (response.error_code !== 0) { // 未入职不给登录呢
        //     reject(response)
        //     return
        //   }
        //   commit('SET_TOKEN', response.loginname)
        //   commit('SET_USERID', response.userId)
        //   commit('SET_USERNAME', response.username)
        //   commit('SET_SIGNATURE', response.signature)
        //   commit('SET_REGISTERTIME', response.createTime)
        //   commit('SET_AVATAR', response.userImg ? response.userImg : '')
        //   localStore.set('loginname', response.loginname)
        //   response.userImg && localStore.set('avatar', response.userImg)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 设置国家
    SetCountry({ commit }, state) {
      return new Promise(resolve => {
        commit('SET_COUNTRY', state)
        resolve()
      })
    },
    // 设置动态title
    SetDynamicTitle({ commit }, title) {
      return new Promise((resolve) => {
        commit('SET_DYNAMIC_TITLE', title)
        resolve()
      })
    },
    GetStatistInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // 获取用户信息 例如性别
        // StatistInfo().then(response => {
        //   if (!response.data) {
        //     reject('error')
        //   }
        //   commit('SET_USERINFO', Object.assign({}, response.data))
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 获取用户信息 例如性别
        // UserInfo().then(response => {
        //   if (!response.data) {
        //     reject('error')
        //   }
        //   commit('SET_USER', Object.assign({}, state.user, response.data, {
        //     userImg: response.data.userImg
        //   }))// 兼容pc接口的操作

        //   // 兼容pc接口的操作
        //   commit('SET_REGISTERTIME', response.data.createTime)
        //   console.log('this.SetSecurityInfo', this.SetSecurityInfo)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
        // // 获取用户设置信息
        // SecurityInfo().then(response => {
        //   if (!response.data) {
        //     reject('error')
        //   }
        //   commit('SET_USER', Object.assign({}, state.user, response.data))
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 保存用户信息
    SaveUserInfo({ }, userInfo) {
      return new Promise((resolve, reject) => {
        // UpdateUserInfo(userInfo).then(response => {
        //   if (response.error_code !== 0) {
        //     reject('error')
        //     return
        //   }
        //   // commit('SET_USER', response.data)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 获取用户的默认地址
    GetDefaultAddress({ commit }) {
      return new Promise((resolve, reject) => {
        // getAddressList().then(response => {
        //   if (response.error_code !== 0) {
        //     reject('error')
        //     return
        //   }
        //   const list = response.data.addressVos
        //   const defaultAddress = list.filter(i => {
        //     return i.status === 0
        //   })[0]
        //   commit('SET_DEFAULTADDRESS', defaultAddress || {})
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        localStore.remove('username')
        localStore.remove('signature')
        localStore.remove('loginname')
        localStore.remove('showname')
        localStore.remove('avatar')
        localStore.remove('balance')
        resolve()
      })
    }
  }
}

export default user
