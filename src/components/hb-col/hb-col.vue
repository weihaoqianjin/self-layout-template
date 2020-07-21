<template>
  <el-col :md="md" :sm="sm" :xs="xs" class="mb-2" :offset="offset"><slot /></el-col>
</template>
<script>
export default {
  name: 'hb-col',
  props: {
    md: {
      type: Number,
      default: 6
    },
    sm: {
      type: Number,
      default: 8
    },
    xs: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    }
  }
}
</script>