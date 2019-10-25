import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles(params) {
  return request({
    url: '/admin/role/queryRoles',
    method: 'post',
    data: params
  })
}

export function getRolesByUserId(params) {
  return request({
    url: '/admin/role/queryRolesByUserId',
    method: 'post',
    data: params
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(params) {
  return request({
    url: `/admin/role/updateRole`,
    method: 'post',
    data: params
  })
}

export function updateRoleAuthority(params) {
  return request({
    url: `/admin/role/updateRoleAuthority`,
    method: 'post',
    data: params
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
