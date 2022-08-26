import { useEffect, useRef } from "react";

interface RunCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  runStatus: boolean;
}

interface CanvasProps {
  runCanvas: (props: RunCanvas) => void;
  className?: string;
}

function Canvas({ runCanvas, className }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const initiated = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!initiated.current) {
      runCanvas({ canvas, ctx });
      initiated.current = true;
    }
  }, [runCanvas]);

  return <canvas ref={canvasRef} className={className}></canvas>;
}

export default Canvas;
