const soundtrack = (() => {
  const audio = find('#background');
  const header = find('#music');
  const final = find('#final-music');
  let playing = false;
  let frame = 0;
  let generation = 0;

  function update() {
    const label = playing ? 'Tắt nhạc' : 'Bật nhạc';
    header.setAttribute('aria-pressed', String(playing));
    final.setAttribute('aria-pressed', String(playing));
    find('#music-label').textContent = label;
    final.textContent = label;
  }

  function fade(target, callback = () => {}) {
    cancelAnimationFrame(frame);
    const start = performance.now();
    const volume = audio.volume;
    function tick(now) {
      const progress = Math.min(1, (now - start) / 700);
      audio.volume = volume + (target - volume) * progress;
      if (progress < 1) frame = requestAnimationFrame(tick);
      else callback();
    }
    frame = requestAnimationFrame(tick);
  }

  function set(value) {
    const request = ++generation;
    playing = value;
    update();
    if (!value) {
      fade(0, () => { if (request === generation) audio.pause(); });
      return;
    }
    if (audio.paused) audio.volume = 0;
    const promise = audio.play();
    fade(.54);
    promise?.catch(() => {
      if (request !== generation) return;
      playing = false;
      update();
    });
  }

  [header, final].forEach(button => button.addEventListener('click', () => set(!playing)));
  return { start() { header.disabled = false; if (!playing) set(true); } };
})();
