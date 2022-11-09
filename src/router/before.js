import router from '@/router/index'
import store from '@/store/index.js'

//路由全局前置守卫
router.beforeEach((to, from, next) => {
	//当前路由需要登录才可进入
	if (to.matched.some((m) => m.meta.requireAuth)) {
		//调用获取用户登录状态和信息的接口
		store.dispatch('getUserInfo').then(() => {
			if (!store.getters.isLogin) {				
				//没有登录时,跳转到登录页面
				next({
					path: '/login',
					query: { Rurl: to.fullPath } //将to参数中的url传递给Login页面进行操作
				})				
			} else {
				next() //正常跳转
			}
		})
	} else {
		next() //正常跳转
		//调用获取用户登录状态和信息的接口,以便显示顶部导航栏的用户登录信息
		store.dispatch('getUserInfo')
	}
})