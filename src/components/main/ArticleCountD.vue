<!--
 * @Author: xiaozhangtx
 * @Date: 2021-11-18 18:54:03
 * @LastcountTime: 2021-11-19 14:59:35
 * @Lastcountors: Please set Lastcountors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webport\src\components\main\countArticleForm.vue
-->
<template>
  <div>
    <!-- 详情查看对话框 -->
    <el-dialog title="详情查看" :visible.sync="countDialogVisible" width="80vw"
      @colse="countDialogClosed">
      <ArticleCount ref="articlecount" />
    </el-dialog>
  </div>
</template>
<script>
import ArticleCount from '@/echarts/ArticleCount'
export default {
  data() {
    return {
      // 控制详情查看对话框显示/隐藏
      countDialogVisible: false,
    }
  },
  components: {
    ArticleCount,
  },
  methods: {
    // 打开对话框
    showcountArticleDialog() {
      this.countDialogVisible = true
      this.$refs.articlecount.getArticleCount()
    },
    // 关闭窗口
    countDialogClosed() {
      this.countDialogVisible = false
    },
  },
}
</script>
