<template>
    <div>
        <el-container>
            <el-header>
                <el-card>
                    <lmheader />
                </el-card>
            </el-header>
            <div style="height:70px"></div>

            <el-main>
                <el-card style="height:750px">
                    <div style="margin-top:30px;margin-left:100px;font-size:20px">
                        <label>注册时是否显示系统邀请码：</label>
                        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </div>

                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { init } from 'echarts';
import lmheader from '../src/components/lmheader.vue'
import axios from 'axios';

export default {
    name: 'lm3',
    components: {
        lmheader,
    },
    data() {
        return {
            value: true
        }
    },
    methods: {
        init() {
            const _this = this;
            axios.get("/admin/code/getCodeAndIsUse")
                .then(function (response) {
                    let jsonData = response.data.data;
                    if(jsonData.isUse =='0')
                    _this.value=false
                })
        }
    },
    mounted() {
        this.init();
    },

}
</script>
