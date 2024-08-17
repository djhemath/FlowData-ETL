import { Handle, Position } from "@xyflow/react";
import { CustomNodeButton, CustomNodeContainer, CustomNodeTitle } from "../CustomNode.styled";
import { FilterInnerContainer, FilterLabel, FilterOptionsContainer } from "./Filter.styled";

export default function Filter() {
    return (
        <CustomNodeContainer style={{minWidth: 200}}>
            <Handle type="target" position={Position.Left}/>
            <FilterInnerContainer>
                <CustomNodeTitle>Filter</CustomNodeTitle>
                <FilterItem />
                <FilterItem />
                <CustomNodeButton>Add condition</CustomNodeButton>
            </FilterInnerContainer>
            <Handle type="source" position={Position.Right}/>
        </CustomNodeContainer>
    );
}

function FilterItem() {
    return (
        <FilterOptionsContainer>
            <FilterLabel htmlFor="select-1">Column Name</FilterLabel>
            <select name="select-1">
                <option>country</option>
                <option>district</option>
                <option>income</option>
            </select>

            <FilterLabel htmlFor="select-1">Condition</FilterLabel>
            <select name="select-1">
                <option>is equal to</option>
                <option>is not equal to</option>
                <option>is greater than</option>
                <option>is less than</option>
                <option>is greater than and equal to</option>
                <option>is less than and equal to</option>
                <option>contains</option>
                <option>is truthy</option>
                <option>is falsy</option>
            </select>
            <input />
        </FilterOptionsContainer>
    );
}