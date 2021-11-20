<template>
  <div>
    <!-- 修改账号对话框 -->
    <el-dialog title="修改个人信息" :visible.sync="editDialogVisible" width="50vh"
      @colse="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="26%"
        width="95%">
        <!-- 账号名 -->
        <el-form-item label="账号名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="账号邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="账号生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday"
            value-format="yyyy-MM-dd" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <a-button @click="editDialogVisible = false">取 消</a-button>
        <a-button type="primary" @click="editUserInfo" style="margin-left: 20px">确 定</a-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 控制修改账号对话框显示/隐藏
      editDialogVisible: false,
      // 修改账号信息
      editForm: {},
      // 修改账号表单验证规则
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
      },
    }
  },
  methods: {
    // 打开对话框
    showEditserDialog(username) {
      this.editDialogVisible = true
      this.getUserByname(username)
    },
    async getUserByname(username) {
      const { data: res } = await this.$http.get('getuser?username=' + username)
      console.log(res)
      if (res.code == 200) {
        this.editForm = res.obj[0]
      }
    },
    // 关闭窗口
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 确认修改
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) return
        console.log(this.editForm)
        // 发起请求
        const { data: res } = await this.$http.put('edituser', this.editForm)
        console.log(res)
        //隐藏
        this.editDialogVisible = false
        console.log(this.$parent.$parent)
        this.$parent.$parent.showInfo()
      })
    },
  },
}
</script>
