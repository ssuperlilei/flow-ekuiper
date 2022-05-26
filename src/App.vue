<template>
  <div class="flow">
    <flow-sidebar class="sidebar"></flow-sidebar>
    <div id="drawflow" @drop="drop" @dragover="allowDrop"></div>
    <div class="config-card">
      <ConfigCard :node="selectNode" @save="onSave" @restore="onRestore" @upload="uploadNodes"></ConfigCard>
    </div>
    <div class="controls">
      <el-icon v-if="isLock" size="24" @click="changeLock" ><Lock /></el-icon>
      <el-icon v-else size="24" @click="changeLock" ><Unlock /></el-icon>
      <el-icon size="24" @click="zoomOut" ><ZoomOut /></el-icon>
      <el-icon size="24" @click="zoomReset" ><Refresh /></el-icon>
      <el-icon size="24" @click="zoomIn" ><ZoomIn /></el-icon>
    </div>
  </div>
</template>
<script>
import Drawflow from 'drawflow'
import FlowSidebar from '@/components/FlowSidebar.vue'
import ConfigCard from '@/components/ConfigCard.vue'
import BasicNode from '@/components/BasicNode.vue'
import { onMounted, shallowRef, h, getCurrentInstance, render, ref } from 'vue'

export default {
  name: 'App',
  components: {
    FlowSidebar,
    ConfigCard,
  },
  setup() {
    const editor = shallowRef({})
    const Vue = { version: 3, h, render }
    const internalInstance = getCurrentInstance()
    internalInstance.appContext.app._context.config.globalProperties.$df = editor
    const isLock = ref(false)
    const exportdf = () => {
      const data = editor.value.export()
      console.log(data)
    }

    const importdf = () => {
      // editor.value.import(JSON.parse(editor.value.export()))
    }

    const allowDrop = (ev) => {
      ev.preventDefault()
    }
    const drop = (ev) => {
      ev.preventDefault()
      const name = ev.dataTransfer.getData('getNodeName')
      const label = ev.dataTransfer.getData('getNodeLabel')
      const type = ev.dataTransfer.getData('getNodeType')
      const group = ev.dataTransfer.getData('getNodeGroup')
      addNodeToDrawFlow(name, ev.clientX, ev.clientY, label, type, group)
    }

    const addNodeToDrawFlow = (name, pos_x, pos_y, label, type, group) => {
      if (editor.value.editor_mode !== 'fixed') {
        // eslint-disable-next-line
        pos_x =
          pos_x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) -
          editor.value.precanvas.getBoundingClientRect().x *
            (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom))
        // eslint-disable-next-line
        pos_y =
          pos_y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) -
          editor.value.precanvas.getBoundingClientRect().y *
            (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom))
        let input = 0
        let output = 0
        switch (type) {
          case 'output':
            input = 0
            output = 1
            break
          case 'input':
            input = 1
            output = 0
            break
          case 'default':
            input = 1
            output = 1
            break
          default:
            break
        }
        editor.value.addNode(
          name,
          input,
          output,
          pos_x,
          pos_y,
          'BasicNode',
          {
            name,
            label,
            type,
            group,
          },
          'BasicNode',
          'vue',
        )
      }
    }

    const onSave = () => {
      const exportValue = editor.value.export()
      localStorage.setItem('flowKey', JSON.stringify(exportValue))
    }
    const onRestore = () => {
      const flow = JSON.parse(localStorage.getItem('flowKey'))
      editor.value.import(flow)
    }
    const uploadNodes = () => {
      console.log('upload')
    }
    const changeLock = () => {
      isLock.value = !isLock.value
      if (isLock.value) {
        editor.value.editor_mode = 'fixed'
      } else {
        editor.value.editor_mode = 'edit'
      }
    }
    const zoomOut = () => {
      editor.value.zoom_out()
    }
    const zoomReset = () => {
      editor.value.zoom_reset()
    }
    const zoomIn = () => {
      editor.value.zoom_in()
    }

    let selectNode = ref({})
    let isSelectNode = ref(false)

    onMounted(() => {
      const id = document.getElementById('drawflow')
      editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context)
      editor.value.registerNode('BasicNode', BasicNode, {}, {})
      editor.value.start()
      editor.value.on('nodeSelected', (nodeId) => {
        const data = editor.value.getNodeFromId(nodeId)
        selectNode.value = data
        isSelectNode.value = true
      })
      editor.value.on('nodeUnselected', () => {
        isSelectNode.value = false
        selectNode.value = {}
      })
    })

    return {
      editor,
      isLock,
      selectNode,
      isSelectNode,
      exportdf,
      importdf,
      allowDrop,
      drop,
      addNodeToDrawFlow,
      onSave,
      onRestore,
      uploadNodes,
      changeLock,
      zoomOut,
      zoomReset,
      zoomIn,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style lang="scss">
.flow {
  // border: 1px solid #dcdee2;
  padding: 0;
  display: flex;
  height: 100%;
  width: 100%;
  // padding: 16px 8px;
  .sidebar {
    width: 15%;
    height: 100%;
  }
  .config-card {
    width: 25%;
    height: 100%;
  }
  #drawflow {
    display: block;
    position: relative;
    width: 60%;
    height: 800px;
  }
  .controls {
    position: absolute;
    top: 1%;
    right: 28%;
    .el-icon {
      cursor: pointer;
    }
  }
}
</style>
