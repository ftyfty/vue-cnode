<template>
	<div class="comment-box">
		<div class="comment-box-com">
			<textarea ref="textarea" placeholder="请输入评论" v-model="repliescontent">
				
			</textarea>
		</div>
		<div class="comment-box-btn">
			<span class="font18" @click="recomment">回复</span>
		</div>
	</div>
</template>

<script>
	export default{
		props:['replyCom','artId','replyloginname','replyid','reply_id'],
		data(){
			return {
				repliescontent:''
			}
		},
		mounted : function() {
			if (this.replyid) {
				this.repliescontent = '@' + this.replyloginname + ' ';
			}
			this.$refs.textarea.focus();
		},
		computed:{
			loginState(){
				return this.$store.getters.getLoginState
			},
			userInfo(){
				return this.$store.getters.getUserInfo
			},

		},
		methods:{
			recomment(){
				// 判断是否登录，如果为登录去登录页面
				if (this.loginState) {
					// 判断内容是否为空
					if (this.repliescontent !== '') {
						// 回复内容不为空
						// const arr = window.location.href.split('/');
						let id = '';
						this.replyid ? id = this.replyid : id = '';
						this.axios.post('https://cnodejs.org/api/v1/topic/'+ this.artId +'/replies', {
							accesstoken : this.userInfo.accesstoken,
							content : this.repliescontent,
							replies : id
						})
						.then((response) => {
							if (response.data.success) {
								// 评论成功
								const time = new Date();
								this.axios.get('https://cnodejs.org/api/v1/topic/'+this.artId)
								.then((response_reply) => {
									if(response_reply.data.success) {
										const D = response_reply.data.data;
										this.$store.dispatch('setReplies', D.replies);
										this.repliescontent = '';
										if(this.reply_id) {
											this.$emit('recomment');
										}
									}
								})
								.catch(function(error) {
									console.log(error);
								})
							} else {
								// 提交评论失败
							}
						})
						.catch(function(error) {
							console.log(error);
						})
					} else {
						// 内容为空
						this.$store.dispatch('setTipShow', true);
						this.$store.dispatch('setTipContent', '回复内容不能为空！');
					}
				} else {
					this.$router.push({name : 'login'});
				}
			}
		
		}
	}
</script>

<style>
	.comment-box-com{ border: 1px solid #80BD01; margin: 0.2rem; padding: 0.1rem; border-radius: 3px;}
	.comment-box-com textarea{ display: block; width: 100%; height: 1.6rem;}
	.comment-box-btn{ padding: 0.3rem 0.2rem 0.6rem;}
	.comment-box-btn span{ display: block; width: 2.2rem; height: 0.8rem; line-height: 0.8rem; background: #80BD01; color: #fff; text-align: center;border-radius: 4px;}
</style>