import React, { useEffect, useRef } from "react";
import canvasRun from "./canvasRun";

function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (canvasRef.current) {
      canvasRun(canvasRef.current);
    }
  }, [canvasRef]);

  return { canvasRef };
}

export default useCanvas;
