<template>
  <div class="app-firstmenu">
    <ul class="app-firstmenu__menus">
      <li class="menu__item " v-bind:class="{ active:index === current}"  v-for="(item, index) in menus"  :key="item.groupName" @click="changeMenu(index)" v-show="hideMenu(item.groupName)">
        {{item.groupName}}
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import hideMenuList from '@/config/menu.js'
export default {
  data () {
    return {
      current: 0
    }
  },
  computed: {
    menus () {
      return this.$state.menuGroups
    }
  },
  methods: {
    hideMenu (item) {
      return hideMenuList.indexOf(item) === -1
    },
    changeMenu (index, type) {
      this.$dispatch('setIsAllow', true)
      this.$nextTick(() => {
        this.current = index
        this.$dispatch('switchMenuGroup', index)
        this.$dispatch('setCurGroupIndex', index)
        let groups = this.$state.menuGroups
        let path = this.$state.menuGroups[index].link
        this.jump(path)
      })
    },
    switchFirstMenu (index) {
      this.current = index
      this.$dispatch('switchMenuGroup', index)
      this.$dispatch('setCurGroupIndex', index)
    }
  },
  mounted () {
    this.switchFirstMenu(this.$state.sesCurGroupIndex())
    this.Bus.$on('changeMenu', this.changeMenu)
    this.Bus.$on('switchFirstMenu', this.switchFirstMenu)
  }
}
</script>
<style lang="scss" scoped>
.app-firstmenu {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  outline: none;
  min-width: 865px;
}
.app-firstmenu__menus {
  .menu__item {
    display: inline-block;
    margin-left: 40px;
    cursor: pointer;
    color: #000000;
    text-decoration: none;
    font-family: "Microsoft YaHei UI Light";
    font-weight: bold;
    font-size: 14px;
  }
  .menu__item:hover{
    color: #121212bd
  }
  .active {
    font-size: 16px;
    border-bottom: 2px solid #000000
  }
}
.app-firstmenu__menus .menu__item:first-child {margin-left: -12px}
</style>
