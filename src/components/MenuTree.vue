<template>
  <div>
    <template v-for="menu in menuData">
      <el-sub-menu :key="menu.id" :index="menu.id" v-if="menu.children">
        <template #title>
          <span>{{ menu.label }}</span>
        </template>
        <menu-tree :menuData="menu.children"></menu-tree>
      </el-sub-menu>
      <el-menu-item
        :key="menu.id + 'key'"
        :index="menu.id"
        v-else
        draggable="true"
        @dragstart="dragstart($event, menu)"
        class="dbnode"
      >
        <template #title>
          <span>{{ menu.label }}</span>
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
  event.dataTransfer.setData('getNodeName', node.name)
  event.dataTransfer.setData('getNodeLabel', node.label)
  event.dataTransfer.setData('getNodeType', node.type)
  event.dataTransfer.setData('getNodeGroup', node.group)
  event.dataTransfer.effectAllowed = 'move'
}
</script>

<style lang="scss">
.dbnode {
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
</style>
