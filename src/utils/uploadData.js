const serializedExpr = (name, properties, record) => {
  const params = []
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      const element = properties[key]
      if (record[element.name]) {
        params.push(record[element.name])
      } else {
        switch (element.type) {
          case 'number':
            params.push(0)
            break;
          case 'string':
            params.push('')
            break;
          case 'boolean':
            params.push(false)
            break;
          case 'array':
            params.push([])
            break;
          default:
            params.push(null)
            break;
        }
        
      }
    }
  }
  return `${name}(${params.join(',')})`
}

const getOutputs = (data, outputs) => {
  const result = []
  Object.entries(outputs).forEach(([key, value]) => {
    value.connections.forEach((connection) => {
      const beConnected = data[connection.node]
      result.push(beConnected.data.name)
    })
  })
  return result
}

const serializedUpload = (data) => {
  const nodes = {}
  const topo = {
    sources: [],
    edges: {},
  }
  Object.entries(data).forEach(([key, value]) => {
    if (value.data.group === 'function') {
      nodes[value.data.name] = {
        type: value.data.type,
        nodeType: value.data.group,
        props: {
          expr: serializedExpr(value.data.name, value.data.properties, value.data.record),
        },
        node: value,
      }
    } else {
      nodes[value.data.name] = {
        type: value.data.type,
        nodeType: value.data.group,
        props: {
          ...value.data.record
        },
        node: value,
      }
    }
    if (value.data.group === 'source') {
      topo.sources.push(value.data.name)
    }
    if (value.outputs) {
      topo.edges[value.data.name] = getOutputs(data, value.outputs)
    }
  })
  return {
    graph: {
      nodes,
      topo,
    }
  }
}

export default serializedUpload