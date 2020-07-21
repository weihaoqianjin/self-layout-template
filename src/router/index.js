import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import HomepageGroup from './homepage'
import UserGroup from './user'
import StatisticsGroup from './statistics'

// 菜单组路由
const MenuGroup = [HomepageGroup, UserGroup, StatisticsGroup]
Vue.use(Router)
// 基础路由表
let routerMap = [
  {
    path: '/login',
    component: () => import('@/single-page/Login.vue'),
    name: 'login',
    hidden: true,
    meta: {singlePage: true}
  },
  {
    path: '/404',
    component: () => import('@/single-page/404.vue'),
    name: 'notfound',
    hidden: true
  },
  {
    path: '/homepage',
    redirect: { path: '/homepage/index' }
  },
  {
    path: '/',
    redirect: { path: '/login' }
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

// 处理单个菜单组路由信息
function createGroupRouter (group) {
  function handleMenu (menu = [], group = {}, path = '', parent = null, ret = []) {
    if (!menu.length) return []
    for (let subMenu of menu) {
      let meta = {}
      if (subMenu.meta) {
        meta = {
          limitedEntry: subMenu.limitedEntry || [],
          // 1隐藏菜单不需要填充id数据;2若菜单无id，则自动取全路径作为id
          id: !subMenu.hidden && (subMenu.id || (path ? `${path}/${subMenu.path}` : `${subMenu.path}`)),
          bread: [],
          fullpath: path ? `${path}/${subMenu.path}` : `${subMenu.path}`,
          groupName: group.groupName,
          groupId: group.groupId
        }

        if (group.singleNode) {
          meta.bread = [group.groupName]
        } else if (parent && parent.meta) {
          meta.bread = [...parent.meta.bread, subMenu.meta.title]
        } else {
          meta.bread = [group.groupName]
          if (subMenu.meta) meta.bread.push(subMenu.meta.title)
        }
      }
      
      let node = Object.assign({}, subMenu)
      node.singleNode = !!group.singleNode
      node.groupName = group.groupName
      node.groupId = group.groupId
      node.children = []
      if (subMenu.meta) {
        node.meta = Object.assign({}, subMenu.meta, meta)
        if (!subMenu.hidden) node.id = node.meta.id
      }
      if (subMenu.children && subMenu.children.length) handleMenu(subMenu.children, group, node.path, node, node.children)
      ret.push(node)
    }
    return ret
  }

  group.routes = handleMenu(group.routes, group)
}

// 构建权限树
function buildAuthTree (tree = [], arr = []) {
  if (!tree.length) return []
  for (let item of tree) {
    if (item.singleNode) {
      let childNode = item.routes[0].children[0]
      arr.push({
        id: item.id,
        label: childNode.meta.title,
        name: childNode.name || '',
        path: item.link,
        bread: childNode.meta.bread,
        children: [],
        type: 'menu'
      })
      continue
    }

    if (!item.meta && !item.link) {
      buildAuthTree(item.children, arr)
      continue
    }

    if (!item.id) continue

    let node = {
      id: item.id,
      label: item.link ? item.groupName : item.meta.title,
      name: item.name || '',
      path: item.link || item.meta.fullpath,
      bread: item.link ? [item.groupName] : item.meta.bread,
      children: []
    }
    arr.push(node)
    if (item.auth) {
      for (let btn of item.auth) {
        btn.id = btn.id || (item.name + btn.prop)
      }
      node.auth = item.auth
    }
    if ((item.children && item.children.length) || (item.routes && item.routes.length)) buildAuthTree(item.children || item.routes, node.children)
  }
  return arr
}

// 获取一级菜单绑定的页面地址
function setFirstMenuLink (menu = [], group = {}) {
  if (!menu.length) return
  if (group.singleNode) {
    group.link = menu[0].children[0].meta.fullpath
    return
  }
  for (let item of menu) {
    if (group.link) break
    if (item.id && !item.hidden && item.children && !item.children.length) {
      group.link = item.meta.fullpath
    }
    if (item.children && item.children.length) setFirstMenuLink (item.children, group)
  }
}

// 初始化缓存菜单数组
function initCachedMenu (menu = [], cachedMenu = []) {
  if (!menu.length) return
  for (let item of menu) {
    if (item.children && item.children.length) initCachedMenu(item.children, cachedMenu)
    if (item.meta && item.meta.cached) cachedMenu.push(item.name)
  }
  return cachedMenu
}

// 合并所有菜单组路由并记录相关信息
MenuGroup.forEach((item, index) => {
  createGroupRouter(item)
  routerMap = [...routerMap, ...item.routes]
  setFirstMenuLink(item.routes, item)
})


// 创建路由实例
let router = new Router({
  routes: routerMap
})
let cachedViews = []
let routerTree = buildAuthTree([...MenuGroup])

store.dispatch('setRouterTree', routerTree)

let groups = MenuGroup.map((item, index) => {
  initCachedMenu(item.routes, cachedViews)  
  return {
    selected: !index,
    groupName: item.groupName,
    link: item.link,
    singleNode: !!item.singleNode
  }
})


store.dispatch('setOriginRouterMap', routerMap)
store.dispatch('setRouterMap', routerMap)
store.dispatch('setCachedViews', cachedViews)
store.dispatch('setMenuGroups', groups)
store.dispatch('setOriginMenuGroups', JSON.clone(groups))
// 浏览器手动刷新时初始化相关信息
if (store.getters.sesFilterRouterMap()) {
  store.dispatch('setRouterMap', JSON.parse(store.getters.sesFilterRouterMap()))
  store.dispatch('setMenuGroups', JSON.parse(store.getters.sesFilterMenuGroups()))
  store.dispatch('initVisitedTags', store.getters.sesVisitedTags())
}
export default router
