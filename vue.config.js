let path = require('path')
let webpack = require('webpack')
let timeStamp = (new Date()).getTime()

const cdn = {
  css: ["//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css", '//unpkg.com/element-ui@2.13.0/lib/theme-chalk/display.css'],
  js: [
    "//unpkg.com/vue@2.6.11/dist/vue.min.js",
    "//unpkg.com/axios@0.18.0/dist/axios.min.js",
    "//unpkg.com/vue-router@2.8.1/dist/vue-router.min.js",
    "//unpkg.com/vuex@3.1.2/dist/vuex.min.js",
  ]
}
module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    port: 8077
  },
  chainWebpack: config => {
    config.resolve.symlinks(true)
  },
  configureWebpack: {
    output: {
      filename: `[name].${process.env.VUE_APP_VERSION}.${timeStamp}.js`,
      chunkFilename: `[id].${process.env.VUE_APP_VERSION}.${timeStamp}.js`
    },
    optimization: {
      splitChunks: {
        chunks:'all',
        cacheGroups: {
          'element-ui': {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: -10
          },
          'vendors': {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -20
          }
        }
      }
    },
    externals: {
      vue: 'Vue',
      axios: "axios",
      "vue-router": "VueRouter",
      vuex: "Vuex"
    },
    resolve: {
      alias: {
        '#mixins$': path.resolve(__dirname, 'src/mixins/common.js')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $date: [path.resolve(__dirname, 'src/utils/Date.js')],
        $number: [path.resolve(__dirname, 'src/utils/Number.js')],
        $add: [path.resolve(__dirname, 'src/utils/Number.js'), 'add'],
        $sub: [path.resolve(__dirname, 'src/utils/Number.js'), 'sub'],
        $div: [path.resolve(__dirname, 'src/utils/Number.js'), 'div'],
        $mul: [path.resolve(__dirname, 'src/utils/Number.js'), 'mul']
      })
    ]
  },
  css: {
    extract: {
      filename: `[name].${process.env.VUE_APP_VERSION}.${timeStamp}.css`,
      chunkFilename: `[name].${process.env.VUE_APP_VERSION}.${timeStamp}.css`
    },
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/_var.scss";`
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'sass-admin',
      chunks: ['vendors', 'element-ui', 'index'],
      cdn: cdn
    }
  }
}
