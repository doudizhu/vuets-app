<template lang='pug'>
.account-data
  .add-
    el-button(type='primary') 新增账户
  el-table(:data='tableData' border style='width:100%;')
    el-table-column(label='角色' width='180')
      template(slot-scope='scope')
        span {{scope.row.role}}
    el-table-column(label='账号' width='180')
      template(slot-scope='scope')
        span {{scope.row.username}}
    el-table-column(prop='des' label='描述' width='180')
    el-table-column(label='操作' width='180')
      template(slot-scope='scope' v-if='scope.row.username != "admin"')
        el-button(size='mini') 编辑
        el-button(size='mini' type='danger') 删除
</template>

<script lang='ts'>
import {Component,Vue,Provide} from 'vue-property-decorator'
@Component({
  components:{}
})
export default class AccountData extends Vue {
  @Provide() tableData:any = []

  created(){
    this.getData();
  }

  getData(){
    (this as any).$axios('/api/users/allUsers').then((res:any)=>{
      this.tableData = res.data.datas;
    })
  }
}
</script>

<style lang="scss" scoped>
.account-data {
  height: 100%;
  overflow: auto;
  .add-box {
    margin-bottom: 10px;
  }
}
</style>