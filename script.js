const canvas = document.getElementById("net");
const ctx = canvas.getContext("2d");

let width, height;
let nodes = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

// Create nodes
for (let i = 0; i < 70; i++) {
  nodes.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  nodes.forEach((a, i) => {
    a.x += a.vx;
    a.y += a.vy;

    if (a.x < 0 || a.x > width) a.vx *= -1;
    if (a.y < 0 || a.y > height) a.vy *= -1;

    nodes.forEach(b => {
      let dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 140) {
        ctx.strokeStyle = `rgba(76,201,240,${1 - dist / 140})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    });

    ctx.fillStyle = "#4cc9f0";
    ctx.beginPath();
    ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
