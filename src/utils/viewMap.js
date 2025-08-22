// custom view를 미리 정의해두고 lazy loading을 통해 불러오는 방식입니다.

export const viewMap = {
  '/program/index': () => import('@/views/program/index'),
  '/menu/index': () => import('@/views/menu/index'),
  // 필요하면 여기에 추가
  '/board/index': () => import('@/views/board/index')
}
