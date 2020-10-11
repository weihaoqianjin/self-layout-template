<template>
  <panel class="homepage">
    <el-button @click="jump('/user/user-list/77')">go</el-button>
    <el-button v-if="hasAuth('fixer-list:add')" style="color: red">hasAuth测试</el-button>
    <el-button v-auth="{id: 'fixed-list-delete'}" style="color: red">v-auth测试</el-button>
    <hb-menu  :list="dataList" sign="name" @clickMenu="toPath"/>
  </panel>
</template>
<script>

export default {
  name: 'index',
  data () {
    return {
      dataList: [
        {
          name: '菜单1'
        },
        {
          name: '菜单2',
          children: [
            {name: '菜单2-1'},
            {name: '菜单2-2'}
          ]
        },
        {
          name: '菜单3',
          children: [
            {name: '菜单3-1', children: [{name: '菜单3-1-1'}]},
            {name: '菜单3-2', children: [{name: '菜单3-2-1'}]},
          ]
        },
        {
          name: '菜单4',
          children: [
            {name: '菜单4-1', children: [{name: '菜单4-1-1', children: [{name: '菜单4-1-1-1'}]}]}
          ]
        }
      ],
      isShow: true,
      isCollapse: true,
      fruit: ''
    }
  },
  methods: {
    toPath (item) {
      // console.log(item)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
  .hb-collapse {
    transition:.3s height ease-in-out,.3s padding-top ease-in-out,.3s padding-bottom ease-in-out
  }
  .block {
    width: 500px;
    height: 100px;
    background: lightgreen;
  }
</style>