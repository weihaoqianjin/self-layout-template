<template>
  <div :style="wrapperStyle">
    <hb-menu-item :menulist="menulist"/>
  </div>
</template>
<script>
import HbMenuItem from './hb-menu-item.vue'

export default {
  name: 'hb-menu',
  components: {HbMenuItem},
  provide () {
    return {
      $menuRoot: this
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    // 下级菜单与上级菜单的偏移距离
    distance: {
      type: Number,
      default: 20
    },
    // 菜单栏宽度
    width: {
      type: String,
      default: '250px'
    },
    // 初始化菜单是否默认全部展开
    isExpand: {
      type: Boolean,
      default: false
    },
    // 是否只保持一个子菜单的展开, 优先级大于isExpand
    uniqueOpened: {
      type: Boolean,
      default: false
    },
    // 菜单节点的唯一标识
    sign: {
      type: String,
      default: 'id'
    },
    // 指定显示的菜单名字段
    label: {
      type: String,
      default: 'name'
    },
    // 是否使用vue-router的模式，启用该模式会在激活导航时以path字段值进行路由跳转
    router: {
      type: Boolean,
      default: false
    },
    // 默认激活的菜单
    defaultActive: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      wrappereStyle: {},
      menulist: [],
      activeMenu: null,
      menuLevelMap: {}
    }
  },
  watch: {
    list (val) {
      this.menulist = this.packList(val)
    }
  },
  mounted () {
    this.wrapperStyle = {
      'width': this.width,
      'box-sizing': 'border-box',
      'height': '100%',
      'background-color': '#304156',
      'color': 'white'
    }

    this.menulist = this.packList(this.list)
    this.activeMenu = this.defaultActive || ''
  },
  methods: {
    packList (list = [], ret = [], parent = null, level = 1) {
      let deep = level + 1
      for (let item of list) {
        let temp = {
          ...item,
          isCollapse: !this.isExpand,
          children: [],
          level,
          parent
        }
        if (item.children && item.children.length) this.packList(item.children, temp.children, temp, deep)
        ret.push(temp)

        this.menuLevelMap[item[this.sign]] = level
      }
      return ret
    },
    clickMenu (item) {
      this.$emit('clickMenu', item)
    }
  }
}
</script>