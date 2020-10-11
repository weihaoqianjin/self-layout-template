import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import '@/utils/JSON'
import store from '@/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import '@/style/index.scss'
import '@/views/dialog'
import components from '@/components'
import * as $u from '@/utils'
import '@/utils/prototype.js'
import Constant from '@/constants'
import axios from 'axios'
import qs from 'qs'
import * as filters from '@/filters'
import config from '@/config'

if (window.location.protocol === 'http:' && config.validateProtocol) {
  window.location.href = window.location.href.replace('http:', 'https:')
}



Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(components)
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  // 未登录用户页面导航
  if (!sessionStorage.getItem('userInfo') && (to.name !== 'login')) {
    return next('/login')
  }
  // 用户无权限页面导航
  if (store.getters.sesRouterModelMap()) {
    let map = store.getters.sesRouterModelMap()
    if (!map[to.name]) {
      return next('/404')
    }
  }
  if (from.name && !store.getters.isAllow && to.meta.limitedEntry && to.meta.limitedEntry.length && !to.meta.limitedEntry.includes(from.name)) return next(false)
  if (!store.getters.visitedViews.length) store.dispatch('addVisitedViews', to)
  store.dispatch('setMenuGroupLink', {groupName: to.meta.groupName, link: to.fullPath})
  store.dispatch('setIsAllow', false)
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

// 原型扩展
Vue.prototype.Bus = new Vue()
Vue.prototype.$config = config
Vue.prototype.$u = $u
Vue.prototype.$dispatch = store.dispatch
Vue.prototype.$state = store.getters
Vue.prototype.$log = (info) => { console.log(info) }
Vue.prototype.jump = function (params) {
  try {
    router.push(params)
  } catch (e) {}
}

Vue.directive('auth', {
  inserted: function (el, bind) {
    let btnMap = store.getters.sesBtnAuthMap()
    let btnFlatMap = store.getters.sesBtnAuthFlatMap()
    let {pageName, id, prop} = bind.value
    if (id && btnFlatMap.includes(id) ) return
    if (!btnMap[pageName] || !btnMap[pageName].includes(`${pageName}:${prop}`)) {
      el.parentNode.removeChild(el)
    }
  }
})

Vue.mixin({
  methods: {
    hasAuth (btn = '', menu = '') {
      let flatMap = store.getters.sesBtnAuthFlatMap()
      if (flatMap.includes(btn)) return true
      let map = this.$state.sesBtnAuthMap()
      menu = menu || this.$route.name
      return map[menu] ? map[menu].includes(`${menu}:${btn}`) : false
    }
  }
})

Vue.prototype.$check = function (form) {
  let self = this
  return new Promise((resolve, reject) => {
    self.$refs[form].validate((valid) => {
      resolve(valid)
    })
  })
}

Vue.prototype.$c = function (key, fn, params) {
  if (fn === 'all') {
    return [{
      value: '',
      label: params || '全部'
    }].concat(Constant.getArray(key))
  } else {
    return Constant.getArray(key, fn)
  }
}

let http = axios.create()

http.cors = (url, params, loading, noErr) => {
  let baseURL = process.env.VUE_APP_APIURL
  return http.post(url, qs.stringify(params), {loading, noErr, baseURL})
}

// 添加请求拦截器
http.interceptors.request.use(function (request) {
  request.loading && store.dispatch('setLoading', true)
  return request
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  response.config.loading && store.dispatch('setLoading', false)

  switch (response.data.code) {
    case 200:
      break
    case 301:
      Vue.prototype.jump('/login')
      if (Vue.prototype.curDialog) Vue.prototype.curDialog.onClose()
      break
    default:
      !response.config.noErr && Vue.prototype.$message.error(response.data.msg || response.data.memo || response.data.message || '网络异常，请稍后再试...')
      break
  }
	return response.data
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error)
})

Vue.prototype.$http = http

Vue.prototype.$getComponentSize = function () {
  return window.innerWidth < 480 ? 'mini' : null
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')