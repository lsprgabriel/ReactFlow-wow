import randomColor from "randomcolor"

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
import './Shapes.css'

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
    className: 'rectangle',
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
      className: 'rectangle'
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const addDifNode = () => {
    const id = getId();
    const newNode = {
      id,
      type: 'ResizableNodeSelected',
      position: ({
        x: 300,
        y: 200,
      }),
      data: { label: `Node ${id}`},
      style: { backgroundColor: randomColor() },
      className: 'difRectangle',
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const addCirNode = () => {
    const id = getId();
    const newNode = {
      id,
      type: 'ResizableNodeSelected',
      position: ({
        x: 300,
        y: 200,
      }),
      data: { label: `Node ${id}`},
      className: 'circle'
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const addTriNode = () => {
    const id = getId();
    const newNode = {
      id,
      type: 'ResizableNodeSelected',
      position: ({
        x: 300,
        y: 200,
      }),
      data: { label: `Node ${id}`},
      className: 'triangle'
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const addSqrNode = () => {
    const id = getId();
    const newNode = {
      id,
      type: 'ResizableNodeSelected',
      position: ({
        x: 300,
        y: 200,
      }),
      data: { label: `Node ${id}`},
      className: 'square'
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const cssFlow = {height: '85vh', width: '100vw', borderBottom: '2px solid red'}

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
        <button style={cssBtn} onClick={addNewNode}>Criar Node padrão</button>
        <button style={cssBtn} onClick={addDifNode}>Criar Node de cor aleatória</button>
        <button style={cssBtn} onClick={addSqrNode}>Criar Node quadrado</button>
        <button style={cssBtn} onClick={addCirNode}>Criar Node redondao</button>
        <button style={cssBtn} onClick={addTriNode}>Criar Node triângulo</button>
      </div>
    </div>
  );
}

export default App;