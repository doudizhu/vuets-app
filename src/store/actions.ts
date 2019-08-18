import {ActionTree} from 'vuex'
import jwt_decode from 'jwt-decode'
import {asyncRouterMap} from '../router'

const actions: ActionTree<any,any> = {
  async setUser({state,commit},user:any){
    const decoded:any = jwt_decode(user)
    commit('SET_USER',decoded)

    const {key} = decoded;
    // 返回当前用户拥有权限的路由
    let accessedRouters = filterAsyncRouter(asyncRouterMap,key);
    commit('SET_ROUTERS',accessedRouters)
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 所有路由表
 * @param roles 当前角色
 */
function filterAsyncRouter(asyncRouterMap:Array<any>,roles:string){
  const accessedRouters = asyncRouterMap.filter(route=>{
    // console.log('route:',route)
    if(hasPerssion(roles,route)){
      if(route.children && route.children.length){
        route.children = filterAsyncRouter(route.children,roles)
      }
      return true;
    }
    return false
  })

  return accessedRouters
}
/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 */
function hasPerssion(roles:string,route:any){
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

export default actions