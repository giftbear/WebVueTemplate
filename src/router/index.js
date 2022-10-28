import Vue from 'vue'
import Router from 'vue-router'

import Login from "@/views/Login"
import Register from "@/views/Register"
import Document from "@/views/Document"
import Task from "@/views/Task"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/Login',
            name:'Login',
            component: Login,
        },
        {
            path: '/Register',
            name:'Register',
            component: Register,
        },
        {
            path: '/Document',
            name:'Document',
            component: Document,
        },
        {
            path: '/Task',
            name:'Task',
            component: Task,
        },
    ]
})