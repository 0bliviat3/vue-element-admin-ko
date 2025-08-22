import request from '@/utils/request'

// 게시판 목록 조회
export function getBoardList(params) {
  return request({
    url: '/boards',
    method: 'get',
    params
  })
}

// 게시판 생성
export function createBoard(data) {
  return request({
    url: '/boards',
    method: 'post',
    data
  })
}

// 게시판 삭제
export function deleteBoardById(id) {
  return request({
    url: `/boards/${id}`,
    method: 'delete'
  })
}
