<template>
    <div>
        <div style="margin-bottom: 30px;">
            <el-button @click="goBack" type="text" icon="el-icon-arrow-left" class="back-button">高颜认证审核详情
            </el-button>
        </div>

        <el-row style="height: 100px">
            <el-col :span="5">
                <div class="bg-purple">用户ID：{{ userId }}</div>
            </el-col>
            <el-col :span="5">
                <div class="bg-purple">用户昵称：{{ userName }}</div>
            </el-col>
            <el-col :span="2">
                <div class="bg-purple">性别：{{ sex }}</div>
            </el-col>
            <el-col :span="2">
                <div class="bg-purple">年龄：{{ age }}</div>
            </el-col>
            <el-col :span="4">
                <div class="bg-purple">QQ：{{ qq }}</div>
            </el-col>
            <el-col :span="4">
                <div class="bg-purple">微信：{{ qq }}</div>
            </el-col>
        </el-row>

        <el-row class="bg-purple">
            <el-col :span="2">
                <div>用户头像：</div>
            </el-col>
            <el-col :span="3">
                <div><el-image style="width: 160px; height: 160px; padding-top:15px" :preview-src-list="srcList"
                        :src="src"></el-image>
                </div>
            </el-col>
            <el-col :span="1">
                <div>相册：{{ userName }}</div>
            </el-col>
            <el-col :span="3">
                <div>
                    <el-image style="width: 160px; height: 160px; padding-top:15px" :preview-src-list="srcList"
                        :src="src"></el-image>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <el-image style="width: 160px; height: 160px; padding-top:15px" :preview-src-list="srcList"
                        :src="src"></el-image>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <el-image style="width: 160px; height: 160px; padding-top:15px" :preview-src-list="srcList"
                        :src="src"></el-image>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <el-image style="width: 160px; height: 160px; padding-top:15px" :preview-src-list="srcList"
                        :src="src"></el-image>
                </div>
            </el-col>
            <el-col :span="3">
                <el-image style="width: 160px; height: 160px; padding-top:15px" :preview-src-list="srcList"
                    :src="require('../src/assets/images/jiazai.png')"></el-image>
            </el-col>
            <el-col :span="1">
                <el-button @click="handleClick(scope.row)" type="text" size="small" class="h1">查看更多</el-button>
            </el-col>
        </el-row>

        <div style="height: 100px"></div>


        <el-row :gutter="0" style="height:250px">
            <el-col :span="2">
                <div class="bg-purple">待认证图片：</div>
            </el-col>
            <el-col :span="10">
                <el-image style="width: 140px; height: 140px; padding-top:25px; " :preview-src-list="srcList"
                    :src="src"></el-image>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-image style="width: 140px; height: 140px; padding-top:25px; " :preview-src-list="srcList"
                    :src="src"></el-image>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-image style="width: 140px; height: 140px; padding-top:25px; " :preview-src-list="srcList"
                    :src="src"></el-image>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-image style="width: 140px; height: 140px; padding-top:25px; " :preview-src-list="srcList"
                    :src="src"></el-image>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-col>
            <el-col :span="2">
                <div class="bg-purple">面容识别视频：</div>
            </el-col>
            <el-col :span="2">
                <div class="app">
                    <VideoPlayer />
                </div>
            </el-col>
        </el-row>

        <div class="l1">
            <label>AI分析结果：</label><label style="color:red">{{ result }}</label><label>，相似度</label><label>{{ result1 }}</label>
        </div>
        
        <div style="margin-top: 20px;">
            <el-button type="primary" @click="restoreAccount" style="margin-top: 20px; margin-left:320px; width: 200px;">认证通过</el-button>
            <el-button type="primary" @click="restoreAccount" style="margin-top: 20px; margin-left:520px; width: 200px;">认证不通过</el-button>
        </div>
    </div>
</template>

<script>
import VideoPlayer from '../src/components/VideoPlayer';

export default {
    name: 'appedit',
    components: {
        VideoPlayer
    },
    data() {
        return {
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            result: "不通过",
            result1: "20%",
            urls: [
                'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
            ],
            srcList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
        }
    },

    methods: {
        goBack() {
            this.$router.push({
                name: 'trainNumManage',
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

.bg-purple {
    font-size: 20px;
}

.h1 {
    font-size: 17px;
    font-weight: bold;
    position: relative;
    margin-left: -180px;
    top: 80px;
}

.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 25px;
    width: 170px;
}
.l1 {
    font-size: 20px;
    text-align: center;
}
</style>