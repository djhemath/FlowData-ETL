import { applyNodeChanges, applyEdgeChanges, addEdge, Node, Edge, OnConnect, Connection, OnNodesChange, NodeChange, OnEdgesChange, EdgeChange } from "@xyflow/react";
import { useState, useCallback } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Output from "./components/Output";
import ToolBox, { Block } from "./components/ToolBox";

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'filePicker',
    position: {x: 0, y: 0},
    data: {
      type: 'dataSource'
    },
  },
  {
    id: '2',
    type: 'filter',
    position: {x: 400, y: 0},
    data: {
      type: 'dataProcessor'
    }
  },
  {
    id: '22',
    type: 'filter',
    position: {x: 800, y: 0},
    data: {
      type: 'dataProcessor'
    }
  },
];

const initialEdges: Edge[] = [];

function App() {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const target = params.target;

      const isAlreadyConnected = edges.find((edge: Edge) => edge.target === target);
      if(isAlreadyConnected) return;

      const sourceNode = nodes.find(node => node.data.type === 'dataSource');
      if(!sourceNode) return;

      const isConnectingToSource = target === sourceNode.id;
      if(isConnectingToSource) return;

      setEdges((eds: Edge[]) => addEdge(params, eds));
    },
    [nodes, edges],
  );

  const onRun = () => {
    const sourceNode = nodes.find((node: Node) => node.data.type === 'dataSource');
    if(!sourceNode) {
      return;
    }

    const firstEdge = edges.find((edge: Edge) => edge.source === sourceNode.id);

    if(!firstEdge) {
      return;
    }

    const flow = [firstEdge.source];

    let currentNode = flow[0];

    while(true) {
      const nextEdge = edges.find((edge: Edge) => edge.source === currentNode);
      if(!nextEdge) break;

      // Prevent cycles
      if(flow.includes(nextEdge.target)) break;

      flow.push(nextEdge.target);
      currentNode = nextEdge.target;
    }

    console.log(flow);
  }

  const onBlockAdd = (block: Block) => {
    if(block.type === 'dataSource') {
      const isDataSourceAlreadyExist = nodes.find(node => node.data.type === 'dataSource');

      if(isDataSourceAlreadyExist) return;
    }

    const newNode = {
      id: Math.random() + '',
      type: block.id, // This is custom node type of reactflow
      position: {x: 0, y: 0},
      data: {
        type: block.type
      },
    };

    setNodes((nodes) => [...nodes, newNode]);
  }

  return (
    <main>
      <div className="workplace">
        <ToolBox
          onBlockAdd={onBlockAdd}
        />
        <Canvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onRun={onRun}
        />
      </div>
      <div className="output-container">
        <Output />
      </div>
    </main>
  );
}

export default App;
