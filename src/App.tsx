import randomColor from "randomcolor"
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  useKeyPress,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ButtonEdge from './ButtonEdge'
import ResizableNodeSelected from './ResizableNodeSelected.jsx';
import ResizableNodeSelectedNoHandles from './ResiableNodeSelectedNoHandles.jsx'
import { useState, useCallback } from 'react';

import { cssFlow, cssBtnGroup, cssBtn, cssNodeSelect, defaultNode } from './styles/frameworkCSS.ts';
import { getId } from './utils/getId.ts';

const nodeTypes = { resizable: ResizableNodeSelected, resiablenohandles: ResizableNodeSelectedNoHandles };
const edgeTypes = { buttonedge: ButtonEdge }
const initNodes = [defaultNode];

function Flow(props) {
  const [nodes, setNodes] = useNodesState(initNodes);
  const [edges, setEdges] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [teste, setTeste] = useState([])
  const { project } = useReactFlow();

  const shiftPressed = useKeyPress('Shift')
  const controlPressed = useKeyPress('Control')

  const onNodesChange = useCallback(
    async (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds))
      selectNode(changes)
    },
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [],
  );

  const onConnect = useCallback(
    (connection) => {
      const edge = {...connection, type: 'buttonedge'}
      setEdges((eds) => addEdge(edge, eds))

    },
    [setEdges],
  );

  const addNewNode = useCallback((event) => {
    const id = getId();
    const newNode = {
      id,
      type: 'ResizableNodeSelected',
      position: project({
        x: event.clientX,
        y: event.clientY,
      }),
      data: { label: `Node ${id}` },
      style: { width: 100, height: 50, backgroundColor: '#658BF7', border: '1px solid #000000' },
    };
    setNodes((nds) => nds.concat(newNode));
  },
  [setNodes, project]
  )

  const addNewNodeButton = () => {
    const id = getId();
    const newNode = {
      id,
      type: 'ResizableNodeSelected',
      position: ({
        x: 300,
        y: 200,
      }),
      data: { label: `Node ${id}` },
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
      data: { label: `Node ${id}` },
      style: { width: 100, height: 50, backgroundColor: randomColor(), border: '1px solid #000000' },
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const delNode = () => {
    const newNodes = nodes.filter((node) => !selectedNodes.includes(node.id));
    setNodes(newNodes);
  }

   const addNewGroup = useCallback((event) => {
    const id = getId();
    const newGroup = {
      id,
      type: "group",
      position: project({
        x: event.clientX,
        y: event.clientY,
      }),
      style: {
        width: 300,
        height: 300,
      },
    };
     setNodes((nds) => nds.concat(newGroup));
  },
  [setNodes, project],
   )

const addNewNodeInGroup = () => {
      const id = getId();
      
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

  };

  const isGroup = (node) => {
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

  const selectNode = (changes) => {
    let nodesIds = [];
    for(let change of changes) {
      nodesIds.push(change.id)
    }
    nodesIds = nodesIds.filter((value, index) => nodesIds.indexOf(value) == index);
    setSelectedNodes(nodesIds);
  }

  const duplicateNode = () => {
    const unselectOldNodes = nodes.map((node) => {
      node.selected = false;
      return node;
    });
    const duplicatesNodes = nodes.filter((node) => selectedNodes.includes(node.id));
    for (let node of duplicatesNodes) {
      let newNode = {
        id: getId(),
        position: {
          x: node.position.x + 100,
          y: node.position.y + 100,
        },
        data: { label: node.data.label },
        type: node.type,
        style: node.style,
        selected: true
      };
      setNodes((nds) => nds.concat(newNode));
    }
  }

  const changeColor = () => {
    const newNodes = nodes.map((node) => {
      if (selectedNodes.includes(node.id)) {
        node.style = {
          ...node.style,
          backgroundColor: randomColor(),
        }
      }
      return node;
    })
    setNodes(newNodes);
  }

  const keyDown = (event) => {
    if (event.key == 'd') {
      duplicateNode();
    }
  }

  const onEdgeClick = (evt, edge) => {
    const edgeIndex = edges.indexOf(edges.find(({id}) => id == edge.id))

    edges[edgeIndex].animated = !edges[edgeIndex].animated
  }

  const changeHandle = (evt, node) => {
    const nodeIndex = nodes.indexOf(nodes.find(({id}) => id == node.id))

    if (nodes[nodeIndex].type !== 'resizable') nodes[nodeIndex].type = 'resizable'
    else nodes[nodeIndex].type = 'resiablenohandles'
  }

  return (
    <div>
      <main style={cssFlow}>
        <ReactFlow
          className="react-flow-node-resizer-example"
          minZoom={0.2}
          maxZoom={4}
          snapToGrid={true}
          snapGrid={[5, 5]}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(e, node) =>  isGroup(node) }
          onNodeDoubleClick={changeHandle}
          onEdgeDoubleClick={onEdgeClick}
          fitView
          onKeyDown={keyDown}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onClick={shiftPressed ? addNewNode : controlPressed ? addNewGroup : console.log("")}
          {...props}  
          edgeTypes={edgeTypes}
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
        <button style={cssBtn} onClick={addNewNodeButton}>Criar Node Padrão</button>
        <button style={cssBtn} onClick={addDifNode}>Criar Node Colorido</button>
        <button style={cssBtn} onClick={duplicateNode}>Duplicar</button>
        <button style={cssBtn} onClick={changeColor}>Mudar Cor do Node</button>
        <button style={cssBtn} onClick={addNewGroup}>Criar Grupo</button>
        <button style={cssBtn} onClick={addNewNodeInGroup}>Adicionar ao Grupo</button>
        <button style={cssBtn} onClick={addNewNodeInGroupExtent}>Adicionar ao Grugpo Extendido</button>
        <button style={cssBtn} onClick={delNodeInGroup}>Retirar do Grupo</button>
        <button style={cssBtn} onClick={delNode}>Deletar Node</button>
      </div>
    </div>
  );
  }

  function App(props) {
    return (
      <ReactFlowProvider>
        <Flow {...props} />
      </ReactFlowProvider>
    );
  }

  export default App;
  
  