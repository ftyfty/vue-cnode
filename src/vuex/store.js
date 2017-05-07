import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state : {
		//登录状态
		isLogin:false,
		//loading状态
		loadShow:false,
		//登录信息
		userInfo:{
			'loginname':'',
			'avatar':'',
			'id':'',
			'accesstoken':''
		},
		//弹窗的出现
		isPopup:false,
		//弹窗内容
		popupCon:'',
		//用户未读消息条数
		messageCount:0,
		//文章评论
		replies:[]
		
	},
	mutations:{
		LOADSHOW(state){
			state.loadShow = !state.loadShow
		},
		//设置登录
		ISLOGIN(state){
			state.isLogin = true
		},
		//退出登录
		OUTLOGIN(state){
			state.isLogin = false
		},
		//存储用户信息
		SETUSERINFO(state,userInfo){
			state.userInfo.loginname = userInfo.loginname;
			state.userInfo.avatar = userInfo.avatar;
			state.userInfo.id = userInfo.id;
			state.userInfo.accesstoken = userInfo.accesstoken
		},
		//弹窗
		ISPOPUP(state,status){
			state.isPopup = status
		},
		POPUPCON(state,content){
			state.popupCon = content
		},
		//消息未读数
		MESSAGECOUNT(state,count){
			state.messageCount = count
		},
		//获取文章评论
		SETREPLIES(state,replies){
			state.replies = replies
		}
	},
	actions:{
		actLoadShow({commit}){
			commit('LOADSHOW')
		},
		isLogin({commit}){
			commit('ISLOGIN')
		},
		outLogin({commit}){
			commit('OUTLOGIN')
		},
		setUserInfo({commit},userInfo){
			commit('SETUSERINFO',userInfo)
		},
		isPopup({commit},status){
			commit('ISPOPUP',status)
		},
		popupCon({commit},content){
			commit('POPUPCON',content)
		},
		messageCount({commit},count){
			commit('MESSAGECOUNT',count)
		},
		setReplies({commit},replies){
			commit('SETREPLIES',replies)
		}
		
	},
	getters:{
		getLoadShow(state){
			return state.loadShow
		},
		getLoginState(state){
			return state.isLogin
		},
		getUserInfo(state){
			return state.userInfo
		},
		getIspopup(state){
			return state.isPopup
		},
		getPopupCon(state){
			return state.popupCon
		},
		getMessageCount(state){
			return state.messageCount
		},
		getReplies(state){
			return state.replies
		}
	}
})
export default store
