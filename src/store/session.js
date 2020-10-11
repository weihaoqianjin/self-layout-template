function getSessionData (sign, bake) {
  return sessionStorage.getItem(sign) ? JSON.parse(sessionStorage.getItem(sign)) : (bake || state[sign])
}

function setSessionData (sign, data) {
  sessionStorage.setItem(sign, JSON.stringify(data))
}

const state = {
  userInfo: {},
  curGroupIndex: 0,
  historyMenuGroupsLink: [],
  filterMenuGroups: null,
  filterRouterMap: null,
  routerModelMap: null,
  menuGroupIndexMap: {},
  userAuthTree: [],
  btnAuthMap: {},
  btnAuthFlatMap: {},
  visitedTags: {
    visitedViews: [],
    visitedFullPaths: []
  },
}

const getters = {
  sesVisitedTags: state => () => {
    let ret1 = {
      visitedViews: getSessionData('visitedViews', state.visitedTags.visitedViews),
      visitedFullPaths: getSessionData('visitedViews', state.visitedTags.visitedFullPaths)
    }
    
    return {
      visitedViews: getSessionData('visitedViews', state.visitedTags.visitedViews),
      visitedFullPaths: getSessionData('visitedViews', state.visitedTags.visitedFullPaths)
    }
  },
  sesBtnAuthFlatMap: state => () => { return getSessionData('btnAuthFlatMap') },
  sesBtnAuthMap: state => () => { return getSessionData('btnAuthMap') },
  sesUserAuthTree: state => () => { return getSessionData('userAuthTree') },
  sesMenuGroupIndexMap: state => () => { return getSessionData('menuGroupIndexMap') },
  sesRouterModelMap: state => () => { return getSessionData('routerModelMap') },
  sesFilterRouterMap: state => () => { return getSessionData('filterRouterMap') },
  sesFilterMenuGroups: state => () => { return getSessionData('filterMenuGroups') },
  sesUserInfo: state => () => { return getSessionData('userInfo') },
  sesCurGroupIndex: state => () => {
    if (sessionStorage.getItem('curGroupIndex') !== null) {
      return Number(sessionStorage.getItem('curGroupIndex'))
    } else {
      return state.curGroupIndex
    }
  },
  sesHistoryMenuGroupsLink: state => () => { return getSessionData('historyMenuGroupsLink') }
}

const actions = {
  setVisitedTags ({}, data) {
    setSessionData('visitedViews', JSON.stringify(data.visitedViews))
    setSessionData('visitedFullPaths', JSON.stringify(data.visitedFullPaths))
  },
  setBtnAuthMap ({}, data) {
    setSessionData('btnAuthMap', data)
  },
  setBtnAuthFlatMap ({}, data) {
    setSessionData('btnAuthFlatMap', data)
  },
  setUserAuthTree ({}, data) {
    setSessionData('userAuthTree', data)
  },
  setMenuGroupIndexMap ({}, data) {
    setSessionData('menuGroupIndexMap', data)
  },
  setRouterModelMap ({}, data) {
    setSessionData('routerModelMap', data)
  },
  setFilterRouterMap ({}, data) {
    setSessionData('filterRouterMap', data)
  },
  setFilterMenuGroups ({}, data) {
    setSessionData('filterMenuGroups', data)
  },
  setCurPath ({}, data) {
    setSessionData('curPath', data)
  },
  setCurGroupIndex ({}, data) {
    setSessionData('curGroupIndex', data)
  },
  setUserInfo ({}, data) {
    setSessionData('userInfo', data)
  },
  initHistoryMenuGroupsLink ({}, data) {
    setSessionData('historyMenuGroupsLink', data)
  },
  setHistoryMenuGroupsLink ({}, data) {
    let historyMenuGroupsLink = getSessionData('historyMenuGroupsLink')
    historyMenuGroupsLink[data.index].link = data.link
    setSessionData('historyMenuGroupsLink', historyMenuGroupsLink)
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
