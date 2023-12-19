import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
import ResizableNodeSelected from './ResizableNodeSelected.jsx'; 

import 'reactflow/dist/style.css';

const nodeTypes: any = {
  ResizableNodeSelected,
};


let initialId = 1;
const getId = () => `${initialId++}`;
const id = getId();

const initNodes = [
  {
    id,
    type: 'ResizableNodeSelected',
    position: { x: 250, y: 250 },
    data: { label: `Node ${id}` },
    style: { width: 100, height: 50, backgroundColor: '#658BF7', border: '1px solid #000000' },
  },
];
 
const initEdges = [
  {
    id: 'a-b',
    source: 'a',
    target: 'b',
    type: 'smoothstep',
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  const addNewNode = () => {
    const id = getId();
    const newNode = {
      id,
      type: 'ResizableNodeSelected',
      position: ({
        x: 300,
        y: 200,
      }),
      data: { label: `Node ${id}`},
      style: { width: 100, height: 50, backgroundColor: '#658BF7', border: '1px solid #000000' },
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