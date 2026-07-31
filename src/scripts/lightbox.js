// Lightbox for photo tiles. Any element with [data-lightbox] participates —
// adding a new gallery-style component elsewhere on the site needs no
// changes here, unlike the old version which had to enumerate container
// class names (.gallery, .photo-grid, .image-text-card, ...).
//
// Tiles sharing the same [data-gallery] value are grouped into one
// continuous slideshow; a tile with no data-gallery shows alone.
(function () {
  const tiles = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (!tiles.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML =
    '<div class="lightbox-stage"><img alt="" /></div>' +
    '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
    '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous photo">&lsaquo;</button>' +
    '<button class="lightbox-nav lightbox-next" type="button" aria-label="Next photo">&rsaquo;</button>';
  document.body.appendChild(overlay);

  const img = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');
  const stage = overlay.querySelector('.lightbox-stage');

  let group = [];
  let index = 0;

  function groupFor(tile) {
    const key = tile.dataset.gallery;
    if (!key) return [tile];
    return tiles.filter(function (t) {
      return t.dataset.gallery === key;
    });
  }

  function show(i) {
    index = (i + group.length) % group.length;
    const tile = group[index];
    img.src = tile.getAttribute('href');
    img.alt = tile.getAttribute('aria-label') || '';
    const multi = group.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
  }

  function open(tile) {
    group = groupFor(tile);
    show(group.indexOf(tile));
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  tiles.forEach(function (tile) {
    tile.addEventListener('click', function (e) {
      e.preventDefault();
      open(tile);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () {
    show(index - 1);
  });
  nextBtn.addEventListener('click', function () {
    show(index + 1);
  });

  stage.addEventListener('click', function (e) {
    if (e.target !== img) return;
    if (group.length < 2) return;
    const rect = img.getBoundingClientRect();
    const clickedLeftHalf = e.clientX - rect.left < rect.width / 2;
    show(index + (clickedLeftHalf ? -1 : 1));
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
