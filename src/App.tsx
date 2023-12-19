import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
import ResizableNode from './ResizableNode.jsx';
import ResizableNodeSelected from './ResizableNodeSelected.jsx'; 
import CustomResizerNode from './CustomResizerNode.jsx';

import 'reactflow/dist/style.css';

const nodeTypes: any = {
  ResizableNode,
  ResizableNodeSelected,
  CustomResizerNode,
};


let initialId = 1;
const getId = () => `${initialId++}`;
const id = getId();

const initNodes = [
  {
    id,
    position: { x: 250, y: 250 },
    data: { label: `Node ${id}` },
  },
];
 
const initEdges = [
  {
    id: 'a-b',
    source: 'a',
    target: 'b',
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  const addNewNode = () => {
    const id = getId();
    const newNode = {
      id,
      position: ({
        x: 300,
        y: 200,
      }),
      data: { label: `Node ${id}`}
  }
 
  setNodes((nds) => nds.concat(newNode));
  }

  const cssFlow = {height: '85vh',width: '100vw', borderBottom: '2px solid red'}

  const cssBtn = {
    backgroundColor: '#4CAF50', 
    border: '1px solid #e3e3e3', 
    borderRadius: '5px',
    color: 'white',
    margin: '32px',
    padding: '16px', 
    fontSize: '16px',
    cursor: 'pointer',
  }

  const cssBtnGroup = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div>
      <main style={cssFlow}>
        <ReactFlow
          className="react-flow-node-resizer-example"
          minZoom={0.2}
          maxZoom={4}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={[5, 5]}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background variant={BackgroundVariant.Lines} />
          {/* <MiniMap /> */}
          <Controls />
        </ReactFlow>
      </main>
      <div style={cssBtnGroup}>
        <button style={cssBtn} onClick={addNewNode}>Criar Node</button>
        <button style={cssBtn} onClick={addNewNode}>Criar Node</button>
      </div>
    </div>
  );
}

export default App;