<template>
  <el-cascader
    clearable
    class="selectWidth"
    :size="$getComponentSize()"
    :options="options"
    v-model="inputValue">
  </el-cascader>
</template>
<script type="text/javascript">

export default {
  name: 'HbCascader',
  computed: {
    inputValue: {
      get: function (params) {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      options: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    AreaArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    attributes: {
      type: Array
    },
    size: {
      type: String
    }
  },
  methods: {
    getArea (list) {
      let arr = []
      for (let i in list) {
        let obj = {}
        obj.label = list[i].name
        obj.value = list[i].id
        if (list[i].cityList) obj.children = this.getArea(list[i].cityList)
        if (list[i].areaList) obj.children = this.getArea(list[i].areaList)
        arr.push(obj)
      }
      return arr
    },
    evil (fn) {
      let Fn = Function
      return new Fn('return ' + fn)()
    }
  },
  mounted () {
    let AreaArr = JSON.stringify(this.AreaArr).replace(this.evil('/' + this.attributes[0] + '/g'), 'name')
    let AreaArr1 = AreaArr.replace(this.evil('/' + this.attributes[1] + '/g'), 'id')
    let AreaArr2 = AreaArr1.replace(this.evil('/' + this.attributes[2] + '/g'), 'cityList')
    let AreaArr3 = JSON.parse(AreaArr2.replace(this.evil('/' + this.attributes[3] + '/g'), 'areaList'))
    this.options = this.getArea(AreaArr3)
  }
}
</script>
<style type="text/css" lang="scss">
  .selectWidth {
    width: 100%;
  }
</style>
