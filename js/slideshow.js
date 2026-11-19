function photo(index, { caption = true, interactive = false } = {}) {
  const figure = document.createElement('figure');
  figure.className = 'polaroid';
  const image = new Image();
  image.src = 'assets/images/memories/' + (index + 1) + '.jpg';
  image.alt = tribute.descriptions[index];
  image.decoding = 'async';
  const label = document.createElement('figcaption');
  label.textContent = tribute.captions[index];

  if (interactive) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'photo-button';
    button.setAttribute('aria-label', 'Xem ảnh: ' + label.textContent);
    button.addEventListener('click', () => openPhoto(image, label.textContent));
    button.append(image);
    figure.append(button);
  } else {
    figure.append(image);
  }
  if (caption) figure.append(label);
  return figure;
}

const slideshow = (() => {
  const windowEl = find('.film-window');
  const progress = find('#slide-progress');
  const pause = find('#play-slides');
  const count = tribute.captions.length;
  let timer = 0;
  let active = false;
  let enabled = !reducedMotion.matches;
  let index = 0;
  let start = 0;
  let swiper;
  let touch;

  function render() {
    find('#slide-count').textContent = (index + 1) + ' / ' + count;
    progress.value = 0;
    start = performance.now();
    all('.swiper-slide', windowEl).forEach((slide, i) => {
      slide.inert = i !== index;
      slide.setAttribute('aria-hidden', String(i !== index));
      if (!swiper) slide.classList.toggle('swiper-slide-active', i === index);
    });
  }

  function step(direction) {
    const target = (index + direction + count) % count;
    if (swiper) swiper.slideTo(target);
    else { index = target; render(); }
  }

  function tick(now) {
    if (!active || !enabled) return;
    if (!find('#lightbox').open && !document.hidden) {
      progress.value = (now - start) / tribute.slideDuration;
      if (progress.value >= 1) step(1);
    } else start = now - progress.value * tribute.slideDuration;
    timer = requestAnimationFrame(tick);
  }

  function schedule() {
    cancelAnimationFrame(timer);
    pause.textContent = enabled ? 'Ⅱ' : '▶';
    pause.setAttribute('aria-label', enabled ? 'Tạm dừng trình chiếu' : 'Phát trình chiếu');
    start = performance.now() - progress.value * tribute.slideDuration;
    if (active && enabled) timer = requestAnimationFrame(tick);
  }

  pause.addEventListener('click', () => { enabled = !enabled; schedule(); });
  find('#prev').addEventListener('click', () => step(-1));
  find('#next').addEventListener('click', () => step(1));
  windowEl.addEventListener('touchstart', event => {
    touch = event.changedTouches[0];
  }, { passive: true });
  windowEl.addEventListener('touchend', event => {
    if (swiper || !touch) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - touch.clientX;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(end.clientY - touch.clientY)) step(dx < 0 ? 1 : -1);
    touch = null;
  }, { passive: true });
  find('#album').addEventListener('keydown', event => {
    if (find('#lightbox').open) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  return {
    toggle(show) {
      active = show;
      if (show && !swiper && window.Swiper) {
        swiper = new Swiper(windowEl, {
          initialSlide: index, effect: 'fade', fadeEffect: { crossFade: true },
          speed: reducedMotion.matches ? 0 : 780, rewind: true,
          on: { slideChange(instance) { index = instance.activeIndex; render(); } }
        });
        windowEl.classList.remove('fallback');
      }
      if (show) { swiper?.update(); render(); }
      schedule();
    }
  };
})();
