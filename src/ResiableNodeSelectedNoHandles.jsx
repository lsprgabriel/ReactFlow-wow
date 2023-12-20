import { memo, useCallback } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNodeSelectedNoHandles = ({ data, selected, isConnectable, id }) => {

    return (
        <>
            <NodeResizer zIndex={0} color="#0042FF" isVisible={selected} minWidth={100} minHeight={50} />

            <div style={{ padding: 10 }}>{data.label}</div>

        </>
    );
};

export default memo(ResizableNodeSelectedNoHandles);