<template>
    <div ref="videoContainer" class="video-container">
      <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered" width="220" height="150" preload="auto" :data-setup="{}">
        <!-- 可以在这里插入source标签以指定你的视频源 -->
        <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
      </video>
    </div>
  </template>
  
  <script>
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  
  export default {
    name: 'VideoPlayer',
    data() {
      return {
        player: null
      };
    },
    mounted() {
      this.player = videojs(this.$refs.videoPlayer, {
        autoplay: false,
        controls: true,
        sources: [{
          src: 'https://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }],
      });
    },
    beforeUnmount() {
      if (this.player) {
        this.player.dispose();
      }
    }
  }
  </script>
  

  