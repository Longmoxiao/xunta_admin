<template>
    <el-col>
        <el-card>
            <div>
                <span style="font-size:20px"><strong>举报审核
                    </strong></span>
            </div>
            <div style="margin-top: 20px;">
                <el-row :gutter="10" style="height:70px">
                    <label>&nbsp;用户ID：</label>
                    <el-input placeholder="输入用户ID" style="width: 220px;" v-model="userID" clearable></el-input>
                    <label style="padding-left:60px">举报类型：</label>
                    <el-select v-model="value" placeholder="不限">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <label style="padding-left:60px">被举报次数：</label>
                    <el-select v-model="value1" placeholder="不限" style="width: 180px;">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <label style="padding-left:10px"> - </label>&nbsp;
                    <el-select v-model="value2" placeholder="不限" style="width: 180px;">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="1.5" style="margin-top:5px">
                        <label>举报时间：</label>
                    </el-col>
                    <el-col :span="7">
                        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'today' }"
                            @click="selectToday">不限</el-button>&nbsp;&nbsp;&nbsp;
                        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'yesterday' }"
                            @click="selectYesterday">今天</el-button>&nbsp;&nbsp;&nbsp;
                        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'last7Days' }"
                            @click="selectLast7Days">昨天</el-button>&nbsp;&nbsp;&nbsp;
                        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'lastMonth' }"
                            @click="selectLastMonth">近三天</el-button>
                    </el-col>

                    <el-col :span="1.5" style="margin-top:5px">
                        <label>处理状态：</label>
                    </el-col>
                    <el-col :span="8">
                        <el-button class="quick-filter-button1" :class="{ 'active': activeQuickFilter1 === 'today1' }"
                            @click="selectToday1">不限</el-button>&nbsp;&nbsp;&nbsp;
                        <el-button class="quick-filter-button1"
                            :class="{ 'active': activeQuickFilter1 === 'yesterday1' }"
                            @click="selectYesterday1">今天</el-button>&nbsp;&nbsp;&nbsp;
                        <el-button class="quick-filter-button1"
                            :class="{ 'active': activeQuickFilter1 === 'last7Days1' }"
                            @click="selectLast7Days1">昨天</el-button>&nbsp;&nbsp;&nbsp;
                    </el-col>

                    <el-button type="primary" @click="getList" style="width: 120px;">查询</el-button>
                </el-row>
            </div>
        </el-card>

        <el-card style="margin-top: 10px;">
            <div class="station" style="height:555px">
                <p><strong>举报列表</strong></p>
                <!-- 切换表格 -->
                <el-table :data="currentTableData" border height="90%" stripe style="margin-top: 20px;">
                    <el-table-column type="index" width="150" label="序号"></el-table-column>
                    <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop"
                        :label="item.label" :width="item.width ? item.width : 150">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="查看详情">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination align="center" @current-change="handleCurrentChange" layout="prev, pager, next"
                    :total=this.pages>
                </el-pagination>
            </div>
        </el-card>
    </el-col>
</template>

<script>
import axios from 'axios';

