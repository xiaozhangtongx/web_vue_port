<!--
 * @Description: 用户个人中心界面
 * @Version: 1.0
 * @Author: xiaozhangtx
-->
<template>
  <a-card>
    <AccountInfo ref="userarticle" style="margin-top: 20px" />
    <div style="margin-top: 20px;" class="btns">
      <a-button type="primary" icon="edit" @click="editUser">
        修改信息
      </a-button>
      <a-button type="danger" icon="key" @click="changePwd">
        重置密码
      </a-button>
      <a-button type="primary" icon="delete" style="background:#009688;border:none"
        @click="confirmDelet">
        注销账户
      </a-button>
      <a-button type="primary" icon="rollback" style="background:#888;border:none"
        @click="logOut()">
        退出登录
      </a-button>
    </div>
    <!-- 用户修改对话框 -->
    <EditAccount ref="editUser" />
    <!-- 修改密码表单 -->
    <ChangePwd ref="changePassword" />
  </a-card>
</template>

<script>
import AccountInfo from '@/components/main/AccountInfo'
import EditAccount from '@/components/main/EditAccount'
import ChangePwd from '@/components/main/ChangePwd'
export default {
  name: 'Accounts',
  data() {
    return {
      username: this.$store.state.user.username,
      password: this.$store.state.user.password,
    }
  },
  methods: {
    // 修改账号
    editUser() {
      this.$refs.editUser.showEditserDialog(this.username)
      console.log('edit')
    },
    showInfo() {
      this.$refs.userarticle.getUserByname()
    },
    // 确定是否删除用户
    confirmDelet() {
      this.$confirm({
        title: '此操作将永久删除你的信息, 是否继续?',
        okText: '是',
        cancelText: '否',
        icon: 'exclamation-circle',
        onOk: () => {
          this.deleteUser(this.username)
        },
        onCancel: () => {
          this.$message.warn('你取消了删除操作')
        },
      })
    },
    // 修改密码
    changePwd() {
      this.$refs.changePassword.showchangePwd(this.username, this.password)
    },
    // 注销用户
    async deleteUser(username) {
      const { data: res } = await this.$http.get('deleteuser?username=' + username)
      if (res.code == 200) {
        this.$router.push('/user/login')
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    // 退出
    logOut() {
      window.sessionStorage.clear()
      this.$router.replace('/user/login')
      this.$store.dispatch('saveUserInfo', null)
    },
  },
  components: {
    AccountInfo,
    EditAccount,
    ChangePwd,
  },
}
</script>

<style scoped lang="less">
.ant-card {
  border-radius: 7px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.ant-card-bordered {
  border: none;
}
.btns {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
/deep/.ant-btn {
  margin-bottom: 10px;
}
</style>
