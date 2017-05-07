<template>
	<relass :topicId="topicid"></relass>
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
			},
			topicid(){
				return this.$route.params.topicid
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
	
</style>