<template>
  <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="visible" width="450px">
    <div class="content space">
        <div v-html="content"></div>
    </div>
    <div slot="footer" class="dialog-footer">
      <hb-button @click="onClose">取消</hb-button>
      <hb-button type="warning" @click="onCallback(true)">确定</hb-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'html-confirm',
  data () {
    return {
      title: '确认提示',
      content: ''
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
