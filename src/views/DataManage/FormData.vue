<template lang='pug'>
.form-data
  el-form(:model='form' :rules='rules' ref='ruleForm' label-width='100px')
    el-form-item(prop='title' label='课程名称')
      el-input(v-model='form.title' placeholder='请输入课程名称')
    el-form-item(prop='level' label='课程等级')
      el-select(v-model='form.level' placeholder='请输入课程等级')
        el-option(label='初级' value='初级')
        el-option(label='中级' value='中级')
        el-option(label='高级' value='高级')
    el-form-item(prop='count' label='报名人数')
      el-input(v-model='form.count' placeholder='请输入报名人数')
    el-form-item(prop='date' label='上线时间')
      el-date-picker(
        v-model='form.date' 
        type='date'
        value-format='yyyy-MM-dd'
        placeholder='选择日期')
    el-form-item(prop='title' label='技术栈')
      el-radio-group(v-model='form.type')
        el-radio(label='vue' name='type')
        el-radio(label='react' name='type')
        el-radio(label='node' name='type')
        el-radio(label='小程序' name='type')
        el-radio(label='angular' name='type')
    el-form-item
      el-button(@click='submitForm("ruleForm")' type='primary') 创建课程
      el-button(@click='resetForm("ruleForm")') 重置
</template>

<script lang='ts'>
import {Component,Vue,Provide} from 'vue-property-decorator'
@Component({
  components:{}
})
export default class FormData extends Vue {
  @Provide() form:object = {
    title: '',
    type: '',
    level: '',
    count: '',
    date: '',
  };
  @Provide() rules:any = {
    title:[{required:true,message:'请输入课程名称',trigger:'blur'}],
    level:[{required:true,message:'请输入课程等级',trigger:'change'}],
    count:[{required:true,message:'请输入报名人数',trigger:'blur'}],
    date: [
      {
        type: "string",
        required: true,
        message: "请选择日期",
        trigger: "change"
      }
    ],
    type: [
      {
        required: true,
        message: "请选择技术栈",
        trigger: "change"
      }
    ]
  }

  submitForm(formName:string){
    (this as any).$refs[formName].validate((valid:boolean)=>{
      if(valid){
        (this as any).$axios.post(`api/profiles/add`,this.form)
          .then((res:any)=>{
            // console.log(res.data);
            this.$message({
              message: res.data.msg,
              type: 'success'   
            })
            this.resetForm(formName);
          })
      }
    })
  }

  resetForm(formName:string){
    (this as any).$refs[formName].resetFields()
  }
}
</script>