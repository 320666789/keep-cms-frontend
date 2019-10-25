import request from '@/utils/request'

export function getMenus(params) {
  return request({
    url: '/admin/menu/queryAllMenus',
    method: 'post',
    data: params
  })
}

export function getMenuIdsByRoles(params) {
  return request({
    url: '/admin/menu/queryMenuIdsByRoles',
    method: 'post',
    data: params
  })
}
