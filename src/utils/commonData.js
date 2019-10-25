export function getCommonData(reqParams) {
  var msgObj = {
    'head': {
      'userId': reqParams.userId,
      'openId': '',
      'ipAddr': '',
      'token': reqParams.token,
      'refreshToken': '',
      'authCode': '',
      'transSeqNo': '',
      'chainPath': {},
      'chainnelId': reqParams.chainnelId,
      'transCode': reqParams.transCode,
      'transTime': reqParams.transTime,
      'respTime': '',
      'respCode': reqParams.respCode,
      'errorCode': '',
      'errorMsg': {},
      'sign': ''
    },
    'body': {
      'singleBody': reqParams.singleBody, // 单条记录 放这里  {}
      'listBody': reqParams.listBody, // 多条记录放这里 [{}]
      'pageNum': reqParams.pageNum,
      'pageSize': reqParams.pageSize,
      'total': reqParams.total
    }
  }
  return msgObj
}
