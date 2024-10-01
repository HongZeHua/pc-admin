const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有 /api 的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true // 是否跨域
      }
    },
    client: {
      overlay: false
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const cdn = {
        css: [
          'https://cdn.bootcdn.net/ajax/libs/element-plus/2.7.5/index.min.css',
          'https://uicdn.toast.com/editor/3.0.2/toastui-editor.min.css'
        ],
        js: [
          'https://cdn.bootcdn.net/ajax/libs/element-plus/2.7.5/index.full.min.js',
          'https://cdn.bootcdn.net/ajax/libs/element-plus-icons-vue/2.3.1/index.min.js',
          'https://cdn.jsdelivr.net/npm/wangeditor@latest/dist/wangEditor.min.js',
          'https://uicdn.toast.com/editor/3.0.2/toastui-editor-all.min.js',
          'https://cdn.bootcdn.net/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
          'https://cdn.bootcdn.net/ajax/libs/vue/3.2.13/vue.global.min.js',
          'https://cdn.bootcdn.net/ajax/libs/vue-i18n/9.0.0/vue-i18n.cjs.min.js',
          'https://cdn.bootcdn.net/ajax/libs/axios/1.7.2/axios.min.js'
        ]
      }
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
    }

    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.resolve.alias.set('path', require.resolve('path-browserify'))
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false
      config.externals = {
        'element-plus': 'ElementPlus',
        '@element-plus/icons-vue': 'ElementPlusIconsVue',
        wangeditor: 'E',
        '@toast-ui/editor': 'MkEditor',
        'xlsx/xlsx.mjs': 'XLSX',
        vue: 'createApp',
        'vue-i18n': 'useI18n',
        axios: 'axios'
      }
    } else {
      config.devtool = 'eval-cheap-module-source-map'
    }
  }
})
