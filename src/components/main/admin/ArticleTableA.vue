/*
 * @Author: xiaozhangtx 
 * @Date: 2021-11-Th 08:42:55 
 * @Last Modified by:   xiaozhangtx 
 * @Last Modified time: 2021-11-Th 08:42:55 
 */

<template>
  <div>
    <!-- 查询区域 -->
    <a-form-model layout="inline" :model="infor">
      <a-form-model-item>
        <a-input v-model="infor.username" placeholder="用户名" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" icon="search" @click="getarticleList">
          查询
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <!-- 表单区域 -->
    <el-table :data="articleList" stripe style="width: 100%; margin: 20px 0" border fit>
      <el-table-column type="index" align="center" />
      <el-table-column prop="username" label="用户名" align="center" />
      <el-table-column prop="nums" label="文章数量" align="center" />
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <a-space>
            <a-button type="primary" icon="edit" @click="editArticle(scope.row.username)">
              进入文章管理
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
  </div>
</template>

<script>
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
      articleList: [],
      total: 0,
    }
  },
  components: {
    EditUser,
  },
  created() {
    this.getarticleList()
  },

  methods: {
    // 获得用户文章列表
    async getarticleList() {
      const { data: res } = await this.$http.post('articles', this.infor)
      console.log(res)
      if (res.code == 200) {
        this.articleList = res.obj.users.records
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
      this.getarticleList() // 数据发生改变重新申请数据
    },

    // 监听page改变的事件
    handleCurrentChange(newPage) {
      this.infor.page = newPage
      this.getarticleList() // 数据发生改变重新申请数据
    },

    // 进入文章管理页面
    editArticle(username) {
      this.$router.push('/main/articles')
      window.sessionStorage.setItem('nowuser', username)
    },
  },
}
</script>

<style scoped lang="less"></style>
