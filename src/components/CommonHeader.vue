<template>
   <header>
       <div class="l-content">
           <el-breadcrumb  separator="-" >
                <el-breadcrumb-item  v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
</el-breadcrumb>
       </div>
       <div class="r-content">
           <el-dropdown trigger="click" szie="mini">
                <span>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
           </el-dropdown>
       </div>
    </header> 
</template>

<script>
import { mapState } from 'vuex'
export default{
    name:'CommonHeader',
    data(){
        return{ }
    },
    methods: {
        handleMenu(){
            this.$store.commit('collapseMenu')
        },
        changeMenu(item){
            // ！！！https://blog.csdn.net/zhumizhumi/article/details/103260900
            this.$router.push({ name: item.name}).catch(data =>{})
        },
        logOut(){
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            this.$router.push("/login").catch(data =>{})
        }
    },
    computed: {
        ...mapState({
            tags: state =>state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;/*左右居中*/
    align-items: center; /*上下居中*/
}
.l-content{
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 20px;
    }
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.h3{
    line-height: 30px;
}
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
        color: #000 !important;
}
</style> 




