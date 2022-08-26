import Canvas from "./Canvas";
import runCanvas from "./runCanvas";

function MouseTrail2() {
  return (
    <div>
      <h2>MouseTrail2</h2>

      <Canvas
        runCanvas={runCanvas}
        className="border border-solid border-white-400"
      />
    </div>
  );
}

export default MouseTrail2;
