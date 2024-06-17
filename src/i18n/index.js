import { createI18n } from 'vue-i18n'
import store from '@/store'
import mEnLocale from './lang/en'
import mZhLocale from './lang/zh'

// 创建数据源
const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}
// 获取缓存中的语言
function getLanguage() {
  return store && store.getters && store.getters.language
}
// 初始化实例
const i18n = createI18n({
  // 使用Composition API 模式，需要将其设置为false
  legacy: false,
  // 注入全局 t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages,
  warnHtmlMessage: false
})
export default i18n
