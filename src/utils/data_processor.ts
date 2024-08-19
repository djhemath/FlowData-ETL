import { Condition, Operator } from "../components/custom_nodes/Filter/Filter";

export type DataSourceInstruction = {
    type: 'dataSource',
    processType: 'filePicker',
    file: File,
};

export type DataProcessorFilterInstruction = {
    type: 'dataProcessor',
    processType: 'filter',
    conditions: Condition[],
};

// ? NOTE: Discriminated union
// https://stackoverflow.com/a/56950384/13262332
export type Instruction = DataSourceInstruction | DataProcessorFilterInstruction;

export default class DataProcessor {
    private instructions: Instruction[] = [];
    private data: any[] = [];

    constructor(instructions: Instruction[]) {
        this.instructions = instructions;
    }

    async processInstructions() {
        for(let i=0; i<this.instructions.length; i++) {
            const instruction = this.instructions[i];

            if(instruction.type === 'dataSource') {
                await this.readFile(instruction.file);
            } else if(instruction.type === 'dataProcessor') {
                if(instruction.processType === 'filter') {
                    this.filterData(instruction.conditions);
                }
            }
        }

        return this.data;
    }

    private async readFile(file: File) {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (fileReaderEvent) => {
                const text = fileReaderEvent.target?.result as string;

                if(text) {
                    try {
                        this.data = JSON.parse(text);
                    } catch(err) {
                        // TODO: Handle this
                        console.log(err);
                    } finally {
                        resolve(true);
                    }
                }
            }

            reader.readAsText(file);
        });
    }

    private filterData(conditions: Condition[]) {
        this.data = this.data.filter(datum => {
            const results = conditions.map(condition => {
                const data = datum[condition.column];
                const value = condition.value;

                if(condition.operator === Operator.IS_EQUAL_TO.toString()) {
                    return data === value;
                } else if(condition.operator === Operator.IS_GREATER_THAN.toString()) {
                    return data > value;
                } else if(condition.operator === Operator.IS_GREATER_THAN_AND_EQUAL_TO.toString()) {
                    return data >= value;
                } else if(condition.operator === Operator.IS_LESS_THAN.toString()) {
                    return data < value;
                } else if(condition.operator === Operator.IS_LESS_THAN_AND_EQUAL_TO.toString()) {
                    return data <= value;
                } else if(condition.operator === Operator.IS_NOT_EQUAL_TO.toString()) {
                    return data != value;
                } else if(condition.operator === Operator.IS_TRUTHY.toString()) {
                    return Boolean(data);
                } else if(condition.operator === Operator.IS_FALSY.toString()) {
                    return !Boolean(data);
                } else if(condition.operator === Operator.CONTAINS.toString()) {
                    return data.includes(value);
                }

                return true;
            });

            // ? NOTE: Currently we only support AND filter
            return results.every((value) => value);
        });
    }
}
