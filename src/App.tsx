import ReactFlow, { MiniMap, Background, BackgroundVariant, Controls, useEdgesState, useNodesState } from 'reactflow';

import ResizableNode from './ResizableNode.jsx';
import ResizableNodeSelected from './ResizableNodeSelected.jsx'; 
import CustomResizerNode from './CustomResizerNode.jsx';

import 'reactflow/dist/style.css';

const nodeTypes: any = {
  ResizableNode,
  ResizableNodeSelected,
  CustomResizerNode,
};

const initNodes = [
  {
    id: 'a',
    // type: 'ResizableNode',
    data: { label: 'Node A' },
    position: { x: 400, y: 400 },
    style: { background: '#FF2D00', border: '1px solid blue', borderRadius: 0, fontSize: 12, zIndex: 999 },
  },
  {
    id: 'b',
    type: 'ResizableNode',
    data: { label: 'Node A' },
    position: { x: 600, y: 600 },
    style: { background: '#36FF00', border: '1px solid blue', borderRadius: 0, fontSize: 12 },
  },

];
const initEdges: any = []; 

function App() {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  return (
    <ReactFlow
      defaultNodes={initNodes}
      defaultEdges={initEdges}
      className="react-flow-node-resizer-example"
      minZoom={0.2}
      maxZoom={4}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      snapGrid={[5, 5]}
    >
      <Background variant={BackgroundVariant.Lines} />
      {/* <MiniMap /> */}
      <Controls />
    </ReactFlow>
  );
}

export default App;
