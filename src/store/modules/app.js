import localStore from 'store'
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'

const app = {
  state: {
    sidebar: {
      opened: !+localStore.get('sidebarStatus')
    },
    language: localStore.get('language') || 'cn',
    payment: localStore.get('payment') || {},
    product: { imglist: [], data: {}}
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        localStore.set('sidebarStatus', 1)
      } else {
        localStore.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      localStore.set('language', language)
    },
    SET_PAYMENT: (state, payment) => {
      state.payment = payment
      localStore.set('payment', payment)
    },
    SET_PRODUCT: (state, product) => {
      state.product = product
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
      switch (language) {
        case 'cn':
          Locale.use('zh-CN', zhCN)
          break
        default:
          Locale.use('en-US', enUS)
          break
      }
    }
  }
}

export default app
