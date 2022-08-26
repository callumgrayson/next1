import React, { useEffect, useRef } from "react";

function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx2d = useRef<CanvasRenderingContext2D | null>(null);

  // TODO
  // Have live toggle of ticks v smooth
  // Live size listener

  useEffect(() => {
    // console.log("useeffect", canvasRef);

    let radius = 0;

    if (canvasRef.current && canvasRef.current instanceof HTMLCanvasElement) {
      const canvas = canvasRef.current;
      canvas.width = 500;
      canvas.height = 500;
      canvas.style.border = "solid 1px red";
      const ctx = canvas.getContext("2d");
      ctx2d.current = ctx;

      if (ctx) {
        radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.9;
        // setInterval(drawClock, 1000);
        drawClock();
      }
    }

    function drawClock() {
      //   const start = Date.now();
      if (ctx2d.current) {
        drawFace(ctx2d.current, radius);
        drawNumbers(ctx2d.current, radius);
        drawTime(ctx2d.current, radius);
        requestAnimationFrame(drawClock);
      }
      //   const end = Date.now();
      //   const diff = end - start;
      //   console.log("diff", diff);
    }

    function drawFace(ctx: CanvasRenderingContext2D, radius: number) {
      let grad;

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
      grad.addColorStop(0, "#333");
      grad.addColorStop(0.5, "white");
      grad.addColorStop(1, "#333");
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = "#333";
      ctx.fill();
    }

    function drawNumbers(ctx: CanvasRenderingContext2D, radius: number) {
      var ang;
      var num;
      ctx.font = radius * 0.15 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (num = 1; num < 13; num++) {
        ang = (num * Math.PI) / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
    }

    function drawTime(ctx: CanvasRenderingContext2D, radius: number) {
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let seconds = now.getSeconds();
      let millisecond = now.getMilliseconds();
      let second = seconds + millisecond / 1000;
      //hour
      hour = hour % 12;
      hour =
        (hour * Math.PI) / 6 +
        (minute * Math.PI) / (6 * 60) +
        (second * Math.PI) / (360 * 60);
      drawHand(ctx, hour, radius * 0.5, radius * 0.07);
      //minute
      minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
      drawHand(ctx, minute, radius * 0.8, radius * 0.07);
      // second
      second = (second * Math.PI) / 30;
      drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }

    function drawHand(
      ctx: CanvasRenderingContext2D,
      pos: number,
      length: number,
      width: number
    ) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
    }
  }, [canvasRef]);

  function start() {
    if (ctx2d.current) {
    }
  }
  function stop() {
    console.log("stop");
  }

  return { start, stop, canvasRef };
}

export default useCanvas;
