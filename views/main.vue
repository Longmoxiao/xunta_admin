<template>
<el-container style="height:100%">
  <el-aside width="auto">
      <CommonAside />
  </el-aside>
  <el-container>
    <el-header>
        <common-header />
    </el-header>
    <!-- <common-tag /> -->
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script >
import CommonAside from '../src/components/CommonAside.vue'
import CommonHeader from '../src/components/CommonHeader.vue'
// import CommonTag from '../src/components/CommonTag.vue'
export default{
    name:'vueMain',
    components:{
        CommonAside,
        CommonHeader,
    },
    data(){
        return{}
    }
}
</script>

<style lang="less" scoped>
.el-header{
    border-block: 1px;
    background-color: #fff;
}
.el-main{
    padding-top: 0;
}
</style>