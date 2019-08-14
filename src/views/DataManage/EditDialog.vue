<template lang='pug'>
el-dialog(title='编辑课程' :visible.sync='dialogVisible')
  el-form(:model='form' ref='ruleForm' label-width='100px' size='small' class='form-box')
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
  span.dialog-footer(slot='footer')
    el-button(size='small') 取消
    el-button(type='primary' size='small') 确定
</template>

<script lang='ts'>
import {Component,Vue,Prop,Provide} from 'vue-property-decorator'
@Component({
  components:{}
})
export default class EditDialog extends Vue {
  // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Object) form!: {
    title: string,
    type: string,
    level: string,
    count: string,
    date: string,
    _id: string;
  };

  created(){
    console.log(this.dialogVisible, this.form)
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