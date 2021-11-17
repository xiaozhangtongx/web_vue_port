<!--
 * @Description: 首页的基本布局
 * @Version: 1.0
 * @Author: xiaozhangtx
 * @Date: 2021-10-07 11:29:50
-->
<template>
  <div>
    <a-layout id="basiclayout">
      <a-layout-sider
        breakpoint="md"
        collapsed-width="0"
        @collapse="onCollapse"
      >
        <div class="logo">
          <h1 @click="$router.push('/main/home')">
            <a-icon type="read" /> 小张博客论坛
          </h1>
        </div>
        <SiderMenu />
      </a-layout-sider>

      <a-layout>
        <a-layout-header style="padding: 0">
          <Header />
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="textalign: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Footer from '@/layout/Footer'
import SiderMenu from '@/layout/SiderMenu'
import Header from '@/layout/Header'
export default {
  data() {
    return {}
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type)
    },
    onBreakpoint(broken) {
      console.log(broken)
    },
  },
  components: {
    Footer,
    Header,
    SiderMenu,
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }
    // console.log(this.$store.state)
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
}
</script>

<style lang="less" scoped>
#basiclayout {
  width: 100vw;
  height: 100vh;
  .logo {
    height: 9vh;
    h1 {
      text-align: center;
      font-weight: 700;
      font-size: 20px;
      line-height: 9vh;
      cursor: pointer;
      color: #fff;
    }
  }
}
.ant-layout-header {
  background-color: #001529;
  height: 9vh;
}
.ant-layout-content {
  // background-color: #fff;
  height: 80vh;
}
.ant-layout-footer {
  height: 6vh;
  margin: 0;
  padding: 0;
}
/deep/.ant-layout-sider-zero-width-trigger {
  top: 20vh;
  // background: #888;
}
</style>
