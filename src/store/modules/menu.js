import { getMenuTree } from '@/api/menu'

const state = {
  menus: [], // 사이드바용 메뉴 트리
  flatRoutes: [] // 동적 라우트 등록용 flat array
}

const getters = {
  menus: (state) => state.menus,
  flatRoutes: (state) => state.flatRoutes
}

const mutations = {
  SET_MENUS(state, menus) {
    state.menus = menus
  },
  SET_FLAT_ROUTES(state, routes) {
    state.flatRoutes = routes
  }
}

const actions = {
  async fetchMenus({ commit }) {
    try {
      const res = await getMenuTree()
      if (!res) throw new Error('Menu fetch failed.')

      // 메뉴 트리 가공
      const formatMenuTree = (node) => {
        const menu = node.menuDTO
        const children = node.children ? node.children.map(formatMenuTree) : []

        return {
          id: menu.id,
          name: menu.name,
          icon: menu.icon || 'el-icon-folder',
          path: menu.path,
          frontPath: menu.frontPath,
          type: menu.type,
          roles: menu.roles ? menu.roles.split(',') : [],
          children
        }
      }

      const menuTree = formatMenuTree(res)
      commit('SET_MENUS', [menuTree]) // 루트 노드 포함

      // 동적 라우트용 flat array
      const collectRoutes = (node) => {
        let routes = []
        if (node.type === 'PROGRAM' && node.path && node.frontPath) {
          routes.push({
            path: node.path,
            componentPath: node.frontPath,
            meta: { roles: node.roles }
          })
        }
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            routes = routes.concat(collectRoutes(child))
          })
        }
        return routes
      }

      const flatRoutes = collectRoutes(menuTree)
      commit('SET_FLAT_ROUTES', flatRoutes)
    } catch (err) {
      console.error('fetchMenus error:', err)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
