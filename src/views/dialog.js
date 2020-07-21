import {snake2Camel, camel2Snake} from '@/utils/String'
import Vue from 'vue'

// 获取需要动态创建的弹窗组件
const dialogsContext = require.context('./', true, /@([a-zA-Z\-0-9]+)\.vue$/, 'lazy')
const dialogs = dialogsContext.keys().reduce((views, key) => {
  const fileName = key.match(/@([a-zA-Z\-0-9]+)\.vue$/i)[1]
  if (!fileName) return views
  let componentName = camel2Snake(fileName)
  let clsName = snake2Camel(componentName)
  return Object.assign(views, {[clsName]: key})
}, {})

async function createDialogAsync (path, data) {
  let componentContext = await dialogsContext(path)
  let temp = componentContext.default
  return new Promise(function (resolve, reject) {
    // 初始化配置参数
    let opt = {
      data
    }
    let component = Object.assign({}, temp)
    // const parent = this
    let initData = {
      visible: true
    }
    Object.assign(initData, component.data())
    opt.data && Object.assign(initData, JSON.parse(JSON.stringify(opt.data)))
    component.data = function () {
      return initData
    }
    // 创建构造器创建实例挂载
    let DialogC = Vue.extend(component)
    let dialog = new DialogC()
    Vue.prototype.curDialog = dialog
    // 关闭事件
    let _onClose = dialog.$options.methods.onClose
    dialog.onClose = function () {
      resolve()
      dialog.$destroy()
      _onClose && _onClose.call(dialog)
      document.body.removeChild(dialog.$el)
    }
    // 回调事件
    let _onCallback = dialog.$options.methods.onCallback
    dialog.onCallback = function (...arg) {
      try {
        _onCallback && _onCallback()
        resolve(...arg)
        dialog.$destroy()
        _onClose && _onClose.call(dialog)
        document.body.removeChild(dialog.$el)
      } catch (e) {
        console.log(e)
      }
    }
    dialog.$mount()
    dialog.$watch('visible', function (n, o) {
      dialog === false && dialog.onClose()
    })
    document.body.appendChild(dialog.$el)
  })
}
function init (values) {
  let dialogComponents = {}
  if (!values) return
  Object.keys(values).forEach((name) => {
    dialogComponents[name] = function (data) {
      return createDialogAsync.call(this, values[name], data)
    }
  })
  return dialogComponents
}

Vue.prototype.$dialog = init(dialogs)
