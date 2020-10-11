const state = {
    visitedViews: [],
    visitedFullPaths: []
}

const getters = {
    visitedViews: state => state.visitedViews,
    visitedFullPaths: state => state.visitedFullPaths
}

const actions = {
    initVisitedTags ({commit}, data) {
        commit('INIT_VISITED_TAGS', data)
    },
    addVisitedViews ({commit}, data) {
        commit('ADD_VISITED_VIEWS', data)
    },
    delVisitedViews ({commit}, data) {
        commit('DEL_VISITED_VIEWS', data)
        return Promise.resolve([...state.visitedViews])
    },
    clearVisitedViews ({commit}) {
        commit('CLEAR_VISITED_VIEWS')
    }
}

const mutations = {
    INIT_VISITED_TAGS (state, payload) {
        state.visitedViews = JSON.parse(payload.visitedViews)
        state.visitedFullPaths = JSON.parse(payload.visitedFullPaths)
    },
    ADD_VISITED_VIEWS (state, payload) {
        let indexMap = sessionStorage.getItem('menuGroupIndexMap') || {}
        let views = {}
        views.title = payload.meta.title
        views.fullPath = payload.fullPath
        views.path = payload.path
        views.groupIndex = indexMap[payload.meta.groupName]
        views.groupName = payload.meta.groupName
        state.visitedFullPaths.push(views.fullPath)
        state.visitedViews.push(views)
    },
    DEL_VISITED_VIEWS (state, payload) {
        state.visitedFullPaths = state.visitedFullPaths.filter(v => v !== payload.fullPath)
        state.visitedViews = state.visitedViews.filter(v => v.fullPath !== payload.fullPath)
    },
    CLEAR_VISITED_VIEWS (state) {
        state.visitedViews = []
        state.visitedFullPaths = []
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}
