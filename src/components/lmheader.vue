<template>
  <div >
    <label style="font-size:22px;padding-left:20px;height:30px">内容管理-标签管理</label>
    <div style="font-size:20px">
      <el-menu :default-active="defaultActive" class="el-menu-demo"  mode="horizontal" @open="handleOpen"
    router
    @close="handleClose" >
      <el-menu-item index="lm1" @click="clickMenu()">个人标签管理</el-menu-item>
      <el-menu-item index="lm2" @click="clickMenu1()">气质类型管理</el-menu-item>
      <el-menu-item index="3" @click="clickMenu2()">他人印象管理</el-menu-item>
      <el-menu-item index="4" @click="clickMenu3()">邀请码管理</el-menu-item>
    </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lmheader',
  data() {
    return {
      activeIndex: '1',
      
    }
  },
  methods: {
    clickMenu(){
      this.$router.push({ name:'ticketSell'}
      ).catch(data => {  })
      this.$store.commit('selectMenu', item)  
    },
    clickMenu1(){
      this.$router.push({ name:'lm1'}
      )
    },
    clickMenu2(){
      this.$router.push({ name:'lm2'}
      )
    },
    clickMenu3(){
      this.$router.push({ name:'lm3'}
      )
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed:{
    defaultActive() {
        return this.$route.path
      }
  }
}
</script>

<style scoped>
.el-menu-demo {
  height: 72px;
  font-weight: bold;
}
.el-menu-item {
  font-size: 16px;
  height: 72px;
  line-height: 92px;
  color: #666666;
  transition: none !important; 
}

</style>