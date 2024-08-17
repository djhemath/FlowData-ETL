import { Handle, Position } from "@xyflow/react";

export default function Filter({data}: any) {
    return (
        <>
            <Handle type="target" position={Position.Left}/>
            <div>
                <span>Filter</span>
            </div>
            <Handle type="source" position={Position.Right}/>
        </>
    );
}