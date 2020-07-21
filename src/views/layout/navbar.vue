<template>
  <div class="navbar">
    <div class="navbar__menu">
      <first-menu></first-menu>
      <avatar />
    </div>
  </div>
</template>

<script>
import FirstMenu from './first-menu'
import Avatar from './avatar'
export default {
  components: {
    FirstMenu,
    Avatar
  }
}
</script>
