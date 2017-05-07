<template>
	<div class="menu" @click="hideMenu">
		<div class="menu-slide" :class="{'showMeun':show}">
			<div class="menu-slide-img">
				<img :src="loginState? userInfo.avatar : img "/>
				<h2 class="font18">{{loginState? userInfo.loginname:'Cnode社区'}}</h2>
			</div>
			<div class="menu-list" >
				<ul class="font16">
					<li class="">
						<router-link to="/">
							<img src="../assets/images/index.png"/>
							<span>首页</span>
						</router-link>
					</li>
					<li v-if="loginState">
						<router-link to="/release">
							<img src="../assets/images/release.png"/>
							<span>发布</span>
						</router-link>
					</li>
					<li v-if="loginState">
						<router-link :to="{name:'userhome',params:{userhome:userInfo.loginname}}">
							<img src="../assets/images/personal.png"/>
							<span>个人</span>
						</router-link>
					</li>
					<li>
						<router-link to="/about">
							<img src="../assets/images/about.png"/>
							<span>关于</span>
						</router-link>						
					</li>
					<li v-if="!loginState">
						<router-link to="/login">
							<img src="../assets/images/login-in.png"/>
							<span>登录</span>
						</router-link>
						
					</li>
					<li v-if="loginState" @click="loginOut">
						<img src="../assets/images/login-out.png"/>
						<span>退出</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="mask" v-show="show" >
			
		</div>
	</div>
</template>

<script>
	export default{
		props:['show'],
		computed:{
			loginState(){
				return this.$store.getters.getLoginState
			},
			userInfo(){
				return this.$store.getters.getUserInfo
			}
		},
		data(){
			return {
				img:require('../assets/images/timg.jpg')
			}
		},
		methods:{
			hideMenu(){
				this.$emit('menuSide')
			},
			loginOut(){
				//清空本地信息 及Vuex信息
				this.$store.dispatch('outLogin');
				localStorage.removeItem('cnode_name')
				localStorage.removeItem('cnode_avata')
				localStorage.removeItem('cnode_id')
				localStorage.removeItem('cnode_accesstoken')
				const userInfo = {
					'name':'',
					'avatar':'',
					'id':'',
					'accesstoken':''
				}
				this.$store.dispatch('setUserInfo',userInfo)
				//this.$router.go(0)
			}
		}
	}
</script>

<style>
	.mask{ position: fixed; left: 0; top: 0; z-index: 100; background: rgba(0,0,0,0.4); width: 100%; height: 100%;}
	.menu-slide{position: fixed;top: 0;left: -5rem;z-index: 101;width: 5rem; background: #444444; color: #fff; height: 100%; transition: all .25s ease; will-change: transform;}
	.menu-slide-img{ text-align: center; margin-top: 0.5rem;}
	.menu-slide-img img{ width: 2.4rem;border-radius: 50%;}
	.menu-slide-img h2{ margin-top: 0.1rem;}
	.menu-list ul li{ text-align: center;line-height: 1rem; box-sizing: border-box;border-left: 8px solid transparent;}
	.menu-list ul li img{ vertical-align: middle; width: 0.8rem; padding-right: 0.2rem; display: inline-block; margin-top: -0.08rem;}
	.menu-list ul li img.curr01{ width: 1rem;}
	.menu-list ul li.active{border-left: 8px solid #80bd01;}
	.showMeun {transform: translateX(5rem);}
</style>