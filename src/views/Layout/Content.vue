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
          el-breadcrumb-item 活动管理
          el-breadcrumb-item 活动列表
          el-breadcrumb-item 活动详情
      //- 页面内容
      .content
        slot(name='content')
</template>

<script lang='ts'>
import {Component,Vue} from 'vue-property-decorator'
@Component({
  components:{}
})
export default class Content extends Vue {}
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