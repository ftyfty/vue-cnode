<template>
	<div class="user-home">
		<div class="user-home-box">
			<div class="user-home-info">
				<img :src="user_avatar"/>
				<p class="font20 name">{{user_name}}</p>
				<p class="font18">积分:{{score}}</p>
				<p class="font16">注册时间：{{create_at}}</p>
			</div>
		</div>
		<!--创建的主题-->
		<div class="user-home-list">
			<p class="font20">创建的主题</p>
			<ul class="topicsitem">
				<li v-for="(topic,index) in recent_topics">
					<router-link :to="{name:'article',params:{id:topic.id}}">
						<div class="topicsitem-top">
							<img :src="topic.author.avatar_url"/>
							<p class="font16">{{topic.author.loginname}}</p>
						</div>
						<p class="title font18">{{topic.title}}</p>
						<span class="reply-hf">最新回复：{{topic.last_reply_at|getLastTime}}</span>
					</router-link>
				</li>
			</ul>
			<div class="font18 temporary-box" v-if="recent_topics.length == 0">
				暂无创建的主题
			</div>
		</div>
		<!--参与的主题-->
		<div class="user-home-list">
			<p class="font20">参与的主题</p>
			<ul class="topicsitem">
				<li v-for="(topic,index) in recent_replies">
					<router-link :to="{name:'article',params:{id:topic.id}}">
						<div class="topicsitem-top">
							<img :src="topic.author.avatar_url"/>
							<p class="font16">{{topic.author.loginname}}</p>
						</div>
						<p class="title font16">{{topic.title}}</p>
						<span class="reply-hf">最新回复：{{topic.last_reply_at|getLastTime}}</span>
					</router-link>
				</li>
			</ul>
			<div class=" font18 temporary-box" v-if="recent_replies.length == 0">
				暂无参与的主题
			</div>
		</div>
		<!--收藏的主题-->
		<div class="user-home-list">
			<p class="font20">收藏的主题</p>
			<ul class="topicsitem">
				<li v-for="(topic,index) in topic_collect">
					<router-link :to="{name:'article',params:{id:topic.id}}">
						<div class="topicsitem-top">
							<img :src="topic.author.avatar_url"/>
							<p class="font16">{{topic.author.loginname}}</p>
						</div>
						<p class="title font16">{{topic.title}}</p>
						<span class="reply-hf">最新回复：{{topic.last_reply_at|getLastTime}}</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class=" font18 temporary-box" v-if="topic_collect.length == 0">
			暂无收藏的主题
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				user_name:'',
				user_avatar:'',
				create_at:'',
				score:0,
				//创建的主题
				recent_topics:[],
				//评论的主题
				recent_replies:[],
				//收藏的主题
				topic_collect:[]
			}
		},
		activated(){
			this.axios.get('https://cnodejs.org/api/v1/user/'+this.$route.params.userhome)
				.then((response)=>{
					if(response.data.success){
						const userData = response.data.data;
						this.user_name = userData.loginname;
						this.user_avatar = userData.avatar_url;
						this.create_at = userData.create_at.substring(0,10);
						this.score = userData.score;
						this.recent_topics = userData.recent_topics;
						this.recent_replies = userData.recent_replies;
					}
				})
				.catch((error)=>{
					console.log(error)
				})
			this.axios.get('https://cnodejs.org/api/v1/topic_collect/'+this.$route.params.userhome)
				.then((response)=>{
					if(response.data.success){
						this.topic_collect = response.data.data
					}
				})
		}
	}
</script>

<style>
	.user-home{ padding-top: 1.2rem; background: #fff;}
	.user-home-info{ text-align: center; padding-top: 0.4rem;}
	.user-home-info img{ width: 2rem; height: 2rem; border-radius: 50%;}
	.user-home-info p{ line-height: 0.8rem;}
	.user-home-info p.name{ color: #80BD01;}
	.user-home-list{ padding: 0 0.2rem;}
	.topicsitem p.title{width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; padding: 0.1rem 0;}
	.topicsitem li{border-bottom: 1px solid #80BD01;}
	.user-home-list>p{color: #80BD01; padding: 1rem 0 0.2rem;}
	.topicsitem-top{display: -webkit-flex;display: flex; padding: 0.2rem 0;}
	.topicsitem-top img{ width: 0.8rem; height: 0.8rem; border-radius: 50%; margin-right: 0.2rem;}
	.topicsitem-top p{line-height: 0.8rem;}
	.reply-hf{ display: block; width: 100%; text-align: right; padding: 0.2rem; font-size: 10px; color: #666666;}
	[data-dpr="2"] .reply-hf{ font-size: 20px;}
	[data-dpr="3"] .reply-hf{ font-size: 30px;}
	.temporary-box{text-align: center; padding: 0.2rem 0;}
</style>