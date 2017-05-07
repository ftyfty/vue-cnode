<template>
	<div class="return-top" v-show="showTop" @click="returnTop">
		<img src="../assets/images/returnTop.png"/>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				showTop:false
			}
		},
		mounted(){
			window.addEventListener('scroll',this.scrollEvent,false)
		},
		methods:{
			returnTop(){
				window.scroll(0,0);
				this.showTop = false
			},
			scrollEvent(){
				if(parseFloat(window.scrollY)>150){
					this.showTop  = true
				}else{
					this.showTop = false
				}
			}
		}
	}
</script>

<style>
	.return-top{ position: fixed; right: 0.5rem; bottom: 0.5rem; width: 1rem; height: 1rem; background: #fff;border: 1px solid #000; border-radius: 50%;}
	.return-top img{ width: 1rem;}
</style>