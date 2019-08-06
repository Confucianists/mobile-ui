import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// const isLogin = window.localStorage.getItem('isLogin')
// let firstPath = isLogin || '/Login'
// let firstPath = '/home'

// 登录，注册等
const sundry = [
  { path: '/', redirect: '/Login', meta: { keepAlive: true,index:1 } },
  { path: '/Login', name: 'Login', chName: '登录', component: resolve => { require(['@/pages/login.vue'], resolve); }, meta: { keepAlive: false,index:1 } },
]

// 首页
const home = [

	]

// 分类
const category = [
]

// 购物车
const cart = [
]

// 我的
const personal = [

]

// 测试
const test = [

]








const routers = [
	...sundry,
	...home,
	...category,
	...cart,
	...personal,
  ...test
]

export default new Router({
	// mode: 'history',
	scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
   },
	routes: routers
})
