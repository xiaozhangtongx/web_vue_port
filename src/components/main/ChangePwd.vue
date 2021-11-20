<!--
 * @Description: 修改密码操作
 * @Version: 1.0
 * @Author: xiaozhangtx
 * @Date: 2021-10-17 16:11:42
-->
<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="changePwdDialogVisible" width="50vh"
      @close="changePwdDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="newPwdForm" :rules="newPwdFormRules" ref="newPwdFormRef" label-width="30%"
        style="width:96%">
        <!-- 新密码 -->
        <el-form-item label="新密码：" prop="password">
          <el-input show-password type="password" v-model="newPwdForm.password"
            placeholder="请输入6位新密码">
          </el-input>
        </el-form-item>
        <!-- 确认新密码 -->
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input show-password type="password" v-model="newPwdForm.checkPass"
            placeholder="请再输入你的新密码">
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <a-button @click="changePwdDialogVisible = false">取 消</a-button>
        <a-button style="margin-left:20px" type="primary" @click="changePwd">确 定</a-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log(this.checkPass)
      console.log(value.length)
      if (value === '' || value.length != 6) {
        callback(new Error('请输入6位新密码'))
      } else if (value == this.oldpwd) {
        callback(new Error('该密码与原密码相同，请输入6位新密码'))
      } else {
        if (this.checkPass != '') {
          this.$refs.newPwdFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      // console.log(value)
      if (value == '') {
        callback(new Error('请再次输入密码'))
      } else if (value != this.newPwdForm.password) {
        console.log(value)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 对话框显示
      changePwdDialogVisible: false,
      // 修改密码表单项
      newPwdForm: {
        username: '',
        password: '',
        checkPass: '',
      },
      // 验证规则
      newPwdFormRules: {
        password: [{ validator: validatePass, trigger: 'blur', required: true }],
        checkPass: [{ validator: validatePass2, trigger: 'blur', required: true }],
      },
      // 原来的密码
      oldpwd: '',
    }
  },
  methods: {
    // 关闭对话框
    changePwdDialogClosed() {
      this.$refs.newPwdFormRef.resetFields() // 重置表单项
    },
    // 修改密码
    changePwd() {
      this.$refs.newPwdFormRef.validate(async (valid) => {
        console.log(this.newPwdForm)
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.post('changepwd', this.newPwdForm)
        if (res.code == 200) {
          this.changePwdDialogVisible = false
          this.$refs.newPwdFormRef.resetFields() // 重置表单项
          this.$message.success(res.message)
          window.sessionStorage.clear()
          this.$router.replace('/user/login')
          this.$store.dispatch('saveUserInfo', null)
        } else {
          this.$refs.newPwdFormRef.resetFields() // 重置表单项
          return this.$message.error(res.message)
        }
      })
    },
    // 展示修改密码对话框
    showchangePwd(username, oldpwd) {
      this.changePwdDialogVisible = true
      this.newPwdForm.username = username
      this.oldpwd = oldpwd
    },
  },
}
</script>

<style scoped lang='less'>
</style>