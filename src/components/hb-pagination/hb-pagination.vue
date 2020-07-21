<template>
  <div class="hb-pagination">
    <el-pagination
      class="hidden-xs-only"
      @size-change="sizeChange"
      @current-change="currentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      :page-sizes="[15, 50, 100]"
      :total="total"
      :current-page="currentPage">
    </el-pagination>
    <el-pagination
      small
      class="hidden-sm-and-up"
      @size-change="sizeChange"
      @current-change="currentChange"
      layout="total, prev, pager, next, jumper"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage">
    </el-pagination>
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'HbPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 15
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    currentChange (i) {
      this.$emit('currentChange', i)
    },
    sizeChange (l) {
      this.$emit('sizeChange', l)
    }
  }
}
</script>
<style type="text/css" lang="scss">
  .hb-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
<style>
  .hb-pagination .el-dialog--center .el-dialog__body {
    text-align: center;
  }
</style>
