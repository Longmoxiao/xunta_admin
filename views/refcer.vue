<template>
  <div>
    <el-card>
      <div style="margin-bottom: 12px;">
        <el-button @click="goBack" type="text" icon="el-icon-arrow-left" class="back-button">审核详情
        </el-button>
      </div>
      <label style="font-size:25px;padding-top:10px;font-weight: 600">被举报人信息</label>
      <div style="height:22px"></div>

      <label class="l1">用户ID：{{ userId }}</label>
      <label class="l1" style="padding-left:120px">用户昵称：{{ userName }}</label>
      <label class="l1" style="padding-left:120px">性别：{{ sex }}</label>
      <label class="l1" style="padding-left:120px">年龄：{{ age }}</label>
      <label class="l1" style="padding-left:120px">被举报次数：{{ num }}</label>
      <div style="height:22px"></div>

      <label class="l1" style="">贵族等级/认证等级：{{ level }}</label>
      <label class="l1" style="padding-left:230px">账号状态：{{ state1 }}</label>
      <label class="l1" style="padding-left:298px">被举报历史：</label>
      <div style="height:30px"></div>

      <el-row>
        <el-col :span="2">
          <div class="l1">用户头像：</div>
        </el-col>
        <el-col :span="3">
          <div><el-image style="width: 150px; height: 150px; " :preview-src-list="srcList" :src="src"></el-image>
          </div>
        </el-col>
        <el-col :span="9" :offset="7">
          <el-table :data="currentTableData" border height="90%" stripe style="margin-left:18px">
            <el-table-column width="165" prop="id" label="举报人ID"></el-table-column>
            <el-table-column width="165" prop="type1" label="举报类型"></el-table-column>
            <el-table-column width="165" prop="meth" label="对应惩罚"></el-table-column>
            <el-table-column width="166" prop="time1" label="处罚时间"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div style="height:22px"></div>

      <el-row>
        <el-col :span="2">
          <label class="l1">相册：</label>
        </el-col>
        <el-col :span="3">
          <div>
            <el-image style="width: 150px; height: 150px; " :preview-src-list="srcList" :src="src"></el-image>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <el-image style="width: 150px; height: 150px; " :preview-src-list="srcList" :src="src"></el-image>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <el-image style="width: 150px; height: 150px; " :preview-src-list="srcList" :src="src"></el-image>
          </div>
        </el-col>
      </el-row>
    </el-card>


    <el-card style="margin-top:15px">
      <div class="l1" style="height:50px;font-size:25px;font-weight: 600">举报详情</div>
      <el-row>
        <el-col :span="2">
          <label class="l1">举报类型</label>
          <div style="height:90px"></div>
          <label class="l1">举报描述</label>
        </el-col>
        <el-col :span="4">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}"  placeholder="请输入举报类型" v-model="textarea1" style="width:200px">
          </el-input>
          <div style="height:40px"></div>
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}"  placeholder="请输入举报描述" v-model="textarea2" style="width:200px"></el-input>
        </el-col>
        <el-col :span="2">
          <div class="l1">举报凭证：</div>
        </el-col>
        <el-col :span="10">
          <div>
            <el-image style="width: 130px; height: 130px; padding-top:40px" :preview-src-list="srcList" :src="src"></el-image>
            <el-image style="width: 130px; height: 130px; padding-top:40px;padding-left:80px" :preview-src-list="srcList" :src="src"></el-image>
          </div>
        </el-col>
        <el-col :span="4">
          <div v-if="state !== '正常'" style="margin-left:-50px">
            <el-button type="primary" @click="dialogTableVisible = true" style="margin-top: 20px;width: 200px;">处罚她</el-button>
            <el-dialog title="请选择处罚类型" :visible.sync="dialogTableVisible" center  style="width:700px;height:620px;top:10%;left:32%;">
              <el-radio-group v-model="radio">
                <el-radio v-model="radio" label="1" class="l2">站内消息警告</el-radio><div style="height:25px"></div>
                <el-radio v-model="radio" label="2" class="l2">限制聊天和发动态7天</el-radio><div style="height:25px"></div>
                <el-radio v-model="radio" label="3" class="l2">限制聊天和发动态1个月</el-radio><div style="height:25px"></div>
                <el-radio v-model="radio" label="4" class="l2">封禁账号3个月</el-radio><div style="height:25px"></div>
                <el-radio v-model="radio" label="5" class="l2">永久封禁</el-radio><div style="height:25px"></div>
              </el-radio-group>
              <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">我再想想</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确定处罚</el-button>
              </span>
            </el-dialog>
            <el-button type="primary" @click="restoreAccount" style="margin-top: 50px;width: 200px;margin-left:0px">不处罚</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'refcer',
  data() {
    return {
      orderId:'',
      activeTab: 'highAppearance',
      userName: '',
      userId: '',
      sex: '',
      age: '',
      num: '10',
      level: ' 高级认证',
      state1: '正常',
      abnormal: '系统在2024-06-04 14:00:30检测到该账号存在诈骗诱导转账的违规行为，封禁账号3天。',
      reTime: '2024-06-0714:00:30',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      tableData: {
        highAppearance: [
          { id: '1234567', type1: '小马', meth: '色情低俗', time1: '2024-07-20 14:22', },
        ],
        reflection: [
          { userID: '1234568', userName: '小红', recharge: '300', vip: 'V6', chargeID: '1234567890123456', date: '2024-07-20 14:22' },
        ],
      },
      textarea1: '',
      textarea2: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      radio: 3,
    }
  },
  props: {
    userId: String,
    userName: String,
    orderId: Number,
  },
  mounted() {
    this.userName = this.$route.params.userName;
    this.userId = this.$route.params.userId;
    this.userId = this.$route.params.userId;
    this.init();
  },
  computed: {
    currentTableData() {
      return this.tableData[this.activeTab];
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'userMessage' });
    },
    restoreAccount() {
      // 实现恢复账号的逻辑
      console.log('恢复账号的逻辑');
    },
    init(){
      const _this = this;
      axios.get("/admin/reportOrder/queryReportOrderDetails?reportId="+ _this.$route.params.orderId)
        .then(function (response) {
          let jsonData = response.data.data.records;
          
        })
    }
  }
}
</script>

<style scoped>
.back-button {
  color: black;
  /* Text color */
  font-weight: bold;
  /* Make text bold */
  font-size: 30px;
  /* Adjust font size as needed */
}

.l1 {
  font-size: 18px;
  font-weight: 500;
}
.l2{
  text-align: center;
  font-size: 21px;
  font-weight: 500;
  padding-left: 70px;
}

</style>