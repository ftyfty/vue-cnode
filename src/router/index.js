import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:resolve => require(['../pages/home'],resolve)
    },
    {
    	path:'/article/:id',
    	name:'article',
    	component:resolve => require(['../pages/article'],resolve)
    },
    {
    	path:'/login',
    	name:'login',
    	component:resolve => require(['../pages/login'],resolve)
    },
    {
    	path:'/about',
    	name:'about',
    	component:resolve => require(['../pages/about'],resolve)
    },
    {
    	path:'/userhome/:userhome',
    	name:'userhome',
    	component:resolve => require(['../pages/userhome'],resolve)
    },{
    	path:'/release',
    	name:'release',
    	component:resolve => require(['../pages/release'],resolve)
    }
  ]
})
