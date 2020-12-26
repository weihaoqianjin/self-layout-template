<template>
  <div class="app-wrapper flex-column">
    <menu-drawer :is-visiable="drawer" />
    <div class="flex header-block mobile__fixed">
      <div class="media-show mt-2 ml-2">
        <hamburger class="hamburger-container" :toggleClick="toggleDrawer" :isActive="drawer"></hamburger>
      </div>
      <navbar class="nav media-hidden"/>
    </div>
    <bread-crumb class="media-show" />
    <div class="flex main-block">
      <side-bar class="sidebar-container media-hidden"></side-bar>
      <div class="main-container">
        <tags-view class="media-hidden"/>
        <main-area class="main-area"></main-area>
      </div>
    </div>
  </div>
</template>
<script>
import SideBar from './side-bar'
import MainArea from './main-area'
import Navbar from './navbar'
import BreadCrumb from './bread-crumb'
import TagsView from './tags-view'
import MenuDrawer from './drawer'
import Hamburger from './hamburger'
export default {
  name: 'layout',
  components: {
    SideBar,
    MainArea,
    Navbar,
    BreadCrumb,
    TagsView,
    MenuDrawer,
    Hamburger
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  },
  mounted () {
    this.Bus.$on('toggleDrawer', this.toggleDrawer)
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestory () {
  },
  destroyed () {
  }
}
</script>
