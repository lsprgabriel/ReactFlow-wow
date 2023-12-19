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

import { cssFlow, cssBtnGroup, cssBtn, defaultNode } from './styles/frameworkCSS.ts';
import { getId } from './utils/getId.ts';

const nodeTypes = { ResizableNodeSelected };
const initNodes = [ defaultNode ];
 
function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  

  // ta bom
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
  // ta bom
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

  // aqui ficou estranho
  // ******************************************************
  // const onNodesChange = useCallback(
  //   async (changes) => {
  //     setNodes((nds) => applyNodeChanges(changes, nds))
  //     selectNode(changes)
  //   },
  //   [],
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [],
  // );
  // const [ selectedNodes, setSelectedNodes ] = useState([]);

  // const selectNode = (changes) => {
  //   let nodesIds = [0];
  //   for(let change of changes) {
  //     nodesIds.push(change.id)
  //   }
  //   nodesIds = nodesIds.filter((value, index) => nodesIds.indexOf(value) == index);
  //   nodesIds = nodesIds.filter((value) => value != 0);
  //   console.log(nodesIds, nodes);
  //   setSelectedNodes(nodesIds);
  // }

  // const duplicateNode = () => {
  //   const duplicatesNodes = nodes.filter((node) => selectedNodes.includes(node.id));

  //   for(let node of duplicatesNodes) {
  //     let newNode = {
  //         id: nodes[nodes.length - 1].id + "1",
  //         position: {
  //           x: node.position.x + 100,
  //           y: node.position.y + 100,
  //         },
  //         data: { label: 'Hello' },
  //         type: 'input',
  //       };
  //       setNodes((nds) => nds.concat(newNode));
        
  //     }
  // }


  const [ NodeSelected, setNodeSelected ] = useState([]);

  const consoleLog = (env, node) => {
    console.log(node)
    setNodeSelected('teste');
  }

  const duplicateNode2 = (node) => {
    console.log(node)
    let [verify, count] = ['', ''];
    if(verify == node){
      console.log('igual')
    }
    count = (verify == node) ? ` (${count + 1})` : ` (${1})`;
    verify = node;
    setNodes((nds) => nds.concat({
      id: nodes[nodes.length - 1].id + 1,
      position: {
        x: node.position.x + 100,
        y: node.position.y + 100,
      },
      data: { label: node.data.label + count },
      type: 'input',
    }));
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
          onNodeClick={consoleLog}
          fitView
        >
          <Background variant={BackgroundVariant.Lines} />
          {/* <MiniMap /> */}
          <Controls />
        </ReactFlow>
      </main>
      <div style={cssBtnGroup}>
        <button style={cssBtn} onClick={addNewNode}>Criar Node Padrão</button>
        <button style={cssBtn} onClick={addDifNode}>Criar Node Diferentão</button>
        {/* <button style={cssBtn} onClick={duplicateNode}>Duplicar (bochi)</button> */}
        <button style={cssBtn} onClick={() => duplicateNode2(NodeSelected)}>Duplicar</button>
        <span>
          node select = {NodeSelected}
        </span>
      </div>
    </div>
  );
}

export default App;