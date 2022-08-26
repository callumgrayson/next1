import React from "react";
import { Button, Group } from "@mantine/core";

import useCanvas from "./useCanvas";

function Clock1() {
  const { start, stop, canvasRef } = useCanvas();
  return (
    <>
      <h2>Clock 1</h2>
      <Group>
        <Button onClick={start}>Start</Button>
        <Button onClick={stop}>Stop</Button>
      </Group>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default Clock1;
