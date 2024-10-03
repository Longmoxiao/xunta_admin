import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

export default new VueRouter({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('../views/main.vue'),
      redirect: '/home',
      children: [
        // 首页页面
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/home.vue')
        },
        // 充值消费记录
        {
          path: 'chargeMount',
          name: 'chargeMount',
          component: () => import('../views/chargeMount.vue')
        },
        // 系统用户页面
        {
          path: 'userList',
          name: 'userList',
          component: () => import('../views/userList.vue')
        },
        //用户详情页
        {
          path: 'UserDetail',
          name: 'UserDetail',
          component: () => import('../views/UserDetail.vue'),
          props: true
        },
        // 高颜认证界面
        {
          path: 'trainNumManage',
          name: 'trainNumManage',
          component: () => import('../views/appcer.vue')
        },
        // 列车行程安排页面
        {
          path: 'trainSchedule',
          name: 'trainSchedule',
          component: () => import('../views/trainSchedule.vue')
        },
        // 乘客信息管理
        {
          path: 'userMessage',
          name: 'userMessage',
          component: () => import('../views/userMessage.vue')
        },
        // 火车车次查询页面
        {
          path: 'trainQuery',
          name: 'trainQuery',
          component: () => import('../views/trainQuery.vue')
        },

        // 售票页面
        {
          path: 'ticketSell',
          name: 'ticketSell',
          component: () => import('../views/ticketSell.vue'),
        },
        // 退票页面
        {
          path: 'refund',
          name: 'refund',
          component: () => import('../views/refund.vue')
        },
        //改签
        {
          path: 'modifyTicket',
          name: 'modifyTicket',
          component: () => import('../views/modifyTicket')
        },
        //人工回复
        {
          path: 'anser',
          name: 'anser',
          component: () => import('../views/anser')
        },
        //高颜认证审核详情
        {
          path: 'appedit',
          name: 'appedit',
          component: () => import('../views/appedit.vue')
        },
        //举报管理详情
        {
          path: 'refcer',
          name: 'refcer',
          component: () => import('../views/refcer.vue')
        },
        //邀请管理详情
        {
          path: 'inide',
          name: 'inide',
          component: () => import('../views/inide.vue')
        },
         //个人标签管理
         {
          path: 'lm1',
          name: 'lm1',
          component: () => import('../views/lm1.vue')
        },
        //个人标签管理
        {
          path: 'lm2',
          name: 'lm2',
          component: () => import('../views/lm2.vue')
        },
         //个人标签管理
         {
          path: 'lm3',
          name: 'lm3',
          component: () => import('../views/lm3.vue')
        },
        {
          path: 'ar',
          name: 'ar',
          component: () => import('../views/ar.vue')
        },
        
      ]
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/login.vue')
    } 
  ]

});
