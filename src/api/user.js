import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

export const login = (username, password) => {
  var grant_type = 'password'
  var scope = 'all'
  return request({
    url: '/dooleenApi/oauth/token',
    headers: {
      'Authorization': 'Basic ZG9vbGVlbjpkb29sZWVu'
    },
    method: 'post',
    params: { username, password, grant_type, scope }
  })
}

export function getInfo(params) {
  // return request({
  //   url: '/admin/user/getUserInfoByUserName',
  //   method: 'get',
  //   params: { token }
  // })
  return request({
    url: '/admin/user/getUserInfoByUserName',
    method: 'post',
    data: params
  })
}

export function getUsers(params) {
  return request({
    url: '/admin/user/queryUsers',
    method: 'post',
    data: params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
