export const business = {
  name: 'Wild on the Farm',
  tagline: 'Boquete Cloud Forest Lodge',
  description:
    "An eco-sanctuary in Panama's cloud forest at 1,800 metres. Three handcrafted cabins on an organic & permaculture macadamia farm in Panama, since 2008, beside Amistad National Park.",
  phone: '+507 6569 9134',
  phoneHref: 'tel:50765699134',
  whatsappHref: 'https://api.whatsapp.com/send?phone=50765699134',
  email: 'info@wildonthefarm.com',
  // Kept in line with the Google Business Profile ("Wild on the Farm, Boquete
  // Cloud Forest Lodge" — Horqueta, Los Naranjos, Chiriquí) so search engines
  // see one consistent name/address/phone across the site and Maps.
  address: {
    streetAddress: 'Finca Amistad, Horqueta',
    addressLocality: 'Los Naranjos, Boquete',
    addressRegion: 'Chiriquí',
    addressCountry: 'PA',
  },
  geo: { latitude: 8.8234814, longitude: -82.4480084 },
  googleMapsUrl: 'https://www.google.com/maps?cid=1276073423635709465',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61562308296749',
    instagram: 'https://www.instagram.com/wildonthefarm',
    youtube: 'https://www.youtube.com/@wildonthefarm8302',
  },
} as const;
