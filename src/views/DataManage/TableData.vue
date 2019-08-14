<template lang='pug'>
.table-data
  .search-box
    el-input(size='small' v-model='searchVal' placeholder='请输入课程名称检索')
    el-button(size='small' type='primary' icon='el-icon-search') 搜索
  el-table.table-box(:data='tableData' border style='width:100%;' :height='tHeight')
    el-table-column(type='index' label='序号' width='60')
    el-table-column(prop='title' label='课程名称')
    el-table-column(prop='level' label='课程等级' width='120')
    el-table-column(prop='type' label='技术栈' width='120')
    el-table-column(prop='count' label='报名人数' width='120')
    el-table-column(prop='date' label='上线日期' width='160')
    el-table-column(label='操作' width='160')
      template
        el-button(size='mini') 编辑
        el-button(size='mini' type='danger') 删除
  .pages(ref='page-box')
    el-pagination(
      :page-sizes='[5,10,20]' 
      :page-size='size' 
      layout='total,sizes,prev,pager,next,jumper'
      :total='total'
    )
</template>

<script lang='ts'>
import {Component,Vue,Provide} from 'vue-property-decorator'
@Component({
  components:{}
})
export default class TableData extends Vue {
  @Provide() searchVal: string='';// 搜索框
  @Provide() tHeight: number=document.body.offsetHeight - 270;
  @Provide() tableData: any = []; // 表格数据
  @Provide() page: number = 1; // 当前page
  @Provide() size: number = 5; // 请求数据的个数 默认5
  @Provide() total: number = 0; // 总数据条数

  created() {
    this.loadData();
  }

  loadData(){
    (this as any).$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
      .then((res:any)=>{
        // console.log(res.data);
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      })
  }
}
</script>


<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>