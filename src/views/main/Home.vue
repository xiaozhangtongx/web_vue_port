<template>
  <div>
    <h1>welcome {{ username }} !</h1>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      username: this.$store.state.user.username,
    }
  },
  methods: {},
}
</script>

<style scoped lang="less">
h1 {
  text-align: center;
  font-size: 30px;
  margin-top: 20vh;
}
</style>
