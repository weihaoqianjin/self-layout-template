<template>
  <el-drawer :visible.sync="isVisiable" direction="ltr" :with-header="false" size="60%" id="menuDrawer" @close="Bus.$emit('toggleDrawer')">
    <el-scrollbar style="height: 100%">
      <el-menu
          mode="vertical"
          :default-active="$route.meta.id"
          :show-timeout="200"
          background-color="#304156"
          text-color="#ffffff"
          unique-opened
          active-text-color="#318dd2">
          <div v-for="(item, index) in menus" :key="index">
            <el-menu-item :index="item.id" v-if="item.children && !item.children.length" @click="jump(item.path)">{{item.label}}</el-menu-item>
            <el-submenu :index="item.id" v-else>
              <span slot="title">{{item.label}}</span>
              <div v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item :index="subItem.id" v-if="subItem.children && !subItem.children.length" @click="jump(subItem.path)">{{subItem.label}}</el-menu-item>
                <el-submenu :index="subItem.id" v-else>
                  <span slot="title">{{subItem.label}}</span>
                  <el-menu-item v-for="ssubItem in subItem.children" :key="ssubItem.id" :index="ssubItem.id" @click="jump(ssubItem.path)">{{ssubItem.label}}</el-menu-item>
                </el-submenu>
              </div>
            </el-submenu>
          </div>
      </el-menu>
    </el-scrollbar>
  </el-drawer>
</template>
<script>

export default {
  name: 'drawer',
  props: {
    isVisiable: Boolean
  },
  computed: {
    menus () {
      let menus = this.filterBtn(this.$state.sesUserAuthTree())
      return menus
    }
  },
  methods: {
    filterBtn (menus = [], arr = []) {
      if (!menus.length) return []
      for (let i = 0; i < menus.length; i++) {
        // if (tempMenu.includes(menus[i].label)) continue
        let temp = {
          id: menus[i].id,
          label: menus[i].label,
          path: menus[i].path,
          children: []
        }
        arr.push(temp)
        if (menus[i].children && menus[i].children.length && !menus[i].children[0].prop) this.filterBtn(menus[i].children, temp.children)
      }
      return arr
    }
  }
}
</script>
<style lang="scss">
  #menuDrawer {
    z-index: 1000;
    .el-drawer__body {height: 100%;background: #304156;}
    .el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;margin-right: -18px !important}
  }
</style>