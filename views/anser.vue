<template>
    <div class="iframe-container">
      <iframe id="iframeContainer" :src="iframeUrl" frameborder="0" />
      <button class="float-button" @click="showDialog = true">?</button>
      <div v-if="showDialog" class="dialog-overlay">
        <div class="dialog-content">
          <h2>本项目集成腾讯智能客服</h2>
          <p>账号: {{ username }}</p>
          <p>密码: {{ appName }}</p>
          <p>使用说明: 如需更换客服人员请在腾讯云-即时通讯IM控制台-智能客服管理端-团队管理-成员自定义成员。</p>
          <p>控制台直通网站: https://console.cloud.tencent.com/im/ai-desk</p>
          <button @click="showDialog = false" class="closeButton">关闭</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'IframeContainer',
    props: {
      iframeUrl: {
        type: String,
        default: 'https://tccc.qcloud.com/agent/1600048468?source=desk_console'
      }
    },
    data() {
      return {
        showDialog: false, // 控制弹窗的显示和隐藏
        username: '1514896869@qq.com', // 可以根据实际情况从 Vuex 中获取用户名
        appName: 'Muv7rB7J' // 可以根据实际情况设置应用名称
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    watch: {
      'sidebar.opened': {
        handler: function() {
          this.initIframe()
        },
        immediate: true
      }
    },
    mounted() {
      this.initIframe()
      window.addEventListener('resize', this.initIframe)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.initIframe)
    },
    methods: {
      initIframe() {
        const iframeContainer = document.getElementById('iframeContainer')
        const deviceWidth = window.innerWidth
        const deviceHeight = window.innerHeight
        iframeContainer.style.width = `${deviceWidth}px`
        iframeContainer.style.height = `${deviceHeight - 110}px`
      }
    }
  }
  </script>
  
  
  <style scoped>
  .iframe-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  #iframeContainer {
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
  }
  
  .float-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }

  .closeButton{
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    width: 50px;
    height: 40px;
    font-size: 12px;
  }
  
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  </style>
  
  