<template>
	<div class="article">
		<div class="article-titl">
			<h2 class="font20">{{article.title}}</h2>
			<div class="author-info">
				<div class="author-info-img font16">
					<img :src="article.author_avatar"/>
					<span>{{article.author_name}}</span>
					<span class="read">作者</span>
				</div>
				<div class="author-info-in">
					<span>{{article.createtime|getLastTime}}</span>
					<span class="tab">{{article.tab| getArticleTab(article.good,article.top)}}</span>
					<span>浏览：{{article.visit_count}}</span>
					<span>回复：{{article.reply_count}}</span>
					<span class="sc font16" @click="colle"><i :class="{'no-cell':collection.is}">{{collection.title}}</i></span>
				</div>
			</div>
			<div class="author-con" v-html="article.content"></div>
			<!--回复-->
			<div class="article-replies">
				<p class="article-replies-all">共有 {{article.reply_count}} 个回复</p>
				<ul class="article-replies-list">
					<li v-for="(artitem,index) in replies">
						<div class="author-avatar">
							<router-link :to = "{name:'userhome',params:{userhome:artitem.author.loginname}}">
								<img class="userh" :src="artitem.author.avatar_url" />
								<p class="font16">{{artitem.author.loginname}}</p>
							</router-link>
							<div  class="point-praise">
								<span @click = "reply(artitem.id)"><img src="../assets/images/infor.png" class="curr"/></span>
								<span class="font18" @click = "fabulous(index,artitem.id,artitem.author.loginname)" :class="{'z-zan':artitem.isup}"><img :src="artitem.isup ? z_img : y_img">{{artitem.ups.length}}</span>
							</div>
						</div>
						<div class="replies-com" v-html="artitem.content"></div>
						<div class="replies-time">{{index + 1}}楼 • {{artitem.create_at|getLastTime}}</div>
						<comment v-if = "reply_id == artitem.id" :replyCom = "replies" :artId = "articleId" :replyid="artitem.id" :replyloginname = "artitem.author.loginname" :reply_id="reply_id" v-on:recomment="reply_clear" ></comment>
					</li>
				</ul>
			</div>
		</div>
		<div class="comment">
			<p>添加回复:</p>
			<comment :replyCom = "replies" :artId = "articleId"></comment>
		</div>
		<popup></popup>
	</div>
</template>

