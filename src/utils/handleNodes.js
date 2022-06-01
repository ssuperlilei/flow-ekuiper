const deserializeNodes = (graph) => {
  const nodes = {
    drawflow: {
      Home: {
        data: {},
      }
    }
  }
  Object.values(graph.nodes).forEach((item) => {
    nodes.drawflow.Home.data[item.props.node.id] = item.props.node
  })
  return nodes
}

export default deserializeNodes