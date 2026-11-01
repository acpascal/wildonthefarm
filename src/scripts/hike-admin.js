// Private bookings page: asks for the admin password, lists every booking
// from /api/hikes/admin and lets us mark a deposit as received, cancel a
// booking or put it back to pending. The password is checked by the server
// on every request and only kept for this browser tab.

const root = document.querySelector('[data-hike-admin]');

if (root) {
  const login = root.querySelector('[data-admin-login]');
  const errorBox = root.querySelector('[data-admin-error]');
  const content = root.querySelector('[data-admin-content]');
  const STORAGE_KEY = 'hike-admin-password';

  const errors = {
    unauthorized: 'Mot de passe incorrect.',
    unconfigured: "Le mot de passe n'est pas encore configuré sur Netlify (variable HIKE_ADMIN_PASSWORD).",
    full: 'Impossible : ce départ est complet, les places ont été prises par une autre réservation.',
    default: "Le serveur des réservations ne répond pas. Réessayez dans un instant.",
  };

  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };

  const formatDate = (value, options) => {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('fr', options);
  };

  const statusLabel = (booking) => {
    if (booking.status === 'confirmed') return 'Confirmée';
    if (booking.status === 'cancelled') return 'Annulée';
    return 'En attente de paiement';
  };

  // The payment reminder, ready to send: the same text for e-mail and WhatsApp.
  const paymentText = (booking, hike) =>
    [
      `Bonjour ${booking.name},`,
      '',
      `Votre réservation pour la randonnée ${hike.title} du ${formatDate(booking.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} (${booking.guests} pers.) est enregistrée.`,
      `Pour la confirmer, merci de régler l'acompte de ${booking.deposit} $ par PayPal :`,
      `${root.dataset.paypal}/${booking.deposit}USD`,
      '',
      'Wild on the Farm',
    ].join('\n');

  const call = async (body) => {
    const response = await fetch('/api/hikes/admin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem(STORAGE_KEY) ?? ''}`,
      },
      body: JSON.stringify(body ?? {}),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error ?? 'default');
    return data;
  };

  const action = (label, body, className = 'btn') => {
    const button = el('button', label, className);
    button.type = 'button';
    button.addEventListener('click', () => load(body));
    return button;
  };

  const link = (label, href) => {
    const a = el('a', label);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  };

  const bookingRow = (booking, hike) => {
    const row = el('tr');
    if (booking.status === 'cancelled') row.className = 'is-inactive';
    const contact = el('td');
    const text = paymentText(booking, hike);
    contact.append(
      link(booking.email, `mailto:${booking.email}?subject=${encodeURIComponent(`Votre réservation — ${hike.title}`)}&body=${encodeURIComponent(text)}`),
      el('br'),
      link(booking.whatsapp, `https://api.whatsapp.com/send?phone=${booking.whatsapp.replace(/\D/g, '')}&text=${encodeURIComponent(text)}`)
    );
    const actions = el('td', undefined, 'booking-actions');
    const set = (status) => ({ action: 'set-status', key: booking.key, status });
    if (booking.status !== 'confirmed') actions.append(action('Paiement reçu', set('confirmed'), 'btn btn-normal'));
    if (booking.status !== 'cancelled') actions.append(action('Annuler', set('cancelled')));
    if (booking.status !== 'pending') actions.append(action('Remettre en attente', set('pending')));
    row.append(
      el('td', formatDate(booking.date, { weekday: 'short', day: 'numeric', month: 'short' })),
      el('td', booking.name),
      el('td', booking.meal ? `${booking.guests} + repas` : String(booking.guests)),
      contact,
      el('td', `${booking.deposit} $`),
      el('td', statusLabel(booking)),
      el('td', new Date(booking.createdAt).toLocaleDateString('fr', { day: 'numeric', month: 'short' })),
      actions
    );
    return row;
  };

  const render = ({ today, hikes }) => {
    content.replaceChildren();
    for (const hike of hikes) {
      content.append(el('h3', hike.title));
      const dates = Object.entries(hike.seats).sort(([a], [b]) => a.localeCompare(b));
      if (dates.length) {
        const list = el('ul', undefined, 'booking-seats');
        for (const [date, seats] of dates) {
          const left = hike.maxPeople - seats.confirmed - seats.pending;
          list.append(
            el(
              'li',
              `${formatDate(date, { weekday: 'long', day: 'numeric', month: 'long' })} — confirmées : ${seats.confirmed} · en attente : ${seats.pending} · libres : ${Math.max(left, 0)}`
            )
          );
        }
        content.append(list);
      }
      if (!hike.bookings.length) {
        content.append(el('p', 'Aucune réservation pour le moment.'));
        continue;
      }
      const table = el('table', undefined, 'booking-table');
      const head = el('tr');
      for (const title of ['Départ', 'Nom', 'Pers.', 'Contact', 'Acompte', 'État', 'Réservé le', '']) head.append(el('th', title));
      const body = el('tbody');
      // Coming departures first; past ones stay below for reference.
      const upcoming = hike.bookings.filter((booking) => booking.date >= today);
      const past = hike.bookings.filter((booking) => booking.date < today).reverse();
      for (const booking of [...upcoming, ...past]) body.append(bookingRow(booking, hike));
      table.append(el('thead'), body);
      table.firstChild.append(head);
      const scroll = el('div', undefined, 'booking-table-scroll');
      scroll.append(table);
      content.append(scroll);
    }
    content.append(
      el('p', 'Cliquer sur l’e-mail ou le numéro WhatsApp ouvre un message déjà rédigé avec le lien de paiement de l’acompte.', 'hike-booking-note')
    );
  };

  const load = async (body) => {
    errorBox.hidden = true;
    try {
      render(await call(body));
      login.hidden = true;
    } catch (error) {
      errorBox.textContent = errors[error.message] ?? errors.default;
      errorBox.hidden = false;
      if (error.message === 'unauthorized') {
        sessionStorage.removeItem(STORAGE_KEY);
        login.hidden = false;
        content.replaceChildren();
      } else if (body) {
        // A refused action: show the list as it now stands.
        call().then(render).catch(() => {});
      }
    }
  };

  login.addEventListener('submit', (event) => {
    event.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, login.elements.namedItem('password').value);
    load();
  });

  if (sessionStorage.getItem(STORAGE_KEY)) load();
}
