<template>
	<div class="release-box">
		<relass></relass>
	</div>
</template>

<script>
	import Relass from '../components/relass'
	export default{
		components:{
			Relass
		},
		computed:{
			loginState(){
				return this.$store.getters.getLoginState
			}
		},
		mounted(){
			if(!this.loginState){
				this.$router.push({name : 'login'});
				return;
			}
		}
	}
</script>

<style>
	.release-box{ padding-top: 1.2rem;}
	
</style>