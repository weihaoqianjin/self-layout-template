import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu'
import session from './session'
import status from './status'
import tag from './tag'

Vue.use(Vuex)
let modules = [menu, session, status, tag]
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
})

export default store
