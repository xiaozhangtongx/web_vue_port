<template>
  <div>
    <!-- 添加文章对话框 -->
    <el-dialog title="发表文章" :visible.sync="addDialogVisible" width="50vh" @colse="addDialogClosed">
      <el-form :model="articleForm" :rules="articleFormRules" ref="articleFormRef" label-width="30%"
        width="90%">
        <!-- 文章名称 -->
        <el-form-item label="文章标题" prop="name">
          <el-input v-model="articleForm.name" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <!-- 文章内容 -->
        <el-form-item label="文章内容" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入文章内容"
            v-model="articleForm.email">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <a-button @click="addDialogVisible = false">取 消</a-button>
        <a-button type="primary" style="margin-left: 20px">确 定</a-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 控制添加文章对话框显示/隐藏
      addDialogVisible: false,
      // 添加文章信息
      articleForm: {
        name: '',
        content: '',
        updated: new Date(),
        username: '',
      },
      // 添加文章表单验证规则
      articleFormRules: {
        name: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 打开对话框
    showAddArticleDialog(username) {
      this.addDialogVisible = true
      this.articleForm.username = username
    },
    // 关闭窗口
    addDialogClosed() {
      this.$refs.articleFormRef.resetFields()
    },
    // 确认添加
    addArticleInfo() {
      this.$refs.articleFormRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) return
        console.log(this.articleForm)
        // 发起请求
        const { data: res } = await this.$http.put('adduser', this.articleForm)
        console.log(res)
        //隐藏
        this.addDialogVisible = false
        this.$parent.getArticleList()
      })
    },
  },
}
</script>
