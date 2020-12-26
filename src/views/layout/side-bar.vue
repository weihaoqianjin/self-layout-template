
<template>
  <hb-menu :list="menulist" router :default-active="$route.path" sign="path" label="label" width="180px" />
</template>

<script>
export default {
  name: 'sidebar',
  watch: {
    '$state.curGroupIndex': function (val) {
      this.changeGroupIndex(val)
    }
  },
  data () {
    return {
      menulist: []
    }
  },
  methods: {
    changeGroupIndex (val) {
      let groups = this.$state.sesUserAuthTree()
      this.menulist = groups[val] ? groups[val].children || [] : []
    }
  },
  mounted () {
    this.changeGroupIndex(0)
  }
}
</script>
<style>
 .single-node{
   opacity: 0;
 }
</style>
