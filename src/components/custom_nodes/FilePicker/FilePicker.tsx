import { Handle, Position } from "@xyflow/react";
import { FilePickerLabel } from "./FilePicker.styled";
import { CustomNodeContainer, CustomNodeInnerContainer, CustomNodeTitle, CustomNodeHelperText } from "../CustomNode.styled";

export default function FilterPicker() {
    return (
        <CustomNodeContainer>
            <CustomNodeInnerContainer>
                <CustomNodeTitle>File picker</CustomNodeTitle>
                <input type="file" id="file-picker" style={{display: 'none'}} />
                <FilePickerLabel htmlFor="file-picker">Pick file</FilePickerLabel>
                <CustomNodeHelperText>Accepts JSON files</CustomNodeHelperText>
            </CustomNodeInnerContainer>
            <Handle type="source" position={Position.Right}/>
        </CustomNodeContainer>
    );
}