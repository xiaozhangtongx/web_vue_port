<!--
 * @Author: your name
 * @Date: 2021-11-17 15:25:10
 * @LastEditTime: 2021-11-19 18:26:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webport\src\views\main\admin\ArticleDetail.vue
-->
<template>
  <div>
    <a-button type="primary" class="goback" @click="goBack">返回</a-button>
    <UserInfo />
    <ArticleTable ref="aarticle" />
  </div>
</template>

<script>
import ArticleTable from '@/components/main/ArticleTable'
import UserInfo from '@/components/main/UserInfo'
export default {
  name: '',
  data() {
    return {}
  },
  components: {
    ArticleTable,
    UserInfo,
  },
  methods: {
    goBack() {
      this.$router.push('/main/aarticles')
    },
  },
}
</script>

<style scoped lang='less'>
.goback {
  position: absolute;
  right: 20px;
}
</style>
