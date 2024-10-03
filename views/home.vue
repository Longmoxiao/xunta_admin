<template>
  <div>
    <el-row :gutter="24">
      <el-card style="width: 98.5%;margin: 0 auto">
        <el-col :span="16">
          <strong>数据分析</strong>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="4">
              <el-card class="OrderCard">
                <p class="important-font">用户总数</p>
                <p class="secondary-font">{{ formattedTotal(totalUser) }}</p>
                <div class="small-font">较昨天
                  <p :class="{ 'increase': changeUser >= 0, 'decrease': changeUser < 0 }">
                    {{ formattedChangeValue(changeUser) }}
                    <i :class="{ 'el-icon-arrow-up': changeUser >= 0, 'el-icon-arrow-down': changeUser < 0 }"></i>
                  </p>
                </div>

                <div ref="chartUser" class="chart-content"></div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card class="OrderCard2">
                <p class="important-font">动态发表量</p>
                <p class="secondary-font">{{ formattedTotal(totalCricle) }}</p>
                <div class="small-font">较昨天
                  <p :class="{ 'increase': changeCricle >= 0, 'decrease': changeCricle < 0 }">
                    {{ formattedChangeValue(changeCricle) }}
                    <i :class="{ 'el-icon-arrow-up': changeCricle >= 0, 'el-icon-arrow-down': changeCricle < 0 }"></i>
                  </p>
                </div>

                <div ref="chartCricle" class="chart-content"></div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="OrderCard">
                <p class="important-font">日收入金额</p>
                <p class="secondary-font">{{ formattedTotal(totalMount) }}</p>
                <div class="small-font">较昨天
                  <p :class="{ 'increase': changeMount >= 0, 'decrease': changeMount < 0 }">
                    {{ formattedChangeValue(changeMount) }}
                    <i :class="{ 'el-icon-arrow-up': changeMount >= 0, 'el-icon-arrow-down': changeMount < 0 }"></i>
                  </p>
                </div>

                <div ref="chartMount" class="chart-content"></div>
              </el-card>
            </el-col>
          </el-row>

          <div style="margin-top:10px;">
            <el-row type="flex" justify="space-between">
              <el-col :span="12">
                <p><strong>新用户趋势</strong></p>
                <div ref="chart1" style="width: 400px; height: 350px;"></div>
              </el-col>
              <el-col :span="12">
                <p><strong>用户分布：年龄</strong></p>
                <div ref="chart2" style="width: 400px; height: 350px;"></div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <strong>审核待办</strong>
          <!-- 切换不同的table -->
          <div class="button-group" style="margin-top: 10px;">
            <el-button class="custom-button" :class="{ 'active': activeTab === 'highAppearance' }"
              @click="selectTab('highAppearance')" size="small">
              高颜认证
            </el-button>
            <el-button class="custom-button" :class="{ 'active': activeTab === 'reflection' }"
              @click="selectTab('reflection')" size="small">
              提现
            </el-button>
            <el-button class="custom-button" :class="{ 'active': activeTab === 'report' }" @click="selectTab('report')"
              size="small">
              举报
            </el-button>
          </div>

          <el-table :data="currentTableData" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column v-for="(val, key) in tableLabel1" :key="key" :prop="key" :label="val"
              width="140px"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-card>
    </el-row>

    <div style="margin-top:10px;"></div>
    <!-- 下半部分 -->
    <el-row :gutter="24">
      <!-- 左下角卡片占16 -->
      <el-col :span="16">
        <el-card>
          <el-row>
            <el-col :span="4">
              <strong>充值消费榜</strong>
            </el-col>
            <el-col :span="6">
              <el-button class="custom-button" :class="{ 'active': activeTab2 === 'day' }" @click="selectTab2('day')"
                size="small">日</el-button>
              <el-button class="custom-button" :class="{ 'active': activeTab2 === 'week' }" @click="selectTab2('week')"
                size="small">周</el-button>
              <el-button class="custom-button" :class="{ 'active': activeTab2 === 'month' }"
                @click="selectTab2('month')" size="small">月</el-button>
            </el-col>
            <el-col :span="10">
              <el-button @click="toMore" type="text" size="small">查看更多</el-button>
            </el-col>
          </el-row>

          <div style="margin-top:20px;">
            <!-- 左下角卡片的左边占12（一半） -->
            <el-row type="flex" justify="space-between">
              <el-col :span="16">
                <!-- 年月日表单 -->
                <el-table :data="upTableData" style="width: 100%">
                  <el-table-column type="index" label="排名"></el-table-column>
                  <el-table-column v-for="(val, key) in tableLabel2" :key="key" :prop="key" :label="val"
                    width="105"></el-table-column>
                </el-table>
              </el-col>
              <!-- 左下角卡片的右边边占12（一半） -->
              <el-col :span="12" style="margin-left: 70px;">
                <p><strong>趋势图</strong></p>
                <div ref="chart3" style="width: 500px; height: 350px;"></div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <!-- 右下角8 -->
      <el-col :span="8">
        <el-card>
          <strong>举报数据</strong>
          <div ref="chart4" style="width: 700px; height: 430px;"></div>
        </el-card>
      </el-col>


    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      i3: 0,
      totalUser: 12256,
      changeUser: 206,
      totalCricle: 1138,
      changeCricle: -405,
      totalMount: 4592,
      changeMount: 112,
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      chartUser: null,
      chartCricle: null,
      chartMount: null,
      activeTab: 'highAppearance', // 默认选中的标签
      activeTab2: 'day',
      tableData: {
        highAppearance: [
          { name: '魔法打败魔法', createTime: '2024-07-04 13:23' },
          { name: '王多余', createTime: '2024-07-04 13:23' },
          { name: '请叫我小李', createTime: '2024-07-04 13:23' }
        ],
        reflection: [
          { name: '反映内容1', createTime: '2024-07-04 14:00' },
          { name: '反映内容2', createTime: '2024-07-04 14:30' }
        ],
        report: [
          { name: '举报内容1', createTime: '2024-07-04 15:00' },
          { name: '举报内容2', createTime: '2024-07-04 15:30' }
        ]
      },
      tableLabel1: {
        name: '用户昵称',
        createTime: '提交时间'
      },
      upTableData: [{ name: '魔法打败魔法', totalAmount: '1500', totalConsume: '32', royalLevel: 'V10' }],
      tableLabel2: {
        name: '用户昵称',
        totalAmount: '充值金额',
        totalConsume: '消费金额',
        royalLevel: '当前贵族等级'
      },
      chart2data1: [1, 1],
      chart2data2: [1, 1],
      chart1data1: [],
      chart1data2: [1, 1],
      chart1data3: [1, 1],
      chart3data1: ['近1月', '近2月', '近3月', '近4月', '近5月', '近6月', '近7月'],
      chart3data2: [11, 1, 1, 1, 1, 1, 1],
      chart3data3: [1, 1, 1, 1, 1, 11, 11],
      chart4data1: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 0, name: 'Email' },
        { value: 0, name: 'Union Ads' },
        { value: 0, name: 'Video Ads' },
        { value: 0, name: 'Search Engine1' },
        { value: 0, name: 'Direct1' },
        { value: 0, name: 'Email1' },

      ],
    };
  },
  computed: {
    currentTableData() {
      return this.tableData[this.activeTab];
    },
  },
  methods: {
    usercount() {
      const _this = this;
      axios.get('/admin/dateCount/getUserCount')
        .then(function (response) {
          _this.totalUser = response.data.data.totalUsers;
          let lastElement = Object.values(response.data.data.userGrowthCurve)[Object.values(response.data.data.userGrowthCurve).length - 1];
          _this.changeUser = lastElement
        });

      axios.get('/admin/dateCount/getUserDistributionByAge')
        .then(function (response) {
          let jsonData = response.data.data;
          let i = 0;

          for (let item in jsonData) {
            _this.chart2data1[i] = jsonData[item].female
            _this.chart2data2[i] = jsonData[item].male
            i = i + 1;
          };
          _this.InitChart2();
        })

      axios.get('/admin/dateCount/getMonthlyNewUserTrend')
        .then(function (response) {
          let jsonData = response.data.data;
          let i = 0;
          var keys = Object.keys(jsonData);
          _this.chart1data1 = keys
          for (let item in keys) {
            keys[item] = keys[item].slice(5)
          };
          i = 0;
          for (let item in jsonData) {
            _this.chart1data2[i] = jsonData[item].female
            _this.chart1data3[i] = jsonData[item].male
            i = i + 1;
          };
          _this.InitChart1();
        });

      axios.get('/admin/dateCount/getCircleData')
        .then(function (response) {
          _this.totalCricle = response.data.data.totalCount;
          _this.changeCricle = response.data.data.compareCount;
        });

      axios.get('/admin/dateCount/getUserSubmissions')
        .then(function (response) {
          let jsonData = response.data.data
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
            _this.tableData.reflection = jsonData
          }
        });

      axios.get('/admin/dateCount/getCircleData')
        .then(function (response) {
          _this.totalCricle = response.data.data.totalCount;
          _this.changeCricle = response.data.data.compareCount;
        });

      axios.get('/admin/dateCount/getDailyRechargeConsumeRank')
        .then(function (response) {
          let jsonData = response.data.data
          for (let item in jsonData) {
            _this.upTableData = jsonData
          }
        });

      axios.get('/admin/dateCount/getReportStatistics')
        .then(function (response) {
          let i = 0;
          let jsonData = response.data.data
          const sd1 = _this.chart4data1
          for (let item in jsonData) {
            sd1[i].value = jsonData[item].reportCount
            if (jsonData[item].reportType == 1) {
              console.log("1111")
              jsonData[item].reportType = "虚假微信无法添加"
            } else if (jsonData[item].reportType == 2) {
              jsonData[item].reportType = "诈骗诱导转账";
            } else if (jsonData[item].reportType == 3) {
              jsonData[item].reportType = "引流下载其他APP付费";
            } else if (jsonData[item].reportType == 4) {
              jsonData[item].reportType = "敲诈勒索";
            } else if (jsonData[item].reportType == 5) {
              jsonData[item].reportType = "照片与本人不一致";
            } else if (jsonData[item].reportType == 6) {
              jsonData[item].reportType = "色情低俗";
            } else if (jsonData[item].reportType == 7) {
              jsonData[item].reportType = "微信非本人/微信与照片不一致";
            } else {
              jsonData[item].reportType = "其他问题";
            }
            sd1[i].name = jsonData[item].reportType
            i = i + 1
          }

          _this.chart4data1 = sd1

          _this.InitChart4()
        });


    },
    formattedTotal(total) {
      total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return total;
    },
    formattedChangeValue(value) {
      value = Math.abs(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return value;
    },
    InitUser() {
      // 初始化 ECharts 实例
      this.chartUser = echarts.init(this.$refs.chartUser)

      const colors = ['#5a88ef'];
      const option = {
        color: colors,
        xAxis: {
          type: 'category',
          show: false // 隐藏x轴
        },
        yAxis: {
          type: 'value',
          show: false // 隐藏y轴
        },
        series: [
          {
            name: '曲线',
            type: 'line',
            data: [20, 132, 91, 134, 90, 230, 100],
            smooth: true, // 平滑曲线
            symbol: 'none' // 去掉曲线上的空心圆
          }
        ]
      };

      // 使用配置项生成图表
      this.chartUser.setOption(option);
    },
    InitCricle() {
      // 初始化 ECharts 实例
      this.chartCricle = echarts.init(this.$refs.chartCricle)

      const colors = ['#90df65'];
      const option = {
        color: colors,
        xAxis: {
          type: 'category',
          show: false // 隐藏x轴
        },
        yAxis: {
          type: 'value',
          show: false // 隐藏y轴
        },
        series: [
          {
            name: '曲线',
            type: 'bar',
            data: [20, 132, 91, 134, 90, 230, 100],
            smooth: true, // 平滑曲线
            symbol: 'none' // 去掉曲线上的空心圆
          }
        ]
      };

      // 使用配置项生成图表
      this.chartCricle.setOption(option);
    },
    InitMount() {
      // 初始化 ECharts 实例
      this.chartMount = echarts.init(this.$refs.chartMount)

      const colors = ['#5a88ef'];
      const option = {
        color: colors,
        xAxis: {
          type: 'category',
          show: false // 隐藏x轴
        },
        yAxis: {
          type: 'value',
          show: false // 隐藏y轴
        },
        series: [
          {
            name: '曲线',
            type: 'line',
            data: [210, 32, 291, 134, 90, 130, 700],
            smooth: true, // 平滑曲线
            symbol: 'none' // 去掉曲线上的空心圆
          }
        ]
      };

      // 使用配置项生成图表
      this.chartMount.setOption(option);
    },
    InitChart1() {
      // 初始化 ECharts 实例
      this.chart1 = echarts.init(this.$refs.chart1)

      // 使用示例：设置图表配置项和数据
      // 使用示例：设置图表配置项和数据
      const colors = ['#5a88ef', '#74bbc5'];
      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['男性', '女性']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chart1data1
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
            type: 'line',
            data: this.chart1data2
          },
          {
            name: '女性',
            type: 'line',
            data: this.chart1data3
          }
        ]
      };

      // 将配置项设置到图表实例中
      this.chart1.setOption(option);
    },
    InitChart2() {
      // 初始化 ECharts 实例
      this.chart2 = echarts.init(this.$refs.chart2);


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
            data1: [203, 489, 290, 104, 131],
            data: this.chart2data1
          },
          {
            name: '女性',
            type: 'bar',
            data1: [193, 234, 310, 121, 134],
            data: this.chart2data2
          }
        ]
      };



      // 将配置项设置到图表实例中
      this.chart2.setOption(option, true);
    },
    InitChart3() {
      // 初始化 ECharts 实例
      this.chart3 = echarts.init(this.$refs.chart3)

      // 使用示例：设置图表配置项和数据
      const colors = ['#3a79f5', '#7dbffc'];
      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          // feature: {
          //   dataView: { show: true, readOnly: false },
          //   restore: { show: true },
          //   saveAsImage: { show: true }
          // }
        },
        legend: {
          data: ['充值', '消费']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            // prettier-ignore
            data: this.chart3data1,
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '充值',
            position: 'left',
            alignTicks: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ccc'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: { color: '#333', }
            }
          },
          {
            type: 'value',
            name: '消费',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ccc'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: { color: '#333', }
            }
          }
        ],
        series: [
          {
            name: '充值',
            type: 'bar',
            data: this.chart3data2
          },
          {
            name: '消费',
            type: 'line',
            yAxisIndex: 1,
            data: this.chart3data3,
          }
        ]
      };

      // 将配置项设置到图表实例中
      this.chart3.setOption(option, true);
    },
    InitChart4() {
      // 初始化 ECharts 实例
      this.chart4 = echarts.init(this.$refs.chart4)

      // 使用示例：设置图表配置项和数据
      const colors = ['#3a79f5', '#8bb8fb', '#d1e5fd', '#afd0fd', '#7dbffc'];
      const option = {
        color: colors,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'middle',
          right: '15%',
          orient: 'vertical'
        },
        series: [
          {
            name: '举报类型',
            type: 'pie',
            radius: ['35%', '65%'],
            center: ['30%', '50%'],  // 调整饼图的位置
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.chart4data1
          }
        ]
      };

      // 将配置项设置到图表实例中
      this.chart4.setOption(option);
    },
    selectTab(tabName) {
      this.activeTab = tabName;
    },
    selectTab2(tabName) {
      this.activeTab2 = tabName;
      const _this = this
      if (tabName == 'day') {
        axios.get('/admin/dateCount/getDailyRechargeConsumeRank')
          .then(function (response) {
            let jsonData = response.data.data
            for (let item in jsonData) {
              _this.upTableData = jsonData
            }
          });

        _this.chart3data1 = ['近1日', '近2日', '近3日', '近4日', '近5日', '近6日', '近7日']
        axios.get('/admin/dateCount/getDailyTrendsChart')
          .then(function (response) {
            let jsonData1 = response.data.data
            _this.chart3data2 = jsonData1.rechargeAmounts;
            _this.chart3data3 = jsonData1.consumeAmounts;
          });

        setTimeout(function () {
          _this.InitChart3()
        }, 300);

      }

      else if (tabName == 'week') {
        axios.get('/admin/dateCount/getWeeklyRechargeConsumeRank')
          .then(function (response) {
            let jsonData = response.data.data
            for (let item in jsonData) {
              _this.upTableData = jsonData
            }
          });

        _this.chart3data1 = ['近1周', '近2周', '近3周', '近4周', '近5周', '近6周', '近7周']
        axios.get('/admin/dateCount/getWeeklyTrendsChart')
          .then(function (response) {
            let jsonData1 = response.data.data
            _this.chart3data2 = jsonData1.rechargeAmounts
            _this.chart3data3 = jsonData1.consumeAmounts
          });

        setTimeout(function () {
          _this.InitChart3()
        }, 300);
      }

      else if (tabName == 'month') {
        axios.get('/admin/dateCount/getMonthlyRechargeConsumeRank')
          .then(function (response) {
            let jsonData = response.data.data
            for (let item in jsonData) {
              _this.upTableData = jsonData
            }
          });

        _this.chart3data1 = ['近1月', '近2月', '近3月', '近4月', '近5月', '近6月', '近7月']
        axios.get('/admin/dateCount/getMonthlyTrendsChart')
          .then(function (response) {
            let jsonData1 = response.data.data
            _this.chart3data2 = jsonData1.rechargeAmounts
            _this.chart3data3 = jsonData1.consumeAmounts
          });

        setTimeout(function () {
          _this.InitChart3()
        }, 300);
      }

      // 
    },
    handleClick(row) {
      console.log(row);
      // 在这里处理按钮点击事件的逻辑
    },
    toMore() {

    }


  },
  mounted() {
    this.usercount();
    this.InitUser();
    this.InitCricle();
    this.InitMount();
    this.InitChart1();
    this.InitChart2();
    this.InitChart3();
    this.InitChart4();
  }

};

