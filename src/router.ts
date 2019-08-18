import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout/Index.vue'
import jwt_decode from "jwt-decode";

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
        meta: {roles:['admin','editor'],title: '表单管理',icon: 'fa fa-file-text-o'},
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
        meta: {roles:['admin'],title: '账户管理',icon: 'fa fa-user-plus'},
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
    redirect: '/404'
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
    if(isLogin){
      const decode:any = jwt_decode(localStorage.tsToken);
      const {key} = decode;
      // 权限判断
      if(hasPermission(key,to)){
        next()
      }else{
        next('/404'); // 没有权限进入
      }
    }else{
      next('/login')
    }
  }
})

export default router

/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 */
function hasPermission(roles:string,route:any){
  if(route.meta && route.meta.roles) {// 是否meta.roles包含角色的key值，如果包含那么就是有权限，否则无权限
    return route.meta.roles.some((role:string)=>
      role.indexOf(roles) >= 0
    )
    // 待测试：是否可简写为：
    // return route.meta.roles.indexOf(roles) >= 0
  }else{ // 默认不设置有权限
    return true;
  }
}