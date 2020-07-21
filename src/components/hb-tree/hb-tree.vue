<template>
  <el-tree
    :data="data"
    show-checkbox
    :node-key="nodeKey"
    :default-checked-keys="defaultCheckedKeys"
    highlight-current
    :check-strictly="true"
    @check="nodeCheck"
    :ref="refKey"
    >
  </el-tree>
</template>
<script>
let count = 0
export default {
  name: 'hb-tree',
  props: {
    'data': {
      type: Array,
      default () { return [] }
    },
    'nodeKey': {
      type: String,
      default: 'id'
    },
    'defaultCheckedKeys': {
      type: Array,
      default () { return [] }
    },
    'unlinkNode': {
      type: Array,
      default () { return ['type', 'button'] }
    },
    'checkedKeyList': {
      type: Array,
      default () { return [] }
    }
  },
  watch: {
    defaultCheckedKeys () {
      this.$emit('update:checkedKeyList', this.defaultCheckedKeys)
    }
  },
  data () {
    return {
      refKey: '',
      treeNode: ''
    }
  },
  methods: {
    setNodes (list = [], flag = false) {
      if (!list.length) return []
      for (let item of list) {
        item.checked = flag
        if (item.childNodes && item.childNodes.length) this.setNodes(item.childNodes, flag)
      }
    },
    getParentKey (node = {}, ret = []) {
      node.key && ret.push(node.key)
      if (node.parent) this.getParentKey(node.parent, ret)
      return ret
    },
    unSelectedMenu (node) {
      if (node.id === 0) return
      let flag = true
      for (let item of node.childNodes) {
        if (item.checked) {
          flag = false
          break
        }
      }
      if (flag) {
        node.checked = false
        this.unSelectedMenu(node.parent)
      }
    },
    nodeCheck (data, obj) {
      let isSelected = obj.checkedKeys.includes(data.id)
      let curNode = this.treeNode.getNode(data.id)
      let nodes = curNode.childNodes || []
      this.setNodes(nodes, isSelected)
      if (isSelected) {
        let keys = this.getParentKey(curNode.parent)
        keys.forEach(item => {
          this.treeNode.setChecked(item, true)
        })
      }
      if (!isSelected && (data[this.unlinkNode[0]] !== this.unlinkNode[1])) this.unSelectedMenu(curNode.parent)
      this.$emit('check', data, obj)
      this.$emit('update:checkedKeyList', this.treeNode.getCheckedKeys())
    },
    getTreeNode () {
      return this.$refs[this.refKey]
    }
  },
  created () {
    this.refKey = this.ref || `tree${count++}`
  },
  mounted () {
    this.treeNode = this.getTreeNode()
  }
}
</script>
