/*
 * @Description:
 * @Version: 1.0
 * @Author: xiaozhangtx
 * @Date: 2021-10-11 16:24:25
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import axios from 'axios'
import * as echarts from 'echarts'
import 'ant-design-vue/dist/antd.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/global.css'
import AFTableColumn from 'af-table-column'
import {
  Table,
  TableColumn,
  Pagination,
  Switch,
  Dialog,
  Input,
  Form,
  FormItem,
  Radio,
  DatePicker,
} from 'element-ui'

Vue.use(AFTableColumn)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(DatePicker)

Vue.use(Antd)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:9001'
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
