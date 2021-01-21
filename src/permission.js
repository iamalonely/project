import router from './router'
import store from './store'
import { Message } from 'element-ui' // eslint-disable-line
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { setToken, getToken, getRoutes, removeRoutes } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration
// permission judge function
function hasPermission(roles, permissionRoles) { // eslint-disable-line
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login', '/auth-redirect']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  // if (getToken()) { // determine if there has token
  //   /* has token*/
  //   if (to.path === '/login') {
  //     next()
  //     NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  //   } else {
      const routes = store.getters.relRoutes
      const ROUTES = getRoutes()
      if (routes && routes.length === 0) { // 判断当前用户是否已拉取完user_info信息
  //       // if (ROUTES && ROUTES.length === 0) {
          // next(`/login?redirect=${to.path}`)
          // next()
        // } else {
          if (localStorage.getItem('avatar')) {
            store.commit('SET_AVATAR', localStorage.getItem('avatar'))
          }
          store.dispatch('GenerateRoutes', { ROUTES }).then(() => { // 根据roles权限生成可访问的路由表
            console.log(store.getters.addRouters)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            console.log(router)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        // }
        // store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        //   const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
        //   const routes = res.data.routes
        //   store.dispatch('GenerateRoutes', { roles, routes }).then(() => { // 根据roles权限生成可访问的路由表
        //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //   })
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
      } else {
        next()
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // 可删 ↑
      }
    // }
  // } else {
  //   /* has no token*/
  //   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     let querys = ''
  //     if (to.query) {
  //       for (const i in to.query) {
  //         querys += `${i}=${to.query[i]}&`
  //       }
  //       querys = querys.substring(0, querys.length - 1)
  //     }
  //     next({ path: '/login', query: { redirect: `${to.path}?${querys}` }}) // 否则全部重定向到登录页
  //     NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
