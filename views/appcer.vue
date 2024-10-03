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
      <!-- <el-button @click="appeditClick()" type="text" size="small">详情</el-button> -->
      <div class="station" style="height:770px">
        <el-table :data="tableData" border height="90%" stripe style="margin-top: 20px;">
          <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
            :width="item.width ? item.width : 250">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button @click="appeditClick()" type="text" size="small">详情</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">不通过</el-button>
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
  name: 'trainNumManage',
  data() {
    return {
      pages:100,
      userID: '',
      activeQuickFilter: 'allDays',
      tableData: [{ userId: '1', name: '温柔型', imageAddresses: '技能', createTime: '男', },
      { userId: '2', name: '甜美型', imageAddresses: '技能', createTime: '女', }
      ],
      tableData1: [{ imageAddresses: '技能'},
      {imageAddresses: '技能' }
      ],
      tableLabel: [
        {
          prop: 'userId',
          label: '用户ID',
          width: 250
        },
        {
          prop: 'name',
          label: '用户昵称',
        },
        {
          prop: 'imageAddresses',
          label: '待认证图片',
          width: 450
        },
        {
          prop: 'createTime',
          label: '认证提交时间',
          width: 450
        },
      ]
    }
  },
  methods: {
    init() {
      const _this = this;
      axios.get('/admin/dateCount/getCertificationOrders')
        .then(function (response) {
          let jsonData = response.data.data;
          let st1 = ""
          let st2 =""
          let i = 0;
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

            st2=jsonData[item].imageAddresses[0]
            jsonData[item].imageAddresses=st2
            jsonData[item].createTime = st1
            st1 = ""
            i = 0
            _this.tableData = jsonData

          }
        });
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
    appeditClick() {
      this.$router.push({
        name: 'appedit',
      })
    },

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