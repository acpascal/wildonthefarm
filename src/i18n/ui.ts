export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

// Chrome strings only — nav, footer, buttons, common UI labels.
// Page body copy is NOT here; it lives in the page/article files themselves.
export const ui = {
  en: {
    'nav.farmAndStay': 'Discover',
    'nav.theFarm': 'The Farm',
    'nav.stay': 'The Lodge',
    'nav.kitchen': 'The Food',
    'nav.garden': 'The Garden',
    'nav.ourStory': 'Our Story',
    'nav.wildlife': 'Wildlife & Biodiversity',
    'nav.experience': 'Experience',
    'nav.birdwatching': 'Birdwatching',
    'nav.hiking': 'Hiking',
    'nav.journal': 'Journal',
    'nav.shop': 'Shop',
    'nav.ratesRetreats': 'Rates & Retreats',
    'nav.reserve': 'Reserve',
    'footer.facebook': 'Facebook',
    'footer.instagram': 'Instagram',
    'footer.youtube': 'YouTube',
    'footer.copyright': '© 2026 Wild on the Farm — Boquete Cloud Forest Lodge, Panama',
    'lightbox.close': 'Close',
    'lightbox.previous': 'Previous photo',
    'lightbox.next': 'Next photo',
    'language.switch': 'Language',
    'reserve.defaultHeading': 'Plan your escape into the clouds.',
    'reserve.pitch':
      "Tell us when you'd like to arrive and what you're dreaming of — birdwatching, a digital detox, or simply the silence. We'll help you plan an unforgettable stay.",
    'reserve.contactForm': 'Send us a message',
    'reserve.emailSubject': 'Stay Enquiry — Wild on the Farm',
    'reserve.emailBody':
      'Hi,\n\nI would like to stay at Wild on the Farm.\n\nDates: from ___ to ___\nNumber of guests:\nNationality:\nChildren over 12:\nActivities of interest:\nSpecial diet:\nAllergies:\n\nThank you,',
    'journal.continueReading': 'Continue Reading',
    'journal.moreFromJournal': 'More from the Journal.',
    'journal.allPosts': 'All Journal Posts →',
    'medicalDisclaimer':
      'This information is for educational purposes only and reflects traditional and commonly documented uses of this plant. It is not medical advice and does not replace the guidance of a qualified healthcare professional. Always consult your doctor before using any plant medicinally, especially if pregnant, nursing, or taking medication.',
  },
  es: {
    'nav.farmAndStay': 'Descubrir',
    'nav.theFarm': 'La Finca',
    'nav.stay': 'El Lodge',
    'nav.kitchen': 'La Comida',
    'nav.garden': 'El Jardín',
    'nav.ourStory': 'Nuestra Historia',
    'nav.wildlife': 'Fauna y Biodiversidad',
    'nav.experience': 'Experiencia',
    'nav.birdwatching': 'Avistamiento de Aves',
    'nav.hiking': 'Senderismo',
    'nav.journal': 'Diario',
    'nav.shop': 'Tienda',
    'nav.ratesRetreats': 'Tarifas y Retiros',
    'nav.reserve': 'Reservar',
    'footer.facebook': 'Facebook',
    'footer.instagram': 'Instagram',
    'footer.youtube': 'YouTube',
    'footer.copyright': '© 2026 Wild on the Farm — Boquete Cloud Forest Lodge, Panamá',
    'lightbox.close': 'Cerrar',
    'lightbox.previous': 'Foto anterior',
    'lightbox.next': 'Foto siguiente',
    'language.switch': 'Idioma',
    'reserve.defaultHeading': 'Planifica tu escape hacia las nubes.',
    'reserve.pitch':
      'Cuéntanos cuándo te gustaría llegar y qué estás buscando — observación de aves, un detox digital o simplemente el silencio. Te ayudaremos a planear una estancia inolvidable.',
    'reserve.contactForm': 'Envíanos un mensaje',
    'reserve.emailSubject': 'Consulta de Estadía — Wild on the Farm',
    'reserve.emailBody':
      'Hola,\n\nMe gustaría hospedarme en Wild on the Farm.\n\nFechas: desde ___ hasta ___\nNúmero de huéspedes:\nNacionalidad:\nNiños mayores de 12 años:\nActividades de interés:\nDieta especial:\nAlergias:\n\nGracias,',
    'journal.continueReading': 'Seguir Leyendo',
    'journal.moreFromJournal': 'Más del Diario.',
    'journal.allPosts': 'Todas las Publicaciones del Diario →',
    'medicalDisclaimer':
      'Esta información tiene fines educativos únicamente y refleja usos tradicionales y comúnmente documentados de esta planta. No constituye consejo médico ni sustituye la orientación de un profesional de la salud calificado. Consulta siempre a tu médico antes de usar cualquier planta con fines medicinales, especialmente si estás embarazada, en periodo de lactancia o tomando medicamentos.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];
