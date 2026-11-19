const chapters = ['Thiệp chúc mừng', 'Bảng phấn', 'Bức thư tri ân', 'Góc kỷ niệm', 'Album ảnh', 'Vườn hồng', 'Lời kết'];
const sceneElements = all('.scene');
let currentScene = sceneElements[0];
let sceneCleanup = () => {};

if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

function showScene(id, { focus = true } = {}) {
  const scene = sceneElements.find(element => element.id === id);
  if (!scene || (scene === currentScene && !scene.hidden)) return;
  sceneCleanup();
  currentScene.classList.remove('active');
  currentScene.hidden = true;
  currentScene = scene;
  scene.hidden = false;
  scene.classList.add('active');
  const chapter = sceneElements.indexOf(scene);
  if (chapter) find('#music').disabled = false;
  find('#back').hidden = chapter === 0;
  find('#chapter').textContent = chapter ? chapters[chapter] : 'Kính tặng cô nhân ngày 20/11';
  find('#position').textContent = chapter ? (chapter + 1) + ' / ' + chapters.length : '';
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (focus) find('h1,h2', scene)?.focus({ preventScroll: true });
  slideshow.toggle(id === 'album');

  let motion;
  if (window.gsap && !reducedMotion.matches) {
    motion = gsap.context(() => {
      all('.reveal', scene).forEach(element => {
        gsap.from(element, {
          y: 15, scale: element.classList.contains('board') ? .97 : .99,
          opacity: .42, duration: 1.18, ease: 'power2.out',
          ...(window.ScrollTrigger && { scrollTrigger: { trigger: element, start: 'top 94%', once: true } })
        });
      });
      if (id === 'bang-phan') gsap.from('.board-prints .polaroid', { opacity: .25, rotation: 0, duration: 1.4, stagger: .15 });
    }, scene);
    window.ScrollTrigger?.refresh();
  }
  const effect = setTimeout(() => {
    if (id === 'bang-phan') {
      const box = find('.board').getBoundingClientRect();
      petals.burst(box.x + box.width * .65, box.y + box.height * .5, 17, true);
    }
    if (id === 'loi-ket') {
      const box = find('.final-date').getBoundingClientRect();
      petals.burst(box.x + box.width / 2, box.y + box.height / 2, 56);
      petals.formDate(box);
    }
  }, id === 'loi-ket' ? 1310 : 700);
  sceneCleanup = () => { clearTimeout(effect); motion?.revert(); };
}

function navigate(id) {
  if (location.hash !== '#' + id) history.pushState(null, '', '#' + id);
  showScene(id);
}
