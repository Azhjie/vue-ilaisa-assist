import localStore from 'store'
import request from '@/utils/request'
import contentList from '@/utils/contentList'
const app = {
  state: {
    leftSide: false,
    rightSide: false,
    needLoad: localStore.get('needLoad') || false,
    packList: [],
    lastLoadTime:localStore.get('lastLoadTime') || {}  //key:上次使用的经纬度 value:上次加载时间
  },
  mutations: {
    TOGGLE_LEFTSIDE: (state, value) => {
      state.leftSide = value
    },
    TOGGLE_RIGHTSIDE: (state,value) => {
      state.rightSide = value
    },
    TOGGLE_NEEDLOAD: (state,value) => {
      state.needLoad = value
      localStore.set('needLoad',value)
    },
    SET_PACKLIST: (state,value) => {
      state.packList = value
    },
    SET_LASTLOADTIME: (state, value) => {
      let { lng, lat, ticket } = localStore.get('keyInfo') || { lng: 'null', lat: 'null', ticket: 'null' }
      ticket = ticket.replace(/-/g,'')
      state.lastLoadTime[`${lng}&${lat}&${ticket}`] = value
      localStore.set('lastLoadTime', state.lastLoadTime)
    },
    SET_MULTILASTLOADTIME: (state, value) => {
      Object.assign(state.lastLoadTime,value)
      localStore.set('lastLoadTime', state.lastLoadTime)
    }
  },
  actions: {
    getPackList({ commit, state }, params) {
      if (params.page === 1) {
        commit('SET_PACKLIST',[])
      }
      return new Promise((resolve, reject) => { 
        request({
          url: '/api',
          method: 'post',
          data:params
        }).then(res => {
          // const data = res.data.blog_data.filter((element) => {
          //去掉已经领过的   // 蛤蛤 不能去掉
          //   return element.is_receive == 0
          // })
          commit('SET_PACKLIST', state.packList.concat(res.data.blog_data))
          resolve(res)
        }).catch((e) => {
          reject(e)
        })
      })
    },
    getPack({ commit }, data) {
      return new Promise((resolve, reject) => {
        request({
          url:'/api',
          method: 'post',
          data:Object.assign({
            _cmd: 'blog_redpacket_receive',
            is_hand: 0,
            content: contentList[Math.floor(Math.random()*15)],
            introducer: 0,
          },data)
        }).then(res => {
          resolve(res)
        }).catch((e) => {
          reject(e)
        })
      })
    }
  }
}

export default app
