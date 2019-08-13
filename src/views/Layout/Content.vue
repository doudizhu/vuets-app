<template lang='pug'>
  el-container.layout-content
    //- 左侧菜单
    el-aside(width='200px')
      slot(name='left')
    //- 右侧叶面
    el-main
      //- 面包屑
      .top
        i.fa.fa-reorder
        el-breadcrumb.breadcrumb(separator='/')
          el-breadcrumb-item(
            v-for="(item,index) in breadCrumbItems"
            :key="index"
            :to="{path:item.path}"
            ) {{item.title}}
      //- 页面内容
      .content
        slot(name='content')
</template>

<script lang='ts'>
import {Component,Vue,Provide,Watch} from 'vue-property-decorator'
@Component({
  components:{}
})
export default class Content extends Vue {
  @Provide() breadCrumbItems: any; // 面包屑的数组

  @Watch("$route") handleRouteChange(to: any) {
    console.log('to',to)
    this.initBreadCrumbItems(to);
  }

  created(){
    this.initBreadCrumbItems(this.$route);
  }
  initBreadCrumbItems(router:any){
    // console.log(router);
    // 跟路由title
    let breadCrumbItems: any = [{ path: "/", title: "后台管理系统" }];

    // 遍历父级到当前子路由的页面的title和path 存储到数组里
    for(const index in router.matched){
      if(router.matched[index].meta && router.matched[index].meta.title){
        breadCrumbItems.push({
          path: router.matched[index].path ? router.matched[index].path : '/',
          title: router.matched[index].meta.title,
        })
      }
    }

    this.breadCrumbItems = breadCrumbItems;
  }
}
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>