import { Handle, Position } from "@xyflow/react";

export default function FilterPicker() {
    return (
        <>
            <Handle type="target" position={Position.Left}/>
            <div>
                <span>Data source</span>
                <input type="file" />
            </div>
            <Handle type="source" position={Position.Right}/>
        </>
    );
}