<!--
 * @Description: 用户登录界面
 * @Version: 1.0
 * @Author: xiaozhangtx
 * @Date: 2021-10-11 16:26:51
-->
<template>
  <div class="user">
    <Carousel />
    <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="10" class="title"><strong>小张博客论坛</strong></a-col>
    <div class="loginform">
      <h1>用 户 登 录</h1>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/user/login/Carousel'
import LoginForm from '@/components/user/login/LoginForm'
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
  components: {
    Carousel,
    LoginForm,
  },
}
</script>

<style scoped lang='less'>
.user {
  width: 100vw;
  height: 100vh;
}
.title {
  position: absolute;
  top: 46%;
  left: 40%;
  transform: translate(-50%, -50%);
  font-size: 160px;
  color: rgb(228, 122, 24);
  font-family: '楷体';
}

.loginform {
  position: fixed;
  top: 20vh;
  right: 6vw;
  display: block;
  transition: all 0.1s;
  width: 50vh;
  height: 50vh;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // box-shadow: 5px 5px 5px #c9c9c9;
  h1 {
    text-align: center;
    // font-family: '楷体';s
    font-weight: 600;
  }
}
</style>