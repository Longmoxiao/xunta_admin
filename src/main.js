import Vue from 'vue'
import App from './App.vue'
//全局引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入路由
import router from '../router'
//引入vuex进行通信
import store from '../src/store';

//引入样式less，自己写的，导入index.less即可将所有的less文件导入项目
import './assets/less/index.less'
//API
import http from 'axios'
import axios from "axios";

axios.defaults.baseURL='http://47.121.201.78:8080/';

import 'default-passive-events'

//全局echart引入
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.use(echarts)


Vue.config.productionTip = false

Vue.use(ElementUI)





// //对路由进行一个监听，实现登录功能
// router.beforeEach((to,from,next) => {
//   store.commit('getToken')//用getToken反正页面刷新后丢失信息
//   const token=store.state.user.token
//   //如果token不存在，并且当前也不是登录页
//   if(!token && to.name !== 'login'){
//     next({ name: 'login'})//不让它进入我们系统
    
//   }else if(token && to.name === 'login'){
//     next({name: 'home'})
//   }
//   else{
//     next()
//   }
// })

Vue.prototype.$http=http
new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
