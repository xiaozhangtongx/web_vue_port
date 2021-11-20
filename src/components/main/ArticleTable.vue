/*
 * @Derection: 文章列表
 * @Author: xiaozhangtx 
 * @Date: 2021-11-Th 12:14:30 
 * @Last Modified by:   xiaozhangtx 
 * @Last Modified time: 2021-11-Th 12:14:30 
 */
<template>
  <div>
    <a-card>
      <h2>文章管理</h2>
      <!-- 查询区域 -->
      <div class="search">
        <a-space>
          <a-button type="primary" icon="plus" style="background:#009688;border:none"
            @click="showAddArticles()">
            新增
          </a-button>
          <a-button type="primary" icon="bar-chart" @click=" showArticleCount">
            统计
          </a-button>
        </a-space>
        <a-space>
          <a-input v-model="infor.name" placeholder="请输入文章标题" />
          <a-button type="primary" icon="search" @click="getArticleList()">
            查询
          </a-button>
        </a-space>
      </div>

      <!-- 表单区域 -->
      <el-table :data="articleList" stripe style="width: 100%; margin: 20px 0" border fit>
        <el-table-column type="index" align="center" />
        <el-table-column prop="name" label="文章标题" align="center" />
        <el-table-column prop="content" label="文章内容" align="center" />
        <el-table-column prop="uploaded" label="发表时间" align="center" />
        <el-table-column prop="operation" label="操作" align="center">
          <template slot-scope="scope">
            <a-space>
              <a-button type="primary" icon="edit" @click="editArticle(scope.row)">
                修改
              </a-button>
              <a-button type="danger" icon="delete" @click="confirmDelet(scope.row.name)">
                删除
              </a-button>
            </a-space>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="infor.page" :page-size="infor.pageSize" :page-sizes="[1, 2, 3, 10]"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </a-card>
    <AddArticleForm ref="addarticle" />
    <EditArticle ref="aditarticle" />
    <ArticleCountD ref="articlecount" />
  </div>
</template>

<script>
import AddArticleForm from '@/components/main/AddArticleForm'
import EditArticle from '@/components/main/EditArticle'
import ArticleCountD from '@/components/main/ArticleCountD'
export default {
  data() {
    return {
      infor: {
        name: '',
        username: window.sessionStorage.getItem('nowuser'),
        pageSize: 3,
        page: 1,
      },
      articleList: [],
      total: 0,
    }
  },
  components: {
    AddArticleForm,
    EditArticle,
    ArticleCountD,
  },
  created() {
    this.getArticleList()
  },

  methods: {
    // 获得用户文章列表
    async getArticleList() {
      console.log(this.infor)
      const { data: res } = await this.$http.post('getarticles', this.infor)
      console.log(res)
      if (res.code == 200) {
        this.articleList = res.obj.records
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
      this.getArticleList() // 数据发生改变重新申请数据
    },

    // 监听page改变的事件
    handleCurrentChange(newPage) {
      this.infor.page = newPage
      this.getArticleList() // 数据发生改变重新申请数据
    },
    // 打开发表文章
    showAddArticles() {
      this.$refs.addarticle.showAddArticleDialog(this.infor.username)
    },
    // 修改用户文章
    editArticle(info) {
      this.$refs.aditarticle.showEditArticleDialog(info)
      console.log('editArticle')
    },
    // 确定是否删除用户文章
    confirmDelet(name) {
      this.$confirm({
        title: '此操作将永久删除该文章, 是否继续?',
        okText: '是',
        cancelText: '否',
        icon: 'exclamation-circle',
        onOk: () => {
          this.deleteArticle(name)
        },
        onCancel: () => {
          this.$message.warn('你取消了删除操作')
        },
      })
    },
    async deleteArticle(name) {
      const { data: res } = await this.$http.get('deletearticle?name=' + name)
      if (res.code == 200) {
        this.getArticleList()
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    showArticleCount() {
      this.$refs.articlecount.showcountArticleDialog()
    },
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
.search {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
