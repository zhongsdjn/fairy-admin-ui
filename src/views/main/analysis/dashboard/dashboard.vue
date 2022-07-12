<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const divRef = ref<HTMLElement>();
onMounted(() => {
  const echartInstance = echarts.init(divRef.value!, 'light', {'renderer': 'svg'});
  const option = {
    title: {
        text: 'ECharts  学习'
    },
    tooltip:{
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋', '袜子']
    },
    yAxis:{},
    series:[{
        name:'销量',
        type:'bar',
        data:[5,20,36,10,10,27]
    }]
  };
  echartInstance.setOption(option);
});
</script>
<template>
  <div class="dashboard">
    <div ref="divRef" :style="{ width: '500px',height:'500px' }"></div>
  </div>
</template>
<style scoped lang="less"></style>
