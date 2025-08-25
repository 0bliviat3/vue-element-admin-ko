import request from '@/utils/request'

// 게시판 목록 조회
export function getBoardList(params) {
  return request({
    url: '/board-metas',
    method: 'get',
    params
  })
}

// 게시판 생성
export function saveBoard(data) {
  return request({
    url: '/board-metas',
    method: 'post',
    data
  })
}

// 게시판 수정
export function updateBoard(id) {
  return request({
    url: `/board-metas/${id}`,
    method: 'put'
  })
}

// 게시판 삭제
export function deleteBoardById(id) {
  return request({
    url: `/board-metas/${id}`,
    method: 'delete'
  })
}
