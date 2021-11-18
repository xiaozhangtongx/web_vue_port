<!--
 * @Author: your name
 * @Date: 2021-11-18 12:37:18
 * @LastEditTime: 2021-11-18 17:40:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webport\src\components\main\UserInfo.vue
-->
<template>
  <div>
    <template>
      <a-descriptions title="用 户 信 息" bordered size="small"
        :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
        <a-descriptions-item label="用户名" :span="3">
          {{userInfo.username}}
        </a-descriptions-item>

        <a-descriptions-item label="邮箱" :span="3">
          {{userInfo.email}}
        </a-descriptions-item>

        <a-descriptions-item label="生日">
          {{userInfo.birthday| formatdate}}
        </a-descriptions-item>

        <a-descriptions-item label="余额">
          ￥ {{userInfo.money}}
        </a-descriptions-item>
      </a-descriptions>
    </template>

  </div>
</template>

<script>
import moment from 'moment'
export default {
  created() {
    this.getUserByname()
  },
  name: '',
  data() {
    return {
      username: window.sessionStorage.getItem('nowuser'),
      userInfo: {},
    }
  },
  methods: {
    async getUserByname() {
      const { data: res } = await this.$http.get('getuser?username=' + this.username)
      console.log(res)
      if (res.code == 200) {
        this.userInfo = res.obj[0]
      }
    },
  },
  // 过滤器
  filters: {
    formatdate(arg) {
      return moment(arg).format('YYYY-MM-DD')
    },
  },
}
</script>

<style scoped lang='less'>
div {
  margin-bottom: 1.5vh;
}
/deep/.ant-descriptions-title {
  font-size: 20px;
  text-align: center;
}
</style>