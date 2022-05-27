<template>
  <div class="flow-config-card">
    <div class="config-header">
      <a @click="save">
        <el-icon size="20" ><DocumentAdd /></el-icon>
      </a>
      <a @click="upload">
        <el-icon size="20" ><UploadFilled /></el-icon>
      </a>
      <a @click="show">
        <el-icon size="20" ><VideoPlay /></el-icon>
      </a>
      <a @click="restore">
        <el-icon size="20" ><RefreshRight /></el-icon>
      </a>
    </div>
    <div class="config-body">
      <div class="config-title">{{ title }}</div>
      <SchemaForm :node="node" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import SchemaForm from './SchemaForm.vue'

export default defineComponent({
  components: {
    SchemaForm,
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const title = ref('')

    watch(
      () => props.node,
      () => {
        if (props.node.data) {
          if (props.node.data.label) {
            title.value = props.node.data.label
          } else {
            title.value = '请选择节点进行配置'
          }
        } else {
          title.value = '请选择节点进行配置'
        }
      },
      {
        immediate: true,
      }
    )
    const save = () => {
      emit('save')
    }
    const upload = () => {
      emit('upload')
    }
    const show = () => {
      emit('show')
    }
    const restore = () => {
      emit('restore')
    }

    return {
      title,
      save,
      upload,
      show,
      restore,
    }
  },
})
</script>

<style lang="scss">
.flow-config-card {
  color: #fff;
  padding: 0;
  background-color: #414756;
  padding: 15px 10px;
  box-shadow: 2px 0px 4px 0px #00000080;
  height: 100%;
  overflow-y: scroll;
  .config-header {
    height: 48px;
    padding: 12px 24px;
    margin-bottom: 12px;
    border-bottom: 1px solid #495062;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    a {
      color: #fff;
      &:hover {
        color: #00b173;
      }
    }
  }
  .config-title {
    margin-bottom: 12px;
    text-align: left;
  }
  .config-body {
    padding: 0 12px;
  }
  .ant-btn-primary {
    margin-top: 12px;
  }
  .schema-form {
    .ant-form {
      color: #fff;
    }
  }
}
</style>
