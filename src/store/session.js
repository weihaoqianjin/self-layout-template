const state = {
  userInfo: {},
  curGroupIndex: 0,
  historyMenuGroupsLink: [],
  filterMenuGroups: null,
  filterRouterMap: null,
  routerModelMap: null,
  adminId: '',
  partnerId: '',
  menuGroupIndexMap: {},
  userAuthTree: [],
  btnAuthMap: {},
  visitedTags: {
    visitedViews: [],
    visitedFullPaths: []
  },
}

function getSessionData (sign, bake) {
  return sessionStorage.getItem(sign) ? JSON.parse(sessionStorage.getItem(sign)) : bake
}

const getters = {
  sesVisitedTags: state => () => { return {
    visitedViews: getSessionData('visitedViews', state.visitedTags.visitedViews),
    visitedFullPaths: getSessionData('visitedViews', state.visitedTags.visitedFullPaths)
  } },
  sesBtnAuthMap: state => () => { return sessionStorage.getItem('btnAuthMap') ? JSON.parse(sessionStorage.getItem('btnAuthMap')) : state.btnAuthMap },
  sesUserAuthTree: state => () => { return sessionStorage.getItem('userAuthTree') ? JSON.parse(sessionStorage.getItem('userAuthTree')) : state.userAuthTree },
  sesMenuGroupIndexMap: state => () => { return sessionStorage.getItem('menuGroupIndexMap') ? JSON.parse(sessionStorage.getItem('menuGroupIndexMap')) : state.menuGroupIndexMap },
  sesPartnerId: state => () => { return sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).partnerId : state.partnerId },
  sesAdminId: state => () => { return sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).adminId : state.adminId },
  sesRouterModelMap: state => () => { return sessionStorage.getItem('routerModelMap') || state.routerModelMap },
  sesFilterRouterMap: state => () => { return sessionStorage.getItem('filterRouterMap') || state.filterRouterMap },
  sesFilterMenuGroups: state => () => { return sessionStorage.getItem('filterMenuGroups') || state.filterMenuGroups },
  sesUserInfo: state => () => { return sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : state.userInfo },
  sesCurGroupIndex: state => () => {
    if (sessionStorage.getItem('curGroupIndex') !== null) {
      return Number(sessionStorage.getItem('curGroupIndex'))
    } else {
      return state.curGroupIndex
    }
  },
  sesHistoryMenuGroupsLink: state => () => { return JSON.parse(sessionStorage.getItem('historyMenuGroupsLink')) || state.historyMenuGroupsLink }
}

const actions = {
  setVisitedTags ({}, data) {
    sessionStorage.setItem('visitedViews', JSON.stringify(data.visitedViews))
    sessionStorage.setItem('visitedFullPaths', JSON.stringify(data.visitedFullPaths))
  },
  setBtnAuthMap ({}, data) {
    sessionStorage.setItem('btnAuthMap', data)
  },
  setUserAuthTree ({}, data) {
    data = JSON.parse(data)
    data = JSON.stringify(data)
    sessionStorage.setItem('userAuthTree', data)
  },
  setMenuGroupIndexMap ({}, data) {
    sessionStorage.setItem('menuGroupIndexMap', data)
  },
  setRouterModelMap ({}, data) {
    sessionStorage.setItem('routerModelMap', data)
  },
  setFilterRouterMap ({}, data) {
    sessionStorage.setItem('filterRouterMap', data)
  },
  setFilterMenuGroups ({}, data) {
    sessionStorage.setItem('filterMenuGroups', data)
  },
  setCurPath ({}, data) {
    sessionStorage.setItem('curPath', data)
  },
  setCurGroupIndex ({}, data) {
    sessionStorage.setItem('curGroupIndex', data)
  },
  setUserInfo ({}, data) {
    sessionStorage.setItem('userInfo', data)
  },
  initHistoryMenuGroupsLink ({}, data) {
    sessionStorage.setItem('historyMenuGroupsLink', JSON.stringify(data))
  },
  setHistoryMenuGroupsLink ({}, data) {
    let historyMenuGroupsLink = JSON.parse(sessionStorage.getItem('historyMenuGroupsLink'))
    historyMenuGroupsLink[data.index].link = data.link
    sessionStorage.setItem('historyMenuGroupsLink', JSON.stringify(historyMenuGroupsLink))
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
