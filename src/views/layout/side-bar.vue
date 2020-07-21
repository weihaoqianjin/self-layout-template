
<template>
  <hb-menu :list="menulist" router :default-active="$route.path" sign="path" label="label" v-show="isSingleNode" width="180px" />
</template>

<script>
// import { mapGetters } from 'vuex'
// import SidebarItem from './sidebar-item'
export default {
  name: 'sidebar',
  computed: {
    // menulist () {
    //   let groups = this.$state.sesUserAuthTree()
    //   let index = this.$state.curGroupIndex
    //   let menu = groups[index]
    //   return menu.children
    // }
  },
  watch: {
    '$state.curGroupIndex': function (val) {
      let groups = this.$state.sesUserAuthTree()
      this.menulist = groups[val].children || []
    }
  },
  data () {
    return {
      menulist: []
    }
  },
  methods: {
    isSingleNode () {
      return this.$state.menuGroups[this.$state.sesCurGroupIndex()].singleNode
    }
  }
}
</script>
<style>
 .single-node{
   opacity: 0;
 }
</style>
