import { memo, useCallback } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNodeSelected = ({ data, selected, isConnectable, id }) => {

    console.log(id)

    return (
        <>
            <NodeResizer color="#0042FF" isVisible={selected} minWidth={100} minHeight={50} />
            <Handle
                position={Position.Top}
                type="target"
                id={id}
                key={id}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <div style={{ padding: 10 }}>{data.label}</div>

            <Handle
                type="target"
                position={Position.Right}
                id="a"
                style={{ top: 10, background: '#555' }}
                isConnectable={isConnectable}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={{ bottom: 10, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="c"
                isConnectable={isConnectable}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
        </>
    );
};

export default memo(ResizableNodeSelected);