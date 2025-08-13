import request from '@/utils/request'

export function getInfo(id) {
  return request({
    url: '/user',
    method: 'get',
    params: { userId: id }
  })
}

// 회원가입
export function signUp(data) {
  return request({
    url: '/sign-up',
    method: 'post',
    data
  })
}

// 로그인
export function signIn(data) {
  return request({
    url: '/sign-in',
    method: 'post',
    data
  })
}

// 로그아웃
export function signOut() {
  return request({
    url: '/sign-out',
    method: 'get'
  })
}
