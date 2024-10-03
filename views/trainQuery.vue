<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="14">
                    <div style="height:15px"></div>
                    <el-table :data="highAppearance" border height="90%" style="margin-left:18px;font-size:12px"
                        :cell-style="tableCellStyle" :header-cell-style="tableHeaderColor" :row-style="{ height: '0' }">
                        <el-table-column width="500" prop="id" label="用户获得奖励的要求"></el-table-column>
                        <el-table-column width="250" prop="type1" label="奖励方式"></el-table-column>
                        <el-table-column width="206" prop="meth" label="设置数额">
                            <div class="item" slot-scope="scope">
                                <el-input class="item__input" v-model="scope.row.date" placeholder=""></el-input>
                                <!-- <div class="item__txt">{{ scope.row.date }}</div> -->
                            </div>
                        </el-table-column>
                    </el-table>
                    <div style="height:20px"></div>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-button type="primary" @click="restoreAccount"
                        style="margin-top: 50px;width: 150px;margin-left:0px">编辑</el-button>
                    <div style="height:10px"></div>
                    <el-button type="primary" @click="restoreAccount"
                        style="margin-top: 50px;width: 150px;margin-left:0px">保存</el-button>
                </el-col>
            </el-row>
        </el-card>
        <div style="height:20px"></div>

        <el-card>
            <el-row>
                <el-col :span="6">
                    <label class="l1">邀请活动数据统计</label>
                    <div style="height:20px"></div>
                    <div style="margin-left:50px;height:60px">
                        <el-radio-group v-model="radio1">
                            <el-radio-button label="日"></el-radio-button>
                            <el-radio-button label="周"></el-radio-button>
                            <el-radio-button label="月"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <label class="l1">参与人数统计图</label>
                    <div style="height:30px"></div>
                    <div ref="chart2" style="width: 300px; height: 270px;margin-left:50px"></div>
                    <div style="margin-top:20px;margin-left:120px">
                        <label class="l2">转换率：10%</label>
                        <div></div>
                        <label class="l2">参与总人数：1989</label>
                        <div></div>
                        <label class="l2">奖励成本：2500T币</label>
                    </div>
                </el-col>
                <el-col :span="18">
                    <label class="l1">邀请活动数据统计</label>
                    <div style="height:513px">
                        <el-table :data="currentTableData" border height="90%" stripe style="margin-top: 20px;">
                            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop"
                                :label="item.label" :width="item.width ? item.width : 60">
                                <template slot-scope="scope">
                                    <span style="">{{ scope.row[item.prop] }}</span>
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
                </el-col>
            </el-row>
        </el-card>
    </div>

