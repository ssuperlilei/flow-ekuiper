const deserializeNodes = (graph) => {
  const nodes = {
    drawflow: {
      Home: {
        data: {},
      }
    }
  }
  Object.values(graph.nodes).forEach((item) => {
    nodes.drawflow.Home.data[item.node.id] = item.node
  })
  return nodes
}

export default deserializeNodes