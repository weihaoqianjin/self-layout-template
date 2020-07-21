<template>
  <div class="data-list">
    <div class="header" v-if="hasHeader">
      <slot name="header"></slot>
    </div>
    <div>
      <slot name="block"></slot>
    </div>
    <div class="body" v-show="showTable">
      <el-table :border="border" v-loading="loading"  :data="dataCalc.items" ref="table" style="width: 100%" :height="tableHeightCalc" :empty-text="!loading ?  '暂无数据' : ' '" :header-cell-class-name="headerClass" :cell-class-name="cellClass" @selection-change="selectList">
        <slot></slot>
      </el-table>
    </div>
    <div class="footer" v-show="showTable">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        layout="total, prev, pager, next, sizes, jumper"
        :page-size="paramsCalc.size"
        :page-sizes="[15, 50, 100]"
        :total="dataCalc.count"
        :current-page.sync="data.params.currentPage">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'HbDataList',
  data () {
    return {
      tableHeight: 200
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
    height: {
      type: String,
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
    showTable: {
        type: Boolean,
        default: false
    }
  },
  watch: {
    data: {
      deep: true,
      handler (n, o) {
        this.$nextTick(() => {
          this.tableHeight = this.$refs.table ? window.innerHeight - this.$refs.table.$el.offsetTop - 130 : 0
        })
      }
    }
  },
  computed: {
    tableHeightCalc () {
      return this.tableHeight
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
    currentChange (i) {
      this.$emit('current-change')
    },
    sizeChange (l) {
      this.data.params.size = l
      this.$emit('current-change')
    },
    selectList (data) {
      this.$emit('select', JSON.clone(data))
    }
  },
  mounted () {
    let timer = setInterval(() => {
      this.tableHeight = this.$refs.table ? window.innerHeight - this.$refs.table.$el.offsetTop - 130 : 0
      if (this.tableHeight > 0) clearInterval(timer)
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
        margin: 5px 10px 0;
        .el-form-item__content .el-input .el-input__inner{
          width: 140px;
        }
        .el-form-item__content .el-date-editor {
          width: 250px
        }
      }
      .el-button {
        margin-right: 36px;
        margin-left: 0px;
      }
    }
    .body {
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
      text-align: center;
    }
  }
  .el-dialog__body {
    padding: 0 20px;
    .data-list {
      padding: 0;
    }
  }
</style>
<style>
  .body .el-table__body, .el-table__footer, .el-table__header {
    table-layout: auto;
    border-collapse: separate;
  }
</style>
