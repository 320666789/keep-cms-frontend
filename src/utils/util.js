import { validatenull } from './validate'
import Layout from '@/layout'
export const formatRouter = (routers) => {
  console.log('formatRouter....', routers)
  const aRouter = []
  routers.forEach(
    oMenu => {
      console.log('oMenu:', oMenu)
      if (!validatenull(oMenu)) {
        const oRouter = {
          path: oMenu.path,
          component: Layout,
          children: [
            {
              path: 'index',
              component(resolve) {
                require([`../${oMenu.component}.vue`], resolve)
              },
              name: oMenu.path,
              meta: {
                title: oMenu.name,
                icon: oMenu.icon,
                noCache: true,
                roles: oMenu.authority // you can set roles in root nav
              }
            }
          ]
        }
        aRouter.push(oRouter)
      }
    }
  )
  console.log('aRouter....', aRouter)
  return aRouter
  // oMenu.forEach(oMenu => {
  //   console.log('oMenu:', oMenu)
  //   if (!validatenull(oMenu)) {
  //     const oRouter = {
  //       path: oMenu.path,
  //       component: Layout,
  //       children: [
  //         {
  //           path: 'index',
  //           component: () => import(oMenu.component),
  //           name: oMenu.path,
  //           meta: {
  //             title: oMenu.name,
  //             icon: oMenu.icon,
  //             noCache: true,
  //             roles: oMenu.authority // you can set roles in root nav
  //           }
  //         }
  //       ]
  //     }

  //     aRouter.push(oRouter)
  //   }
  // })
  // return aRouter
}
