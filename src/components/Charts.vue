<template lang='pug'>
.chart(:style='{width:chartHeight,height:chartWidth}')
</template>

<script lang='ts'>
import {Component,Vue,Provide,Prop} from 'vue-property-decorator'
import echarts from 'echarts'
@Component({
  components:{}
})
export default class Charts extends Vue {
  @Prop({type:String,default:'line'}) readonly chartType!:string; // 图表类型 line/bar/pie
  @Prop(Object) chartData!:string|null;

  @Provide() chartWidth:string='';
  @Provide() chartHeight:string='';

  created(){
    this.generatorWidthAndHeight();
  }

  generatorWidthAndHeight(){
    // 图表生成宽度和高度
    this.chartWidth = `${document.body.offsetWidth*0.8}px`;
    this.chartHeight = `${document.body.offsetHeight*0.6}px`;
  }
}
</script>