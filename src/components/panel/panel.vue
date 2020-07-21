<template>
  <div :class='[padding, pb0 && "pb-0"]'>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'panel',
  props: {
    padding: {
      type: String,
      default: 'p-2'
    },
    pb0: Boolean
  }
}
</script>
