<template lang='pug'>
.account-data
  .add-
    el-button(@click='addAccount' type='primary') 新增账户
  el-table(:data='tableData' border style='width:100%;')
    el-table-column(label='角色' width='180')
      template(slot-scope='scope')
        el-select(v-if='scope.row.edit' @change='selectChange(scope.row)' v-model='scope.row.role')
          el-option(
            v-for="option in options" 
            :label="option.role"
            :value="option.role"
            :key="option.key"
          )
        span(v-else) {{scope.row.role}}
    el-table-column(label='账号' width='180')
      template(slot-scope='scope')
        el-input(v-if='scope.row.edit' v-model='scope.row.username')
        span(v-else) {{scope.row.username}}
    el-table-column(prop='des' label='描述' width='180')
    el-table-column(label='操作' width='180')
      template(slot-scope='scope' v-if='scope.row.username != "admin"')
        el-button(v-if='!scope.row.edit' @click='handleEdit(scope.$index,scope.row)' size='mini') 编辑
        el-button(v-else @click='handleSave(scope.$index,scope.row)' type='success' size='mini') 完成
        el-button(@click='handleDelete(scope.$index,scope.row)' size='mini' type='danger') 删除

  AddAccount(:dialogVisible='dialogVisible' :options='options' @closeDialog='closeDialog' @update='getData')
</template>

<script lang='ts'>
import {Component,Vue,Provide} from 'vue-property-decorator'
import AddAccount from './AddAccount.vue'
@Component({
  components:{AddAccount,}
})
export default class AccountData extends Vue {
  @Provide() tableData:any = []

  @Provide() dialogVisible:boolean = false;
  // select数据
  @Provide() options:any = [
    {
      key: 'admin',
      role: '管理员',
      des: 'Super Administrator. Have access to view all pages.',
    },
    {
      key: "editor",
      role: "客服",
      des: "Normal Editor. Can see all pages except permission page"
    },
    {
      key: "visitor",
      role: "游客",
      des: "Just a visitor. Can only see the home page and the document page"
    },
  ]

  created(){
    this.getData();
  }
  handleDelete(index:number,row:any):void{
    // 删除
    (this as any).$axios
      .delete(`/api/users/deleteUser/${row._id}`)
      .then((res:any)=>{
        this.$message({
          message:res.data.msg,
          type:'success'
        })
      })
    this.tableData.splice(index,1)
  }
  selectChange(item: any){
    this.options.map((option:any)=>{
      if(option.role == item.role){
        item.key = option.key;
        item.des = option.des;
      }
    })
  }
  handleEdit(index:number,row:any):void{
    // 编辑
    row.edit = true
  }
  handleSave(index:number,row:any):void{
    // 完成
    row.edit = false;
    (this as any).$axios
      .post(`/api/users/editUser/${row._id}`,row)
      .then((res:any)=>{
        this.$message({
          message: res.data.msg,
          type: 'success',
        })
      })
  }

  getData(){
    (this as any).$axios('/api/users/allUsers').then((res:any)=>{
      // 设置编辑状态
      res.data.datas.forEach((item:any)=>{
        item.edit = false
      })
      this.tableData = res.data.datas;

      // console.log('this.tableData:',this.tableData)

    })
  }

  addAccount(){
    this.dialogVisible = true
  }
  closeDialog(){
    this.dialogVisible = false;
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