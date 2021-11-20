<!--
 * @Author: your name
 * @Date: 2021-11-17 15:09:23
 * @LastEditTime: 2021-11-19 15:17:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webport\src\views\main\users\Uarticles.vue
-->
<template>
  <a-card>
    <ArticleTable ref="userarticle" style="margin-top: 20px" />
  </a-card>
</template>

<script>
import ArticleTable from '@/components/main/ArticleTable'
export default {
  name: 'Users',
  data() {
    return {}
  },
  created() {
    this.getUsername()
  },
  methods: {
    getUsername() {
      let username = this.$store.state.user.username
      window.sessionStorage.setItem('nowuser', username)
    },
  },
  components: {
    ArticleTable,
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
</style>
