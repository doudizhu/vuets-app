<template lang='pug'>
el-dialog(title='新增账户' :visible.sync='dialogVisible' :show-close='false' :close-on-click-modal='false' width='30%')
  el-form(:model='account' :rules='rules' ref='ruleForm' class='form-box' label-width='100px')
    el-form-item(label='请选择角色' prop='role')
      el-select(v-model='account.role' placeholder='请选择角色' @change='selectChange')
        el-option(v-for='option in options' :label='option.role' :value='option.role' :key='option.key')
    el-form-item(lable='请输入账号' prop='username')
      el-input(v-model='account.username' placeholder='请输入账号')
  span(slot='footer' class='dialog-footer')
    el-button(@click='$emit("closeDialog")') 取消
    el-button(@click='handleAdd' type='primary') 确定
</template>

<script lang='ts'>
import {Component,Vue,Provide,Prop,Emit} from 'vue-property-decorator'
@Component({
  components:{}
})
export default class App extends Vue {
  // prop
  @Prop(Boolean) dialogVisible!:boolean;
  @Prop(Array) options!:any;

  @Provide() account:object = {
    key: '',
    role: '',
    username: '',
    des: '',
  }

  @Provide() rules:any = {
    username:[{required:true,message:'请输入账号',trigger:'blur'}],
    role:[{required:true,message:'请选择角色',trigger:'change'}],
  }

  selectChange(select:string){
    this.options.map((option:any)=>{
      if(option.role==select){
        (this as any).account.key = option.key;
        (this as any).account.des = option.des;
      }
    })
  }

  @Emit('closeDialog')
  handleAdd(){
    // console.log(this.account)
    (this as any).$refs['ruleForm'].validate((valid:boolean)=>{
      if(valid){
        // console.log('valid:',valid);
        (this as any).$axios.post('/api/users/addUser',this.account)
          .then((res:any)=>{
            this.$emit('update')
            this.$message({
              message:res.data.msg,
              type:'success',
            })  
          })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>