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
  const [selectedNodes, setSelectedNodes] = useState([]);
   const [teste, setTeste] = useState([])
  

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

   const addNewGroup = () => {
    const id = getId();
    const newGroup = {
      id,
      type: "group",
      position: { x: 0, y: 0 },
      style: {
        width: 300,
        height: 300,
      },
    };


     setNodes((nds) => nds.concat(newGroup));
     
     console.log(newGroup, nodes);
  };

const addNewNodeInGroup = () => {
      const id = getId();
      console.log(nodes[0]);
      
    const newNode = {
      id,
      position: {
        x: 20,
        y: 100,
      },
      parentNode: selectedNodes[0],
      data: { label: `Node ${id}` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const delNodeInGroup = () => {
   const nodeset = nodes.find((element) => element == selectedNodes[0])
console.log(nodeset);

  };
  const isGroup = (node) => {
    console.log(node?.type)
    return node?.type == 'group' && node.id == selectedNodes[0] ? setTeste(true) : setTeste(false)
  }

  const addNewNodeInGroupExtent = () => {
    const id = getId();
    const newNode = {
      id,
      position: {
        x: 20,
        y: 100,
      },
      parentNode: selectedNodes[0],
      extent: "parent",
      data: { label: `Node ${id}` },
    };

    setNodes((nds) => nds.concat(newNode));
  };


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
    let nodesIds = [];
    for(let change of changes) {
      nodesIds.push(change.id)
    }
    nodesIds = nodesIds.filter((value, index) => nodesIds.indexOf(value) == index);
    setSelectedNodes(nodesIds);
    console.log(teste);
    console.log(selectedNodes);
    
    
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
    const newNodes = nodes.map((node) => {
      if(selectedNodes.includes(node.id)) {
        node.style.backgroundColor = randomColor();
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
          onNodeClick={(e, node) =>  isGroup(node) }
          fitView
        >
          <Background variant={BackgroundVariant.Lines} />
          {/* <MiniMap /> */}
          <Controls />
        </ReactFlow>
      </main>
      <div style={cssBtnGroup}>
        <span style={cssNodeSelect}>
      {teste ? 'Group select ' : 'node select '}
           = {selectedNodes}
        </span>
      </div>
      <div style={cssBtnGroup}>
        <button style={cssBtn} onClick={addNewNode}>Criar Node Padrão</button>
        <button style={cssBtn} onClick={addDifNode}>Criar Node Diferentão</button>
        <button style={cssBtn} onClick={duplicateNode}>Duplicar</button>
        <button style={cssBtn} onClick={changeColor}> mudarCor</button>
        <button style={cssBtn} onClick={addNewGroup}> Criar grupo</button>
        <button style={cssBtn} onClick={addNewNodeInGroup}> Adicionar ao grupo</button>
        <button style={cssBtn} onClick={addNewNodeInGroupExtent}> Adicionar ao grupo extendido</button>
        <button style={cssBtn} onClick={delNodeInGroup}> retirar do grupo</button>
      </div>
    </div>
  );
  }

export default App;