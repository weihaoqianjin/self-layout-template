<template>
  <div class="flex-midbetween hb-title-bar" :class="padding">
    <div>{{title}}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'hb-title-bar',
  props: {
    title: String,
    padding: {
      type: String,
      default: 'p-3'
    }
  }
}
</script>
<style scoped>
  .hb-title-bar {
    background-color: #f4f4f4;
    font-weight: bold;
    color: #8a8787;
  }
</style>
