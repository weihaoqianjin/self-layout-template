<template>
  <div class="data-list">
    <div class="header" v-if="hasHeader">
      <slot name="header"></slot>
    </div>
    <div>
      <slot name="block"></slot>
    </div>
    <div class="body">
      <el-table :border="border" v-loading="loading" :data="dataCalc.items" :ref="tableRef" style="width: 100%" :height="tableHeightCalc" :empty-text="!loading ?  '暂无数据' : ' '" :header-cell-class-name="headerClass" :cell-class-name="cellClass" @selection-change="selectList" :row-class-name="cellStyle">
        <slot></slot>
      </el-table>
    </div>
    <div class="footer" v-if="hasFooter">
      <el-pagination
        class="hidden-xs-only"
        @size-change="sizeChange"
        @current-change="currentChange"
        layout="total, prev, pager, next, sizes, jumper"
        :page-size="paramsCalc.size"
        :page-sizes="[15, 50, 100]"
        :total="dataCalc.count"
        :current-page.sync="currentPage">
      </el-pagination>
      <el-pagination
        small
        class="hidden-sm-and-up"
        @size-change="sizeChange"
        @current-change="currentChange"
        layout="total, prev, pager, next, jumper"
        :pager-count="3"
        :page-size="paramsCalc.size"
        :total="dataCalc.count"
        :current-page.sync="currentPage">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'DataList',
  data () {
    return {
      tableHeight: 500,
      innerHeight: '',
      currentPage: 1,
      flag: false,
      minHeight: 250
    }
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
          items: [],
          emptyText: '暂无数据',
          count: 0
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    fix: {
      type: Number,
      default: 0
    },
    params: {
      type: Object,
      default () {
        return {}
      }
    },
    hasHeader: {
      type: Boolean,
      default () {
        return true
      }
    },
    hasFooter: {
      type: Boolean,
      default () {
        return true
      }
    },
    height: {
      type: [String, Number],
      default: ''
    },
    cellClass: {
      type: String,
      default () {
        return 'align-center'
      }
    },
    headerClass: {
      type: String,
      default () {
        return 'align-center'
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    selectedData: {
      type: Array,
      default () {
        return []
      }
    },
    cellStyle: Function
  },
  watch: {
    data: {
      deep: true,
      handler (n, o) {
        this.$nextTick(function () {
          this.tableHeight = this.getTableHeight()
        })
      },
      immediate: true
    },
    'data.items': {
      deep: true,
      handler (n, o) {
        if (!this.flag) {
          this.currentPage = 1
        }
        this.flag = false
      }
    },
    innerHeight: function () {
      this.tableHeight = this.getTableHeight()
    },
    '$state.visitedViews': {
      deep: true,
      handler (n, o) {
        this.tableHeight = this.getTableHeight()
      }
    }
  },
  computed: {
    tableRef () {
      return 'table' + (new Date()).getTime()
    },
    tableHeightCalc () {
      let height = this.height || this.tableHeight
      return height < this.minHeight ? this.minHeight : height
    },
    paramsCalc () {
      return Object.assign({
        currentPage: 1,
        size: 15
      }, this.data.params)
    },
    dataCalc () {
      return {
        items: this.data.items || [],
        count: Number(this.data.count) || 0
      }
    }
  },
  methods: {
    initTableHeight () {
      let self = this
      let timer = setInterval(() => {
        self.tableHeight = self.getTableHeight()
        if (self.tableHeight > 0) clearInterval(timer)
      }, 50)
      window.onresize = function () {
        self.innerHeight = window.innerHeight
      }
    },
    getTableHeight () {
      let table = this.$refs[this.tableRef]
      let height = table ? window.innerHeight - table.$el.getBoundingClientRect().top - this.fix - 46 : 0
      return height
    },
    currentChange (i) {
      let self = this
      self.data.params.currentPage = i
      self.$emit('current-change')
      self.flag = true
      setTimeout(function () {
        self.data.params.currentPage = 1
      }, 50)
      this.$refs[this.tableRef].bodyWrapper.scrollTop = 0
    },
    sizeChange (l) {
      this.data.params.size = l
      this.currentPage = this.data.params.currentPage = 1
      this.$emit('current-change')
    },
    selectList (data) {
      this.$emit('select', JSON.clone(data))
    }
  },
  mounted () {
    this.initTableHeight()
  },
  activated () {
    setTimeout(() => {
      this.initTableHeight()
    }, 50)
  }
}
</script>
<style type="text/css" lang="scss">
  .data-list {
    padding: 10px;
    .header {
      padding: 10px;
      background: #f4f4f4;
      margin-bottom: 10px;
      .el-form-item__label{
        font-size: 16px;
        font-family: "Microsoft YaHei UI Light";
        color: #282828;
        padding: 0 5px
      }
      .el-form--inline .el-form-item{
        margin: 5px 10px 5px 0;
        .el-form-item__content .el-input .el-input__inner{
          width: 140px;
        }
        .el-form-item__content .el-date-editor {
          width: 250px;
          @media screen and (max-width: 768px) {
            width: 140px;
          }
        }
      }
      .el-button {
        margin-right: 36px;
        margin-left: 0px;
      }
    }
    .body {
      .el-table__body, .el-table__footer, .el-table__header {
        table-layout: auto !important;
      }
      .el-table thead{
        background: #f4f4f4;
      }
      .el-table th, .el-table tr{
        background: none;
      }
      tbody .cell{
        font-size: 14px;
      }
    }
    .footer {
      margin-top: 4px;
      width: 100%;
      text-align: center;
      background: white;
    }
  }
  .el-dialog__body {
    padding: 0 20px;
    .data-list {
      padding: 0;
    }
  }
</style>
