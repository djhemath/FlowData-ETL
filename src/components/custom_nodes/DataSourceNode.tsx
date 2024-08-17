import { Handle, Position } from "@xyflow/react";

export default function DataSource({data}: any) {
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