import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name:'Home',
            component: () => import("@/views/Home"),
            meta: { title: 'Home' }
        },
        {
            path: '/login',
            name:'Login',
            component: () => import("@/views/Login"),
            meta: { title: 'Sign in' }
        },
        {
            path: '/register',
            name:'Register',
            component: () => import("@/views/Register"),
            meta: { title: 'Sign up' }
        },   
        {
            path: '/repository',
            name:'Repository',
            component: () => import("@/views/Repository"),
            meta: {
                title: 'Repository',
                activeMenu: 'Repository',
				requireAuth: true, //是否需要登录才能访问该页面
			}
        },  
        {
            path: '/pipeline',
            name:'Pipeline',
            component: () => import("@/views/Pipeline"),
            meta: {
                title: 'Pipeline',
                activeMenu: 'Pipeline',
				requireAuth: true, 
			}
        },  
        {
            path: '/console',
            name:'Console',
            component: () => import("@/views/Console"),
            redirect: '/task',
            meta: { 
                title: 'Console',   
                activeMenu: 'Console',
                requireAuth: true,                     
            },
            children: [
                {
                    path: '/task',
                    name:'Task',
                    component: () => import("@/views/Console/Task"),
                    meta: { 
                        title: 'Task',
                        activeMenu: 'Console',
                    }
                },  
                {
                    path: '/cflow',
                    name:'Cflow',
                    component: () => import("@/views/Console/Cflow"),
                    meta: { 
                        title: 'Flow',
                        activeMenu: 'Console',
                    }
                }, 
                {
                    path: '/dataset',
                    name:'Dataset',
                    component: () => import("@/views/Console/Dataset"),
                    meta: { 
                        title: 'Dataset',
                        activeMenu: 'Console',
                    }
                }, 
                {
                    path: '/individual',
                    name:'Individual',
                    component: () => import("@/views/Console/Metadata/Individual"),
                    meta: { 
                        title: 'Individual',
                        activeMenu: 'Console',
                    }
                }, 
                {
                    path: '/experiment',
                    name:'Experiment',
                    component: () => import("@/views/Console/Metadata/Experiment"),
                    meta: { 
                        title: 'Experiment',
                        activeMenu: 'Console',
                    }
                }, 
                {
                    path: '/analysis',
                    name:'Analysis',
                    component: () => import("@/views/Console/Metadata/Analysis"),
                    meta: { 
                        title: 'Analysis',
                        activeMenu: 'Console',
                    }
                }, 
            ]
        },      
        {
            path: '/document',
            name:'Document',
            component: () => import("@/views/Document"),
            meta: {
                title: 'Document',
                activeMenu: 'Document',
				requireAuth: true,
			}
        },
    ]
})