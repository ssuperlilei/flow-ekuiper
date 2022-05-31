<template>
  <div>
    <template v-for="menu in menuData">
      <el-sub-menu :key="menu.id" :index="menu.id" v-if="menu.children">
        <template #title>
          <span>{{ menu.label }}</span>
        </template>
        <menu-tree :menuData="menu.children"></menu-tree>
      </el-sub-menu>
      <el-menu-item :key="menu.id + 'key'" :index="menu.id" v-else>
       <template #title>
          <span draggable="true" @dragstart="dragstart($event, menu)">{{ menu.label }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
}
</script>

<script setup>
defineProps(['menuData'])

// 拖拽开始
const dragstart = (event, node) => {
  console.log(event, node)
  event.dataTransfer.setData('getNodeName', node.name)
  event.dataTransfer.setData('getNodeLabel', node.label)
  event.dataTransfer.setData('getNodeType', node.type)
  event.dataTransfer.setData('getNodeGroup', node.group)
  event.dataTransfer.effectAllowed = 'move'
}
</script>
