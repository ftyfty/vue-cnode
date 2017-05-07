<template>
	<div class="login">
		<div class="login-item">
			<h3 class="login-item-title">登&nbsp;&nbsp;录</h3>
			<div class="login-item-input">
				<input type="text" placeholder="请输入accesstoken登录" class="font14" v-model="strToken" />
				<button class="font16" @click="login">登录</button>
			</div>
		</div>
		<popup></popup>
	</div>
</template>

<script>
	import Popup from '../components/popup'
	export default{
		components:{
			Popup
		},
		data(){
			return{
				strToken:''
			}
		},
		methods:{
			login(){
				if(this.strToken.trim() === ''){
					this.$store.dispatch('isPopup',true);
					this.$store.dispatch('popupCon','输入内容不能为空')
				}else{
					var rqdata = {
						'accesstoken':this.strToken.trim()
					}
					this.axios.post('https://cnodejs.org/api/v1/accesstoken',rqdata)
					.then((response)=>{
						if(response.data.success){
							this.$store.dispatch('isLogin')
							const data = response.data;
							const userInfo ={
								'loginname':data.loginname,
								'avatar':data.avatar_url,
								'id':data.id,
								'accesstoken':this.strToken.trim()
							}
							this.$store.dispatch('setUserInfo',userInfo)
							// 登录成功记录账户信息存放至localStorage已备下次自动登录
							localStorage.setItem('cnode_name',userInfo.loginname)
							localStorage.setItem('cnode_avatar',userInfo.avatar)
							localStorage.setItem('cnode_id',userInfo.id)
							localStorage.setItem('cnode_accesstoken',userInfo.accesstoken)	
							//获取未读消息
							this.axios.get(`/cnodeApi/message/count`,{params:
								rqdata
							})
								.then((response_count)=>{
									if(response_count.data.success){
										this.$store.dispatch('messageCount',response_count.data.data)
										this.$router.go(-1)
									}else{
									
									}
								})
								.catch((err)=>{
									console.log(err)
								})
						}else{
							
						}
					})
					.catch((err)=>{
						console.log(err)
						this.$store.dispatch('isPopup',true);
						this.$store.dispatch('popupCon','输入正确的accesstoken值')
					})
				}
			}
		}
		
	}
</script>

<style>
	.login{ margin-top: 1.2rem; border-top: 1px solid #80BD01;}
	.login-item-img{ display: block; width: 60%; margin: 1rem auto;}
	.login-item-title{ text-align: center; color: #fff; font-size: 36px; text-shadow: 1px 1px 20px #80BD01;}
	[data-dpr="2"] .login-item-title{  font-size: 72px;}
	[data-dpr="3"] .login-item-title{  font-size: 108px;}
	.login-item-input input{ display: block; width: 80%; margin: 0 auto; height:1rem; line-height: 1rem;border-radius: 4px; padding-left: 0.4rem;}
	.login-item-input button{ display: block; width: 2.6rem; margin: 0 auto; height: 0.8rem; line-height: 0.8rem;border-radius: 4px; margin-top: 0.6rem; background: #80BD01; color: #fff;}
</style>