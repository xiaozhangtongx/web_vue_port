<!--
 * @Description: 注册表单
 * @Version: 1.0
 * @Author: xiaozhangtx
 * @Date: 2021-10-05 17:19:00
-->
<template>
  <a-form id="components-form-demo-normal-login" :form="form" class="register-form"
    @submit="handleSubmit">
    <!-- 输入用户名 -->
    <a-form-item>
      <a-input v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入你的用户名' }] },
        ]" placeholder="请输入用户名">
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <!-- 输入密码 -->
    <a-form-item>
      <a-input-password v-decorator="[
          'password',
          { rules: [{ required: true,len:6, message: '请输入六位密码!' }] },
        ]" type="password" placeholder="请输入密码">
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input-password>
    </a-form-item>
    <!-- 确认密码 -->
    <a-form-item>
      <a-input-password v-decorator="[
          'cpassword',
          { rules: [{ required: true,len:6, message: '请确认你的密码!' }] },
        ]" type="password" placeholder="请确认密码">
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input-password>
    </a-form-item>
    <!-- 输入邮箱 -->
    <a-form-item>
      <a-input v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '请检查你邮箱的格式是否正确！',
              },
              {
                required: true,
                message: '请输入你的邮箱！',
              },
            ],
          },
        ]" placeholder="请输入邮箱">
        <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <!-- 输入金额 -->
    <a-form-item>
      <a-input v-decorator="[
          'money',
          { rules: [{ required: true, message: '请输入你的金额' }] },
        ]" placeholder="请输入金额">
        <a-icon slot="prefix" type="pay-circle" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <!-- 输入生日 -->
    <a-form-item>
      <a-date-picker placeholder="请选择生日" v-decorator="[
          'birthday',
          { rules: [{ required: true, message: '请选择生日' }] },
        ]">
        <template> </template>
      </a-date-picker>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit"> 注册 </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_register' })
  },
  data() {
    return {
      code: 0,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (values.password != values.cpassword) {
            return this.$message.error('两次输入的密码不一致！')
          } else {
            console.log(values)
            const { data: res } = await this.$http.post('register', values, {
              timeout: 4000,
            })
            this.code = res.code
            if (res.code == 200) {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$router.push('/user/login')
              }, 2000)
            } else {
              return this.$message.error(res.message)
            }
          }
        }
      })
    },
    goLogin() {
      if (this.code == 200) {
        this.$router.push('/user/login')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/deep/ .ant-input,
.ant-btn {
  width: 300px;
  height: 40px;
}
</style>
