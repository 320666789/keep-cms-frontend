import { getMenus } from '@/api/menu'
import { getCommonData } from '@/utils/commonData.js'

const customRouter = getCustomRouter()

async function getCustomRouter() {
  // const singleBody = {}
  // const reqParams = {
  //   singleBody: singleBody
  // }
  // const params = getCommonData(reqParams)
  // const res = await getMenus(params)
  // console.log('customRouter:', res.body.listBody)
  // return res.body.listBody
}

export default customRouter
