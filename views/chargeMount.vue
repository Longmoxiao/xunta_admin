<template>
  <el-col>
    <el-card>
      <div>
        <span><strong>记录查询</strong></span>
      </div>
      <div style="margin-top: 20px;">
        <el-row :gutter="10">
          用户ID：
          <el-input placeholder="输入用户ID" style="width: 200px;" v-model="userID" clearable></el-input>
          用户昵称：
          <el-input placeholder="输入用户昵称" style="width: 200px;" v-model="userName" clearable></el-input>
        </el-row>

        <el-row :gutter="10" style="margin-top: 20px;">
          <el-col :span="1.5" class="center-align">
            支付时间
            <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-col>
          <el-col :span="5">
            至
            <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-col>
          <el-col :span="8">
            <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'today' }"
              @click="selectToday">今天</el-button>
            <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'yesterday' }"
              @click="selectYesterday">昨天</el-button>
            <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'last7Days' }"
              @click="selectLast7Days">近7天</el-button>
            <el-button class="quick-filter-button" :class="{ 'active': activeQuickFilter === 'lastMonth' }"
              @click="selectLastMonth">近一个月</el-button>
          </el-col>

          <el-button type="primary" @click="getList" style="width: 120px;">查询</el-button>
        </el-row>
      </div>
    </el-card>

    <el-card style="margin-top: 10px;">
      <div class="station">
        <p><strong>记录列表</strong></p>
        <!-- 切换表格 -->
        <div class="button-group" style="margin-top: 20px;">
          <el-button class="custom-button" :class="{ 'active': activeTab === 'highAppearance' }"
            @click="selectTab('highAppearance')" size="small">
            充值记录
          </el-button>
          <el-button class="custom-button" :class="{ 'active': activeTab === 'reflection' }"
            @click="selectTab('reflection')" size="small">
            消费记录
          </el-button>
        </div>
        <div style="height:470px">
          <el-table :data="currentTableData" border height="90%" stripe style="margin-top: 20px;">
            <el-table-column type="index" width="150" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
              :width="item.width ? item.width : 150">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination align="center" @current-change="handleCurrentChange" layout="prev, pager, next" :total=this.pages>
          </el-pagination>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script>
import axios from 'axios';

