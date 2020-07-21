<template>
    <el-scrollbar>
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view/>
        </keep-alive>
      </transition>
    </el-scrollbar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'main-area',
  computed: {
    cachedViews () {
      return this.$state.cachedViews
    },
    ...mapGetters(['curGroupName'])
  }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
