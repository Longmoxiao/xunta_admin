<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  router active-text-color="#409EFF" @open="handleOpen" @close="handleClose">
    <h3>app后台管理系统</h3>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>系统首页</template>
          <el-menu-item  v-for="item in systemHome" :index="item.path" :key="item.path" @click="clickMenu(item)">
          <i class="el-icon-document"></i>
          <span slot="title">{{item.label}}</span>
          </el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title"><i class="el-icon-message"></i>用户管理</template>
      <el-menu-item v-for="item in userManagement" :index="item.path" :key="item.path" @click="clickMenu(item)">
        <i class="el-icon-document"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title"><i class="el-icon-message"></i>审核管理</template>
      <el-menu-item v-for="item in auditManagement" :index="item.path" :key="item.path" @click="clickMenu(item)">
        <i class="el-icon-document"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title"><i class="el-icon-message"></i>内容管理</template>
      <el-menu-item v-for="item in contentManagement" :index="item.path" :key="item.path" @click="clickMenu(item)">
        <i class="el-icon-document"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title"><i class="el-icon-message"></i>消息管理</template>
      <el-menu-item v-for="item in messManagement" :index="item.path" :key="item.path" @click="clickMenu(item)">
        <i class="el-icon-document"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border: none;
    h3{
      color: #409EFF;
      text-align:center;
      line-height: 48px
    }
  }
  
</style>

<script>
  export default {
    data() {
      return {
        menu:[
          {
            path:'/home',
            name:'home',
            label:'工作台',
            icon:'s-home',
            url:'home.vue'
          },
          {
            path:'/chargeMount',
            name:'chargeMount',
            label:'充值消费记录',
            icon:'s-claim',
            url:'chargeMount.vue'
          },
          {
            path:'/userList',
            name:'userList',
            label:'用户列表',
            icon:'user',
            url:'userList.vue'
          },

          {
            path:'/trainNumManage',
            name:'trainNumManage',
            label:'高颜认证',
            icon:'s-shop',
            url:'trainNumManage.vue'
          },
          {
            path:'/trainSchedule',
            name:'trainSchedule',
            label:'提现审核',
            icon:'date',
            url:'trainSchedule.vue'
          },
          {
            path:'/userMessage',
            name:'userMessage',
            label:'举报管理',
            icon:'postcard',
            url:'userMessage.vue'
          },
          {
            path:'/trainQuery',
            name:'trainQuery',
            label:'邀请设置',
            icon:'set-up',
            url:'trainQuery.vue'
          },
          {
            path:'/ticketSell',
            name:'ticketSell',
            label:'标签管理',
            icon:'tickets',
            url:'ticketSell.vue'
          },
          {
            path:'/ar',
            name:'ar',
            label:'自动回复设置',
            icon:'delete',
            url:'ar.vue'
          },
          {
            path:'/refund',
            name:'refund',
            label:'问答库设置',
            icon:'delete',
            url:'refund.vue'
          },
          
          // {
          //   path:'/modifyTicket',
          //   name:'modifyTicket',
          //   label:'问答库设置',
          //   icon:'refresh-left',
          //   url:'modifyTicket.vue'
          // },
          {
            path:'/anser',
            name:'anser',
            label:'人工回复',
            icon:'refresh-left',
            url:'anser.vue'
          }    
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
      this.$router.push(//页面跳转
        {
          name:item.name
        }
      ).catch(data => {  })
      this.$store.commit('selectMenu', item)  
    }

  },

    computed:{
      systemHome() {
        return this.menu.filter(item => ['home', 'chargeMount'].includes(item.name));
      },
      userManagement() {
        return this.menu.filter(item => ['userList'].includes(item.name));
      },
      auditManagement() {
        return this.menu.filter(item => ['trainNumManage','trainSchedule','userMessage'].includes(item.name));
      },
      contentManagement() {
        return this.menu.filter(item => ['trainQuery','ticketSell'].includes(item.name));
      },
      messManagement() {
        return this.menu.filter(item => ['refund','anser','ar'].includes(item.name));
      },
      // noChildren(){
      //   console.log('asyncMenu'+this.asyncMenu); // 打印 asyncMenu 检查其内容
      //   // return this.asyncMenu.filter(item =>!item.Children)//过滤元组
      //  return this.menu.filter(item =>!item.Children)//过滤元组
      // },
      asyncMenu(){
        return this.$store.state.tab.menu
      }
    }
  }
</script>