export default {
  name: 'chargeMount',
  data() {
    return {
      activeTab: 'highAppearance',
      actqf:0,
      userID: '',
      userName: '',
      value1: new Date(),
      value2: new Date(),
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      activeQuickFilter: '',
      tableData: {
        highAppearance: [
          { userId: '1234567', userName: '小马', recharge: '680', vip: 'V10', chargeID: '1234567890123456', date: '2024-07-20 14:22' },
        ],
        reflection: [
          { userId: '1234568', userName: '小红', recharge: '300', vip: 'V6', chargeID: '1234567890123456', date: '2024-07-20 14:22' },
        ],
      },
      tableLabel: [
        { prop: 'userId', label: '用户ID', width: 250 },
        { prop: 'userName', label: '用户昵称', width: 220 },
        { prop: 'money', label: '充值金额', width: 255 },
        { prop: 'royalLevel', label: '当前贵族等级', width: 210 },
        { prop: 'transactionId', label: '交易单号', width: 390 },
        { prop: 'time', label: '支付时间', width: 290 },
      ],
      pages:20,
    };
  },
  computed: {
    currentTableData() {
      return this.tableData[this.activeTab];
    },
  },
  methods: {
    init() {
      const _this = this;
      axios.get("/admin/wallet/queryRecharge?page=1&pageSize=7&userId&userName&transactionId&startTime&endTime&timeType")
        .then(function (response) {
          let js=response.data.data.total;
          _this.pages=js;
          let jsonData = response.data.data.records;
          console.log(jsonData)
          let i = 0;
          let st1 = ""
          for (let item in jsonData) {
            let jc = jsonData[item].time
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

            jsonData[item].time = st1
            st1 = ""
            i = 0
            _this.tableData.highAppearance = jsonData

          }

        });

        axios.get("/admin/wallet/queryConsumption?page=1&pageSize=7&userId&userName&transactionId&startTime&endTime&timeType")
        .then(function (response) {
          let js=response.data.data.total;
          _this.pages=js;
          let jsonData = response.data.data.records;
          console.log(jsonData)
          let i = 0;
          let st1 = ""
          for (let item in jsonData) {
            let jc = jsonData[item].time
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

            jsonData[item].time = st1
            st1 = ""
            i = 0
            _this.tableData.reflection = jsonData

          }

        });
    },
    selectTab(tabName) {
      this.activeTab = tabName;
    },
    formatDateTime(date, format) {
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
        a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
        A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
      };
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
          );
        }
      }
      return format;
    },
    getList() {
      const _this = this
      axios.get("/admin/wallet/queryRecharge?page=1&pageSize=7&userId="+ _this.userID +"&userName="+_this.userName+"&transactionId&startTime&endTime&timeType")
        .then(function (response) {
          let js=response.data.data.total;
          _this.pages=js;
          let jsonData = response.data.data.records;
          let i = 0;
          let st1 = ""
          for (let item in jsonData) {
            let jc = jsonData[item].time
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

            jsonData[item].time = st1
            st1 = ""
            i = 0
            _this.tableData.highAppearance = jsonData

          }
        });

        axios.get("/admin/wallet/queryConsumption?page=1&pageSize=7&userId="+ _this.userID +"&userName="+_this.userName+"transactionId&startTime&endTime&timeType")
        .then(function (response) {
          let js=response.data.data.total;
          _this.pages=js;
          let jsonData = response.data.data.records;
          console.log(jsonData)
          let i = 0;
          let st1 = ""
          for (let item in jsonData) {
            let jc = jsonData[item].time
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

            jsonData[item].time = st1
            st1 = ""
            i = 0
            _this.tableData.reflection = jsonData

          }

        });
    },
    selectToday() {
      this.activeQuickFilter = 'today';
      this.value1 = new Date();
      this.value2 = new Date();
    },
    selectYesterday() {
      this.activeQuickFilter = 'yesterday';
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.value1 = yesterday;
      this.value2 = yesterday;
    },
    selectLast7Days() {
      this.activeQuickFilter = 'last7Days';
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      this.value1 = last7Days;
      this.value2 = new Date();
    },
    selectLastMonth() {
      this.activeQuickFilter = 'lastMonth';
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      this.value1 = lastMonth;
      this.value2 = new Date();
    },
    handleCurrentChange(val) {
      const _this = this;
      axios.get("/admin/wallet/queryRecharge?page=" + val + "&pageSize=7&userId="+ _this.userID +"&userName="+_this.userName+"&transactionId&startTime&endTime&timeType")
        .then(function (response) {
          console.log(val)
          let jsonData = response.data.data.records;
          console.log(_this.tableData.highAppearance)
          console.log(jsonData)
          let i = 0;
          let st1 = ""
          for (let item in jsonData) {
            let jc = jsonData[item].time
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

            jsonData[item].time = st1
            st1 = ""
            i = 0
            _this.tableData.highAppearance = jsonData

          }

        });

        axios.get("/admin/wallet/queryConsumption?page=" + val + "&pageSize=7&userId="+ _this.userID +"&userName="+_this.userName+"&transactionId&startTime&endTime&timeType")
        .then(function (response) {
          console.log(val)
          let jsonData = response.data.data.records;
          console.log(_this.tableData.highAppearance)
          console.log(jsonData)
          let i = 0;
          let st1 = ""
          for (let item in jsonData) {
            let jc = jsonData[item].time
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

            jsonData[item].time = st1
            st1 = ""
            i = 0
            _this.tableData.reflection = jsonData

          }

        })
    }
  },
  mounted() {
    this.init();
  },
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
</style>