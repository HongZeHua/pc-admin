import path from 'path'
/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由，某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 */
export const filterRouters = (routes) => {
  // 所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter((route) => {
    // 根据 route 在 childrenRoutes 中进行查重，把所有重复路由表剔除
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 作用：根据 routes 数据，返回对应 menu 规则的数组
 * 本质：递归
 * @param {*} routes 需要解析的路由表
 * @param {*} basePath 解析过程中需要处理的基础路径
 * @return 返回一个数组，该数组会在 SidebarMenu 中被 v-for 循环用于 sidebar-item 的渲染
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不满足该条件 'meta && meta.title && meta.icon' 的数据不应该存在
  routes.forEach((item) => {
    // 不存在 children && 不存在meta 直接return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children，不存在meta,迭代generateMenus
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在 children，存在meta  或者  存在children && 存在meta
    // 因为最终的menu需要进行跳转，此时我们需要合并path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，可能存在 同父路由的情况
    let route = result.find((item) => item.path === routePath)
    // 当前 路由尚未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成route对象，放入result
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
