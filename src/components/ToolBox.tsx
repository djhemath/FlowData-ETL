import Block from "./Block";

export type Block = {
  id: string,
  name: string,
  type: 'dataSource' | 'dataProcessor',
};


const blocks: Block[] = [
  {
    id: 'filePicker',
    name: 'File picker',
    type: 'dataSource',
  },
  {
    id: 'filter',
    name: 'Filter',
    type: 'dataProcessor',
  },
];

type ToolBoxProps = {
  onBlockAdd: (block: Block) => void,
};

export default function ToolBox({
  onBlockAdd,
}: ToolBoxProps) {
  const blockComponents = blocks.map(block => {
    return <Block key={block.id} block={block} onBlockAdd={onBlockAdd} />;
  });

  return (
    <div className="toolbox">
      { blockComponents }
    </div>
  );
}
