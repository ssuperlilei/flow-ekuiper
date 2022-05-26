<template>
  <div ref="el">
    <div class="node-name">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, nextTick, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const name = ref('')
    const el = ref(null)
    const df = getCurrentInstance().appContext.app._context.config.globalProperties.$df

    onMounted(async () => {
      await nextTick()
      const { id } = el.value.parentElement.parentElement
      const data = df.value.getNodeFromId(id.slice(5))
      name.value = data.data.name
    })

    return {
      name,
      el,
    }
  },
})
</script>
