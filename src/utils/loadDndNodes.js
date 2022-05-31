import Schema from '../assets/Properties.json'

const loadDndNodes = () => {
  const groups = [
    {
      groupName: '数据源',
      groupValue: 'source',
    },
    {
      groupName: '数据处理',
      groupValue: 'function',
    },
    {
      groupName: '数据目标',
      groupValue: 'sink',
    },
    {
      groupName: '图表',
      groupValue: 'chart',
    },
  ]
  const sourceDndNodes = Object.keys(Schema.source).map((key) => ({
    value: key,
    label: key,
    type: 'output',
    group: 'source',
  }))
  const sinkDndNodes = Object.keys(Schema.sink).map((key) => ({
    value: key,
    label: key,
    type: 'default',
    group: 'sink',
  }))
  const functionDndNodes = Object.keys(Schema.function).map((key) => ({
    value: key,
    label: key,
    type: 'default',
    group: 'function',
  }))
  const chartDndNodes = [
    {
      value: 'line',
      label: '折线图',
      type: 'input',
      group: 'chart',
    },
  ]
  const dndNodes = [...sourceDndNodes, ...sinkDndNodes, ...functionDndNodes, ...chartDndNodes]
  const nodeGroups = [
    {
      label: '数据源',
      name: 'source',
      id: '1'
    },
    {
      label: '边缘高速数据总线',
      name: 'edge high-speed data bus',
      id: '1-1',
      parent: '1'
    },
    {
      label: '离线数据',
      name: 'offline data',
      id: '1-2',
      parent: '1'
    },
    {
      label: '边缘服务',
      name: 'edge service',
      id: '1-3',
      parent: '1'
    },
    ...Object.entries(Schema.source).map(([key, value]) => ({
      label: key,
      name: key,
      id: value.id,
      parent: value.parent,
      type: 'output',
      group: 'source',
      node: value,
    })),
    {
      label: '数据处理',
      name: 'function',
      id: '2',
    },
    {
      label: '边缘信号处理工具箱',
      name: 'Edge Signal Processing Toolbox',
      id: '2-1',
      parent: '2'
    },
    {
      label: '信号预处理',
      name: 'signal preprocessing',
      id: '2-1-1',
      parent: '2-1'
    },
    {
      label: '平滑处理',
      name: 'smoothing',
      id: '2-1-1-1',
      parent: '2-1-1'
    },
    {
      label: '特征统计',
      name: 'Feature Statistics',
      id: '2-1-2',
      parent: '2-1'
    },
    {
      label: '滤波',
      name: 'filter',
      id: '2-1-3',
      parent: '2-1'
    },
    {
      label: '频谱分析',
      name: 'Spectrum analysis',
      id: '2-1-4',
      parent: '2-1'
    },
    ...Object.entries(Schema.function).map(([key, value]) => ({
      label: value.about.description.zh,
      name: key,
      id: value.id,
      parent: value.parent,
      type: 'default',
      group: 'function',
      node: value,
    })),
    {
      label: '传输与存储',
      name: 'sink',
      id: '3',
    },
    ...Object.entries(Schema.sink).map(([key, value]) => ({
      label: key,
      name: key,
      id: value.id,
      parent: value.parent,
      type: 'default',
      group: 'sink',
      node: value,

    })),
    {
      label: '可视化',
      name: 'visualization',
      id: '4',
    },
    ...Object.entries(Schema.chart).map(([key, value]) => ({
      label: key,
      name: key,
      id: value.id,
      parent: value.parent,
      type: 'input',
      group: 'chart',
      node: value,
    })),
  ]
  return {
    groups,
    dndNodes,
    nodeGroups,
  }
}

export default loadDndNodes
