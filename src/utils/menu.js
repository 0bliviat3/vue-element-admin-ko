// utils/menu.js
import Layout from '@/layout'
import { viewMap } from './viewMap'

// root를 제외하고 children부터 취급
export function generateRoutesFromMenus(rootMenu) {
  if (!rootMenu || !rootMenu.children) return []

  return rootMenu.children.map((child) => transformMenuToRoute(child))
}

// 실제 메뉴 → route 변환 함수
function transformMenuToRoute(menus) {
  const menu = menus.menuDTO

  const route = {
    path: normalizePath(menu.path || menu.frontPath || '/'),
    component: Layout,
    hidden: menu.ableState === 'DISABLE',
    meta: {
      title: menu.programName || menu.name,
      icon: menu.icon || 'el-icon-folder',
      noCache: false
    },
    children: []
  }

  if (menus.children && menus.children.length > 0) {
    // 자식이 있으면 재귀
    route.children = menus.children.map((child) => transformMenuToRoute(child))
  } else {
    // 자식 없으면 index children 강제 생성
    route.children = [
      {
        path: 'index',
        name: menu.name,
        component: viewMap[menu.frontPath],
        meta: {
          title: menu.programName || menu.name,
          icon: menu.icon || 'el-icon-folder',
          noCache: false
        }
      }
    ]
  }

  return route
}

// 경로 보정
function normalizePath(path) {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}
