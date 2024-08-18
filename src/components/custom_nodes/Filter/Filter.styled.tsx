import styled from "styled-components";
import { CustomNodeInnerContainer } from "../CustomNode.styled";

export const FilterOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const FilterLabel = styled.label`
    font-size: 12px;
`;

export const FilterInnerContainer = styled(CustomNodeInnerContainer) `
    gap: 15px;
`;

export const FilterColumnRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const FilterDeleteButton = styled.button`
    background: none;
    border: none;
`;