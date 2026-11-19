tribute.letter.forEach((line, index) => {
  const paragraph = document.createElement('p');
  paragraph.style.setProperty('--line', index);
  paragraph.textContent = line;
  find('#letter-body').append(paragraph);
});

const rotations = [-8, 5, -4, 5, -5, 7];
tribute.captions.forEach((caption, index) => {
  const print = photo(index, { interactive: true });
  print.style.setProperty('--tilt', rotations[index] + 'deg');
  print.style.setProperty('--arrival', (index % 2 ? 45 : -45) + 'px');
  print.style.setProperty('--index', index);
  find('#collage').append(print);
  const slide = document.createElement('div');
  slide.className = 'swiper-slide';
  slide.append(photo(index, { interactive: true }));
  find('#slides').append(slide);
  const fly = new Image();
  fly.src = 'assets/images/memories/' + (index + 1) + '.jpg';
  fly.alt = '';
  fly.className = 'fly-photo';
  fly.style.setProperty('--index', index);
  fly.style.setProperty('--x', [4, 77, 12, 81, 2, 73][index] + '%');
  fly.style.setProperty('--y', [13, 16, 38, 45, 62, 69][index] + '%');
  fly.style.setProperty('--tilt', rotations[index] + 'deg');
  find('#flying-photos').append(fly);
});
find('.film-window').classList.add('fallback');
[2, 5, 3].forEach(index => find('.board-prints').append(photo(index, { caption: false })));
[0, 1].forEach(index => find('.letter-prints').append(photo(index, { caption: false })));
setupGarden();

const gift = find('#open-gift');
let opening;
gift.addEventListener('click', () => {
  soundtrack.start();
  gift.disabled = true;
  find('.invitation').classList.add('opening');
  const box = gift.getBoundingClientRect();
  petals.burst(box.x + box.width / 2, box.y, 42);
  opening = setTimeout(() => {
    navigate('bang-phan');
    find('.invitation').classList.remove('opening');
    gift.disabled = false;
  }, reducedMotion.matches ? 30 : 690);
});

all('[data-go]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.go)));
find('.brand').addEventListener('click', event => {
  event.preventDefault();
  clearTimeout(opening);
  gift.disabled = false;
  find('.invitation').classList.remove('opening');
  navigate('thiep');
});
find('#back').addEventListener('click', () => navigate(sceneElements[sceneElements.indexOf(currentScene) - 1].id));

function syncLocation(focus) {
  const id = location.hash.slice(1);
  const target = sceneElements.some(scene => scene.id === id) ? id : 'thiep';
  showScene(target, { focus });
}
addEventListener('popstate', () => syncLocation(true));
addEventListener('hashchange', () => syncLocation(true));
syncLocation(false);
