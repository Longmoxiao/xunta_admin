<template>
    <div class="tabs">
        <!-- effect主题设置 closable删除设置 -->
        <el-tag
            v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name !=='home'"
            :effect="$route.name ===tag.name?'dark':'plain'"
            @click="changeMenu(tag)"
            @close="handleClose(tag,index)"
            size="small"
        >
             {{tag.label}}
        </el-tag>
       

    </div>
</template>

<script>
import { mapState,mapMutations} from 'vuex'
export default {
    name :'CommonTag',
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations({
            close :'closeTag'//从tab.js拿到的closeTag起别名
        }),//mapMutations调用tab.js的mutations,注入此页面
        changeMenu(item){
            this.$router.push({ name: item.name}).catch(data => {  })
        },
        handleClose(tag,index){
            const length = this.tags.length -1
            this.close(tag)
            if(tag.name !==this.$route.name){//如果与当前路由不一致，这个tag直接删掉,这个route不能加r
                return;
            }
            if(index === length){//如果点击的tag是最右侧的tag
                this.$router.push({
                    name: this.tags[index -1].name//向左跳转
                }).catch(data => {  })
            }else{
                this.$router.push({
                    name: this.tags[index ].name//向右跳转
                }).catch(data => {  })
            }
            
        }
    }
} 
</script>

<style lang="less" scoped>
.tabs {
    padding: 10px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;//移上去变小手
    }
}
</style>