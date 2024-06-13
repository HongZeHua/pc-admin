import SvgIcon from '@/components/SvgIcon'
/**
 * 1.导入所有的 svg 图标
 * 2. 完成 SvgIcon 的全局注册
 */

// 通过require.context() 函数来创建自己的 context
const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回一个 require 的函数，可以接收一个request的参数，用于require的导入
// 该函数提供三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
