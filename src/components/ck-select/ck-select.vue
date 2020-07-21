<template>
  <div style="position:relative;display: inline-block;width:100%;">
    <div class="el-select"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
      style="width:100%;"
    >
      <div class="el-input el-input--suffix" :class="{ 'is-focus': selectVisible }">
        <input type="text" autocomplete="off" :placeholder="placeholder" class="el-input__inner" ref="input" v-model="searchVal"  @focus="handleFocus" @blur="handleBlur" @keyup.enter="handleSeach" style="width:100%;">
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="el-select__caret el-input__icon el-icon-search is-reverse" @click.enter="handleSeach"></i>
          </span>
        </span>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <div
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        class="el-select-dropdown el-popper"
        v-show="selectVisible"
        style="transform-origin: center top; z-index: 2328; position: absolute; top: 40px; left: 0px;width:100%;"
        x-placement="bottom-start">
        <div class="el-scrollbar" style="">
          <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
            <el-scrollbar
            tag="ul"
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list"
            >
              <ul class="el-scrollbar__view el-select-dropdown__list">
                <li v-show="options.length > 0" class="el-select-dropdown__item" :class="{'selected hove': index === selectIndex}" v-for="(item, index) in options" :key="index" @click.stop="selectOptionClick(item, index)">
                  <img v-if="pic" :src="item[pic]" style="vertical-align: middle;width:20px;height:20px;">
                  <span style="margin-left:10px;">{{item[opFormat[0]]}}</span>
                  <span v-if="opFormat[2]" style="margin-left:10px;float:right;">{{item[opFormat[2]]}}</span>
                  <slot :data="item" />
                </li>
                <li v-show="options.length <= 0" style="text-align:center;padding:0;">暂无数据</li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </transition>
    <div class="el-scrollbar__bar is-horizontal">
      <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
    </div>
    <div class="el-scrollbar__bar is-vertical">
      <div class="el-scrollbar__thumb" style="transform: translateY(0%);">
        <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ck-select',
  props: {
    noClose: Boolean,
    clear: Boolean,
    placeholder: {
      type: String,
      default: '请输入'
    },
    pic: {
      type: String,
      default: ''
    },
    opFormat: {
      type: Array,
      default: () => ['label', 'value']
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  // computed: {
  //   searchVal: {
  //     get () {
  //       return this.$attrs.value
  //     },
  //     set (val) {
  //       this.$emit('input', val)
  //     }
  //   }
  // },
  data () {
    return {
      searchVal: this.$attrs.value,
      selectVisible: false,
      selectRow: '',
      focusHover: false,
      id: '',
      selectIndex: -1
    }
  },
  methods: {
    handleMouseenter () {
      this.focusHover = true
    },
    handleMouseleave () {
      this.focusHover = false
    },
    handleSeach () {
      this.selectIndex = -1
      this.$emit('click', this.searchVal)
      if (this.searchVal) {
        this.selectVisible = true
      }
      this.$refs.input.focus()
    },
    handleFocus () {
    },
    selectOptionClick (item, index) {
      this.selectRow = item
      if (this.clear) {
        this.searchVal = ''
      } else {
        this.searchVal = item[this.opFormat[0]]
      }
      if (!this.noClose) {
        this.selectVisible = false
      } else {
        this.$refs.input.focus()
      }
      this.$emit('input', item[this.opFormat[1]])
      this.$emit('change', item[this.opFormat[1]], item)
      this.selectIndex = index
    },
    handleBlur () {
      if (!this.focusHover) {
        this.selectVisible = false
      } else {
        if (this.options.length <= 0 && this.selectVisible) this.selectVisible = false
      }
    }
  },
  mounted () {
    // console.log(this.noClose)
  }
}
</script>
