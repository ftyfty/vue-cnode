<template>
	<div class="popup" v-if="popupShow">
		<div class="alert font16">
			<div class="alert-com">{{popupCon}}</div>
			<div class="alert-btn" @click="popupHide">确&nbsp;&nbsp;定</div>
		</div>
	</div>
</template>

<script>
	export default{
		computed:{
			popupShow(){
				return this.$store.getters.getIspopup
			},
			popupCon(){
				return this.$store.getters.getPopupCon
			}
		},
		methods:{
			popupHide(){
				this.$store.dispatch('isPopup',false)
				this.$store.dispatch('popupCon','')
			}
		}
	}
</script>

<style>
	.popup{ position: fixed; left: 0; top: 0; background: rgba(255,255,255,0.1); width: 100%; height: 100%; z-index: 9999999;}
	.alert{ position: absolute; width: 6rem; background: #e0e0e0; text-align: center; left: 50%; top: 50%;transform: translate(-50%,-50%); padding: 0.2rem;border-radius: 4px;}
	.alert-com{padding-bottom: 0.4rem;}
	.alert-btn{padding: 0.1rem; color: #80BD01;}
</style>