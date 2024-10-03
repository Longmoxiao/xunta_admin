<template>
    <div class="">
        <el-container>
            <el-header>
                <el-card>
                    <lmheader />
                </el-card>
            </el-header>
            <div style="height:70px"></div>

            <el-main>
                <el-card>
                    <el-row style="height:80px">
                        <el-col :span="6">
                            <label class="l1">个人标签名称</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-input v-model="input" placeholder="请输入内容" style="width:200px"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <label class="l1">适用性别</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-select v-model="sex" placeholder="不限">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="5">
                            <label class="l1">使用模块</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-select v-model="value1" placeholder="不限">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" offset="1">
                            &nbsp;&nbsp;&nbsp;
                            <el-button type="primary" @click="selectTab" style="width: 120px;margin-left: 100px;">搜索</el-button>
                        </el-col>
                        <el-col :span="4" offset="9">
                            &nbsp;&nbsp;&nbsp;
                            <el-button type="primary" style="width: 120px;margin-left: 100px;margin-top:50px"
                                @click="dialogVisible = true">+新建</el-button>
                            <el-dialog title="新建个人标签" :visible.sync="dialogVisible" center
                                style="width:800px;top:10%;left:32%;">
                                <div style="height:50px;font-size:18px">
                                    <label>个人标签名称</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <el-input v-model="input" placeholder="请输入内容" style="width:180px"></el-input>
                                </div>
                                <div style="height:40px;font-size:18px">
                                    <label>适用性别</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <el-radio v-model="radio" label="1" class="el1">男</el-radio>
                                    <el-radio v-model="radio" label="2" class="el1">女</el-radio>
                                </div>
                                <div style="font-size:18px">
                                    <label>使用模块</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <el-radio v-model="radio" label="1">技能</el-radio>
                                    <el-radio v-model="radio" label="2">外形</el-radio>
                                    <div></div>
                                    <el-radio v-model="radio" label="3" style="margin-left:99px">特点</el-radio>
                                    <el-radio v-model="radio" label="4">经历</el-radio>
                                    <div></div>
                                    <el-radio v-model="radio" label="5" style="margin-left:99px">偏好</el-radio>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false" style="margin-right:20px">取 消</el-button>
                                    <el-button type="primary" @click="dialogVisible = false" style="margin-left:20px">确
                                        定</el-button>
                                </span>
                            </el-dialog>
                        </el-col>
                    </el-row>
                    <div></div>

                    <el-table :data="tableData" border height="90%" stripe style="margin-top: 20px;height:472px">
                        <el-table-column show-overflow-tooltip v-for="item in tableLabel" align="center"
                            :key="item.prop" :label="item.label" :width="item.width ? item.width : 120">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="medium"
                                    style="margin-left:50px">修改</el-button>
                                <el-button @click="handleClick(scope.row)" type="text" size="medium"
                                    style="margin-left:130px">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div></div>
                    <el-pagination align="center" @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="7"
                            :total=this.pages>
                        </el-pagination>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios';
import lmheader from '../src/components/lmheader.vue'

