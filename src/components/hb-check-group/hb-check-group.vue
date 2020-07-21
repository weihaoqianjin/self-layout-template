<template>
    <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" @change="checkAll" class="mb-2"><span :style="titleStyle">{{title}}</span></el-checkbox>
        <el-checkbox-group v-model="checkedList" @change="optChange">
            <el-checkbox v-for="(item, index) in list" :label="item[optFormat[1]]" :key="index">{{item[optFormat[0]]}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
export default {
  name: 'hb-check-group',
  props: {
      optFormat: {
          type: Array,
          default () {
              return ['label', 'value']
          }
      },
      options: {
          type: Array,
          default () {
              return [{label: '', value: ''}]
          }
      },
      outType: {
          type: String,
          default: 'default' // item: 输出对象, 其他值: 输出options的value值
      },
      title: {
          type: String,
          default: '全选'
      },
      titleStyle: '',
      type: 0
  },
  data () {
    return {
      isCheckAll: false,
      isIndeterminate: false,
      checkedList: [],
      allValue: [],
      list: []
    }
  },
  methods: {
      checkAll (val) {
          this.checkedList = val ? this.allValue : []
          this.isIndeterminate = false
          this.out()
      },
      optChange (val) {
          let checkedCount = val.length
          this.isCheckAll = checkedCount === this.options.length
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
          this.out()
      },
      out () {
          if (this.outType === 'item') {
              let map = {}
              this.checkedList.map(item => {
                 map[item] = item
              })
              let value = this.optFormat[1]
              let ret = this.options.filter(item => map[item[value]])
              this.$emit('select', ret, this.type)
          } else {
              this.$emit('select', this.checkedList, this.type)
          }
      }
  },
  mounted () {
      let valueType = typeof this.options[0]
      let self = this
      this.list = this.options.map(item => {
          self.allValue.push(item[self.optFormat[1]] || item)
          if (valueType === 'string' || valueType === 'number') {
              return {
                  label: item,
                  value: item
              }
          }
          return item
      })
  }
}
</script>
