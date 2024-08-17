import Block from "./Block";

export default function ToolBox() {
  return (
    <div className="toolbox">
      <Block name="Data source" />
      <Block name="Map" />
      <Block name="Filter" />
    </div>
  );
}
