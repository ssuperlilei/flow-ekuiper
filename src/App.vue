<template>
  <div class="flow">
    <flow-sidebar class="sidebar"></flow-sidebar>
    <div id="drawflow" @drop="drop" @dragover="allowDrop"></div>
    <div class="config-card">
      <ConfigCard
        :node="selectNode"
        @save="onSave"
        @restore="onRestore"
        @show="onShow"
        @upload="uploadNodes"
      ></ConfigCard>
    </div>
    <div class="controls">
      <el-icon v-if="isLock" @click="changeLock" title="解锁"><Lock /></el-icon>
      <el-icon v-else @click="changeLock" title="锁定"><Unlock /></el-icon>
      <el-icon @click="zoomOut" title="缩小"><ZoomOut /></el-icon>
      <el-icon @click="zoomReset" title="恢复"><Refresh /></el-icon>
      <el-icon @click="zoomIn" title="放大"><ZoomIn /></el-icon>
    </div>
  </div>
</template>

<script setup>
import Drawflow from 'drawflow'
import FlowSidebar from '@/components/FlowSidebar.vue'
import ConfigCard from '@/components/ConfigCard.vue'
import BasicNode from '@/components/BasicNode.vue'
import Schema from './assets/Properties.json'
import { onMounted, shallowRef, h, getCurrentInstance, render, ref } from 'vue'
import serializedUpload from '@/utils/uploadData'
import deserializeNodes from '@/utils/handleNodes'

const editor = shallowRef({})
const lang = ref('zh')
const Vue = { version: 3, h, render }
const internalInstance = getCurrentInstance()
internalInstance.appContext.app._context.config.globalProperties.$df = editor
const isLock = ref(false)
const properties = ref([])
const schemaDesc = ref('')

const allowDrop = (ev) => {
  ev.preventDefault()
}
// 拖拽结束，释放节点，获取节点信息
const drop = (ev) => {
  ev.preventDefault()
  const name = ev.dataTransfer.getData('getNodeName')
  const label = ev.dataTransfer.getData('getNodeLabel')
  const type = ev.dataTransfer.getData('getNodeType')
  const group = ev.dataTransfer.getData('getNodeGroup')
  const _schema = Schema[group]
  const currentSchema = _schema[name]
  console.log(currentSchema, name)
  if (currentSchema.properties) {
    properties.value = currentSchema.properties
    schemaDesc.value = currentSchema.about.description[lang.value]
  } else if (currentSchema.functions) {
    properties.value = currentSchema.functions[0].args
    schemaDesc.value = currentSchema.functions[0].hint[lang.value]
  } else {
    properties.value = []
    schemaDesc.value = ''
  }
  addNodeToDrawFlow(name, ev.clientX, ev.clientY, label, type, group, properties.value, schemaDesc.value)
}

// 添加节点
const addNodeToDrawFlow = (name, pos_x, pos_y, label, type, group, properties, schemaDesc) => {
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
        properties,
        schemaDesc,
      },
      'BasicNode',
      'vue',
    )
  }
}

// 保存节点信息至 localStorage
const onSave = () => {
  const exportValue = editor.value.export()
  console.log('原始数据', exportValue)
  localStorage.setItem('flowKey', JSON.stringify(exportValue))
}
const onRestore = () => {
  const flow = JSON.parse(localStorage.getItem('flowKey'))
  editor.value.import(flow)
}
// 接口保存
const uploadNodes = () => {
  const exportValue = editor.value.export()
  const data = exportValue.drawflow.Home.data
  const flowData = serializedUpload(data)
  console.log('接口保存数据', flowData)
  localStorage.setItem('flowData', JSON.stringify(flowData))
}

// 测试接口获取的值，展示在页面上
const onShow = () => {
  const flowData = JSON.parse(localStorage.getItem('flowData'))
  const nodes = deserializeNodes(flowData.graph)
  editor.value.import(nodes)
}

// 改变锁定状态
const changeLock = () => {
  isLock.value = !isLock.value
  if (isLock.value) {
    editor.value.editor_mode = 'fixed'
  } else {
    editor.value.editor_mode = 'edit'
  }
}

// 缩小
const zoomOut = () => {
  editor.value.zoom_out()
}

// 还原初始大小
const zoomReset = () => {
  editor.value.zoom_reset()
}

// 放大
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

  // 监听节点选中事件
  editor.value.on('nodeSelected', (nodeId) => {
    const data = editor.value.getNodeFromId(nodeId)
    selectNode.value = data
    isSelectNode.value = true
  })

  // 监听节点取消选中事件
  editor.value.on('nodeUnselected', () => {
    isSelectNode.value = false
    selectNode.value = {}
  })
})
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
    width: 20%;
    height: 100%;
  }
  .config-card {
    width: 25%;
    height: 100%;
  }
  #drawflow {
    display: block;
    position: relative;
    width: 55%;
    height: 100%;
  }
  .controls {
    position: absolute;
    top: 1%;
    right: 28%;
    font-size: 20px;
    .el-icon {
      margin-right: 5px;
      cursor: pointer;
    }
  }
}
</style>
