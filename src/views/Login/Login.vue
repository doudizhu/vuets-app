<template lang='pug'>
  .login
    LoginHeader
      el-form(:model='ruleForm' :rules='rules' ref='ruleForm' label-position='left' label-width='0px' slot='container')
        .title
          h3 账号密码登录
        //-   
        el-form-item(prop='username')
          el-input(v-model='ruleForm.username' placeholder='账号' auto-complete='off')
            i(slot='prefix' class='fa fa-user-o')
        //- password
        el-form-item(prop='pwd')
          el-input(v-model='ruleForm.pwd' type='password' placeholder='密码' auto-complete='off')
            i(slot='prefix' class='fa fa-lock')
        //- 登录button
        el-form-item
          el-button(@click.native.prevent='handleSubmit' :loading='isLogin' type='primary' style='width:100%') 登录
        //- 7天登录和忘记密码
        el-form-item
          el-checkbox(v-model='ruleForm.autoLogin' :checked='ruleForm.autoLogin') 7天内自动登录
          el-button(type='text' @click='$router.push("/password")').forget 忘记密码？
        
</template>

<script lang='ts'>
import {Component,Vue,Provide} from 'vue-property-decorator'
import LoginHeader from './LoginHeader.vue'
import {State,Getter,Mutation,Action} from 'vuex-class'
@Component({
  components: {LoginHeader,}
})
export default class Login extends Vue{
  // 存储用户信息
  @Action('setUser') setUser:any;

  @Provide() isLogin:boolean=false

  @Provide() ruleForm: {
    username: String;
    pwd: String;
    autoLogin:boolean;
  } = {
    username: '',
    pwd: '',
    autoLogin: true // 是否自动登录
  }

  @Provide() rules = {
    username:[{required: true,message:'请输入账号',trigger:'blur'}],
    pwd:[{required: true,message:'请输入密码',trigger:'blur'}]
  }

  handleSubmit():void{
    (this.$refs['ruleForm'] as any).validate((valid:boolean) => {
      if(valid){
        // console.log('校验通过')
        this.isLogin = true;
        (this as any).$axios
          .post("/api/users/login", this.ruleForm)
          .then((res: any) => {
            // console.log('res',res)
            // 存储token
            localStorage.setItem('tsToken', res.data.token)
            // 存储到vuex中
            this.setUser(res.data.token)

            // 登录成功 跳转
            this.$router.push('/')
          })
          .catch(() => {
            this.isLogin = false;
          });
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style>