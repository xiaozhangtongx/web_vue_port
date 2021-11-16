import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import findLast from 'lodash/findLast'
// import BasicLayout from '@/layout/BasicLayout'
import NotFound from '../views/error/404.vue'
import { notification } from 'ant-design-vue'
// import { check, isLogin } from '../utils/auth'

Vue.use(VueRouter)

const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: '/user',
  },
  // 用户登录注册
  {
    hideInMenu: true,
    path: '/user',
    redirect: '/user/login',
    component: () => import('../views/user/User.vue'),
    children: [
      // 用户登录
      {
        path: '/user/login',
        component: () => import('../views/user/Login.vue'),
      },
      // 用户注册
      {
        path: '/user/register',
        component: () => import('../views/user/Register.vue'),
      },
    ],
  },
  // 404页面
  {
    path: '*',
    hideInMenu: true,
    component: NotFound,
  },
  // 401页面
  {
    path: '/401',
    name: '401',
    hideInMenu: true,
    component: () => import('../views/error/401.vue'),
  },
]

const router = new VueRouter({
  routes,
})

// 路由守卫

NProgress.start()

router.afterEach(() => {
  NProgress.done()
})

export default router
