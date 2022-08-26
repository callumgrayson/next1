import { Button } from "@mantine/core";
import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import useRAF from "./useRAF";

interface CodeToRun {
  runStatus: boolean;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

function useCodeToRunInCanvas() {
  const savedCallback = useRef();

  function toRun({ canvas, ctx }: CodeToRun) {
    console.log("isRunning", ctx, canvas);

    console.log("canvas", canvas);
    canvas.width = 400;
    canvas.height = 400;

    canvas.style.border = "2px solid red";

    let x = 20;
    let dirX = 1;
    const rectWidth = 100;

    function draw() {
      console.log("drawing", runStatus);

      // if (!runStatus) return;
      // requestAnimationFrame(draw);

      ctx.fillStyle = "red";
      x += dirX;
      if (x === 0 || x + rectWidth === canvas.width) {
        dirX *= -1;
      }
      ctx.fillRect(x, 20, rectWidth, 100);
    }

    draw();
  }

  return toRun;
}

function Declarative() {
  const [isRunning, setIsRunning] = useState(false);

  // const bind = useRAF(fn, isRunning);

  return (
    <div>
      <h2>Declaratve Canvas</h2>
      <Button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </Button>
      <Canvas runCanvas={() => {}} />
    </div>
  );
}

export default Declarative;
