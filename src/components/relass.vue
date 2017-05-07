<template>
	<div class="relass-box">
		<div class="relass-theme">
			<p class="font18">主题：</p>
			<select v-model="topicType" class="font16">
				<option value="share">分享</option>
				<option value="ask">问答</option>
				<option value="jpb">招聘</option>
			</select>
		</div>
		<div class="relass-title">
			<p class="font18">文章标题</p>
			<input type="text" placeholder="请输入文章标题" v-model="topicTitle" class="font16"/>
		</div>
		<div class="relass-content">
			<p class="font18">文章内容</p>
			<textarea v-model="topicContainer" placeholder="在此输入话题内容" class="font16"></textarea>
		</div>
		<div class="relass-btn">
			<span class="font18" @click="submitTopic">提交</span>
		</div>
		<popup></popup>
	</div>
</template>

<script>
	import Popup from '../components/popup'
	export  default{
		components:{
			Popup
		},
		props:['topicId'],
		data(){
			return{
				topicType:'share',
				topicTitle:'',
				topicContainer:''
			}
		},
		computed:{
			loginState(){
				return this.$store.getters.getLoginState
			},
			userInfo(){
				return this.$store.getters.getUserInfo
			}
		},
		mounted(){
			if(this.topicId){
				const rqdata = {
					mdrender :false
				}
				this,axios.get('https://cnodejs.org/api/v1/topic/'+this.topicId,{
					params:rqdata
				}).then((response)=>{
					const data = response.data;
					if(data.success){
						this.topicType = data.data.tab;
						this.topicTitle = data.data.title;
						this.topicContainer = data.data.content;
					}
				})
				.catch((error)=>{
					console.log(error)
				})
			}
		},
		methods:{
			submitTopic(){
				if(this.loginState){
					const title = this.topicTitle.trim(),
						  content = this.topicContainer.trim();
					if(title.length <= 10 || content === ''){
						this.$store.dispatch('isPopup',true);
						this.$store.dispatch('popupCon','标题字少10个字以上或内容不能为空。')
						return
					}
					let url = '';
					if(this.topicId){
						url = `/cnodeApi/topics/update`
					}else{
						url = `/cnodeApi/topics`
					}
					this.axios.post(url,{
						'accesstoken ' : this.userInfo.accesstoken,
						'tab' : this.topicType,
						'title' : title,
						'content ' : content,
						'topic_id ' : this.topicId
					})
					.then((response)=>{
						if(data.success){
							this.$router.push({name:'article',params:{id:data.topic_id}})
						}
					})
				}else{
					this.$router.push({name : 'login'});
				}
			}
		}
	}
</script>

<style>
	.relass-box{ padding: 0 0.2rem ;}
	.relass-theme p,.relass-title p,.relass-content p { color: #80BD01;}
	.relass-theme select{ width: 100%; height: 0.8rem; box-sizing: border-box; padding-left: 0.2rem; margin: 0.4rem 0;border-radius: 4px;}
	.relass-title input{ width: 100%; border-radius: 6px; border-radius: 4px; height: 0.8rem; line-height: 0.8rem; padding-left: 0.2rem; box-sizing: border-box; margin: 0.4rem 0;}
	.relass-content textarea{ box-sizing: border-box; width: 100%; padding: 0.2rem; height: 3rem; border-radius: 4px; margin: 0.2rem 0;}
	.relass-btn span{ display: block; width: 6rem; height: 1rem; line-height: 1rem; margin: 0.2rem auto; background: #80BD01;border-radius: 4px; color: #fff; text-align: center;}
	
</style>