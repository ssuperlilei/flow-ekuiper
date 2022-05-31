<template>
  <div class="flow-sidebar">
    <div className="search-bar">
      <el-input
        clearable
        v-model="searchValue"
        suffix-icon="Search"
        placeholder="Enter something..."
        @change="handlerSearch"
      />
    </div>
    <template v-for="group in groups">
      <div class="group-name">
        {{ group.groupName }}
      </div>
      <div v-for="node in showNodes.filter((dndNode) => dndNode.group === group.groupValue)">
        <div
          :class="['dndnode', node.type]"
          draggable="true"
          :key="`${node.value}-${node.type}`"
          @dragstart="dragstart($event, node)"
        >
          <div class="dnd-node-label">{{ node.label }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import loadDndNodes from '@/utils/loadDndNodes'
import _ from 'lodash'
import { ref } from 'vue'

const groups = ref([])
const dndNodes = ref([])
const searchValue = ref('')
const showNodes = ref([])

groups.value = loadDndNodes().groups
dndNodes.value = loadDndNodes().dndNodes
showNodes.value = _.cloneDeep(dndNodes.value)

const handlerSearch = (value) => {
  if (value) {
    showNodes.value = dndNodes.value.filter((node) => node.label.includes(value))
  } else {
    showNodes.value = _.cloneDeep(dndNodes.value)
  }
}

const dragstart = (event, node) => {
  event.dataTransfer.setData('getNodeName', node.value)
  event.dataTransfer.setData('getNodeLabel', node.label)
  event.dataTransfer.setData('getNodeType', node.type)
  event.dataTransfer.setData('getNodeGroup', node.group)
  event.dataTransfer.effectAllowed = 'move'
}
</script>

<style lang="scss">
.flow-sidebar {
  background-color: #414756;
  padding: 15px 10px;
  font-size: 14px;
  box-shadow: 0px 2px 4px 0px #00000080;
  height: 100%;
  overflow: scroll;
  .description {
    margin-bottom: 10px;
  }
  .group-name {
    color: #cfcfcf;
    font-size: 14px;
    padding: 12px 0;
  }
  .search-bar {
    width: 100%;
    margin-bottom: 20px;
  }
  .search-bar .ant-input {
    border: none;
  }
  .dndnode {
    height: 42px;
    padding: 4px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    background: #393f4e;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    border: 1px solid transparent;
    transition: all 0.2s;
    &:hover {
      border: 1px solid #00b173;
    }
  }
}
</style>
