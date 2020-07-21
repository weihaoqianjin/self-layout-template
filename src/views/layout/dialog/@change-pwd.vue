<template>
  <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="visible" width="400px">
    <el-form ref="changePwdForm"  label-width="80px" :rules="changePwdFormRules" :model="changePwdForm">
      <el-form-item label="当前密码" prop="currentPwd">
        <el-input type="password" v-model="changePwdForm.currentPwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd" class="is-required">
        <el-input type="password" v-model="changePwdForm.newPwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" class="is-required">
        <el-input type="password" v-model="changePwdForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="warning" @click="changePwdSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
let validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!/^[a-zA-Z0-9]{8,20}/.test(value) || value.length > 20) {
    callback(new Error('必须且只含有数字和字母,8到20位'))
  }
  callback()
}
let validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (!/^[a-zA-Z0-9]{8,20}/.test(value) || value.length > 20) {
    callback(new Error('必须且只含有数字和字母,8到20位'))
  }
  callback()
}
export default {
  data () {
    return {
      title: '修改密码',
      changePwdForm: {
        currentPwd: '',
        newPwd: '',
        checkPass: ''
      },
      changePwdFormRules: {
        currentPwd: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        newPwd: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async changePwdSubmit () {
      let check = await this.$check('changePwdForm')
      if (!check) return
      if (this.changePwdForm.newPwd !== this.changePwdForm.checkPass) return this.$message.error('两次密码不一致，请重新输入')
      let para = {
        password: this.changePwdForm.currentPwd,
        newPassword: this.changePwdForm.newPwd
      }
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      para.adminId = userInfo.adminId
      para.partnerId = userInfo.partnerId
      let ret = await this.$http.cors('/wuliangyebossapi/admin/admin-pass-modify.cgi', para)
      if (ret.code !== 0) return
      this.$Notify('修改密码成功')
      this.jump('/login')
      this.onCallback()
    }
  }
}
</script>
