import request from '@/utils/request'

export function getMenus(params) {
  return request({
    url: '/admin/menu/queryMenus',
    method: 'post',
    data: params
  })
}
