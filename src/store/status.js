const state = {
    loading: false,
    sidebar: {
        opened: true
    },
    isAllow: false
}

const getters = {
    loading: state => state.loading,
    sidebar: state => state.sidebar,
    isAllow: state => state.isAllow
}

const actions = {
    setIsAllow ({commit}, data) {
        commit('SET_IS_ALLOW', data)
    },
    setLoading ({commit}, data) {
        commit('SET_LOADING', data)
    },
    setSideBarStatus ({commit}, data) {
        commit('SET_SIDEBAR_STATUS', data)
    }
}

const mutations = {
    SET_IS_ALLOW (state, payload) {
        state.isAllow = payload
    },
    SET_LOADING (state, payload) {
        state.loading = payload
    },
    SET_SIDEBAR_STATUS (state, payload) {
        state.sidebar.opened = payload
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}
