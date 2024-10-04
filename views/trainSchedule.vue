<template>
  <el-col>
    <el-card>
      <div class="check-header">
        <el-row style="margin-top: 20px;">
          <el-col :span="1.5" class="center-align">
            用户ID
            <el-input placeholder="输入用户ID" style="width: 200px;" v-model="userID" clearable></el-input>
          </el-col>
          <el-col :span="14.5">
            <strong style="margin-right: 10px;margin-left: 10px;">认证提交时间</strong>
            <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'allDays' }"
              @click="selectAllDays">不限</el-button>
            <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'today' }"
              @click="selectToday">今天</el-button>
            <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'yesterday' }"
              @click="selectYesterday">昨天</el-button>
            <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'last3Days' }"
              @click="selectLast3Days">近3天</el-button>
          </el-col>
          <el-button type="primary" @click="getList" style="width: 120px;margin-left: 100px;">查询</el-button>
        </el-row>
      </div>
    </el-card>

    <el-card style="margin-top:10px;">
      <!-- 两个按钮切换table -->
      <el-button @click="handleClick(scope.row)" type="text">代办列表</el-button>
      <el-button @click="handleClick(scope.row)" type="text">已审核</el-button>
      <div class="station" style="height:619px">
        <el-table :data="tableData" border height="90%" stripe style="margin-top: 20px;">
          <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
            :width="item.width ? item.width : 150">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">支付</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination align="center" @current-change="handleCurrentChange" layout="prev, pager, next" :total=this.pages>
        </el-pagination>
      </div>
    </el-card>
  </el-col>
</template>

<script>
import axios from 'axios';

export default {
  name: 'trainSchedule',
  data() {
    return {
      userID: '',
      pages:100,
      activeQuickFilter: 'allDays',
      tableData: [{ userId: this.userId, userName: '小马', account: '1234567', wallet: '500.00', createTime: '2024-07-20 15:58:38', status: '待审核' }],
      tableLabel: [
        {
          prop: 'userId',
          label: '用户ID',
          width: 220,
        },
        {
          prop: 'userName',
          label: '用户昵称',
          width: 220,
        },
        {
          prop: 'account',
          label: '支付宝账号',
          width: 220,
        },
        {
          prop: 'wallet',
          label: '钱包余额',
          width: 220,
        },
        {
          prop: 'amount',
          label: '本次体现金额',
          width: 225,
        },
        {
          prop: 'createTime',
          label: '申请提交时间',
          width: 270,
        },
        {
          prop: 'status',
          label: '审核状态',
          width: 240,
        },
      ]
    }
  },
  methods: {
    init() {
      const _this = this;
      axios.get("/admin/wallet/queryWithdrawalApplication?page=1&pageSize=9&userId&timeType=0&status=0")
        .then(function (response) {
          let jsonData = response.data.data.records;
          let js=response.data.data.total;
          _this.pages=js;
          for (let item in jsonData){
            if(jsonData[item].status=='0'){
              jsonData[item].status=='未审核'
            }
            if(jsonData[item].status=='1'){
              jsonData[item].status=='已审核'
            }
          }
          _this.tableData=jsonData
        })
    },
    selectAllDays() {
      this.activeQuickFilter = 'allDays';
    },

    selectToday() {
      this.activeQuickFilter = 'today';
    },
    selectYesterday() {
      this.activeQuickFilter = 'yesterday';
    },
    selectLast3Days() {
      this.activeQuickFilter = 'last3Days';
    },
    handleCurrentChange(val) {
      const _this = this;
      axios.get("/admin/wallet/queryWithdrawalApplication?page="+ val+ "&pageSize=9&userId="+_this.userID+"&timeType=0&status=0")
        .then(function (response) {
          let jsonData = response.data.data.records;
          for (let item in jsonData){
            if(jsonData[item].status=='0'){
              jsonData[item].status=='未审核'
            }
            if(jsonData[item].status=='1'){
              jsonData[item].status=='已审核'
            }
          }
          _this.tableData=jsonData
        })
    },
    getList(){
      const _this = this;
      axios.get("/admin/wallet/queryWithdrawalApplication?page=1&pageSize=9&userId="+_this.userID+"&timeType=0&status=0")
        .then(function (response) {
          let jsonData = response.data.data.records;
          for (let item in jsonData){
            if(jsonData[item].status=='0'){
              jsonData[item].status=='未审核'
            }
            if(jsonData[item].status=='1'){
              jsonData[item].status=='已审核'
            }
          }
          _this.tableData=jsonData
        })
    }
  },
  mounted() {
    this.init();
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