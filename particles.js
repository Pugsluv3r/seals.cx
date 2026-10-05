const canvas = document.querySelector(".particle-canvas");
const context = canvas?.getContext("2d");

if (canvas && context && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const particleColor = "203, 166, 247";
  const particles = [];
  let animationFrame;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  const createParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.45 + 0.15,
    speedX: (Math.random() - 0.5) * 0.16,
    speedY: (Math.random() - 0.5) * 0.16,
  });

  const resize = () => {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const particleCount = Math.min(90, Math.max(35, Math.floor((width * height) / 14000)));
    particles.length = 0;
    for (let index = 0; index < particleCount; index += 1) {
      particles.push(createParticle());
    }
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < -5) particle.x = width + 5;
      if (particle.x > width + 5) particle.x = -5;
      if (particle.y < -5) particle.y = height + 5;
      if (particle.y > height + 5) particle.y = -5;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particleColor}, ${particle.alpha})`;
      context.fill();
    });

    animationFrame = requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
}
