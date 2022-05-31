<template>
  <div class="flow-sidebar">
    <!-- <template v-for="group in groups">
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
    </template> -->
    <el-menu :default-openeds="defaultOpeneds">
      <menu-tree :menuData="nodeGroups"></menu-tree>
    </el-menu>
  </div>
</template>

<script setup>
import loadDndNodes from '@/utils/loadDndNodes'
import { ref } from 'vue'
import { arrToTree } from '@/utils'
import _ from 'lodash'
import MenuTree from './MenuTree.vue'

const groups = ref([])
const dndNodes = ref([])
const showNodes = ref([])

groups.value = loadDndNodes().groups
dndNodes.value = loadDndNodes().dndNodes
showNodes.value = _.cloneDeep(dndNodes.value)
console.log(arrToTree(loadDndNodes().nodeGroups))
const defaultOpeneds = ref(['1', '2', '3', '4'])
const nodeGroups = arrToTree(loadDndNodes().nodeGroups)
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
