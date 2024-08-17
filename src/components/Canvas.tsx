import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge, SelectionMode, Panel, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DataSourceNode from './custom_nodes/DataSourceNode';
import { useCallback, useState } from 'react';
import Filter from './custom_nodes/FilterNode';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'dataSource',
    position: {x: 0, y: 0},
    data: {
      type: 'source'
    },
  },
  {
    id: '2',
    type: 'filter',
    position: {x: 400, y: 0},
    data: {
      type: 'processor'
    }
  },
  {
    id: '22',
    type: 'filter',
    position: {x: 800, y: 0},
    data: {
      type: 'processor'
    }
  },
];

const initialEdges: any = [];

const nodeTypes = {
  dataSource: DataSourceNode,
  filter: Filter,
}

const panOnDrag = [1, 2];

export default function Canvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => {
      const target = params.target;

      console.log(target);
      console.log(edges);

      const isAlreadyConnected = edges.find((edge: any) => edge.target === target);

      console.log(isAlreadyConnected);

      if(!isAlreadyConnected) {
        setEdges((eds: any) => addEdge(params, eds));
      }
    },
    [edges],
  );

  const onRun = () => {
    console.log(nodes);
    console.log(edges);

    const sourceNode = nodes.find(node => node.data.type === 'source');
    if(!sourceNode) {
      return;
    }

    const firstEdge = edges.find((edge: any) => edge.source === sourceNode.id);

    const flow = [firstEdge.source];

    let currentNode = flow[0];

    while(true) {
      const nextEdge = edges.find((edge: any) => edge.source === currentNode);
      if(!nextEdge) break;

      flow.push(nextEdge.target);
      currentNode = nextEdge.target;
    }

    console.log(flow);
  }

  return (
    <div className="canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnScroll
        selectionOnDrag
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
      >
        <Background />
        <Controls />
        <Panel position='top-right'><button onClick={onRun}>Run</button></Panel>
      </ReactFlow>
    </div>
  );
}
