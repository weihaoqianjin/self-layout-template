<template>
	<div id="app" v-loading="loading" element-loading-text="加载中" element-loading-background="rgba(255, 255, 255, 0.7)">
		<router-view></router-view>
	</div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      loading () {
        return this.$state.loading
      }
    },
    watch: {
      '$state.visitedViews' (val) {
        this.$dispatch('setVisitedTags',
          {
            visitedViews: this.$state.visitedViews,
            visitedFullPaths: this.$state.visitedFullPaths
          }
        )
      }
    },
    mounted () {
      this.userInfo = this.$state.sesUserInfo()
    }
  }
</script>
<style lang="scss">
  .el-notification {
    margin-top: 20px;
  }
</style>
