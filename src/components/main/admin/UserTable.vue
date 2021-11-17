<template>
  <div>
    <!-- 查询区域 -->
    <a-form-model layout="inline" :model="infor">
      <a-form-model-item>
        <a-input v-model="infor.username" placeholder="用户名" />
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="infor.email" placeholder="用户邮箱" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" icon="search" @click="getUserList">
          查询
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <!-- 表单区域 -->
    <el-table :data="userList" stripe style="width: 100%; margin: 20px 0" border fit>
      <el-table-column type="index" align="center" />
      <el-table-column prop="username" label="用户名" align="center" />
      <el-table-column label="登录密码" align="center">
        <template slot-scope="scope">
          {{ scope.row.password+'' | formatupwd}}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="用户邮箱" align="center" />
      <el-table-column prop="birthday" label="用户生日" align="center">
        <template slot-scope="scope">
          {{ scope.row.birthday | formatdate}}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <a-space>
            <a-button type="primary" icon="edit" @click="editUser(scope.row.username)">
              修改
            </a-button>
            <a-button type="danger" icon="delete" @click="confirmDelet(scope.row.username)">
              删除
            </a-button>
          </a-space>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="infor.page" :page-size="infor.pageSize" :page-sizes="[1, 2, 5, 100]"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 用户修改对话框 -->
    <EditUser ref="editUser" />
  </div>
</template>

<script>
import moment from 'moment'
import EditUser from '@/components/main/admin/EditUser'
export default {
  data() {
    return {
      infor: {
        username: '',
        email: '',
        pageSize: 5,
        page: 1,
      },
      userList: [],
      total: 0,
    }
  },
  components: {
    EditUser,
  },
  created() {
    this.getUserList()
  },

  methods: {
    // 获得用户列表
    async getUserList() {
      const { data: res } = await this.$http.post('users', this.infor)
      console.log(res)
      if (res.code == 200) {
        this.userList = res.obj.users
        this.total = res.obj.total
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },

    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      console.log(this.infor.pageSize)
      this.infor.pageSize = newSize
      this.getUserList() // 数据发生改变重新申请数据
    },

    // 监听page改变的事件
    handleCurrentChange(newPage) {
      this.infor.page = newPage
      this.getUserList() // 数据发生改变重新申请数据
    },
    // 修改用户
    editUser(username) {
      this.$refs.editUser.showEditserDialog(username)
      console.log('edit')
    },
    // 确定是否删除用户
    confirmDelet(username) {
      this.$confirm({
        title: '此操作将永久删除该用户, 是否继续?',
        okText: '是',
        cancelText: '否',
        icon: 'exclamation-circle',
        onOk: () => {
          this.deleteUser(username)
        },
        onCancel: () => {
          this.$message.warn('你取消了删除操作')
        },
      })
    },
    async deleteUser(username) {
      const { data: res } = await this.$http.get('deleteuser?username=' + username)
      if (res.code == 200) {
        this.getUserList()
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
  },

  // 过滤器
  filters: {
    formatupwd(arg) {
      console.log(arg)
      return arg.replace(arg, '******')
    },
    formatdate(arg) {
      return moment(arg).format('YYYY-MM-DD')
    },
  },
}
</script>

<style scoped lang="less"></style>
