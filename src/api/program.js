import request from '@/utils/request'

// 프로그램 목록 조회 (페이징)
export function fetchProgramList(query) {
  return request({
    url: '/programs',
    method: 'get',
    params: query
  })
}

// 프로그램 생성
export function createProgram(data) {
  return request({
    url: '/programs',
    method: 'post',
    data
  })
}

// 프로그램 수정
export function updateProgram(data) {
  return request({
    url: '/programs',
    method: 'put',
    data
  })
}

// 프로그램 삭제
export function deleteProgram(id) {
  return request({
    url: `/programs/${id}`,
    method: 'delete'
  })
}

// 프로그램 단건 조회
export function fetchProgram(id) {
  return request({
    url: `/programs/${id}`,
    method: 'get'
  })
}
