import { validatenull } from './validate'
import Layout from '@/layout'
export const formatRouter = (oMenu) => {
  console.log('formatRouter....', oMenu)
  const aRouter = []
  oMenu.forEach(oMenu => {
    console.log('oMenu:', oMenu)
    if (!validatenull(oMenu)) {
      const oRouter = {
        path: oMenu.path,
        component: Layout,
        children: [
          {
            path: 'index',
            component: () => import(oMenu.component),
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
  })
  return aRouter
}

// export function checkRouter (router) {
//     let flag = false;
//     appRouter.forEach(aRouter => {
//         const {
//             name,
//             children
//         } = aRouter;
//         if (name === router.name) {
//             flag = true;
//         }
//         if (!validatenull(children)) {
//             children.forEach(child => {
//                 if (child.name === router.name) {
//                     flag = true;
//                 }
//             });
//         }
//     });
//     return flag;
// }
