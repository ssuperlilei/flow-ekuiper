<template>
  <div ref="el" class="basic-node">
    <div class="node-name">
      {{ name }}
      <el-button v-if="isChart" class="show-chart" type="primary" link @click="dialogVisible = true"
        >查看图表</el-button
      >
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="折线图" width="90%" draggable @opened="initEchart" append-to-body>
    <div ref="lineChartDom" style="width: 100%; height: 400px"></div>
  </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance, nextTick, onMounted, markRaw } from 'vue'
import * as echarts from 'echarts'

const name = ref('')
const el = ref(null)
const df = getCurrentInstance().appContext.app._context.config.globalProperties.$df

// 对话框 图表
const lineChartDom = ref(null)
const isChart = ref(false)
const dialogVisible = ref(false)
const lineChartOption = ref({})
const lineChart = ref({})
const initEchart = () => {
  if (!lineChart.value.length) {
    lineChart.value = markRaw(echarts.init(lineChartDom.value))
  }
  lineChartOption.value = {
    title: {
      text: 'Stacked Line',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  }
  lineChart.value.setOption(lineChartOption.value)
}

onMounted(async () => {
  await nextTick()
  const { id } = el.value.parentElement.parentElement
  const data = df.value.getNodeFromId(id.slice(5))
  name.value = data.data.label

  // 图表
  isChart.value = data.data.group === 'chart'
})
</script>
