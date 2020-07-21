const state = {
  menuGroups: [],
  curGroupName: '',
  curGroupIndex: 0,
  cachedViews: [],
  originMenuGroups: [],
  routerMap: [],
  routerTree: [],
  originRouterMap: [],
  messageNum: 0
}

const getters = {
  messageNum: state => state.messageNum,
  originRouterMap: state => state.originRouterMap,
  routerTree: state => state.routerTree,
  routerMap: state => state.routerMap,
  cachedViews: state => state.cachedViews,
  menuGroups: state => state.menuGroups,
  originMenuGroups: state => state.originMenuGroups,
  curGroupName: (state) => {
    let name = ''
    state.menuGroups.forEach(item => {
      if (item.selected) name = item.groupName
    })
    return name || state.menuGroups[0].groupName
  },
  curGroupIndex: state => state.curGroupIndex
}

const actions = {
  setMessageNum ({commit}, data) {
    commit('SET_MESSAGE_NUM', data)
  },
  setOriginRouterMap ({commit}, data) {
    commit('SET_ORIGIN_ROUTER_MAP', data)
  },
  setRouterTree ({commit}, data) {
    commit('SET_ROUTER_TREE', data)
  },
  setRouterMap ({commit}, data) {
    commit('SET_ROUTER_MAP', data)
  },
  setMenuGroups ({commit}, data) {
    commit('SET_MENU_GROUPS', data)
  },
  switchMenuGroup ({commit}, data) {
    commit('SWITCH_MENU_GROUP', data)
  },
  setMenuGroupLink ({commit}, data) {
    commit('SET_MENU_GROUP_LINK', data)
  },
  setCachedViews ({commit}, data) {
    commit('SET_CACHED_VIEWS', data)
  },
  setOriginMenuGroups ({commit}, data) {
    commit('SET_ORIGIN_MENU_GROUPS', data)
  }
}

const mutations = {
  SET_MESSAGE_NUM (state, payload) {
    state.messageNum = payload
  },
  SET_ORIGIN_ROUTER_MAP (state, payload) {
    state.originRouterMap = payload
  },
  SET_ROUTER_TREE (state, payload) {
    state.routerTree = payload
  },
  SET_ROUTER_MAP (state, payload) {
    state.routerMap = payload
  },
  SET_MENU_GROUPS (state, payload) {
    state.menuGroups = payload
  },
  SWITCH_MENU_GROUP (state, payload) {
    for (let i = 0; i < state.menuGroups.length; i++) {
      let item = state.menuGroups[i]
      if (payload === i) {
        item.selected = true
        state.curGroupIndex = i
      } else {
        item.selected = false
      }
    }
  },
  SET_MENU_GROUP_LINK (state, payload) {
    for (let i = 0; i < state.menuGroups.length; i++) {
      if (state.menuGroups[i].groupName === payload.groupName) {
        state.menuGroups[i].link = payload.link
        break
      }
    }
  },
  SET_CACHED_VIEWS (state, payload) {
    state.cachedViews = payload
  },
  SET_ORIGIN_MENU_GROUPS (state, payload) {
    state.originMenuGroups = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
