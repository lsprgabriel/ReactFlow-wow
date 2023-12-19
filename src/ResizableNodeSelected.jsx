import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNodeSelected = ({ data, selected }) => {
    return (
        <>
            <NodeResizer color="#0042FF" isVisible={selected} minWidth={100} minHeight={50} />
            {/* <Handle type="target" position={Position.Left} /> */}
            <div style={{ padding: 10 }}>{data.label}</div>
            {/* <Handle type="source" position={Position.Right} /> */}
        </>
    );
};

export default memo(ResizableNodeSelected);