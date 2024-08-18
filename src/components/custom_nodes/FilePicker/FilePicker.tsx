import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { FilePickerLabel } from "./FilePicker.styled";
import { CustomNodeContainer, CustomNodeInnerContainer, CustomNodeTitle, CustomNodeHelperText } from "../CustomNode.styled";
import { useState } from "react";

export default function FilterPicker({ id }: NodeProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const { updateNodeData } = useReactFlow();

    const onFilePicked: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files) {
            const reader = new FileReader();
            reader.onload = (fileReaderEvent) => {
                const text = fileReaderEvent.target?.result as string;

                if(text) {
                    try {
                        const data = JSON.parse(text);

                        let columns: string[] = [];

                        if(data && Array.isArray(data) && data.length > 1) {
                            const firstObject = data[0];
                            
                            for(let key in firstObject) {
                                columns.push(key);
                            }
                        }                    

                        updateNodeData(id, {
                            output: columns,
                        });
                        setFileName(files[0].name);
                    } catch(err) {
                        // TODO: Handle this
                        console.log(err);
                    }
                }
            }

            reader.readAsText(files[0]);
        }
    }

    return (
        <CustomNodeContainer>
            <CustomNodeInnerContainer>
                <CustomNodeTitle>File picker</CustomNodeTitle>
                <input type="file" id="file-picker" style={{display: 'none'}} onChange={onFilePicked}/>
                {
                    fileName
                    ? <small>Picked {fileName}</small>
                    : null
                }
                <FilePickerLabel htmlFor="file-picker">Pick file</FilePickerLabel>
                <CustomNodeHelperText>Accepts JSON files</CustomNodeHelperText>
            </CustomNodeInnerContainer>
            <Handle type="source" position={Position.Right}/>
        </CustomNodeContainer>
    );
}