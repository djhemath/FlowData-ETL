import { Handle, NodeProps, Position, useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react";
import { CustomNodeButton, CustomNodeContainer, CustomNodeTitle, StyledHR } from "../CustomNode.styled";
import { FilterColumnRow, FilterDeleteButton, FilterInnerContainer, FilterLabel, FilterOptionsContainer } from "./Filter.styled";
import { Fragment, ReactEventHandler, useEffect, useRef, useState } from "react";
import { Delete } from "../../icons";

enum Operator {
    IS_EQUAL_TO = 'IS_EQUAL_TO',
    IS_NOT_EQUAL_TO = 'IS_NOT_EQUAL_TO',
    IS_GREATER_THAN = 'IS_GREATER_THAN',
    IS_LESS_THAN = 'IS_LESS_THAN',
    IS_GREATER_THAN_AND_EQUAL_TO = 'IS_GREATER_THAN_AND_EQUAL_TO',
    IS_LESS_THAN_AND_EQUAL_TO = 'IS_LESS_THAN_AND_EQUAL_TO',
    CONTAINS = 'CONTAINS',
    IS_TRUTHY = 'IS_TRUTHY',
    IS_FALSY = 'IS_FALSY',
};

type Condition = {
    id: number,
    column: string,
    operator: Operator,
    value: any,
};

export default function Filter({ id }: NodeProps) {
    const { updateNodeData } = useReactFlow();
    const numberOfConditions = useRef(1);

    const connections = useHandleConnections({
        type: 'target',
    });

    const node = useNodesData(connections[0]?.source);
    let data;

    if(node) {
        data = node?.data.data;
    }

    let columns: string[] = [];

    if(data && Array.isArray(data) && data.length > 1) {
        const firstObject = data[0];
        
        for(let key in firstObject) {
            columns.push(key);
        }
    }

    const [conditions, setConditions] = useState<Condition[]>([
        {
            id: 1,
            column: columns.length > 0 ? columns[0]: '',
            operator: Operator.IS_GREATER_THAN,
            value: '',
        },
    ]);

    useEffect(() => {
        updateNodeData(id, {
            conditions,
        });
    }, [conditions]);

    const onColumnChange = (id: number, column: string) => {
        const updateConditions = (currentConditions: Condition[]) => currentConditions.map(condition => {
            if(condition.id === id) {
                condition.column = column;
            }

            return condition;
        });

        setConditions(updateConditions);
    }

    const onOperatorChange = (id: number, operator: Operator) => {
        const updateConditions = (currentConditions: Condition[]) => currentConditions.map(condition => {
            if(condition.id === id) {
                condition.operator = operator;
            }

            return condition;
        });

        setConditions(updateConditions);
    }

    const onInputValueChange = (id: number, value: any) => {
        const updateConditions = (currentConditions: Condition[]) => currentConditions.map(condition => {
            if(condition.id === id) {
                condition.value = value;
            }

            return condition;
        });

        setConditions(updateConditions);
    }

    const onDeleteFilter = (id: number) => {
        setConditions(currentConditions => currentConditions.filter(condition => condition.id !== id));
    }

    const onConditionAdd = () => {
        numberOfConditions.current += 1;

        setConditions(currentConditions => [
            ...currentConditions, {
                id: numberOfConditions.current,
                column: columns.length > 0 ? columns[0]: '',
                operator: Operator.IS_GREATER_THAN,
                value: '',
            }
        ]);
    }

    return (
        <CustomNodeContainer style={{minWidth: 200}}>
            <Handle type="target" position={Position.Left}/>
            <FilterInnerContainer>
                <CustomNodeTitle>Filter</CustomNodeTitle>
                {
                    conditions.map(condition => (
                        <Fragment key={condition.id}>
                            <StyledHR />
                            <FilterItem
                                condition={condition}
                                columns={columns}
                                onColumnChange={onColumnChange}
                                onOperatorChange={onOperatorChange}
                                onInputValueChange={onInputValueChange}
                                onDeleteFilter={onDeleteFilter}
                            />
                        </Fragment>
                    ))
                }
                <CustomNodeButton
                    type="button"
                    onClick={onConditionAdd}
                >
                    Add another condition
                </CustomNodeButton>
            </FilterInnerContainer>
            <Handle type="source" position={Position.Right}/>
        </CustomNodeContainer>
    );
}

type FilterItemProps = {
    condition: Condition,
    columns: string[],
    onColumnChange: (id: number, column: string) => void,
    onOperatorChange: (id: number, operator: Operator) => void,
    onInputValueChange: (id: number, value: any) => void,
    onDeleteFilter: (id: number) => void,
};

function FilterItem({
    condition,
    columns,
    onColumnChange,
    onOperatorChange,
    onInputValueChange,
    onDeleteFilter,
}: FilterItemProps) {
    return (
        <FilterOptionsContainer>
            <FilterColumnRow>
                <FilterLabel htmlFor="select-1">Column Name</FilterLabel>
                <FilterDeleteButton onClick={() => onDeleteFilter(condition.id)}>
                    <Delete />
                </FilterDeleteButton>
            </FilterColumnRow>
            <select name="select-1" value={condition.column} onChange={(e) => onColumnChange(condition.id, e.target.value)}>
                <option value=''>Please select a column</option>
                {
                    columns.map(column => (
                        <option key={column} value={column}>{column}</option>
                    ))
                }
            </select>

            <FilterLabel htmlFor="select-1">Condition</FilterLabel>
            <select name="select-1" value={condition.operator} onChange={(e) => onOperatorChange(condition.id, e.target.value as Operator)}>
                <option value={Operator.IS_EQUAL_TO}>is equal to</option>
                <option value={Operator.IS_NOT_EQUAL_TO}>is not equal to</option>
                <option value={Operator.IS_GREATER_THAN}>is greater than</option>
                <option value={Operator.IS_LESS_THAN}>is less than</option>
                <option value={Operator.IS_GREATER_THAN_AND_EQUAL_TO}>is greater than and equal to</option>
                <option value={Operator.IS_LESS_THAN_AND_EQUAL_TO}>is less than and equal to</option>
                <option value={Operator.CONTAINS}>contains</option>
                <option value={Operator.IS_TRUTHY}>is truthy</option>
                <option value={Operator.IS_FALSY}>is falsy</option>
            </select>
            <input value={condition.value} onChange={(e) => onInputValueChange(condition.id, e.target.value)}/>
        </FilterOptionsContainer>
    );
}