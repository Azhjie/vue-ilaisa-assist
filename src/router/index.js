import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: Layout,
    children: [
      {
        path: '',
        component: _import('login/index'),
        name: 'login',
        meta: { title: 'login', back: '/', noCache: true }
      }
    ]
  },
  {
    path: '/404',
    component: _import('errorPage/404'), hidden: true,
    meta: { title: '页面迷路了', icon: '404', noCache: true }
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        // 首页
        path: '',
        component: _import('home/index'),
        name: 'home',
        meta: { title: 'home', noCache: true }
      },
    ]
  },
  {
    path: '/multiplayer',
    component: Layout,
    children: [
      {
        // 批量版
        path: '',
        component: _import('multi/index'),
        name: 'multi',
        meta: { title: 'multi', noCache: true }
      },
    ]
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  
  { path: '*', redirect: '/404', hidden: true }
]
