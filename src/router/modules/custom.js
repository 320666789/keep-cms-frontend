import { formatRouter } from '@/utils/util.js'
import { getMenus } from '@/api/menu'
import { getCommonData } from '@/utils/commonData.js'

const customRouter = getCustomRouter()

async function getCustomRouter() {
  if (localStorage.getItem('customRouter')) {
    const customRouter = formatRouter(JSON.parse(localStorage.getItem('customRouter')))
    console.log('customRouter111111:', customRouter)
    return customRouter
  } else {
    const singleBody = {}
    const reqParams = {
      singleBody: singleBody
    }
    const params = getCommonData(reqParams)
    const res = await getMenus(params)
    const customRouter = formatRouter(res.body.listBody)
    localStorage.setItem('routerApp', JSON.stringify(customRouter))
    return customRouter
  }
}

export default customRouter
