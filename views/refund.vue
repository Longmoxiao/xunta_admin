<template>
  <div>
    <el-card>
      <label>消息管理-问答库管理</label>
      <el-button type="primary" @click="restoreAccount" style=" margin-left:1400px; width: 160px;">保存</el-button>
    </el-card>
    <div style="height:20px"></div>
    <el-row>
      <el-col span="12">
        <el-card style="height:380px">
          <label>常见问题(0)</label>&nbsp;&nbsp;
          <i class="el-icon-circle-plus-outline" style="color:#409EFF"></i>
          <div style="height:15px"></div>
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1"></el-input>
          <div style="height:5px"></div>
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1"></el-input>
          <div>
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
              <el-table-column prop="date" label="" width="100">
              </el-table-column>
              <el-table-column prop="address" label="">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col span="12">
        <el-card style="height:380px">
          <label>功能问题(0)</label>&nbsp;&nbsp;
          <i class="el-icon-circle-plus-outline" style="color:#409EFF"></i>
        </el-card>
      </el-col>
    </el-row>
    <div></div>
    <el-row>
      <el-col span="12">
        <el-card style="height:380px">
          <label>女用户(0)</label>&nbsp;&nbsp;
          <i class="el-icon-circle-plus-outline" style="color:#409EFF"></i>
        </el-card>
      </el-col>
      <el-col span="12">
        <el-card style="height:380px">
          <label>男用户(0)</label>&nbsp;&nbsp;
          <i class="el-icon-circle-plus-outline" style="color:#409EFF"></i>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>


export default {
  name: 'IframeContainer',

  data() {
    return {
      textarea1: '',
      textarea1: '',
      tableData: [{
          date: '问题：',
          address: '人工客服在线时间',
        }, {
          date: '回答：',
          address: '8点到10点'
        }, {
          date: '问题：',
          address: '人工客服在线时间',
        }, {
          date: '回答：',
          address: '8点到10点'
        },{
          date: '问题：',
          address: '人工客服在线时间',
        },{
          date: '问题：',
          address: '人工客服在线时间',
        },]
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>


<style scoped></style>
