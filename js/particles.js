const petals = (() => {
  const canvas = find('#petals');
  const ctx = canvas.getContext('2d');
  const colors = ['#ca728e', '#ec9db5', '#ac4d6f', '#ffcfda', '#fff1dd'];
  let particles = [];
  let frame = 0;

  function resize() {
    const scale = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * scale;
    canvas.height = innerHeight * scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particles = particles.filter(petal => petal.life > 0);
    for (const petal of particles) {
      if (petal.target) {
        petal.x += (petal.target.x - petal.x) * .056;
        petal.y += (petal.target.y - petal.y) * .056;
      } else {
        petal.x += petal.vx + Math.sin(petal.life / 17) * .7;
        petal.y += petal.vy;
        petal.vy += .035;
      }
      petal.life -= 1;
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.life / petal.spin);
      ctx.globalAlpha = Math.min(.83, petal.life / 38);
      ctx.fillStyle = petal.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size, petal.size * .53, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    frame = particles.length ? requestAnimationFrame(draw) : 0;
  }

  function burst(x, y, count = 28, chalk = false) {
    if (reducedMotion.matches) return;
    particles = particles.slice(-90);
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x, y, vx: (Math.random() - .5) * 7, vy: -Math.random() * 4.5,
        size: chalk ? 1 + Math.random() : 3 + Math.random() * 5,
        spin: 9 + Math.random() * 20, life: 53 + Math.random() * 63,
        color: chalk ? '#fff1d0' : colors[i % colors.length]
      });
    }
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function formDate(box) {
    if (reducedMotion.matches) return;
    const mask = document.createElement('canvas');
    mask.width = Math.min(390, Math.floor(box.width));
    mask.height = 125;
    const ink = mask.getContext('2d');
    const size = Math.min(110, Math.floor(mask.width / 3));
    ink.font = 'bold ' + size + 'px Georgia';
    ink.textAlign = 'center';
    ink.textBaseline = 'middle';
    ink.fillText('20/11', mask.width / 2, mask.height / 2);
    const { data } = ink.getImageData(0, 0, mask.width, mask.height);
    const stride = innerWidth < 600 ? 7 : 6;
    for (let y = 0; y < mask.height; y += stride) {
      for (let x = 0; x < mask.width; x += stride) {
        if (data[(y * mask.width + x) * 4 + 3] < 140) continue;
        const left = box.x + (box.width - mask.width) / 2;
        const top = box.y + (box.height - mask.height) / 2;
        particles.push({
          x: left + Math.random() * mask.width,
          y: top - 50 + Math.random() * (mask.height + 100),
          target: { x: left + x, y: top + y },
          color: x % 3 ? '#fff7cf' : '#f8c567',
          size: .7 + Math.random() * 1.55, life: 75 + Math.random() * 45, spin: 18
        });
      }
    }
    if (!frame) frame = requestAnimationFrame(draw);
  }

  resize();
  addEventListener('resize', resize);
  return { burst, formDate };
})();
