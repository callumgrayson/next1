import { useEffect, useRef } from "react";

interface CanvasProps {
  runCanvas: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
  className: string;
}
function Canvas({ runCanvas, className }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    runCanvas(canvas, ctx);
  }, [runCanvas]);

  return <canvas ref={canvasRef} className={className}></canvas>;
}

export default Canvas;
