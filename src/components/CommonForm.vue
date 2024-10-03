<template>
    <!-- model与elementUI的form进行双向绑定 -->
    <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
        <el-input 
            v-if="item.type === 'input'"
            :placeholder="'请输入'+item.label"
            v-model="form[item.model]"
        ></el-input>

        <el-date-picker
            v-if="item.type === 'date'"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            v-model="form[item.model]"
        ></el-date-picker>

        <el-select
            v-if="item.type === 'select'"
            placeholder="请选择"
            v-model="form[item.model]"
        >
            <el-option
                v-for="item in item.opts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option> <!-- >value将下拉选择的赋值上去 -->
        </el-select>
    </el-form-item>
    <!-- 如果这些没有就自定义 -->
    <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>

<script>
    export default{
        name:'CommonForm',
        props:{
            formLabel: Array,//传入我们的一个配置数据
            form: Object,//由外部组件进行传入,传入后与commonform进行双向绑定
            inline: Boolean//表示form的布局

        },//用来接收参数
        data(){
            // ！！！data需要返回不能没有，不然报错，而且卡死，因为一直等待返回一个数据，但是又没有返回
            return{
                radio: '1'
            }
        } 
    }
</script>