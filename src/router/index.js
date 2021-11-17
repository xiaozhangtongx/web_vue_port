import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import findLast from 'lodash/findLast'
import BasicLayout from '@/layout/BasicLayout'
import NotFound from '../views/error/404.vue'
import { notification } from 'ant-design-vue'
import { check, isLogin } from '../utils/auth'

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
  // 系统主页面
  {
    path: '/main',
    name: 'Main',
    redirect: '/main/home',
    meta: { authority: ['user', 'admin'] },
    component: BasicLayout,
    children: [
      // 系统首页
      {
        path: '/main/home',
        meta: { icon: 'home', title: '系统首页' },
        name: 'Home',
        component: () => import('../views/main/Home.vue'),
      },
      // 用户管理页面
      {
        path: '/main/users',
        meta: {
          icon: 'team',
          title: '用户管理',
          authority: ['admin'],
        },
        name: 'Users',
        component: () => import('../views/main/admin/Users.vue'),
      },
      // 管理员文章管理页面
      {
        path: '/main/aarticles',
        meta: {
          icon: 'read',
          title: '文章管理',
          authority: ['admin'],
        },
        name: 'Aarticles',
        component: () => import('../views/main/admin/Aarticles.vue'),
      },
      // 用户文章详细信息页面
      {
        path: '/main/articled',
        hideInMenu: true,
        component: () => import('../views/main/admin/ArticleDetail.vue'),
      },
      // 用户个人文章管理页面
      {
        path: '/main/uarticles',
        meta: {
          icon: 'read',
          title: '文章管理',
          authority: ['user'],
        },
        name: 'Uarticles',
        component: () => import('../views/main/users/Uarticles.vue'),
      },
      // 个人中心页面
      {
        path: '/main/account',
        meta: {
          icon: 'user',
          title: '个人中心',
          authority: ['user', 'admin'],
        },
        name: 'Accounts',
        component: () => import('../views/main/Account.vue'),
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
router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start()
  }
  if (to.path == '/user/login') return next()
  const store = window.sessionStorage.getItem('store')
  var storeobj = JSON.parse(store)
  console.log(storeobj)
  if (storeobj.user == null) {
    notification.error({
      message: '401',
      description: '你没有权限访问，请登录后再访问。',
    })
    next('/user/login')
  }
  const record = findLast(to.matched, (record) => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login',
      })
    } else if (to.path !== '/401') {
      notification.error({
        message: '401',
        description: '你没有权限访问，请联系管理员咨询。',
      })
      next({
        path: '/401',
      })
    }
    NProgress.done()
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
