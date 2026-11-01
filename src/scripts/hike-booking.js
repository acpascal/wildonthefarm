// Guided hike booking form, in three steps: pick a hike, then a month, then a
// day — then the participant's own details. One registration per person.
// Builds each hike's departures from its weekdays and live seats, keeps the
// summary in sync, and on submit holds the seat on the server
// (netlify/functions/hike-book) and sends the booking through Netlify Forms,
// which emails it to us (public/__forms.html). No payment happens here: we
// send the guest the payment link ourselves once the booking reaches us.
// Where the functions aren't running (astro dev), the seats in
// data/guidedHikes.ts stay on screen.

const form = document.querySelector('[data-hike-booking]');

if (form) {
  const hikes = JSON.parse(form.dataset.hikes);
  const t = JSON.parse(form.dataset.labels);
  const lang = document.documentElement.lang || 'en';
  const monthTabs = form.querySelector('[data-month-tabs]');
  const monthHint = form.querySelector('[data-month-hint]');
  const chips = form.querySelector('[data-date-chips]');
  const dayHint = form.querySelector('[data-day-hint]');
  const status = form.querySelector('[data-date-status]');
  const errorBox = form.querySelector('[data-booking-error]');
  const bookingDone = form.querySelector('[data-booking-done]');
  const mealOption = form.querySelector('[data-meal-option]');
  const mealBox = form.elements.namedItem('meal');
  const summary = (key) => form.querySelector(`[data-summary="${key}"]`);
  const params = new URLSearchParams(window.location.search);

  let hike = null;
  let month = '';
  let date = '';
  let held = false;

  const iso = (day) =>
    [day.getFullYear(), String(day.getMonth() + 1).padStart(2, '0'), String(day.getDate()).padStart(2, '0')].join('-');

  const parse = (value) => {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const longDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formatDate = (value, options = longDate, locale = lang) =>
    value ? parse(value).toLocaleDateString(locale, options) : '';

  const plain = (n) => String(Number.isInteger(n) ? n : n.toFixed(2));
  const money = (n) => t.money.replace('{n}', plain(n));

  const confirmedSeats = (value) => hike.seats[value]?.confirmed ?? 0;
  const pendingSeats = (value) => hike.seats[value]?.pending ?? 0;
  const seatsLeft = (value) => hike.maxPeople - confirmedSeats(value) - pendingSeats(value);

  // Departures are generated from today, so the static page never shows a past date.
  const departures = () => {
    const list = [];
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() + hike.minNoticeDays);
    const last = parse(hike.lastDate);
    for (; day <= last; day.setDate(day.getDate() + 1)) {
      if (hike.weekdays.includes(day.getDay())) list.push(iso(day));
    }
    return list;
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // Step 2: one tab per month, with how many departures still have room.
  const renderMonths = () => {
    monthTabs.replaceChildren();
    monthHint.hidden = Boolean(hike);
    if (!hike) return;
    const byMonth = new Map();
    for (const value of departures()) {
      const key = value.slice(0, 7);
      byMonth.set(key, (byMonth.get(key) ?? 0) + (seatsLeft(value) > 0 ? 1 : 0));
    }
    if (!byMonth.has(month)) month = [...byMonth].find(([, open]) => open > 0)?.[0] ?? [...byMonth.keys()][0] ?? '';
    let year = '';
    for (const [key, open] of byMonth) {
      // The months run over more than one year: each year gets its own label.
      if (key.slice(0, 4) !== year) {
        year = key.slice(0, 4);
        monthTabs.append(el('span', 'month-year', year));
      }
      const tab = el('button', 'month-tab');
      tab.type = 'button';
      tab.setAttribute('aria-pressed', String(key === month));
      tab.disabled = held && key !== month;
      tab.append(
        el('span', 'month-tab-name', parse(`${key}-01`).toLocaleDateString(lang, { month: 'long' })),
        el('span', 'month-tab-count', open === 0 ? t.monthFull : open === 1 ? t.departure : t.departures.replace('{n}', String(open)))
      );
      tab.addEventListener('click', () => {
        month = key;
        renderMonths();
        renderDays();
      });
      monthTabs.append(tab);
    }
  };

  // Step 3: the chosen month's departures, each with what is left.
  const renderDays = () => {
    chips.replaceChildren();
    status.querySelector('ul').replaceChildren();
    status.hidden = true;
    dayHint.hidden = Boolean(hike && month);
    dayHint.textContent = hike ? t.chooseMonthFirst : t.chooseHikeFirst;
    if (!hike || !month) return;
    for (const value of departures().filter((d) => d.startsWith(month))) {
      const left = seatsLeft(value);
      const full = left <= 0;
      const chip = el('label', 'date-chip');
      const input = el('input');
      input.type = 'radio';
      input.name = 'date';
      input.value = value;
      input.disabled = full || (held && value !== date);
      input.checked = !full && value === date;
      chip.append(
        input,
        el('span', 'date-chip-day', formatDate(value, { weekday: 'short' })),
        el('span', 'date-chip-num', String(parse(value).getDate()))
      );
      if (left < hike.maxPeople) {
        const note = !full
          ? left === 1
            ? t.seatLeft
            : t.seatsLeft.replace('{n}', String(left))
          : pendingSeats(value) > 0
            ? t.pending
            : t.full;
        chip.append(el('span', 'date-chip-note', note));
        // Spelled out under the days: who is confirmed, who still has to pay.
        status.querySelector('ul').append(
          el(
            'li',
            undefined,
            t.statusLine
              .replace('{date}', formatDate(value, { weekday: 'long', day: 'numeric', month: 'long' }))
              .replace('{confirmed}', String(confirmedSeats(value)))
              .replace('{pending}', String(pendingSeats(value)))
              .replace('{left}', String(Math.max(left, 0)))
          )
        );
        status.hidden = false;
      }
      chips.append(chip);
    }
  };

  const withMeal = () => Boolean(hike?.meal) && mealBox.checked;
  const mealPrice = () => (withMeal() ? (hike.meal.pricePerPerson ?? 0) : 0);
  const total = () => (hike ? hike.price + mealPrice() : 0);
  const deposit = () => (hike ? total() * hike.depositRate : 0);
  const depositLink = () => `${form.dataset.paypal}/${deposit()}USD`;

  const meeting = () => [hike.meetingPoint, hike.startTime].filter(Boolean).join(', ');
  const mealText = () =>
    !withMeal()
      ? t.mealNo
      : hike.meal.pricePerPerson
        ? t.mealPrice.replace('{price}', money(hike.meal.pricePerPerson))
        : t.mealPriceTbc;

  const render = () => {
    summary('hike').textContent = hike?.title ?? '—';
    summary('date').textContent = formatDate(date) || '—';
    summary('meeting').textContent = hike ? meeting() : '—';
    form.querySelector('[data-summary-meal]').hidden = !hike?.meal;
    summary('meal').textContent = hike?.meal ? mealText() : '—';
    summary('total').textContent = hike ? money(total()) : '—';
    summary('deposit').textContent = hike ? money(deposit()) : '—';
    summary('balance').textContent = hike ? money(total() - deposit()) : '—';
  };

  // Posts the booking to Netlify Forms, which emails it to us — always in
  // French, whatever the page's language. Field names: public/__forms.html.
  const sendBooking = async () => {
    const data = new FormData(form);
    const dollars = (n) => `${plain(n)} $`;
    const fields = {
      'form-name': 'reservation-randonnee',
      subject: `Réservation ${hike.title} — ${date} — ${data.get('name')}`,
      website: data.get('website'),
      Randonnee: hike.title,
      Date: formatDate(date, longDate, 'fr'),
      'Rendez-vous': [hike.meetingPointFr, hike.startTime].filter(Boolean).join(', '),
      Nom: data.get('name'),
      Age: data.get('age'),
      'Cedula-ou-passeport': data.get('idNumber'),
      Domicile: data.get('home'),
      Repas: !hike.meal ? 'non proposé' : withMeal() ? `oui (+ ${dollars(mealPrice())})` : 'non',
      Total: dollars(total()),
      Acompte: dollars(deposit()),
      Solde: dollars(total() - deposit()),
      'Lien-de-paiement-a-envoyer': depositLink(),
      WhatsApp: data.get('whatsapp'),
      email: data.get('email'),
      'Logement-a-Boquete': data.get('lodging'),
      'Langue-parlee': data.get('language'),
      'Langue-du-site': lang,
      'Derniere-randonnee-de-6h': data.get('experience'),
      Sante: data.get('health'),
      'Urgence-nom': data.get('emergencyName'),
      'Urgence-telephone': data.get('emergencyPhone'),
      Assurance: 'oui',
      Decharge: 'oui',
      Conditions: 'oui',
      // Lets us see which ad or article a booking came from.
      Reference: [params.get('utm_source'), params.get('utm_campaign')].filter(Boolean).join(' / '),
    };
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fields).toString(),
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Live seats from the server; the calendar keeps what it has if that fails.
  const refreshSeats = async (target) => {
    try {
      const response = await fetch(`/api/hikes/availability?hike=${target.slug}`);
      if (!response.ok) return;
      target.seats = (await response.json()).seats;
      if (target !== hike) return;
      renderMonths();
      renderDays();
      render();
    } catch {
      // Offline or no functions: the seats from the data file stay on screen.
    }
  };

  const selectHike = (slug) => {
    const next = hikes.find((h) => h.slug === slug);
    if (!next || held) return;
    hike = next;
    date = '';
    // The meal checkbox only exists for hikes that offer one.
    mealOption.hidden = !hike.meal;
    if (!hike.meal) mealBox.checked = false;
    mealOption.querySelector('[data-meal-price]').textContent = hike.meal?.pricePerPerson
      ? t.mealPrice.replace('{price}', money(hike.meal.pricePerPerson))
      : t.mealPriceTbc;
    const radio = form.querySelector(`input[name="hike"][value="${slug}"]`);
    if (radio) radio.checked = true;
    renderMonths();
    renderDays();
    render();
    refreshSeats(hike);
  };

  // Holds the seats as "pending". Resolves to 'full' when the group filled up
  // in the meantime; any other outcome lets the request go out as before, so
  // a server hiccup never loses a booking.
  const holdSeats = async () => {
    if (held) return 'held';
    const data = new FormData(form);
    try {
      const response = await fetch('/api/hikes/book', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          hike: hike.slug,
          date,
          guests: 1,
          meal: withMeal(),
          name: data.get('name'),
          email: data.get('email'),
          whatsapp: data.get('whatsapp'),
          website: data.get('website'),
        }),
      });
      if (response.status === 409) return 'full';
      if (!response.ok) return 'unavailable';
      // The seat is theirs: hike and day are now fixed, so sending the
      // request again can't hold a second seat.
      held = true;
      mealBox.disabled = true;
      form
        .querySelectorAll('input[name="hike"]:not(:checked), input[name="date"]:not(:checked)')
        .forEach((input) => (input.disabled = true));
      monthTabs.querySelectorAll('button[aria-pressed="false"]').forEach((tab) => (tab.disabled = true));
      return 'held';
    } catch {
      return 'unavailable';
    }
  };

  const showError = (text) => {
    errorBox.textContent = text;
    errorBox.hidden = false;
  };

  form.addEventListener('change', (event) => {
    const { name, value } = event.target;
    if (name === 'hike') selectHike(value);
    if (name === 'date') date = value;
    render();
  });
  form.addEventListener('input', render);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!hike || !date || !form.checkValidity()) return showError(t.error);
    errorBox.hidden = true;
    const sendButton = form.querySelector('[data-send]');
    sendButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    const outcome = await holdSeats();
    // A full departure stops here. If only the seat server failed, the email
    // still goes out: a booking must never be lost, and we can sort the seat by hand.
    const sent = outcome !== 'full' && (await sendBooking());
    form.removeAttribute('aria-busy');
    sendButton.disabled = false;
    if (outcome === 'full') {
      date = '';
      await refreshSeats(hike);
      return showError(t.errorFull);
    }
    if (!sent) return showError(t.errorSend);
    // Booking on its way: say what happens next. The payment link comes from us.
    sendButton.hidden = true;
    form.querySelector('[data-send-note]').hidden = true;
    bookingDone.querySelector('[data-done-text]').textContent = t.doneText.replace('{deposit}', money(deposit()));
    // The next participant starts a fresh form on the same hike and day.
    bookingDone.querySelector('[data-another-person]').href = `?randonnee=${hike.slug}&date=${date}#reserver`;
    bookingDone.hidden = false;
    bookingDone.scrollIntoView({ block: 'center' });
  });

  // "Réserver ce sentier" links carry ?randonnee=<slug>; a lone bookable hike is picked for the guest.
  // "Inscrire une autre personne" also carries &date=<day>.
  const preset = params.get('randonnee') ?? (hikes.length === 1 ? hikes[0].slug : '');
  render();
  if (preset) {
    selectHike(preset);
    const day = params.get('date') ?? '';
    if (hike && departures().includes(day) && seatsLeft(day) > 0) {
      date = day;
      month = day.slice(0, 7);
      renderMonths();
      renderDays();
      render();
    }
  } else renderDays();
}
