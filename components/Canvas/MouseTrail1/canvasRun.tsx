export default function canvasRun(canvas: HTMLCanvasElement) {
  canvas.style.border = "2px solid white";

  const context = canvas.getContext("2d");
  const cWidth = canvas.width;
  const cHeight = canvas.height;

  let coords = {
    x: 0,
    y: Math.floor(cHeight / 2) - 25,
  };
  let dY = 0.5;
  let chaos = 0.1;

  let running = false;
  let af: number;

  canvas.addEventListener("click", () => {
    if (!running) {
      run();
    } else {
      running = false;
      cancelAnimationFrame(af);
    }
  });

  function anim(ctx: CanvasRenderingContext2D) {
    if (!running) return;

    dY = getVariation(dY, (coords.y - cHeight / 2) / cHeight);

    ctx.clearRect(0, 0, cWidth, cHeight);
    coords.x = (coords.x + 1.5) % cWidth;
    coords.y = (coords.y + dY) % cHeight;
    move(ctx);
    af = requestAnimationFrame(() => anim(ctx));
  }

  function move(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(200, 0, 20, 0.5)";
    ctx.fillRect(coords.x, coords.y, 50, 50);
  }

  function run() {
    if (context) {
      running = true;
      anim(context);
    }
  }
}

function getVariation(current: number, positionProportion: number) {
  const currentSign = Math.sign(current);
  const oppSign = -1 * currentSign;
  const changeMag = Math.random() * 2 * positionProportion;
  const change =
    Math.abs(positionProportion) > 0.01
      ? oppSign * changeMag
      : changeMag * currentSign;
  return current + oppSign * Math.random() * 2;
}
