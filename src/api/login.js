import request from '@/utils/request'

export const loginByUsername = (username, password) => {
  var grant_type = 'password'
  var scope = 'all'
  return request({
    url: '/auth/keepApi/oauth/token',
    headers: {
      'Authorization': 'Basic a2VlcDprZWVw'
    },
    method: 'post',
    params: { username, password, grant_type, scope }
  })
}

export function getUserInfoByUserName(access_token, params) {
  return request({
    url: '/admin/user/getUserInfoByUserName',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    method: 'post',
    data: params
  })
}