<script>
	import Comment from '../components/comment'
	import Popup from '../components/popup'
	export default{
		components:{
			Comment,
			Popup
		},
		data(){
			return {
				article:{
					'title':'',
					'author_avatar':'',
					'author_name':'',
					'createtime':'',
					'good':'',
					'top':'',
					'tab':'',
					'visit_count':0,
					'reply_count':0,
					'content':''
				},
				collection:{
					'is':false,
					'title':'收藏'
				},
				z_img:require('../assets/images/zan.png'),
				y_img:require('../assets/images/zanhl.png'),
				//判断回复评论弹出
				reply_id:''
			}
		},
		computed:{
			replies(){
				return this.$store.getters.getReplies
			},
			loginState(){
				return this.$store.getters.getLoginState
			},
			userInfo(){
				return this.$store.getters.getUserInfo
			},
			articleId(){
				return this.$route.params.id
			}
			
		},
		activated(){
			var artId=this.$route.params.id;
			this.axios.get('https://cnodejs.org/api/v1/topic/'+artId)
				.then((response) =>{
					if(response.data.success){
						console.log(response)
						var ART = response.data.data;
						this.article.title = ART.title;
						this.article.author_avatar = ART.author.avatar_url;
						this.article.author_name = ART.author.loginname;
						this.article.createtime = ART.create_at;
						this.article.good = ART.good;
						this.article.top = ART.top;
						this.article.tab = ART.tab;
						this.article.visit_count = ART.visit_count;
						this.article.reply_count = ART.reply_count;
						this.article.content = ART.content
						// 给每一条评论添加一个不点亮的赞效果，添加完属性在赋值
                    	for (const replies of ART.replies) {
                    		replies.isup = false;
                    	};
                    	this.$store.dispatch('setReplies',ART.replies)
                    	if (this.loginState) {
                    		// 循环评论
	                    	for (const repliesItem of this.replies) {
	                    		// 循环评论的回复
	                    		for (const repliesItemUps of repliesItem.ups) {
	                    			if (repliesItemUps === this.userInfo.id) {
	                    				// console.log('已赞');
	                    				repliesItem.isup = true;
	                    				break;
	                    			}
	                    		}
	                    	}
                    	}
					}
					
				})
				.catch((err)=>{
					console.log(err)
				})
			if(this.loginState){
				this.axios.get(`/cnodeApi/topic_collect/`+ this.userInfo.loginname)
					.then((response)=>{
						console.log(response)
						if(response.data.success){
							const res = response.data;
							for(const i of res.data){
								if(artId === i.id){
									console.log('已收藏');
									this.collection.is = true;
									this.collection.title = '取消收藏'
								}
							}
						}
					})
					.catch((error)=>{
						console.log(error)
					})
			}
			window.scroll(0,0)
			
		},
		watch:{
			loginState:function(){
				if(!this.loginState){
					for (const replies of this.replies) {
                    	replies.isup = false;
                    };
                    this.collection.is = false;
					this.collection.title = '收藏'
				}
			}
			
		},
		methods:{
			//收藏
			colle(){
				if(!this.loginState){
					//未登录
					this.$store.dispatch('isPopup',true);
					this.$store.dispatch('popupCon','您还未登录，不能进行收藏!')
					return
				}
				if(this.collection.is){
					this.axios.post(`/cnodeApi/topic_collect/de_collect`,{
						accesstoken:this.userInfo.accesstoken,
						topic_id : this.articleId
					})
					.then((response)=>{
						if(response.data.success){
							this.collection.is = false;
							this.collection.title = '收藏'
						}
					})
				}else{
					this.axios.post(`/cnodeApi/topic_collect/collect`,{
						accesstoken:this.userInfo.accesstoken,
						topic_id : this.articleId
					})
					.then((response)=>{
						if(response.data.success){
							this.collection.is = true;
							this.collection.title = '取消收藏'
						}
					})
				}
			},
			//点赞
			fabulous(index,replieId,loginname){
				if(!this.loginState){
					//未登录
					this.$store.dispatch('isPopup',true);
					this.$store.dispatch('popupCon','您还未登录，请先登录!')
					return
				}
				if(this.userInfo.loginname === loginname){
					//不能自己为自己的评论点赞
					this.$store.dispatch('isPopup',true);
					this.$store.dispatch('popupCon','不能为自己点赞')
					return
				}
				this.axios.post(`/cnodeApi/reply/`+replieId+`/ups`,{
					accesstoken:this.userInfo.accesstoken
				})
				.then((response)=>{
					if(response.data.success){
						if(response.data.action === 'up'){
							//点赞
							this.replies[index].ups.push('');
							this.replies[index].isup = true;
						}else{
							//取消点赞
							this.replies[index].ups.pop('');
							this.replies[index].isup = false;
						}
					}
				})
			},
			reply(id){
				if(!this.loginState){
					//未登录
					this.$store.dispatch('isPopup',true);
					this.$store.dispatch('popupCon','您还未登录，请先登录!')
					return
				}
				this.reply_id = id
			},
			reply_clear(){
				this.reply_id = ''
			}
		}
	}
</script>

<style>
	.article{margin-top:1.2rem;background: #fff;padding: 0 0.2rem;}
	.author-info{ }
	.author-info-img img{ width: 1rem;border-radius: 50%; margin-right: 0.2rem; vertical-align: middle;}
	.author-info-img span.read{padding: 2px 6px;color: #e78170;border: 1px solid #e78170;border-radius: 3px;margin-left: 0.2rem;}
	.author-info-in{ line-height: 1rem; }
	.author-info-in span{display: inline-block; margin: 0 0.1rem;}
	.author-info-in span.tab{color: #80BD01;}
	.author-info-in span.sc i{ padding: 0.1rem 0.2rem; background: #80BD01; color: #fff; font-style: normal;border-radius: 4px;}
	.author-info-in span.sc i.no-cell{ background : #909090;}
	.author-con img{ max-width: 100%;}
	.article-replies-all{ border-top: 1px solid #80BD01; margin-top: 0.4rem; padding-top: 0.2rem; }
	.article-replies-list li{ padding: 0.3rem 0;}
	.author-avatar img.userh{ float: left; width: 0.9rem; height: 0.9rem; border-radius: 50%;}
	.author-avatar .point-praise{ float: right;}
	.author-avatar .point-praise span{ display: inline-block;margin-right: 0.2rem; color: #80BD01;}
	.author-avatar .point-praise span.z-zan{ color: #666;}
	.author-avatar .point-praise span img{ width: 0.5rem; margin-right: 0.1rem; vertical-align: middle; margin-top: -0.16rem;}
	.author-avatar .point-praise span img.curr{ margin-top: -0.26rem;}
	.author-avatar p{display: inline-block; padding-left: 0.1rem;}
	.replies-com{word-wrap:break-word; padding: 0.2rem 0 0.2rem 1.0rem;}
	.replies-com img{ max-width: 100%;}
	.replies-time{ padding-left: 1.0rem;}
	.comment p{ color: #80BD01; margin: 0.2rem;}
</style>