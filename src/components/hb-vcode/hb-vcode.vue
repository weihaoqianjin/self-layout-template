<template>
    <div class="cursor-pointer code" @click="getCode">{{msg}}<span v-show="!flag">s</span></div>
</template>
<script>
export default {
    name: 'hb-vcode',
    props: {
        second: {
            type: Number,
            default: 60
        },
        content: String,
        validate: null
    },
    data () {
        return {
            msg: '获取验证码',
            flag: true,
            timer: null
        }
    },
    methods: {
        clearVcodeTimer () {
            clearInterval(this.timer)
            this.msg = '获取验证码'
            this.flag = true
        },
        async getCode () {
          // 验证函数
          if (this.validate) {
              let ret = await this.validate()
              if (!ret) return
          }
          if (!this.flag) return
          this.$emit('opt')
          this.flag = false
          this.msg = this.second
          this.timer = setInterval(() => {
              this.msg--
              if (this.msg <= 0) {
                  clearInterval(this.timer)
                  this.msg = '获取验证码'
                  this.flag = true
              }
          }, 1000)
      }
    },
    mounted () {
        this.msg = this.content ? this.content : this.msg
        this.Bus.$on('clearVcodeTimer', this.clearVcodeTimer)
    }
}
</script>
<style scoped>
    .code {
        display:inline-block;
        width:100px;
        height:40px;
        text-align: center;
        line-height:40px;
        background-color: #409eff;
        color: white;
        border-radius: 5px;
    }
</style>
