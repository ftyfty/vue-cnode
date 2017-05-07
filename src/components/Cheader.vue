<template>
	<div class="header">
		<div class="header-box is-fixed">
			<header class="header-logo clearfix">
				<i  class="header-logo-menu icon-fenlei" @click="showMenuSlide">
					<img src="../assets/images/fenlei.png"/>
				</i>
				<img src="../assets/images/logo.png" class="log-img" />
				<i class="header-logo-menu icon-fanhui" @click="eturn">
					<img src="../assets/images/fanhui.png"/>
				</i>
			</header>
		</div>
		<nv-menu :show = "Menuhide" @menuSide = "MenuSlide"></nv-menu>
	</div>
</template>

<script>
	import NvMenu from './menu'
	export default{
		data(){
			return{
				Menuhide:false
			}
		},
		components:{
			NvMenu
		},
		methods:{
			MenuSlide(){
				this.Menuhide = !this.Menuhide
			},
			showMenuSlide(){
				this.Menuhide = !this.Menuhide
			},
			eturn(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.header-box{width: 100%;top: 0;z-index: 99;position: relative;padding: 0.1rem 0; background: #333333;}
	.header-box .log-img{height: 0.8rem;}
	.header-logo{ text-align: center;}
	.is-fixed{ position: fixed;}
	.header-logo-menu{ position: absolute; top: 0.25rem;}
	.header-logo-menu img{ height: 0.6rem; vertical-align: middle;}
	.icon-fenlei{ left: 0.1rem;}
	.icon-fanhui{ right: 0.1rem;}
</style>