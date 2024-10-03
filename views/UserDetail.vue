<template>
  <div>
    <div style="margin-bottom: 30px;">
      <el-button @click="goBack" type="text" icon="el-icon-arrow-left" class="back-button">用户详情
      </el-button>
    </div>
    <p><strong>用户ID：{{ userId }}</strong></p>
    <p><strong>用户昵称：{{ name }}</strong> </p>
    <p><strong>手机号码：{{ telephone }}</strong> </p>
    <p><strong>性别：{{ gender }}</strong> </p>
    <p><strong>年龄：{{ age }}</strong> </p>
    <p><strong>城市：{{ city }}</strong> </p>
    <p><strong>注册时间：{{ createTime }}</strong> </p>
    <p v-if="sex === '男'"><strong>贵族等级：{{ royalLevel }}</strong> </p>
    <p v-if="sex === '女'"><strong>认证等级：{{ certificationLevel }}</strong> </p>
    <p><strong>钱包余额：{{ wallet }}</strong> </p>
    <p><strong>账号状态：{{ accountStatus }}</strong> </p>
    <!-- Conditional display based on account status -->
    <p v-if="state !== '正常'"><strong>账号异常原因：{{ typeReason }}</strong> </p>
    <p v-if="state !== '正常'"><strong>账号恢复正常时间：{{ recoverTime }}</strong> </p>

    <div v-if="state !== '正常'" style="margin-top: 20px;">
      <el-button type="primary" @click="restoreAccount" style="margin-top: 20px;width: 200px;">恢复账号</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserDetail',
  data() {
    return {
      typeReason: '系统在2024-06-04 14:00:30检测到该账号存在诈骗诱导转账的违规行为，封禁账号3天。',
      recoverTime: '2024-06-0714:00:30'
    }
  },
  props: {
    userId: String,
    name: String,
    telephone: String,
    gender: String,
    age: String,
    city: String,
    createTime: String,
    royalLevel: String,
    certificationLevel: String,
    wallet: String,
    accountStatus: String
  },
  methods: {
    init(){
      const _this = this;
      axios.post('/admin/user/showOneUser', { userId: _this.$props.userId})
        .then(function (response) {
          let jsonData = response.data.data;
          _this.typeReason=jsonData.typeReason
          _this.recoverTime=jsonData.recoverTime
        })
    },
    goBack() {
      this.$router.push({ name: 'userList' });
    },
    restoreAccount() {
      // 实现恢复账号的逻辑
      console.log('恢复账号的逻辑');
    }
  },
  mounted() {
    this.init();
  },
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
</style>