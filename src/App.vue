<template>
  <div id="app">
      <router-view></router-view> 
  </div>
</template>

<script>

export default {
   name: 'App',
  mounted () {
      // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
      window.addEventListener('hashchange', () => {
        let currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
