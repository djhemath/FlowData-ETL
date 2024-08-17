import { Add } from "./icons";
import { Block as BlockType } from './ToolBox';

export type BlockProps = {
    block: BlockType,
    onBlockAdd: (block: BlockType) => void,
};

export default function Block({
    block,
    onBlockAdd
}: BlockProps) {
    return (
        <div className="block" onClick={() => onBlockAdd(block)}>
            <span>{block.name}</span>
            <Add />
        </div>
    );
}