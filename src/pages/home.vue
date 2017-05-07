<template>
	<div class="home">
		
		<nav class="nav-box clearfix">
			<ul class="nav-bar">
				<li v-for="(item,index) in itemTab" class="nav-bar-item font16" :class="{'active':tabIndex === index}" @click="changeTab(index)">{{item.title}}</li>
			</ul>
		</nav>
		<section class="home-lists">
			<div class="posts-list clearfix" v-for="(art,index) in artlist">
				<router-link :to="{name:'article',params:{id:art.id}}">
					<div class="posts-list-con">
						<p class="username-time clearfix">
							<router-link :to="{name:'userhome',params:{userhome:art.author.loginname}}" class="username font18"><img :src="art.author.avatar_url" />{{art.author.loginname}}</router-link>
							<span class="time font18">{{art.create_at | getLastTime}}</span>
						</p>
						<p class="title font16">
							<em :title="art.tab | getArticleTab(art.good, art.top)" :class="art.good | getArticleClass(art.top)">{{art.tab | getArticleTab(art.good,art.top)}}</em>
							{{art.title}}
						</p>
						<div class="infor-visit clearfix">
							<p class="visit font18">
								<i><img src="../assets/images/visit.png"/></i>
								{{art.visit_count}}
							</p>
							<p class="infor font18">
								<i><img src="../assets/images/infor.png"/></i>
								{{art.reply_count}}
							</p>
						</div>
					</div>
				</router-link>
			</div>
		</section>
		<div class="loadingbox" v-show="loadHide">
			<div class="loadingbox-img">
				<img src="../assets/images/loading.gif"/>
			</div>
		</div>
		<return-top></return-top>
	</div>
</template>

<script>
	
	import ReturnTop from '../components/returnTop'
	export default{
		components:{
			ReturnTop
		},
		data(){
			return{
				itemTab:[
					{'title':'全部','type':'all'},
					{'title':'精华','type':'good'},
					{'title':'分享','type':'share'},
					{'title':'问答','type':'ask'},
					{'title':'招聘','type':'job'}
				],
				artlist:[],
				searchKey:{
					'page':1,
					'limit':20,//每页加载20条
					'tab':'all'//主题分类。目前有 ask share job good
				},
				tabIndex:0,
				scroll : true, //避免快速滚动，无限拉取数据源
				loadHide:false
			}
		},
		mounted(){
			this.getArtList();
			window.addEventListener('scroll',this.scrollArtlist,false)
		},
		methods:{
			getArtList(){
				const rqdata = this.searchKey;
				this.axios.get('https://cnodejs.org/api/v1/topics',{params : rqdata})
					.then((response)=>{
						if(response.data.success){
							this.artlist = response.data.data;
							this.loadHide = false;
							this.scroll = true
						}
					})
					.catch((err)=>{
						console.log(err)
					})
			},
			changeTab(index){
				this.tabIndex = index
				this.searchKey.tab = this.itemTab[index].type;
				this.searchKey.limit = 20;
				this.artlist=[];
				this.getArtList()
			},
			scrollArtlist(){
				if(this.scroll){
					let totalheight = parseFloat(window.innerHeight) + window.scrollY;
					if(document.body.clientHeight <= totalheight + 200){
						this.scroll = false;
						this.searchKey.limit +=10;
						this.loadHide = true;
						setTimeout(()=>{
							this.getArtList()
						},1000)	
					}
				}
			}
		}
	}
</script>

<style>
	.home{ background: #fff;}
	.nav-box{position: fixed; top: 1rem; background: #444; width: 100%; height: 1rem;  line-height: 1rem;}
	.nav-bar li.active{ color: #fff;}
	.nav-bar-item{ float: left; width: 20%; box-sizing: border-box; text-align: center; color: #80bd01;}
	.home-lists{ margin-top: 2rem;}
	.posts-list{ border-bottom: 1px solid #80bd01;}
	.username-time{display: flex; display: -webkit-flex; padding: 0.2rem;}
	.username-time .username{flex: 2; -webkit-flex: 2;  color: #80bd01; }
	.username-time .username img{ height: 1rem;vertical-align: middle; padding-right: 0.2rem;}
	.username-time .time{flex: 1; -webkit-flex: 1; text-align: right; line-height: 1rem;}
	.infor-visit{ display: flex; display: -webkit-flex; padding-right: 0.2rem; margin-top: 0.2rem;}
	.infor-visit p{ -webkit-flex: 1; color: #80bd01; padding: 0 0.2rem 0.2rem;}
	.infor-visit p.infor{ text-align: right;}
	.infor-visit p i{ padding-right: 0.1rem;}
	.infor-visit p.infor i img,.infor-visit p.visit i img{ width: 0.5rem; vertical-align: middle;}
	.infor-visit p.visit i img{ margin-top: -0.08rem;}
	.infor-visit p.infor i img{ margin-top: -0.1rem;}
	.posts-list-con .title{display: -webkit-box; -webkit-box-orient text-overflow: ellipsis;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical; padding: 0 0.2rem;}
	.posts-list-con .title em{ font-style: normal; padding: 4px 8px; background: #e5e5e5; display: inline-block; color: #999;border-radius: 4px; margin-left: 0.46rem;}
	.posts-list-con .title em.put-top,.posts-list-con .title em.put-good{background: #80bd01;color: #fff;}	
	.loadingbox{ position: relative; width: 100%;}
	.loadingbox .loadingbox-img{ height: 1.2rem; text-align: center; overflow: hidden;}
	.loadingbox .loadingbox-img img{ height: 1.2rem;}
</style>