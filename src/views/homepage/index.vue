<template>
  <panel class="homepage">
    <hb-menu :list="dataList" sign="name" @clickMenu="toPath"/>
    <!-- <el-button @click="collapse">测试</el-button>
    <hb-menu-collapse-transition>
      <div class="block" ref="tDom" v-show="isCollapse"></div>
    </hb-menu-collapse-transition> -->
  </panel>
</template>
<script>

export default {
  name: 'index',
    components: {
      'hb-menu-collapse-transition': {
        functional: true,
        render(createElement, context) {
          const data = {
            props: {
              mode: 'out-in',
              duration: '300',
            },
            on: {
              beforeEnter(el) {

                el.classList.add('hb-collapse')
                if (!el.dataset) el.dataset = {}
                el.dataset.oldPaddingTop = el.style.paddingTop
                el.dataset.oldPaddingBottom = el.style.paddingBottom

                el.style.height = '0'
                el.style.paddingTop = 0
                el.style.paddingBottom = 0
              },

              enter(el) {
                el.dataset.oldOverflow = el.style.overflow
                if (el.scrollHeight !== 0) {
                  el.style.height = el.scrollHeight + 'px'
                  el.style.paddingTop = el.dataset.oldPaddingTop
                  el.style.paddingBottom = el.dataset.oldPaddingBottom
                } else {
                  el.style.height = ''
                  el.style.paddingTop = el.dataset.oldPaddingTop
                  el.style.paddingBottom = el.dataset.oldPaddingBottom
                }

                el.style.overflow = 'hidden'
              },

              afterEnter(el) {
                el.classList.remove('hb-collapse')
                el.style.height = '';
                el.style.overflow = el.dataset.oldOverflow;
              },

              beforeLeave(el) {
                if (!el.dataset) el.dataset = {}
                el.dataset.oldPaddingTop = el.style.paddingTop
                el.dataset.oldPaddingBottom = el.style.paddingBottom
                el.dataset.oldOverflow = el.style.overflow

                el.style.height = el.scrollHeight + 'px'
                el.style.overflow = 'hidden'
              },

              leave(el) {
                if (el.scrollHeight !== 0) {
                  el.classList.add('hb-collapse')
                  el.style.height = 0
                  el.style.paddingTop = 0
                  el.style.paddingBottom = 0
                }
              },

              afterLeave(el) {
                el.classList.remove('hb-collapse')
                el.style.height = ''
                el.style.overflow = el.dataset.oldOverflow
                el.style.paddingTop = el.dataset.oldPaddingTop
                el.style.paddingBottom = el.dataset.oldPaddingBottom
              }
            }
          }
          return createElement('transition', data, context.children)
        }
      }
    },
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
    collapse () {
      // if (this.isCollapse) {
      //   this.$refs['tDom'].style.display = 'none'
      // } else {
      //   this.$refs['tDom'].style.display = ''
      // }
      this.isCollapse = !this.isCollapse
    },
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