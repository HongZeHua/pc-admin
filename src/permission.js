import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']
/**
 * 前置路由守卫
 * @param {*} to 要到哪里去
 * @param {*} from  从哪里来
 * @param {*} next 是否要去？
 */
router.beforeEach(async (to, from, next) => {
  // 1. 用户已登录，则不允许进入login
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action,并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRouters',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要再进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 2. 用户未登录，只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
