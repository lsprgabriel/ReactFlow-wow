import { memo, useCallback } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNodeSelectedNoHandles = ({ data, selected, isConnectable, id }) => {

    console.log(id)

    return (
        <>
            <NodeResizer color="#0042FF" isVisible={selected} minWidth={100} minHeight={50} />

            <div style={{ padding: 10 }}>{data.label}</div>

        </>
    );
};

export default memo(ResizableNodeSelectedNoHandles);