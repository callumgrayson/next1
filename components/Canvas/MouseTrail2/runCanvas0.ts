export default function runCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  const innerWidth = (canvas.width = window.innerWidth - 3);
  const innerHeight = (canvas.height = window.innerHeight - 100);

  const context = ctx;

  context.globalAlpha = 0.8;

  const cursor = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  let particlesArray: ParticleType[] = [];

  generateParticles(21);
  anim();

  canvas.addEventListener("mousemove", (e) => {
    cursor.x = e.offsetX;
    cursor.y = e.offsetY;
  });

  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      cursor.x = e.touches[0].clientX;
      cursor.y = e.touches[0].clientY;
    },
    { passive: false }
  );

  function generateParticles(amount: number) {
    for (let i = 0; i < amount; i++) {
      particlesArray[i] = new (Particle as any)(
        innerWidth / 2,
        innerHeight / 2,
        4,
        generateColor(),
        0.02
      );
    }
  }

  function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
      finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    }
    return finalHexString;
  }

  interface ParticleType {
    x: number;
    y: number;
    particleTrailWidth: number;
    strokeColor: string;
    rotateSpeed: number;
    theta: number;
    t: number;
    rotate: () => void;
  }

  function Particle(
    this: any,
    x: number,
    y: number,
    particleTrailWidth: number,
    strokeColor: string,
    rotateSpeed: number
  ) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.theta = Math.random() * Math.PI * 2;
    this.rotateSpeed = rotateSpeed;
    this.t = Math.random() * 150;

    this.rotate = () => {
      const ls = {
        x: this.x,
        y: this.y,
      };
      this.theta += this.rotateSpeed;
      this.x = cursor.x + Math.cos(this.theta) * this.t;
      this.y = cursor.y + Math.sin(this.theta) * this.t;
      context.beginPath();
      context.lineWidth = this.particleTrailWidth;
      context.strokeStyle = this.strokeColor;
      context.moveTo(ls.x, ls.y);
      context.lineTo(this.x, this.y);
      context.stroke();
    };
  }

  function anim() {
    requestAnimationFrame(anim);

    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => particle.rotate());
  }

  // window.requestAnimationFrame(draw);
}
