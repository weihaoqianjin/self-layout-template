<template>
  <div class="navbar-bread">
    <div class="crumb">
      <span v-for="(item, index) in $route.meta.bread" :key="index">
        <span :class="{ 'breadcrumb-active': index === ($route.meta.bread.length - 1)}">{{item}}</span>
        <span v-show="index < ($route.meta.bread.length - 1)"><i class="el-icon-arrow-right" /></span>
      </span>
    </div>
    <Avatar />
  </div>
</template>
<script>
import Avatar from './avatar'

export default {
  components: {
    Avatar
  },
  watch: {
    '$route' () {
      this.$route.meta.bread
    }
  }
}
</script>