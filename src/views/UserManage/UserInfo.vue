<template lang='pug'>
.user-info
  .img-box
    .title About me
    img(:src="require('@/assets/'+getUser.key+'.jpg')")
    h4 {{getUser.username}}
  .info-box
    h2.title Account
    //- form
    el-form.form-box(:model='userData')
      el-form-item(label='用户名')
        el-input(v-model='getUser.username' readonly)
      el-form-item(label='密码')
        el-input(v-model='userData.pwd' type='password')
      el-form-item
        el-button(@click='onSubmit' :loading='loading' type='primary' :disabled='!userData.pwd') 修改密码

</template>

<script lang='ts'>
import {Component,Vue,Provide} from 'vue-property-decorator'
import {State,Getter,Mutation,Action} from 'vuex-class'
@Component({
  components:{}
})
export default class UserInfo extends Vue {
  @Getter('user') getUser: any;

  @Provide() userData:{username:string,pwd:string} ={
    username: '',
    pwd: ''
  }

  @Provide() loading:boolean = false; // 是否发起网络请求

  created(){
    console.log(this.getUser)
  }

  onSubmit(){
    this.userData.username = this.getUser.username
    // console.log(this.userData)
    this.loading = true;

    // 发起请求
    (this as any).$axios
      .post('/api/users/changePwd',this.userData)
      .then((res: any) => {
        // console.log(res.data);
        this.loading = false;
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  height: calc(100% - 70px);
  display: flex;
  overflow: auto;
  color: #606266;
  .img-box,
  .info-box {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    background: #fff;
    .title {
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
      text-align: left;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .img-box {
    text-align: center;
    width: 30%;
    margin-right: 10px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    h4 {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .info-box {
    flex: 1;
    .form-box {
      padding: 10px;
    }
  }
}
</style>
