<template>
    <div class="common-table">
        <el-table :data="tableData" height="90%" stripe>
            <el-table-column
                type="index"
                width="200" label="序号">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                v-for="item in tableLabel"
                :key="item.prop"
                :label="item.label"
                :width="item.width ?item.width:150"
            >
                <template slot-scope="scope">
                    <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作处理" min-width="180">
                 <el-button type="primary" icon="el-icon-edit" @click="handleEdit"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="handleDelete"></el-button>
            </el-table-column>
        </el-table>
        <!-- <el-pagination
            class="pager"
            layout="prev,pager,next"
            :total="config.total"
            :current-page.sync="config.page"
            @current-change="changePage"
        > </el-pagination> -->
    </div>
</template>

<script>
export default{
    name: 'CommonTable',
    props: {
        tableData:Array,
        tableLabel:Array,
        //config:Object
    },
    data(){
        return{}
    },
    methods: {
        handleEdit(row){
            this.$emit('edit',row)//拿到当前的数据对父组件进行了传递
        },
        handleDelete(row){
            this.$emit('edit',row)
        }

    }
}
</script>
<style lang="less" scoped>
.common-table{
    height: calc(100% -62px);
    background-color: #fff;
    position: relative;
}
.el-table__body-wrapper::-webkit-scrollbar {
	width: 0;
}
</style>