import request from '@/utils/request'

export function addMenu(data) {
  return request({
    url: '/admin/menu/addMenu',
    method: 'post',
    data
  })
}
