import "./App.css";
import Canvas from "./components/Canvas";
import Output from "./components/Output";
import ToolBox from "./components/ToolBox";

function App() {
  return (
    <main>
      <div className="workplace">
        <ToolBox />
        <Canvas />
      </div>
      <div className="output-container">
        <Output />
      </div>
    </main>
  );
}

export default App;