export default {
    name: 'userMessage',
    data() {
        return {
            activeTab: 'highAppearance',
            pages: 100,
            userID: '',
            userName: '',
            value: '',
            value1: '',
            value2: '',
            value11: '',
            value12: '',
            radio1: '1',
            radio2: '1',
            radio3: '1',
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            activeQuickFilter: '',
            activeQuickFilter1: '',
            tableData: {
                highAppearance: [
                    { userId: '1234567', userName: '小马', reportType: '色情低俗', reportDescribe: 'V10', createTime: '2024-07-20 14:22', accountStatus: '封禁', isAccess: '已处理', orderId: '' },
                ],
                reflection: [
                    { userId: '1234568', userName: '小红', reportType: '300', reportDescribe: 'V6', createTime: '1234567890123456', accountStatus: '2024-07-20 14:22' },
                ],
            },
            tableLabel: [
                { prop: 'userId', label: '用户ID', width: 150 },
                { prop: 'userName', label: '用户昵称', width: 150 },
                { prop: 'reportType', label: '举报类型', width: 150 },
                { prop: 'reportDescribe', label: '举报描述', width: 200 },
                { prop: 'createTime', label: '举报时间', width: 250 },
                { prop: 'accountStatus', label: '账号状态', width: 200 },
                { prop: 'isAccess', label: '处理状态', width: 200 },
            ],
            options: [{
                value: '选项1',
                label: '虚假微信无法添加'
            }, {
                value: '选项2',
                label: '诈骗诱导转账'
            }, {
                value: '选项3',
                label: '引流下载其他APP付费'
            }, {
                value: '选项4',
                label: '敲诈勒索'
            }, {
                value: '选项5',
                label: '照片与本人不一致'
            },
            {
                value: '选项6',
                label: '色情低俗'
            },
            {
                value: '选项7',
                label: '微信非本人/微信与照片不一致'
            },
            {
                value: '选项8',
                label: '其他问题'
            }],
            options1: [{
                value: '选项1',
                label: '1'
            }, {
                value: '选项2',
                label: '2'
            }, {
                value: '选项3',
                label: '3'
            }, {
                value: '选项4',
                label: '4'
            }, {
                value: '选项5',
                label: '5'
            },
            {
                value: '选项6',
                label: '6'
            }],
            options2: [{
                value: '选项1',
                label: '1'
            }, {
                value: '选项2',
                label: '2'
            }, {
                value: '选项3',
                label: '3'
            }, {
                value: '选项4',
                label: '4'
            }, {
                value: '选项5',
                label: '5'
            },
            {
                value: '选项6',
                label: '6'
            }],
        };
    },
    computed: {
        currentTableData() {
            return this.tableData[this.activeTab];
        },
    },
    methods: {
        selectTab(tabName) {
            this.activeTab = tabName;
        },
        getList(){
            const _this = this;
            axios.get("/admin/reportOrder/queryReportOrder?userId="+ _this.userID+"&reportType&reportedCountMin&reportedCountMax&reportTime&reportStatus&page=1&pageSize=8")
                .then(function (response) {
                    let jsonData = response.data.data.records;
                    let i = 0;
                    let st1 = ""
                    for (let item in jsonData) {
                        let jc = jsonData[item].createTime
                        for (let jt in jc) {
                            st1 = st1 + String(jc[jt])
                            i = i + 1
                            if (i == '3') {
                                st1 = st1 + ' '
                            } else if (i == "6") {
                                st1 = st1 + ' '
                            } else if (i > 3) {
                                st1 = st1 + ':'
                            }
                            else {
                                st1 = st1 + '-'
                            }
                        }
                        jsonData[item].createTime = st1
                        st1 = ""
                        i = 0
                        if(jsonData[item].reportType==1){
                            console.log("1111")
                            jsonData[item].reportType="虚假微信无法添加"
                        }else if(jsonData[item].reportType==2){
                            jsonData[item].reportType="诈骗诱导转账";
                        }else if(jsonData[item].reportType==3){
                            jsonData[item].reportType="引流下载其他APP付费";
                        }else if(jsonData[item].reportType==4){
                            jsonData[item].reportType="敲诈勒索";
                        }else if(jsonData[item].reportType==5){
                            jsonData[item].reportType="照片与本人不一致";
                        }else if(jsonData[item].reportType==6){
                            jsonData[item].reportType="色情低俗";
                        }else if(jsonData[item].reportType==7){
                            jsonData[item].reportType="微信非本人/微信与照片不一致";
                        }else{
                            jsonData[item].reportType="其他问题";
                        }
                        _this.tableData.highAppearance = jsonData
                    }
                    console.log(jsonData)
                })
        },
        selectToday() {
            this.activeQuickFilter = 'today';
            this.value11 = new Date();
            this.value12 = new Date();
        },
        selectYesterday() {
            this.activeQuickFilter = 'yesterday';
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            this.value11 = yesterday;
            this.value12 = yesterday;
        },
        selectLast7Days() {
            this.activeQuickFilter = 'last7Days';
            const last7Days = new Date();
            last7Days.setDate(last7Days.getDate() - 7);
            this.value11 = last7Days;
            this.value12 = new Date();
        },
        selectLastMonth() {
            this.activeQuickFilter = 'lastMonth';
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            this.value11 = lastMonth;
            this.value12 = new Date();
        },
        selectToday1() {
            this.activeQuickFilter1 = 'today1';
            this.value11 = new Date();
            this.value12 = new Date();
        },
        selectYesterday1() {
            this.activeQuickFilter1 = 'yesterday1';
            const yesterday1 = new Date();
            yesterday.setDate(yesterday1.getDate() - 1);
            this.value11 = yesterday1;
            this.value12 = yesterday1;
        },
        selectLast7Days1() {
            this.activeQuickFilter1 = 'last7Days1';
            const last7Days1 = new Date();
            last7Days1.setDate(last7Days1.getDate() - 7);
            this.value11 = last7Days1;
            this.value12 = new Date();
        },
        handleClick(row) {
            this.$router.push({
                name: 'refcer',
                params: {
                    userId: row.userId,
                    userName: row.userName,
                    orderId: row.orderId,
                }
            });
            console.log(row)
        },
        init() {
            const _this = this;
            axios.get("/admin/reportOrder/queryReportOrder?userId&reportType&reportedCountMin&reportedCountMax&reportTime&reportStatus&page=1&pageSize=8")
                .then(function (response) {
                    let js = response.data.data.total;
                    _this.pages = js;
                    let jsonData = response.data.data.records;
                    let i = 0;
                    let st1 = ""
                    for (let item in jsonData) {
                        let jc = jsonData[item].createTime
                        for (let jt in jc) {
                            st1 = st1 + String(jc[jt])
                            i = i + 1
                            if (i == '3') {
                                st1 = st1 + ' '
                            } else if (i == "6") {
                                st1 = st1 + ' '
                            } else if (i > 3) {
                                st1 = st1 + ':'
                            }
                            else {
                                st1 = st1 + '-'
                            }
                        }

                        jsonData[item].createTime = st1
                        st1 = ""
                        i = 0
                        if(jsonData[item].reportType==1){
                            console.log("1111")
                            jsonData[item].reportType="虚假微信无法添加"
                        }else if(jsonData[item].reportType==2){
                            jsonData[item].reportType="诈骗诱导转账";
                        }else if(jsonData[item].reportType==3){
                            jsonData[item].reportType="引流下载其他APP付费";
                        }else if(jsonData[item].reportType==4){
                            jsonData[item].reportType="敲诈勒索";
                        }else if(jsonData[item].reportType==5){
                            jsonData[item].reportType="照片与本人不一致";
                        }else if(jsonData[item].reportType==6){
                            jsonData[item].reportType="色情低俗";
                        }else if(jsonData[item].reportType==7){
                            jsonData[item].reportType="微信非本人/微信与照片不一致";
                        }else{
                            jsonData[item].reportType="其他问题";
                        }
                        _this.tableData.highAppearance = jsonData

                    }

                })
        },
        handleCurrentChange(val) {
            const _this = this;
            axios.get("/admin/reportOrder/queryReportOrder?userId="+ _this.userID+"&reportType&reportedCountMin&reportedCountMax&reportTime&reportStatus&page=" + val + "&pageSize=8")
                .then(function (response) {
                    let jsonData = response.data.data.records;
                    let i = 0;
                    let st1 = ""
                    for (let item in jsonData) {
                        let jc = jsonData[item].createTime
                        for (let jt in jc) {
                            st1 = st1 + String(jc[jt])
                            i = i + 1
                            if (i == '3') {
                                st1 = st1 + ' '
                            } else if (i == "6") {
                                st1 = st1 + ' '
                            } else if (i > 3) {
                                st1 = st1 + ':'
                            }
                            else {
                                st1 = st1 + '-'
                            }
                        }

                        jsonData[item].createTime = st1
                        st1 = ""
                        i = 0
                        if(jsonData[item].reportType==1){
                            console.log("1111")
                            jsonData[item].reportType="虚假微信无法添加"
                        }else if(jsonData[item].reportType==2){
                            jsonData[item].reportType="诈骗诱导转账";
                        }else if(jsonData[item].reportType==3){
                            jsonData[item].reportType="引流下载其他APP付费";
                        }else if(jsonData[item].reportType==4){
                            jsonData[item].reportType="敲诈勒索";
                        }else if(jsonData[item].reportType==5){
                            jsonData[item].reportType="照片与本人不一致";
                        }else if(jsonData[item].reportType==6){
                            jsonData[item].reportType="色情低俗";
                        }else if(jsonData[item].reportType==7){
                            jsonData[item].reportType="微信非本人/微信与照片不一致";
                        }else{
                            jsonData[item].reportType="其他问题";
                        }
                        _this.tableData.highAppearance = jsonData

                    }


                })
        },
    },
    mounted() {
        this.init();
    }
};
</script>

<style scoped>
.check-header {
    padding: 20px;
}

.button-group {
    display: flex;
    margin-bottom: 20px;
}

.custom-button {
    margin: 0;
    border-radius: 0;
    border-width: 1px;
    border-color: #409eff;
    color: #409eff;
    background-color: #fff;
    margin-right: -1px;
}

.custom-button:last-child {
    margin-right: 0;
}

.custom-button.active {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;
}

.quick-filter-button {
    background-color: rgb(190, 190, 190);
    color: #ffffff;
}

.quick-filter-button.active {
    background-color: #409eff;
    color: #ffffff;
}

.quick-filter-button1 {
    background-color: rgb(190, 190, 190);
    color: #ffffff;
}

.quick-filter-button1.active {
    background-color: #409eff;
    color: #ffffff;
}
</style>