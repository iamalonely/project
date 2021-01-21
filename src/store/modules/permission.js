import { asyncRouterMap, constantRouterMap } from '@/router'
import { getRoles } from '@/utils/auth'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) { // eslint-disable-line
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

function extendAsyncRouter(asyncRouterMap, routes) {
  let newRoutes = []
  if (routes && routes.length > 0) {
    routes.map((item, index) => {
      asyncRouterMap.forEach(_item => {
        if (_item.name && item.name === _item.name) {
          if (_item.meta) {
            _item.meta = item.meta
          }
          if (item.children) {
            _item.children = extendAsyncRouter(_item.children, item.children)
          }
          newRoutes.push(_item)
        }
      })
    })
  } else {
    newRoutes = asyncRouterMap
  }
  return newRoutes
}

const permission = {
  state: {
    routers: constantRouterMap,
    relRoutes: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      localStorage.setItem('routes', JSON.stringify(state.routers))
    },
    SET_RELROUTES: (state, routes) => {
      state.relRoutes = routes
    }
  },
  actions: {
    GenerateRoutes({ state, commit }, data) {
      return new Promise(resolve => {
        const { ROUTES } = data
        let accessedRouters
        // let accessedRouters = extendAsyncRouter(asyncRouterMap, ROUTES)
        // const roles = getRoles()
        // if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = extendAsyncRouter(asyncRouterMap, ROUTES)
        // }
        commit('SET_RELROUTES', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
