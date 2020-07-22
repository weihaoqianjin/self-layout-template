
<template>
  <hb-menu :list="menulist" router :default-active="$route.path" sign="path" label="label" v-show="isSingleNode" width="180px" />
</template>

<script>
export default {
  name: 'sidebar',
  watch: {
    '$state.curGroupIndex': function (val) {
      let groups = this.$state.sesUserAuthTree()
      this.menulist = groups[val] ? groups[val].children || [] : []
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
