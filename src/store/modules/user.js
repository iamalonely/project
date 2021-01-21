import { getToken, setToken, setRoles, removeRoles, setRoutes, removeToken, removeRoutes } from '@/utils/auth'
import router from '@/router'

const user = {
  state: {
    status: '',
    token: getToken(),
    name: localStorage.getItem('name') || '',
    userId: localStorage.getItem('userId') || '',
    avatar: require('@/assets/avater.png'),
  },

  mutations: {
    SET_STARLEVEL: (state, starLevel) => {
      state.starLevel = starLevel
      localStorage.setItem('starLevel', starLevel)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
      localStorage.setItem('userId', userId)
    },
    SET_FINALUNION: (state, finalUnion) => {
      state.finalUnion = finalUnion
      localStorage.setItem('finalUnion', finalUnion)
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
      localStorage.setItem('name', name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    LoginByUsername({ commit }, data) {
      const roleType = parseInt(data.role_type)
      if (roleType === 1) {
        const roles = ['admin']
        setRoles(JSON.stringify(roles))
      }
      const routes = data.routes.length ? data.routes : []
      const routeKey = []
      routes.map(r => {
        routeKey.push(r.name)
      })
      if (!routeKey.includes('dashboard')) {
        routes.unshift({ name: 'dashboard' })
      }
      setRoutes(JSON.stringify(routes))

      const default_avatar = 'http://xthk.oss-cn-shenzhen.aliyuncs.com/images/teacher_ico.jpg'
      commit('SET_TOKEN', data.user_access_token)
      setToken(data.user_access_token)
      commit('SET_NAME', data.admin_name)
      const avatar = data.admin_avatar ? data.admin_avatar : default_avatar
      commit('SET_AVATAR', avatar)
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getUserInfo(state.token).then(response => {
        //   if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
        //     reject('error')
        //   }
        //   const data = response.data

        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }

        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeRoutes()
        //   removeToken()
        //   removeRoles()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        location.href=`${process.env.VUE_APP_SKIPURL}/#/login`
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        // getUserInfo(role).then(response => {
        //   const data = response.data
        //   commit('SET_ROLES', data.roles)
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
        //   resolve()
        // })
      })
    }
  }
}

export default user
