const whiteList = ['/login', '/import', '/404', '401']
/**
 * 判断path是否需要被缓存
 * @param {*} path
 */
export function isTags(path) {
  return !whiteList.includes(path)
}
