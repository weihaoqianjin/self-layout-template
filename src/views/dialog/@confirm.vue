<template>
  <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="visible" width="450px">
    <div class="content space"><i  class="el-icon-warning icon pr-2"/>{{content}}</div>
    <div slot="footer" class="dialog-footer">
      <hb-button @click="onClose" type="default">{{btnLText}}</hb-button>
      <hb-button type="warning" @click="onCallback(true)">{{btnRText}}</hb-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'confirm-dialog',
  data () {
    return {
      title: '提示',
      content: '',
      btnLText: '取消',
      btnRText: '确定'
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .content {
    display: flex;
    align-items: center;
    .icon {
      margin: 18px 0;
      color: #fbc550;
      font-size: 25px;
    }
  }
  .space {
    margin-left: 25px;
    @media screen and(max-width: 480px) {
      margin-left: 0;
    }
  }
</style>
