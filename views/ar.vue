<template>
    <div>
        <div style="height:100px">
            <el-button type="primary" @click="restoreAccount"
                style="margin-top: 20px; margin-left:120px; width: 200px;">新建回复</el-button>
        </div>
        <div style="height:80px">
            <label style="margin-left:320px;">自动回复时段：</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-time-picker is-range v-model="value1" range-separator="至" start-placeholder="开始时间"
                end-placeholder="结束时间" placeholder="选择时间范围">
            </el-time-picker>
        </div>
        <div>
            <el-cow>
                <el-col span="6">
                    <label style="margin-left:320px;margin-top:0px">自动回复内容:</label>
                </el-col>
                <el-col span="8">
                    <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="textarea" style="width:400px;">
                    </el-input>
                </el-col>
            </el-cow>
            
            
        </div>
    </div>
</template>

<script>


export default {
    name: 'ar',
    data() {
        return {
            value1: [new Date(2024, 9, 10, 8, 40), new Date(2024, 9, 10, 9, 40)],
             textarea: ''
        }
    }
}
</script>

<style scoped></style>