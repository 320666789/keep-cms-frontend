import Layout from '@/layout'

const customRouter = getCustomRouter()

async function getCustomRouter() {
  if (localStorage.getItem('customRouter')) {
    const router = JSON.parse(localStorage.getItem('customRouter'))
    console.log('router:', router)
    const customRouter = {
      path: router.path,
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import(router.component),
          name: router.name,
          meta: {
            title: router.name,
            icon: router.icon,
            noCache: true,
            roles: router.authority // you can set roles in root nav
          }
        }
      ]
    }
    console.log('customRouter111111:', customRouter)
    return customRouter
  }
}

export default customRouter
