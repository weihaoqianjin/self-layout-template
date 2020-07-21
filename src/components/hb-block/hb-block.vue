<template>
  <div class="font-14 flex-middle">
    <span :class="{'inline-block': true, 'text-justify': justify}" :style="'width:' + width">{{label}}</span>
    <span v-show="colon" class="mpl-2">:</span>
    <span class="pl-1 word-break"><slot/></span>
    <span :class="suffixClass">{{suffix}}</span>
  </div>
</template>
<script>
export default {
  name: 'hb-block',
  props: {
    label: String,
    width: String,
    justify: Boolean,
    colon: Boolean,
    suffix: String,
    suffixClass: {
      type: String,
      default: 'mpl-3'
    }
  }
}
</script>
<style scoped>
  .inline-block {
    display: inline-block;
  }
  .text-justify {
    text-align-last: justify
  }
  .word-break {word-break: break-all}
</style>
