<template>
    <div class="center">
        <div class="logon">
            <div :class="overlaytitle">
				<!-- <div class="overlaytitle-Signin" v-if="disfiex == 1">
					<h2 class="overlaytitleH2">Hello,Friend!</h2>
					<p class="overlaytitleP">
						Enter your personal details and start journey with us
					</p>
					<div class="buttongohs" @click="Signin">去注册</div>
				</div> -->
				<div class="overlaytitle-Signup" v-if="disfiex == 0">
					<h2 class="overlaytitleH2">欢迎使用</h2>
					<p class="overlaytitleP">xxx</p>
					<!-- <div class="buttongohs" @click="Signup">去登录</div> -->
				</div>
			</div>

			<div :class="overlaylong">
                <el-form
                    :model="form"
                    status-icon
                    :rules="rules"
                    ref="form"
                    label-width="100px"
                    class="overlaylong-Signin"
                    v-if="disfiex == 0"
                >
                    <h2 class="overlaylongH2">用户登录</h2>
                    <el-form-item
                        label="手机号"
                        label-width="80px"
                        prop="username"
                        
                    >
                        <el-input type="input" v-model="form.txtTelephone" auto-complete="off" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="密码"
                        label-width="80px"
                        prop="password"
                    >
                        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    
                    <h3>Forgot your password?</h3>
                    <button class="inupbutton" @click="login">登录</button>
                </el-form>
            </div>

            
        </div>

    </div>

</template>

<script >
import axios from 'axios';
import HttpRequest from '../API/axios'; // 引入封装好的HttpRequest类

export default{
    name:'vueLogin',
    data(){
        return{
            overlaylong: 'overlaylong',
			overlaytitle: 'overlaytitle',
			disfiex: 0,
            form:{

            },
            rules:{//表单校验
                txtTelephone:[
                    {required: true,message:"请输入手机号",trigger: "blur"},
                    {
                        min:3,
                        message:"用户名长度不能小于三位",
                        trigger:"blur"
                    }
                ],
                password:[
                    {required: true,message:"请输入密码",trigger: "blur"},

                ]

            }
        }
    },
    methods:{
		// login(){
        //     const _this = this;
        //     // 用户登录http://47.121.203.18:8080/admin/login/password
		// 	axios.post('/admin/login/password',{account:_this.form.txtTelephone,password:_this.form.password})
        //         .then(function(response){
		// 			if(response.data.code == '1'){
		// 				sessionStorage.setItem("userId", response.data.data.username);
		// 				_this.$router.push({name:'home'}).catch(data => {});
		// 			}else{
        //                 _this.$alert('网络连接断开', '登录失败', {confirmButtonText: '确定'});
        //             }
        //             // if(response.data.code == '1'){
        //             //     // window.telephone = _this.form.txtTelephone;
        //             //     // window.adminName = response.data.data['name'];
        //             //     sessionStorage.setItem("telephone", _this.form.txtTelephone);
        //             //     sessionStorage.setItem("adminName", response.data.data.username);
        //             //     methods.deleteAll();
        //             //     _this.$router.push({name:'adminPage'}).catch(data => {});
        //             // }else{
        //             //     _this.error();
        //             // }
        //         })
        // },
		login(){
            const _this = this;
            // 用户登录http://47.121.203.18:8080/admin/login/password
			axios.post('/admin/login/password',{account:'admin',password:'admin'})
                .then(function(response){
					if(response.data.code == '1'){
						sessionStorage.setItem("userId", response.data.data.username);
						_this.$router.push({name:'home'}).catch(data => {});
					}else{
                        _this.$alert('网络连接断开', '登录失败', {confirmButtonText: '确定'});
                    }
                    
                })
        },
        Signin() {
				this.overlaylong = "overlaylongleft"
				this.overlaytitle = "overlaytitleright"
				setTimeout(() => {
					this.disfiex = 1
				}, 200)
			},
			Signup() {
				this.overlaylong = "overlaylongright"
				this.overlaytitle = "overlaytitleleft"
 
				setTimeout(() => {
					this.disfiex = 0
				}, 200)
 
			}
    }
}
</script>

<style lang="less" scoped>
.center {
		width: 1920px;
		height: 950px;
		background-image: url('../src/assets/login.jpeg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}



h1 {
		font-size: 35px;
		color: rgb(57, 49, 49);
	}
 
	.logon {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		/* position: relative;
		overflow: hidden; */
		width: 768px;
		max-width: 100%;
		min-height: 480px;
		margin-top: 20px;
		display: flex;
		background: -webkit-linear-gradient(right, #29eac4, #0b3265);
		opacity:0.8;
	}
 
	.overlaylong {
		border-radius: 10px 0 0 10px;
		width: 50%;
		height: 100%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
	.overlaylongleft {
		border-radius: 0px 10px 10px 0px;
		width: 50%;
		height: 100%;
		background-color: #fff;
		transform: translateX(100%);
		transition: transform 0.6s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
	.overlaylongright {
		border-radius: 10px 0 0 10px;
		width: 50%;
		height: 100%;
		background-color: #fff;
		transform: translateX(0%);
		transition: transform 0.6s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
	.overlaytitle {
		border-radius: 0px 10px 10px 0px;
		width: 50%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		align-items: center;
		justify-content: center;
	}
 
 
	.overlaytitleH2 {
		font-size: 30px;
		color: #fff;
		margin-top: 20px;
	}
 
	.overlaytitleP {
		font-size: 15px;
		color: #fff;
		margin-top: 20px;
	}
 
	.overlaytitleleft {
		border-radius: 0px 10px 10px 0px;
		width: 50%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		align-items: center;
		justify-content: center;
		transform: translateX(0%);
		transition: transform 0.6s ease-in-out;
	}
 
	.overlaytitleright {
		border-radius: 0px 10px 10px 0px;
		width: 50%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		align-items: center;
		justify-content: center;
		transform: translateX(-100%);
		transition: transform 0.6s ease-in-out;
	}
 
	.overlaytitle-Signin {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	.overlaytitle-Signup {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	.buttongohs {
		width: 180px;
		height: 40px;
		border-radius: 50px;
		border: 1px solid #fff;
		color: #fff;
		font-size: 15px;
		text-align: center;
		line-height: 40px;
		margin-top: 40px;
	}
 
	.overlaylongH2 {
		font-size: 25px;
		color: black;
		/* width: 250px; */
	}
 
	.overlaylong-Signin {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	.overlaylong-Signup {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
 
	input {
		background-color: #eee;
		border: none;
		padding: 12px 15px;
		margin: 10px 0;
		width: 240px;
	}
	h3{
		font-size: 10px;
		margin-top: 10px;
		cursor: pointer;
	}
	.inupbutton{
		background-color: rgba(83, 110, 130, 1);
		border: none;
		width: 180px;
		height: 40px;
		border-radius: 50px;
		font-size: 15px;
		color: #fff;	
		text-align: center;
		line-height: 40px;
		margin-top: 30px;
	}
</style> 
