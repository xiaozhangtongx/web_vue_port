<!--
 * @Description: 登录表单
 * @Version: 1.0
 * @Author: xiaozhangtx
 * @Date: 2021-10-04 15:12:35
-->

<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入你的用户名' }] },
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入你的六位密码!',
                min: 6,
                max: 6,
              },
            ],
          },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 登录 </a-button>
      </a-form-item>
      <a-button type="link" class="register" @click="gotoRegister">
        注册账号
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    // 用户登录
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        // console.log(values.userId.length)
        if (!err) {
          const { data: res } = await this.$http.post('login', values)
          if (res.code == 200) {
            this.$store.dispatch('saveUserInfo', res.obj[0])
            window.sessionStorage.setItem(
              'store',
              JSON.stringify(this.$store.state)
            )
            this.$router.replace('/main/home') // 页面跳转
            return this.$message.success(res.message)
          } else {
            return this.$message.error(res.message)
          }
        }
      })
    },
    // 用户注册
    gotoRegister() {
      this.$router.push('/user/register')
    },
  },
}
</script>

<style lang="less" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/deep/ .ant-input,
.ant-btn {
  width: 300px;
  height: 50px;
}

// /deep/.ant-form-item-control {
//   margin-top: 6px;
//   margin-bottom: 4px;
// }
.register {
  float: left;
  height: 20px;
  width: 90px;
}
</style>
