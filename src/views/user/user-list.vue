<template>
  <div>
    用户列表
    <div>age: {{age}}</div>
  </div>
</template>
<script>
export default {
  name: 'user-list',
  props: ['age']
}
</script>
