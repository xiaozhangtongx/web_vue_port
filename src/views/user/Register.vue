<template>
  <div class="register">
    <div class="registerform">
      <h1>新 用 户 注 册</h1>
      <RegisterForm />
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/user/register/RegisterForm'
export default {
  name: '',
  data() {
    return {}
  },
  components: {
    RegisterForm,
  },
  methods: {},
}
</script>

<style scoped lang='less'>
.register {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/images/5.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.registerform {
  margin-top: 10vh;
  display: block;
  transition: all 0.1s;
  width: 50vh;
  height: 80vh;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    text-align: center;
    font-weight: 600;
  }
}
</style>