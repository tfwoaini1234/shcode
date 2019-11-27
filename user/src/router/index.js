import Vue from 'vue'
import Router from 'vue-router'
import { getPermissions } from '@/utils/auth'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    permission:'manager' set role
  }
 */

/**
 * 静态路由  不需要任何权限的页面
 * @type {*[]}
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/doctor',
    component: () => import('@/views/info/doctor'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作台', icon: 'dashboard' }
    }]
  },
  //-------------------------------后加页面------------------------






  //-------------------------------后加页面------------------------
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * 如果不设置权限 该菜单不需要权限
 * 动态路由
 * @type {*[]}
 */
export const asyncRoutes = [
  {
    path: '/active',
    component: Layout,
    redirect: '/active/index',
    name: 'active',
    children: [
      {
        path: 'index',
        name: 'activeIndex',
        hidden:true,
        component: () => import('@/views/active/index'),
        meta: { title: '激活记录', icon: 'table'}
      },
      {
        path: 'show/:orderNo',
        name: 'dicomShow',
        hidden: true,
        component: () => import('@/views/dicom/show'),
        meta: { title: '查看影像', icon: 'table',activeMenu: '/dicom/index',permission:'imageologyOrder:view'}
      }
    ]
  },

  {
    path: '/activeCode',
    component: Layout,
    name: 'activeCode',
    redirect: '/activeCode/index',
    children: [
      {
        path: 'index',
        name: 'activeCodeIndex',
        component: () => import('@/views/activeCode/index'),
        meta: { title: '激活码', icon: 'form' }
      }
    ]
  },
  {
    path: '/agent',
    component: Layout,
    name: 'agent',
    redirect: '/agent/index',
    children: [
      {
        path: 'index',
        name: 'agentIndex',
        component: () => import('@/views/agent/index'),
        meta: {
          title: '代理管理', icon: 'user'
        }
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    name: 'recharge',
    children: [
      {
        path: 'index',
        name: 'infoIndex',
        component: () => import('@/views/recharge/index'),
        meta: { title: '激活', icon: 'example' }
      },
    ]
  },
  {
    path: '/pay',
    component: Layout,
    name: 'pay',
    children: [
      {
        path: 'index',
        name: 'infoIndex',
        component: () => import('@/views/pay/index'),
        meta: { title: '转账', icon: 'example' }
      },
    ]
  },
  {
    path: '/buy',
    component: Layout,
    name: 'buy',
    children: [
      {
        path: 'index',
        name: 'infoIndex',
        component: () => import('@/views/buy/index'),
        meta: { title: '购买', icon: 'example' }
      },
    ]
  },
  {
    path: '/message',
    component: Layout,
    name: 'message',
    children: [
      {
        path: 'index',
        name: 'messageIndex',
        hidden: true,
        component: () => import('@/views/message/index'),
        meta: { title: '消息中心', icon: 'message' }
      },
      {
        path: 'show/:id',
        name: 'messageShow',
        hidden: true,
        component: () => import('@/views/message/show'),
        meta: { title: '消息中心', icon: 'message',activeMenu: '/message/index' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: 'setting',
    children: [
      {
        path: 'index',
        name: 'settingIndex',
        hidden: true,
        component: () => import('@/views/setting/index'),
        meta: { title: '系统设置', icon: 'message' }
      }
    ]
  }
]


export function hasPermission(permissions, route) {
  return true;
  if (route.meta && route.meta.permission) {
    if(permissions && permissions.length>0){
      return permissions.indexOf(route.meta.permission)>-1
    }else{
      return false
    }
  } else {
    return true
  }
}

export function filterAsyncRoutesByPermission(asyncRoutes, permissions) {
  const res = []
  asyncRoutes.forEach(route => {

    const tmp = { ...route }
    // if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByPermission(tmp.children, permissions)
      }
      res.push(tmp)
    // }
  })
  return res
}

/**
 * 合并路有权限
 * @returns {*[]}
 */
export function getRoutes() {
  const permissions = getPermissions()?getPermissions():[]
  const accessedRoutes = filterAsyncRoutesByPermission(asyncRoutes, permissions)
  localStorage.setItem('accessRoutes',JSON.stringify(accessedRoutes))
  const routes =  constantRoutes.concat(accessedRoutes)
  return routes
}

/**
 * 构造路由对象
 * @returns {VueRouter}
 */
const createRouter = () => {

  return new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: getRoutes()
  })
}

let router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
