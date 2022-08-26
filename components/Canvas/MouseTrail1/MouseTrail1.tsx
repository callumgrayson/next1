import React from "react";
// import { Button, Group } from "@mantine/core";
import useCanvas from "./useCanvas";

function MouseTrail1() {
  const { canvasRef } = useCanvas();
  return (
    <>
      <div>MouseTrail1</div>

      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default MouseTrail1;