export default {

    name: 'ticketSell',
    components: {
        lmheader,
    },
    data() {
        return {
            options: [{
                value: '选项1',
                label: '男'
            }, {
                value: '选项2',
                label: '女'
            }],
            options1: [{
                value: '选项1',
                label: '技能'
            }, {
                value: '选项2',
                label: '外形'
            }, {
                value: '选项3',
                label: '特点'
            }, {
                value: '选项4',
                label: '经历'
            }, {
                value: '选项5',
                label: '偏好'
            }],
            value: '',
            tableData: [{ tagsId: '1', typeName: '会钢琴', typeId: '技能', gender: '男', },
            { tagsId: '2', typeName: '会芭蕾', typeId: '技能', gender: '女', age: '23', }
            ],
            tableLabel: [{ prop: 'tagsId', label: '序号', width: "120" },
            { prop: 'typeName', label: '个人标签名称', width: "420" },
            { prop: 'gender', label: '适用性别', width: "420" },
            { prop: 'typeId', label: '使用模块', width: "420" },
            ],
            dialogVisible: false,
            pages:20,
            input:'',
            sex:'',
            value1:'',
        }
    },
    methods: {
        init() {
            const _this = this;
            axios.post('/admin/personalTag/search_tag', { page: '1', pageSize: '7' })
                .then(function (response) {
                    let js = response.data.data.total;
                    _this.pages=js
                    let jsonData = response.data.data.records;
                    for (let item in jsonData) {
                        let jc = jsonData[item].createTime
                        if (jsonData[item].gender == '1') {
                            jsonData[item].gender = '男'
                        } else {
                            jsonData[item].gender = '女'
                        }
                        if (jsonData[item].typeId == '1') {
                            jsonData[item].typeId = '技能'
                        } else if (jsonData[item].typeId == '2') {
                            jsonData[item].typeId = '外形'
                        } else if (jsonData[item].typeId == '3') {
                            jsonData[item].typeId = '特点'
                        } else if (jsonData[item].typeId == '4') {
                            jsonData[item].typeId = '经历'
                        } else {
                            jsonData[item].typeId = '偏好'
                        }
                        _this.tableData = jsonData
                    }
                })
        },
        handleCurrentChange(val) {
            const _this = this;
            axios.post('/admin/personalTag/search_tag', { page: val, pageSize: '7' })
                .then(function (response) {
                    let jsonData = response.data.data.records;
                    for (let item in jsonData) {
                        let jc = jsonData[item].createTime
                        if (jsonData[item].gender == '1') {
                            jsonData[item].gender = '男'
                        } else {
                            jsonData[item].gender = '女'
                        }
                        if (jsonData[item].typeId == '1') {
                            jsonData[item].typeId = '技能'
                        } else if (jsonData[item].typeId == '2') {
                            jsonData[item].typeId = '外形'
                        } else if (jsonData[item].typeId == '3') {
                            jsonData[item].typeId = '特点'
                        } else if (jsonData[item].typeId == '4') {
                            jsonData[item].typeId = '经历'
                        } else {
                            jsonData[item].typeId = '偏好'
                        }
                        _this.tableData = jsonData
                    }
                })
        },
        selectTab(){
            const _this = this
            axios.post('/admin/personalTag/search_tag', { page: '1', pageSize: '7',typeName: _this.input, typeId: _this.value1,gender :_this.sex})
                .then(function (response) {
                    let js = response.data.data.total;
                    _this.pages=js
                    let jsonData = response.data.data.records;
                    for (let item in jsonData) {
                        let jc = jsonData[item].createTime
                        if (jsonData[item].gender == '1') {
                            jsonData[item].gender = '男'
                        } else {
                            jsonData[item].gender = '女'
                        }
                        if (jsonData[item].typeId == '1') {
                            jsonData[item].typeId = '技能'
                        } else if (jsonData[item].typeId == '2') {
                            jsonData[item].typeId = '外形'
                        } else if (jsonData[item].typeId == '3') {
                            jsonData[item].typeId = '特点'
                        } else if (jsonData[item].typeId == '4') {
                            jsonData[item].typeId = '经历'
                        } else {
                            jsonData[item].typeId = '偏好'
                        }
                        _this.tableData = jsonData
                    }
                })
        }
    },
    mounted() {
        this.init();
    },

}

</script>

<style scoped>
.l1 {
    font-size: 18px;
    padding-left: 20px;
}

::v-deep .el1 .el-radio__input .el-radio__inner {
    border-radius: 2px;
}

::v-deep .el1 .el-radio__input.is-checked .el-radio__inner::after {
    content: '';
    width: 8px;
    height: 3px;
    border: 2px solid white;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: block;
    position: absolute;
    top: 2px;
    left: 1px;
    transform: rotate(-45deg);
    border-radius: 0px;
    background: none;
}
</style>
