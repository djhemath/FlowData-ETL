import { ReactFlow, Controls, Background, SelectionMode, Panel, Node, Edge, OnNodesChange, OnEdgesChange, OnConnect } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FilePicker from './custom_nodes/FilePicker/FilePicker';
import { MouseEventHandler } from 'react';
import Filter from './custom_nodes/FilterNode';

const nodeTypes = {
  filePicker: FilePicker,
  filter: Filter,
}

const panOnDrag = [1, 2];

type CanvasProps = {
  nodes: Node[],
  edges: Edge[],
  onNodesChange: OnNodesChange,
  onEdgesChange: OnEdgesChange,
  onConnect: OnConnect,
  onRun: MouseEventHandler<HTMLButtonElement>,
};

export default function Canvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onRun,
}: CanvasProps) {
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
