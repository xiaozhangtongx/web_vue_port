<!--
 * @Description: 文件管理界面
 * @Version: 1.0
 * @Author: xiaozhangtx
-->
<template>
  <a-card>
    <h2>文章管理</h2>
    <ArticleTableA style="margin-top: 20px" />
  </a-card>
</template>

<script>
import ArticleTableA from '@/components/main/admin/ArticleTableA'
export default {
  name: 'Users',
  data() {
    return {}
  },
  methods: {},
  components: {
    ArticleTableA,
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