</script>

<style scoped>
.button-group {
  display: flex;
  margin-bottom: 20px;
}

.custom-button {
  margin: 0;
  /* 去掉外边距 */
  border-radius: 0;
  /* 去掉圆角 */
  border-width: 1px;
  /* 设置边框宽度 */
  border-color: #409EFF;
  /* 边框颜色 */
  color: #409EFF;
  /* 默认字体色 */
  background-color: #fff;
  /* 默认背景色 */
  margin-right: -1px;
  /* 去掉按钮之间的缝隙 */
}

.custom-button:last-child {
  margin-right: 0;
  /* 最后一个按钮去掉右边距 */
}

.custom-button.active {
  background-color: #409EFF;
  /* 选中时的背景色 */
  border-color: #409EFF;
  /* 选中时的边框色 */
  color: #fff;
  /* 选中时的字体色 */
}

.OrderCard {
  border: #DCDFE6 1px solid;
  border-radius: 5px;
  margin-top: 20px;
  background-color: #edf7fe;
  width: 300px;
  height: 180px;
  position: relative;
}

.chart-content {
  width: 100px;
  height: 200px;
  position: absolute;
  bottom: -40px;
  right: 20px;
}

.OrderCard2 {
  border: #DCDFE6 1px solid;
  border-radius: 5px;
  margin-top: 20px;
  background-color: #f0fef0;
  width: 300px;
  height: 180px;
  position: relative;
}

.important-font {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

.secondary-font {
  font-size: 32px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
}

.small-font {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
  display: flex;
}

.increase {
  color: red;
  font-size: 14px;
  margin-left: 10px;
}

.decrease {
  color: green;
  font-size: 14px;
  margin-left: 10px;
}

.el-icon-arrow-up,
.el-icon-arrow-down {
  font-size: 14px;
  margin-right: 5px;
}
</style>
