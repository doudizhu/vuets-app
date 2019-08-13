<template lang='pug'>
el-scrollbar.el-scrollbar
  el-menu.el-menu-slide(router :default-active='$router.currentRoute.path')
    //- el-menu-item(index='1')
    //-   i.el-icon-menu
    //-   span(slot='title') 首页
    template(v-for='item in getRouters' v-if='item.hidden&&item.children&&item.children.length>0')
      el-menu-item(v-if='item.children.length==1' :index='item.children[0].path' :key='item.name')
        i(v-if='item.children[0].meta.icon' :class='item.children[0].meta.icon')
        span(slot='title') {{item.children[0].meta.title}}
      //- 多个子元素
      el-submenu(v-else :index="item.children[0].path" :key="item.name")
        template(slot='title')
          i(v-if='item.meta.icon' :class='item.meta.icon')
          span(v-if='item.meta&&item.meta.title' slot='title') {{item.meta.title}}
        el-menu-item(v-for="child in item.children" :index="child.path" :key="child.name")
          i(v-if="child.meta.icon" :class="child.meta.icon")
          span(slot='title') {{child.meta.title}}  
</template>

<script lang='ts'>
import {Component,Vue} from 'vue-property-decorator'
import {State,Getter,Mutation,Action} from 'vuex-class'
@Component({
  components:{}
})
export default class Sidebar extends Vue {
  @Getter('routers') getRouters: any;
  created(){
    // console.log(this.getRouters)
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>