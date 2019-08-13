<template lang='pug'>
  .layout
    //- 头部
    LayoutHeader
    //- 内容

</template>

<script lang='ts'>
import {Component,Vue} from 'vue-property-decorator'
import LayoutHeader from './LayoutHeader.vue'
@Component({
  components:{LayoutHeader}
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
}
</style>