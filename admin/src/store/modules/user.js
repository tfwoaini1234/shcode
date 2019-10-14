import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken,setPermissions,removePermissions } from '@/utils/auth'
import router, { resetRouter,asyncRoutes, constantRoutes,getRoutes } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  hospitalName:'',

  userInfo: {},
  roleName: '',
  //存储静态路由 + 权限判断后的动态路由路由信息
  routes: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_HOSPITAL_NAME: (state, hospitalName) => {
    state.hospitalName = hospitalName
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLE_NAME: (state, roleName) => {
    state.roleName = roleName
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)

        const { userRealName, userAvatar,organizationName,roleName } = data.user
        commit('SET_NAME', userRealName)
        commit('SET_AVATAR', userAvatar)
        commit('SET_HOSPITAL_NAME', organizationName)
        commit('SET_ROLE_NAME', roleName)
        commit('SET_USER_INFO', data.user)
        //权限拦截
        setPermissions(data.permissions)
        commit('SET_ROUTES', getRoutes())
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { user,permissions } = response

        if (!user) {
          reject('验证失败，请重新登录.')
        }


        const { userRealName, userAvatar,organizationName,roleName } = user
        commit('SET_NAME', userRealName)
        commit('SET_AVATAR', userAvatar)
        commit('SET_HOSPITAL_NAME', organizationName)
        commit('SET_ROLE_NAME', roleName)
        commit('SET_USER_INFO', user)
        //权限拦截
        setPermissions(permissions)
        commit('SET_ROUTES', getRoutes())

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', {})
        commit('SET_ROLE_NAME', '')
        commit('SET_PERMISSIONS', [])
        commit('SET_ROUTES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USER_INFO', {})
      commit('SET_ROLE_NAME', '')
      commit('SET_PERMISSIONS', [])
      commit('SET_ROUTES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

