const cssFlow = {height: '80vh',width: '100vw', borderBottom: '2px solid red'}

const cssBtn = {
backgroundColor: '#4CAF50', 
border: '1px solid #e3e3e3', 
borderRadius: '5px',
color: 'white',
padding: '16px', 
fontSize: '16px',
cursor: 'pointer',
}

const cssBtnGroup = {
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
gap: '16px',
marginTop: '16px',
}

const defaultNode = {
    id: '1',
    type: 'resizable',
    position: { x: 250, y: 250 },
    data: { label: `Node ${1}` },
    style: { width: 100, height: 50, backgroundColor: '#658BF7', border: '1px solid #000000', zIndex: 0 },
}   

const cssNodeSelect = {
    border: '1px solid #000000',
    backgroundColor: '#658BF7',
    padding: '16px',
}


export {cssFlow, cssBtn, cssBtnGroup, cssNodeSelect, defaultNode}