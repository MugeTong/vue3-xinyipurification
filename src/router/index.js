import {createRouter, createWebHistory} from 'vue-router'
// createRouter 创建路由实例
// createWebHistory 创建路由模式

// 登录页组件
import Login from '@/views/Login/LoginView.vue'
// 主页组件
import Home from '@/views/Home/HomeView.vue'
import Welcome from '@/views/Home/Welcome/Welcome.vue'

// 404没有找到的页面
import NotFound from '@/views/NotFound/NotFoundView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // 配置路径和组件的映射关系
    routes: [{
        // 主页
        path: '/',
        component: Home,
        children: [{path: '', component: Welcome}, {path: 'home/:sub', component: Welcome}]
    }, {
        // 登录页
        path: '/login', component: Login
    }, {
        path: '/home', redirect: '/'
    }, {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }]
})

export default router