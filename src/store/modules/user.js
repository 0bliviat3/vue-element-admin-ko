import { signIn, getInfo, signOut } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, getUserName } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getUserName(),
  userId: getUserId(),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 로그인
  login({ commit }, userInfo) {
    const { userId, password } = userInfo
    return new Promise((resolve, reject) => {
      signIn({ userId, password }).then(res => {
        // 백엔드가 세션 기반이므로 토큰은 없지만, 프론트에서 관리할 식별값 저장
        commit('SET_USERID', res.userId)
        commit('SET_NAME', res.name)
        // 필요하다면 토큰 대신 세션 쿠키 사용
        setToken(res.userId)
        resolve()
      }).catch(error => reject(error))
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.userId).then(response => {
        const data = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 로그아웃
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      signOut().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        commit('SET_NAME', '')
        removeToken()
        resolve()
      }).catch(error => reject(error))
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
