const lightbox = find('#lightbox');

function openPhoto(image, caption) {
  const enlarged = find('img', lightbox);
  enlarged.src = image.src;
  enlarged.alt = image.alt;
  find('p', lightbox).textContent = caption;
  lightbox.showModal();
}

find('#close-photo').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

function setupGarden() {
  const points = [[27,39], [40,23], [61,20], [74,38], [51,46]];
  const wish = find('#wish');
  const bouquet = find('#hold-bouquet');

  function bloom(button, message, count) {
    const bounds = button.getBoundingClientRect();
    wish.textContent = message;
    petals.burst(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, count);
  }

  tribute.wishes.forEach((message, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'rose-button';
    button.setAttribute('aria-label', 'Lời chúc từ bông hồng ' + (index + 1));
    button.setAttribute('aria-pressed', 'false');
    [button.style.left, button.style.top] = points[index].map(value => value + '%');
    const rose = new Image();
    rose.src = 'assets/images/roses/rose.svg';
    rose.alt = '';
    button.append(rose);
    button.addEventListener('click', () => {
      button.setAttribute('aria-pressed', 'true');
      bloom(button, message, 14);
    });
    find('#rose-buttons').append(button);
  });

  let timer;
  let fired = false;
  const secret = () => {
    fired = true;
    bloom(bouquet, tribute.secret, 54);
    all('.rose-button').forEach(button => button.setAttribute('aria-pressed', 'true'));
  };
  bouquet.addEventListener('pointerdown', () => {
    fired = false;
    timer = setTimeout(secret, 650);
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(name => bouquet.addEventListener(name, () => clearTimeout(timer)));
  bouquet.addEventListener('contextmenu', event => event.preventDefault());
  bouquet.addEventListener('click', event => {
    if (event.detail === 0 || !fired) secret();
  });
}
