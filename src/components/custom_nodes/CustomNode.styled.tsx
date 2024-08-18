import styled from "styled-components";

export const CustomNodeContainer = styled.div`
    padding: 10px;
    background-color: #464646;
    border-radius: 5px;
`;

export const CustomNodeInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const CustomNodeTitle = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: bold;
`;

export const CustomNodeHelperText = styled.small`
    font-size: 10px;
`;

export const CustomNodeButton = styled.button`
    font-size: 10px;
    background-color: #9143ea;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
`;

export const StyledHR = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: #7b7b7b;
`;