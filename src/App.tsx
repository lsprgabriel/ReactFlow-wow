import randomColor from "randomcolor"
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow'; 
import 'reactflow/dist/style.css';
import ResizableNodeSelected from './ResizableNodeSelected.jsx'; 
import { useState, useCallback } from 'react';

import { cssFlow, cssBtnGroup, cssBtn, cssNodeSelect, defaultNode } from './styles/frameworkCSS.ts';
import { getId } from './utils/getId.ts';

const nodeTypes = { ResizableNodeSelected };
const initNodes = [ defaultNode ];
 
function App() {
  const [nodes, setNodes] = useNodesState(initNodes);
  const [edges, setEdges] = useEdgesState([]);
  const [ selectedNodes, setSelectedNodes ] = useState([]);

  const onNodesChange = useCallback(
    async (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds))
      selectNode(changes)
    },
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );


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
      style: { width: 100, height: 50, backgroundColor: randomColor(), border: '1px solid #000000' },
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const selectNode = (changes) => {
    let nodesIds = [0];
    for(let change of changes) {
      nodesIds.push(change.id)
    }
    nodesIds = nodesIds.filter((value, index) => nodesIds.indexOf(value) == index);
    nodesIds = nodesIds.filter((value) => value != 0);
    setSelectedNodes(nodesIds);
  }

  const duplicateNode = () => {
    const duplicatesNodes = nodes.filter((node) => selectedNodes.includes(node.id));
    console.log(duplicatesNodes)
    for(let node of duplicatesNodes) {
      let newNode = {
          id: getId(),
          position: {
            x: node.position.x + 100,
            y: node.position.y + 100,
          },
          data: { label: node.data.label},
          type: node.type,
          style: node.style,
        };
        setNodes((nds) => nds.concat(newNode));
      }
  }

  const changeColor = () => {
    console.log(selectedNodes)
    const newNodes = nodes.map((node) => {
      if(selectedNodes.includes(node.id)) {
        node.style = {
          ...node.style,
          backgroundColor: randomColor(),
        }
      }
      return node;
    })
    setNodes(newNodes);
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
          onNodeClick={(e, node) => console.log('click', node)}
          fitView
        >
          <Background variant={BackgroundVariant.Lines} />
          {/* <MiniMap /> */}
          <Controls />
        </ReactFlow>
      </main>
      <div style={cssBtnGroup}>
        <span style={cssNodeSelect}>
          node select = {selectedNodes}
        </span>
      </div>
      <div style={cssBtnGroup}>
        <button style={cssBtn} onClick={addNewNode}>Criar Node Padrão</button>
        <button style={cssBtn} onClick={addDifNode}>Criar Node Diferentão</button>
        <button style={cssBtn} onClick={duplicateNode}>Duplicar</button>
        <button style={cssBtn} onClick={changeColor}> mudarCor</button>
      </div>
    </div>
  );
}

export default App;