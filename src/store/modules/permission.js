import { constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
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
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

// const actions = {
//   generateRoutes({ commit }, roles) {
//     return new Promise(resolve => {
//       let accessedRoutes
//       if (roles.includes('admin')) {
//         accessedRoutes = asyncRoutes || []
//       } else {
//         accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
//       }
//       commit('SET_ROUTES', accessedRoutes)
//       console.log('accessedRoutes', JSON.stringify(accessedRoutes))
//       resolve(accessedRoutes)
//     })
//   }
// }

// 하드코딩된 asyncRoutes를 사용하지 않고, 서버에서 가져온 메뉴 트리로 동적으로 라우트를 생성
const actions = {
  // async generateRoutes({ commit }, roles) {
  //   let accessedRoutes = []

  //   // 1) 관리자(admin) 권한이면 서버 메뉴 기반으로 전부 생성
  //   if (roles.includes('admin')) {
  //     const menus = await getMenuTree()
  //     accessedRoutes = generateRoutesFromMenus(menus)
  //   } else {
  //     // 2) 그 외 권한은 기존 asyncRoutes + 서버 메뉴 혼합
  //     const menus = await getMenuTree()
  //     const menuRoutes = generateRoutesFromMenus(menus)

  //     // 기존 asyncRoutes 필터링
  //     const roleRoutes = filterAsyncRoutes(asyncRoutes, roles)

  //     // 합치기 (필요에 따라 concat 말고 merge 로직 작성 가능)
  //     accessedRoutes = roleRoutes.concat(menuRoutes)
  //   }

  //   console.log('accessedRoutes', accessedRoutes)
  //   commit('SET_ROUTES', accessedRoutes)
  //   return accessedRoutes
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
