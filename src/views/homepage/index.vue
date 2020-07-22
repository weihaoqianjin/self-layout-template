<template>
  <panel class="homepage">
    <hb-menu :list="dataList" sign="name" @clickMenu="toPath"/>
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