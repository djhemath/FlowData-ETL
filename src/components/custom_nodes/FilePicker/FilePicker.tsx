import { Handle, Position } from "@xyflow/react";
import { FilterPickerLabel } from "./FilePicker.styled";
import { CustomNodeContainer, CustomNodeInnerContainer, CustomNodeTitle, CustomNodeHelperText } from "../CustomNode.styled";

export default function FilterPicker() {
    return (
        <CustomNodeContainer>
            <CustomNodeInnerContainer>
                <CustomNodeTitle>File picker</CustomNodeTitle>
                <input type="file" id="file-picker" style={{display: 'none'}} />
                <FilterPickerLabel htmlFor="file-picker">Pick file</FilterPickerLabel>
                <CustomNodeHelperText>Accepts JSON files</CustomNodeHelperText>
            </CustomNodeInnerContainer>
            <Handle type="source" position={Position.Right}/>
        </CustomNodeContainer>
    );
}