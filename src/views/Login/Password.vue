<template lang='pug'>
  .password
    LoginHeader
      el-form(slot='container')
        .title
          h3 找回密码
</template>

<script lang='ts'>
import {Component,Vue} from 'vue-property-decorator'
import LoginHeader from './LoginHeader.vue'
@Component({
  components: {LoginHeader,}
})
export default class Password extends Vue{}
</script>

<style lang="scss" scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>