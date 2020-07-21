<template>
  <div>
    <div v-for="item of menulist" :key="item[sign]">
      <div v-if="item.children && item.children.length">
        <div  class='hb-menu-item hb-menu-item__title' :style="{'font-size': item.level === 1 ? '18px' : '', 'padding-left': $menuRoot.distance * item.level + 'px'}" @click="collapseMenu(item)">
          <div>{{item[label]}}</div>
          <i class="hb-menu-arrow el-icon-arrow-down" :class="{'hb-menu-rotate': item.isCollapse}"></i>
        </div>
        <hb-menu-collapse-transition>
          <hb-menu-item :menulist="item.children" v-show="!item.isCollapse"/>
        </hb-menu-collapse-transition>
      </div>
      <div v-else @click="toPath(item)" class="hb-menu-item hb-menu-item__name"
        :class="{
          'hb-submenu-item': item.level !== 1,
          'menuActive': ($menuRoot.activeMenu === item[sign]) && (item.level === 1),
          'submenuActive': ($menuRoot.activeMenu === item[sign]) && (item.level !== 1)
        }"
        :style="{'font-size': item.level === 1 ? '18px' : '','padding-left': $menuRoot.distance * item.level + 'px'}">
          {{item[label]}}
      </div>
    </div>
  </div>
</template>

<script>
import hbMenuCollapseTransition from './hb-menu-collapse-transition.vue'

export default {
  name: 'hb-menu-item',
  components: {hbMenuCollapseTransition},
  inject: ['$menuRoot'],
  props: {
    menulist: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    sign: function () {
      return this.$menuRoot.sign
    },
    label: function () {
      return this.$menuRoot.label
    }
  },
  watch: {
    '$menuRoot.defaultActive' (val) {
      this.setDefaultActiveMenu(val)
    }
  },
  methods: {
    collapseMenu (item) {
      item.isCollapse = !item.isCollapse
      if (!item.isCollapse) this.uniqueOpenedCollapseMenu(item)
    },
    // 判断是否启用uniqueOpened模式下的菜单折叠方法
    uniqueOpenedCollapseMenu (item) {
      if (this.$menuRoot.uniqueOpened && (this.menulist.length > 1)) this.collapseOtherMenu(item)
    },
    collapseOtherMenu (item) {
      this.collapseAllMenu(this.$menuRoot.menulist)
      // 展开当前操作节点及他所有的上级节点
      let node = item
      while (node) {
        node.isCollapse = false
        node = node.parent
      }
    },
    // 折叠所有菜单
    collapseAllMenu (list = []) {
      for (let item of list) {
        item.isCollapse = true
        if (item.children && item.children.length) this.collapseAllMenu(item.children)
      }
    },
    toPath (item) {
      this.$menuRoot.activeMenu = item[this.sign]
      this.uniqueOpenedCollapseMenu(item)
      if (this.$menuRoot.router) this.$router.push(item.path || item.sign)
      this.$menuRoot.clickMenu(item)
    },
    setDefaultActiveMenu (menu) {
      if (!menu) return
      let node = null
      for (let item of this.menulist) {
        if (this.$menuRoot.menuLevelMap[menu] !== item.level) break
        if (item[this.sign] === menu) {
          node = item
          break
        }
      }

      this.uniqueOpenedCollapseMenu(node)

      while (node) {
        node.isCollapse = false
        node = node.parent
      } 

      this.$menuRoot.activeMenu = menu

    }
  },
  mounted () {
    this.setDefaultActiveMenu(this.$menuRoot.defaultActive)
  }
}
</script>

<style lang="scss" scoped>
  // 菜单激活文字颜色
  $activeTextColor: #318dd2;
  // 根级节点菜单鼠标悬停/激活背景色
  $rootMenuBackgroundColor: #1f2d3d;
  // 叶子节点菜单鼠标悬停/激活背景色
  $subMenuBackgroundColor: #001528;
  // 父级菜单鼠标悬停背景色
  $mainMenuBackgroundColor: #263445;
  .hb-menu-arrow {
    transition: transform .3s;
  }
  .hb-menu-rotate {
    transform: rotate(180deg)
  }

  .hb-menu-item__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hb-menu-item__title:hover {
    background: $mainMenuBackgroundColor;
  }

  .hb-menu-item {
    height: 46px;
    line-height: 46px;
    padding: 0 20px;
    cursor: pointer;
  }
 
  .menuActive, .hb-menu-item__name:hover {
    color: $activeTextColor;
    background-color: $rootMenuBackgroundColor;
  }
  .hb-submenu-item {
    background-color: $rootMenuBackgroundColor;
  }
  .submenuActive, .hb-submenu-item:hover {
    color: $activeTextColor;
    background-color: $subMenuBackgroundColor;
  }
</style>