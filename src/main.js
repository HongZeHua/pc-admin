import { createApp } from 'vue'
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/index.scss'
import installIcons from '@/icons'
import './permission'
import insallFilter from '@/filters'
import installDirective from '@/directives'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installIcons(app)
insallFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).mount('#app')
