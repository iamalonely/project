import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
// import subMain from '@/views/layout/components/subMain'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/guild'
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/guild',
    component: Layout,
    name: 'layout',
    redirect: '/guild/guild',
    meta: { icon: 'icon-guanwangfangwen', title: '工会组织管理' },
    children: [
      {
        path: 'guild',
        component: () => import('@/views/addGuild/addGuildApprol'),
        name: 'guild',
        meta: { icon: 'icon-guanwangfangwen', title: '工会管理' }
      },
      {
        path: 'guild1',
        component: () => import('@/views/addGuild/addGuildApprol'),
        name: 'guild1',
        meta: { icon: 'icon-guanwangfangwen', title: '工会管理' }
      }
    ]
  },
  // {
  //   path: '/membership',
  //   component: Layout,
  //   name: 'layout',
  //   children: [
  //     {
  //       path: 'membership',
  //       component: () => import('@/views/guild/membership-mg'),
  //       name: 'membership',
  //       meta: { icon: 'icon-guanwangfangwen', title: '会员管理' }
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   component: Layout,
  //   name: 'layout',
  //   children: [
  //     {
  //       path: 'dataQuery',
  //       component: () => import('@/views/apply/dataQuery'),
  //       name: 'dataQuery',
  //       meta: { icon: 'icon-guanwangfangwen', title: '评星定级审批' }
  //     }
  //   ]
  // },
  // {
  //   path: '/dataQuery',
  //   component: Layout,
  //   name: 'layout',
  //   children: [
  //     {
  //       path: 'dataQuery',
  //       component: () => import('@/views/apply/dataQuery'),
  //       name: 'dataQuery',
  //       meta: { icon: 'icon-guanwangfangwen', title: '非公主席数据查询' }
  //     }
  //   ]
  // },
  // {
  //   path: '/moneyApply',
  //   component: Layout,
  //   name: 'layout',
  //   children: [
  //     {
  //       path: 'moneyApply',
  //       component: () => import('@/views/apply/moneyApply'),
  //       name: 'moneyApply',
  //       meta: { icon: 'icon-guanwangfangwen', title: '非公主席津贴申报' }
  //     }
  //   ]
  // },
 
  
  { path: '*', redirect: '/404', hidden: true },
]