</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
    name: 'trainQuery',
    data() {
        return {
            highAppearance: [
                { id: '被邀请人男士，首次充值购买T币', type1: '返利X%的T币', },
                { id: '被邀请人男士在注册12个小时内，浏览她人主页达10个', type1: '接获得X个T币', },
                { id: '被邀请女士注册认证，通过真人认证，并提交高颇认证要求', type1: '接获得X个T币', },
            ],
            input: '',
            radio1: '时间',
            chart2: null,
            activeTab: 'highAppearance',
            tableData: {
                highAppearance: [
                    { userId: '1234567', userName: '11', invitedId: '123', gender: '男', registerTime: '2024-07-20 14:22', arriveRequireTime: '2024-07-20 14:22', inviteSumIncome: '1', sex: '男', age: '19' },
                ],
                reflection: [
                    { userId: '1234568', userName: '小红', invitedId: '300', gender: 'V6', registerTime: '1234567890123456', arriveRequireTime: '2024-07-20 14:22' },
                ],
            },
            tableLabel: [
                { prop: 'userId', label: '邀请人ID', width: 140 },
                { prop: 'userName', label: '邀请码', width: 140 },
                { prop: 'invitedId', label: '被邀请人ID', width: 140 },
                { prop: 'gender', label: '被邀请人性别', width: 130 },
                { prop: 'registerTime', label: '被邀请人注册时间时间', width: 240 },
                { prop: 'arriveRequireTime', label: '达到邀请要求时间', width: 190 },
                { prop: 'inviteSumIncome', label: '奖励发放T币数', width: 170 },
            ],
            pages: 100,
        }
    },
    methods: {
        /** 鼠标移入cell */
        handleCellEnter(row, column, cell, event) {
            const property = column.property
            if (this.editProp.includes(property)) {
                cell.querySelector('.item__input').style.display = 'block'
                cell.querySelector('.item__txt').style.display = 'none'
            }
        },
        /** 鼠标移出cell */
        handleCellLeave(row, column, cell, event) {
            const property = column.property
            if (this.editProp.includes(property)) {
                cell.querySelector('.item__input').style.display = 'none'
                cell.querySelector('.item__txt').style.display = 'block'
            }
        },
        // 改变某一列单元格背景颜色
        tableCellStyle({ row, column, rowIndex, columnIndex }) {
            if (columnIndex == 0) {
                return 'background:#DCDCDC !important;'
            }
            if (columnIndex == 1) {
                return 'background:#F5F5F5 !important'
            }
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            console.log(row, column, rowIndex, columnIndex);
            if (rowIndex === 0 && columnIndex === 0) {
                return 'background-color: #DCDCDC;';
            } else if (rowIndex === 0 && columnIndex === 1) {
                return 'background-color: #F5F5F5;';
            } else if (rowIndex === 0 && columnIndex === 2) {
                return '';
            }
        },
        InitChart2() {
            // 初始化 ECharts 实例
            this.chart2 = echarts.init(this.$refs.chart2)

            // 使用示例：设置图表配置项和数据
            const colors = ['#5a88ef', '#74bbc5'];
            const option = {
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['18~25岁', '26~35岁', '36~45岁', '46~55岁', '56~65岁']
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false, },
                    axisTick: { show: true, lineStyle: { color: '#ccc', } },// 刻度颜色
                    axisLabel: { show: true, textStyle: { color: '#333', } }// 标签颜色
                },
                series: [
                    {
                        name: '男性',
                        type: 'bar',
                        data: [203, 489, 290, 104, 131]
                    },
                    {
                        name: '女性',
                        type: 'bar',
                        data: [193, 234, 310, 121, 134]
                    }
                ]
            };

            // 将配置项设置到图表实例中
            this.chart2.setOption(option);
        },
        handleClick(row) {
            this.$router.push({
                name: 'inide',
                params: {
                    userId: row.userId,
                    userName: row.userName,
                    // phone: row.phone,
                    sex: row.sex,
                    age: row.age,
                    // city: row.city,
                    // registerTime: row.registerTime,
                    // gender: row.gender,
                    // certiRank: row.certiRank,
                    // balance: row.balance,
                    // state: row.state
                }
            });
            console.log(row)
        },
        Init() {
            const _this = this
            axios.get('/admin/invite/showAllOrder?page=1&pageSize=8')
                .then(function (response) {
                    let js = response.data.data
                    _this.pages = js.total
                    let jsonData = js.records
                    let i = 0;
                    let st1 = ""
                    for (let item in jsonData) {
                        let jc = jsonData[item].registerTime
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
                        if (jsonData[item].gender == '1') {
                            jsonData[item].gender = '男'
                        } else {
                            jsonData[item].gender = '女'
                        }
                        jsonData[item].registerTime = st1
                        st1 = ""
                        i = 0
                    }
                    _this.tableData.highAppearance = jsonData
                });
        },
        handleCurrentChange(val) {
            const _this = this
            axios.get('/admin/invite/showAllOrder?page='+ val+'&pageSize=8')
                .then(function (response) {
                    let js = response.data.data
                    _this.pages = js.total
                    let jsonData = js.records
                    let i = 0;
                    let st1 = ""
                    let i1 = 0;
                    let st11 = ""
                    for (let item in jsonData) {
                        let jc = jsonData[item].registerTime
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

                        let jc1 = jsonData[item].arriveRequireTime
                        for (let jt in jc1) {
                            st11 = st11 + String(jc1[jt])
                            i1 = i1 + 1
                            if (i1 == '3') {
                                st11 = st11 + ' '
                            } else if (i1 == "6") {
                                st11 = st11 + ' '
                            } else if (i1 > 3) {
                                st11 = st11 + ':'
                            }
                            else {
                                st11 = st11 + '-'
                            }
                        }

                        if (jsonData[item].gender == '1') {
                            jsonData[item].gender = '男'
                        } else {
                            jsonData[item].gender = '女'
                        }
                        jsonData[item].registerTime = st1
                        jsonData[item].arriveRequireTime = st11
                        st1 = ""
                        i = 0
                        st11 = ""
                        i1 = 0
                    }
                    _this.tableData.highAppearance = jsonData
                });
        }
    },
    mounted() {
        this.InitChart2();
        this.Init();
    },
    computed: {
        currentTableData() {
            return this.tableData[this.activeTab];
        },
    },
}
</script>

<style scoped>
::v-deep .item__input .el-input__inner {
    border: none !important;
    box-shadow: none !important;
    padding: 0px;
}

::v-deep .el-table .cell {
    display: inline-flex;
    align-items: center;
    height: 23px;
    width: 100%;
}

.l1 {
    margin-left: 50px;
    font-size: 22px;
    font-weight: 500;
}

.l2 {
    font-size: 20px;
    font-weight: 900;

}
</style>>
