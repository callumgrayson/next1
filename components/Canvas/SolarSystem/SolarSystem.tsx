import React from "react";
import Canvas from "./Canvas";
import runCanvas from "./runCanvas";

function SolarSystem() {
  return (
    <div>
      <h2>SolarSystem</h2>

      <Canvas
        runCanvas={runCanvas}
        className="border border-solid border-white-400"
      />
    </div>
  );
}

export default SolarSystem;
