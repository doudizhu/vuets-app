import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout/Index.vue'

Vue.use(Router)

/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
* name:'router-name'             路由名称，必须填写
* meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
  }
**/

export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    hidden: true,
    redirect:'/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: ()=> import('@/views/Home.vue'),
        meta: {title: '首页',icon: 'fa fa-home'},
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    hidden: true,
    meta:{title:'数据管理',icon:'fa fa-database'},
    redirect:'/tableData',
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        component: ()=> import('@/views/DataManage/TableData.vue'),
        meta:{title:'表格管理',icon:'fa fa-table'},
      },
      {
        path: '/chartsData',
        name: 'chartsData',
        component: ()=> import('@/views/DataManage/ChartsData.vue'),
        meta:{title:'图表管理',icon:'fa fa-bar-chart'},
      },
      {
        path: '/formData',
        name: 'formData',
        component: ()=> import('@/views/DataManage/FormData.vue'),
        meta: {title: '表单管理',icon: 'fa fa-file-text-o'},
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    hidden:true,
    redirect:'/accountData',
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        component: ()=> import('@/views/UserManage/AccountData.vue'),
        meta: {title: '账户管理',icon: 'fa fa-user-plus'},
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect:'/userInfo',
    hidden:false,
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        component: ()=> import('@/views/UserManage/UserInfo.vue'),
        meta: {title: '个人中心'},
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: ()=>import('@/views/404.vue'),
    hidden:true,
    meta: {title: '404'},
  },
  {
    path: '*',
    name: '404',
    component: ()=>import('@/views/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
    hidden:true,
    meta: {title: '系统登录'},
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/views/Login/Password.vue'),
    hidden:true,
    meta: {title: '找回密码'},
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap,
})

router.beforeEach((to:any,from:any,next:any)=>{
  const isLogin = localStorage.tsToken ? true : false;
  if(to.path == '/login' || to.path == '/password'){
    next()
  }else{
    isLogin ? next() : next('/login')
  }
})

export default router