<template>
  <div class="schema-form">
    <p class="schema-form-desc">{{ schemaDesc }}</p>
    <el-form ref="form" :model="record" v-if="schema.length" label-position="top">
      <el-row :gutter="20">
        <el-col v-for="(property, index) in schema" :key="property.name" :span="24">
          <el-form-item :prop="property.name" :show-message="false">
            <template v-slot:label>
              {{ property.label[lang] }}
              <el-tooltip max-width="250px" placement="top" :content="property.hint[lang]">
                <el-icon class="field-help"><QuestionFilled /></el-icon>
              </el-tooltip>
            </template>
            <!-- String -->
            <el-input
              v-if="property.control === 'text' && property.type !== 'int'"
              v-model="record[property.name]"
              :type="property.name === 'password' ? 'password' : 'text'"
              :password="property.name === 'password'"
              :placeholder="property.default ? property.default.toString() : ''"
            ></el-input>
            <!-- Textarea -->
            <el-input
              v-if="property.control === 'textarea' && property.type !== 'int'"
              v-model="record[property.name]"
              type="textarea"
              :rows="3"
              :placeholder="property.default ? property.default.toString() : ''"
            ></el-input>
            <!-- Number -->
            <el-input
              v-model.number="record[property.name]"
              v-if="property.control === 'text' && property.type === 'int'"
              type="number"
              :placeholder="property.default ? property.default.toString() : ''"
            ></el-input>
            <!-- Boolean -->
            <div class="radio-control" v-if="property.control === 'radio' && property.type === 'bool'">
              <span class="radio-item">
                <input :id="`true-${index}-radio`" type="radio" v-model="record[property.name]" :value="true" />
                <label :for="`true-${index}-radio`">True</label>
              </span>
              <span class="radio-item">
                <input :id="`false-${index}-radio`" type="radio" v-model="record[property.name]" :value="false" />
                <label :for="`false-${index}-radio`">False</label>
              </span>
            </div>
            <el-select
              v-if="property.control === 'select'"
              v-model="record[property.name]"
              :placeholder="property.default ? property.default.toString() : ''"
              clearable
            >
              <el-option
                v-for="(item, index) in property.values"
                :key="index"
                :value="item.label ? item.value : item"
                >{{ item.label ? item.label[lang] : item }}</el-option
              >
            </el-select>
            <el-select
              v-if="property.control === 'col_selector' && property.type === 'array'"
              v-model="record[property.name]"
              :placeholder="property.default ? property.default.toString() : ''"
              filterable
              multiple
              allow-create
              @on-create="(val) => handleCreateColSelector(val, property.name)"
            >
              <el-option v-for="(value, index) in property.values" :key="index" :value="value">{{ value }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="schema.length">
        <el-button type="primary" size="small" htmlType="submit" @click="save"> 保存 </el-button>
      </el-form-item>
    </el-form>
    <p v-if="!schema.length" class="no-config">暂无配置项</p>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watch } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
})

const lang = ref('zh')
const df = getCurrentInstance().appContext.app._context.config.globalProperties.$df
const schema = ref([])
const schemaDesc = ref('')
const record = ref({})

watch(
  () => props.node,
  () => {
    if (props.node.data) {
      if (props.node.data.properties) {
        schema.value = props.node.data.properties
      } else {
        schema.value = []
      }
      if (props.node.data.schemaDesc) {
        schemaDesc.value = props.node.data.schemaDesc
      } else {
        schemaDesc.value = ''
      }
      if (props.node.data.record) {
        record.value = props.node.data.record
      } else {
        record.value = {}
      }
    } else {
      schema.value = []
      schemaDesc.value = ''
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

const handleCreateColSelector = (val, name) => {
  schema.value.forEach((item) => {
    if (item.name === name) {
      item.values.push(val)
    }
  })
}
const save = () => {
  df.value.updateNodeDataFromId(props.node.id, {
    ...props.node.data,
    record: record.value,
  })
}
</script>

<style lang="scss">
.schema-form {
  .schema-form-desc {
    text-align: left;
  }
  .el-form {
    .el-form-item__label {
      color: #a8acb6;
    }
    .el-tooltip__trigger {
      &.field-help {
        cursor: pointer;
        font-size: 16px;
        position: relative;
        top: 3px;
        left: 2px;
      }
    }
    .el-button {
      margin-bottom: 10px;
    }
  }
  .no-config {
    text-align: left;
  }
}
</style>
