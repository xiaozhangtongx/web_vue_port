<!--
 * @Description: 
 * @Version: 1.0
 * @Author: xiaozhangtx
 * @Date: 2021-10-07 14:57:04
-->
<template>
  <div>
    <a-row type="flex" justify="end">
      <a-col>
        <a-badge dot>
          <a-icon type="notification" />
        </a-badge>
      </a-col>
      <a-col>
        <a-dropdown>
          <a-avatar
            size="large"
            src="https://qq.yh31.com/tp/zjbq/202006162239246617.gif"
          />
          <a-menu slot="overlay">
            <a-menu-item>
              <li @click="logOut">退出</li>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      newDate: new Date(),
    }
  },
  methods: {
    // // 退出登陆
    logOut() {
      window.sessionStorage.clear()
      this.$router.replace('/user/login')
      this.$store.dispatch('saveUserInfo', null)
      console.log(window.sessionStorage.getItem('store'))
    },
  },
}
</script>

<style scoped lang="less">
.anticon-notification {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  color: #fff;
}

.ant-avatar-lg {
  background-color: #fff;
}

.ant-col {
  margin-right: 3vh;
}
</style>
