import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mantine/core";

/**
 * Handles the initial setup of the canvas and context
 * @param canvas
 * @param ctx
 */
function setUpCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  globals: any
) {
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.border = "2px solid red";
  globals.x = 20;
  globals.xSpeed = 5;
}

/**
 * Handles the functionality in the canvas
 * @param canvas
 * @param ctx
 */
function runCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  globals: any
) {
  console.log("runCanvas");
  // console.log("canvas, ctx", canvas, ctx);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";

  let { x, xSpeed } = globals;
  globals.x = (x + xSpeed) % (canvas.width - 100);
  ctx.fillRect(globals.x, 20, 100, 100);
}

/**
 * Handles the calling of the RAF
 * @param run
 * @param isPlaying
 * @returns canvasRef
 */
function usePlay(
  run: (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    globals: any
  ) => void,
  isPlaying: boolean
) {
  console.log("usePlay");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const savedCallback = useRef<any>(null);
  const globals = useRef<any>({});
  const rafRef = useRef<any>();

  useEffect(() => {
    console.log("effect: initial");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    setUpCanvas(canvas, ctx, globals.current);
    savedCallback.current = (globals: any) => run(canvas, ctx, globals);

    return () => {
      console.log("cleanup");
    };
  }, [run]);

  useEffect(() => {
    console.log("effect: isPlaying");

    function tick() {
      rafRef.current = requestAnimationFrame(tick);
      savedCallback.current(globals.current);
    }
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }

    return () => {
      console.log("isPlaying cleanup");
      cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying]);

  return canvasRef;
}

function Declarative1() {
  const [isPlaying, setIsPlaying] = useState(false);

  const bind = usePlay(runCanvas, isPlaying);

  return (
    <div>
      <Button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop" : "Start"}
      </Button>
      <canvas ref={bind}></canvas>
    </div>
  );
}

export default Declarative1;
