<template>
  <div ref="el" class="basic-node">
    <div class="node-name">
      {{ name }}
      <el-button v-if="isChart" class="show-chart" type="primary" link>查看图表</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, nextTick, onMounted } from 'vue'

    const name = ref('')
    const el = ref(null)
    const df = getCurrentInstance().appContext.app._context.config.globalProperties.$df
    const isChart = ref(false)

    onMounted(async () => {
      await nextTick()
      const { id } = el.value.parentElement.parentElement
      const data = df.value.getNodeFromId(id.slice(5))
      name.value = data.data.label
      isChart.value = data.data.group === 'chart'
    })
</script>
