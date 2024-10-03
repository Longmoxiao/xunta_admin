<template>
  <el-col>
    <el-card>
      <div>
        快速筛选
        <el-button style="margin-left: 50px;" class="quick-filter-button"
          :class="{ 'active': activeQuickFilter === 'week' }" @click="selectToday">一周内</el-button>
        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'yesterday' }"
          @click="selectYesterday">一个月内</el-button>
        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'last7Days' }"
          @click="selectLast7Days">贵族</el-button>
        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'lastMonth' }"
          @click="selectLastMonth">已认证</el-button>
        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'lastMonth' }"
          @click="selectLastMonth">女士</el-button>
        <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'lastMonth' }"
          @click="selectLastMonth">男士</el-button>
      </div>
      <div style="margin-top: 25px;">
        手机<el-input placeholder="输入手机号" style="width: 200px;margin-left: 5px;margin-right: 5px;" v-model="phone"
          clearable></el-input>
        性别<el-select ref="optionRef" v-model="sex" clearable placeholder="不限"
          style="margin-left: 5px;margin-right: 5px;">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        注册时间<el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
          :picker-options="pickerOptions1" style="margin-left: 5px;margin-right: 5px;"></el-date-picker>
        至<el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"
          style="margin-left: 5px;margin-right: 5px;"></el-date-picker>
      </div>

      <div style="margin-top: 20px;">
        用户ID<el-input placeholder="输入用户ID" style="width: 200px;margin-left: 5px;margin-right: 5px;" v-model="userID"
          clearable></el-input>
        贵族等级<el-select v-model="vip" clearable placeholder="不限" style="margin-left: 5px;margin-right: 5px;">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        认证等级<el-select v-model="certiRank" clearable placeholder="不限" style="margin-left: 5px;margin-right: 5px;">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        账号状态<el-select v-model="state" clearable placeholder="不限" style="margin-left: 5px;margin-right: 5px;">
          <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>

        <el-button type="primary" @click="getList" style="width: 120px;margin-left: 100px;">查询</el-button>
      </div>
    </el-card>

    <el-card style="margin-top:10px;">
      <div class="manage" style="height:491px">
        <el-table :data="tableData" border height="90%" stripe style="margin-top: 20px;">
          <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
            :width="item.width ? item.width : 130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <span class="demonstration"> </span>
          <el-pagination align="center" @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
import axios from 'axios';

export default {
  name: 'userList',
  data() {
    return {
      phone: '',
      userId: '',
      name: '',
      telephone: '',
      gender: '',
      age: '',
      city: '',
      createTime: '',
      activeQuickFilter: '',
      royalLevel: '',
      certificationLevel: '',
      wallet: '',
      accountStatus: '',
      options1: [{
        value: '选项1',
        label: '男'
      }, {
        value: '选项2',
        label: '女'
      }],
      sex: 0,
      userID: '',
      options2: [{ value: '选项1', label: 'V01' }, { value: '选项2', label: 'V02' }],
      vip: '',
      certiRank: '',
      options3: [{ value: '选项3', label: '未认证' }, { value: '选项1', label: '高颜' }, { value: '选项2', label: '真人' }],
      state: '',
      options4: [{ value: '选项1', label: '正常' }, { value: '选项2', label: '封禁' }, { value: '选项3', label: '限制' }],

      tableData: [{ userId: '123456', name: '小马', telephone: this.phone, gender: '男', age: '', city: '', createTime: '', royalLevel: '', certificationLevel: '', wallet: '', accountStatus: '正常', },
      { userId: '123457', name: '小红', telephone: '123456789', gender: '女', age: '23', city: '深圳', createTime: '', royalLevel: '', certificationLevel: '高颜认证', wallet: '40.50元', accountStatus: '封禁', sdah: '', }
      ],
      tableLabel: [{ prop: 'userId', label: '用户ID', width: 100 },
      { prop: 'name', label: '用户昵称', },
      { prop: 'telephone', label: '手机号码', },
      { prop: 'gender', label: '用户性别', width: "120" },
      { prop: 'age', label: '年龄', width: 100 },
      { prop: 'city', label: '城市', },
      { prop: 'createTime', label: '注册时间', width: 220 },
      { prop: 'royalLevel', label: '贵族等级', },
      { prop: 'certificationLevel', label: '认证等级', },
      { prop: 'wallet', label: '钱包余额', },
      { prop: 'accountStatus', label: '账号状态', },
      ]

    }
  },
  methods: {
    usercount() {
      const _this = this;
      axios.post('/admin/user/searchUserByPage', {
        page: '1', pageSize: '7',
        //  userId:_this.userID,
        // userId:'',
        // telephone:'',
        // gender:'',
        // startDate:'',
        // endDate:'',
        // royalLevel:'',
        // certificationLevel:'',
        // accountStatus:'', 
      })
        .then(function (response) {
          let jsonData = response.data.data.records;
          console.log(jsonData)
          let i = 0;
          let st1 = ""
          for (let item in jsonData) {
            let jc = jsonData[item].createTime
            if (jsonData[item].gender == '0') {
              jsonData[item].gender = '男'
            } else {
              jsonData[item].gender = '女'
            }
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
            _this.tableData = jsonData

          }

          console.log(_this.tableData)
        })
    },
    selectToday() {
      this.activeQuickFilter = 'week';
      this.$message('这是一条消息提示');
    },
    handleClick(row) {
      this.$router.push({
        name: 'UserDetail',
        params: {
          userId: row.userId,
          name: row.name,
          telephone: row.telephone,
          gender: row.gender,
          age: row.age,
          city: row.city,
          createTime: row.createTime,
          royalLevel: row.royalLevel,
          certificationLevel: row.certificationLevel,
          wallet: row.wallet,
          accountStatus: row.accountStatus
        }
      });
      console.log(row)
    },
    handleCurrentChange(val) {
      const _this = this;
      axios.post('/admin/user/searchUserByPage', { page: val, pageSize: '7' })
        .then(function (response) {
          let jsonData = response.data.data.records;
          let i = 0;
          let st1 = ""
          for (let item in jsonData) {
            let jc = jsonData[item].createTime
            if (jsonData[item].gender == '0') {
              jsonData[item].gender = '男'
            } else {
              jsonData[item].gender = '女'
            }
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
            _this.tableData = jsonData
          }
        })
    },
    getList() {
      const _this = this;
      var s11 ='0';
      if (_this.$refs.optionRef.selected.value == '选项一') s11 = '1'
      else s11='0'
        axios.post('/admin/user/searchUserByPage', {
          page: '1', pageSize: '7',
          // userId: _this.userID,
          // telephone: _this.phone,
          gender:s11,
          // startDate:'',
          // endDate:'',
          // royalLevel:'',
          // certificationLevel:'',
          // accountStatus:'', 
        })
          .then(function (response) {
            let jsonData = response.data.data.records;
            console.log(jsonData)
            let i = 0;
            let st1 = ""
            for (let item in jsonData) {
              let jc = jsonData[item].createTime
              if (jsonData[item].gender == '0') {
                jsonData[item].gender = '男'
              } else {
                jsonData[item].gender = '女'
              }
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
              _this.tableData = jsonData

            }

            console.log(_this.tableData)
          })
    }

  },
  mounted() {
    this.usercount();
  }

}
</script>

<style scoped>
.quick-filter-button {
  background-color: rgb(190, 190, 190);
  color: #ffffff;
}

.quick-filter-button.active {
  background-color: #409eff;
  color: #ffffff;
}
</style>
