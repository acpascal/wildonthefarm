export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
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
    'footer.faqsContact': 'FAQs & Contact',
    'footer.facebook': 'Facebook',
    'footer.instagram': 'Instagram',
    'footer.youtube': 'YouTube',
    'footer.copyright': '© 2026 Wild on the Farm — Boquete Cloud Forest Lodge, Panama. All rights reserved.',
    'footer.legalNotice': 'Legal Notice',
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
    'journal.copyrightNotice':
      'This article is © Wild on the Farm, Boquete Cloud Forest Lodge. All rights reserved — it may not be reproduced, republished, or redistributed without prior written permission.',
    'journal.legalNoticeLink': 'Read our full legal notice →',
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
    'footer.faqsContact': 'Preguntas Frecuentes y Contacto',
    'footer.facebook': 'Facebook',
    'footer.instagram': 'Instagram',
    'footer.youtube': 'YouTube',
    'footer.copyright': '© 2026 Wild on the Farm — Boquete Cloud Forest Lodge, Panamá. Todos los derechos reservados.',
    'footer.legalNotice': 'Aviso Legal',
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
    'journal.copyrightNotice':
      'Este artículo es © Wild on the Farm, Boquete Cloud Forest Lodge. Todos los derechos reservados — no puede reproducirse, republicarse ni redistribuirse sin autorización previa por escrito.',
    'journal.legalNoticeLink': 'Lee nuestro aviso legal completo →',
    'medicalDisclaimer':
      'Esta información tiene fines educativos únicamente y refleja usos tradicionales y comúnmente documentados de esta planta. No constituye consejo médico ni sustituye la orientación de un profesional de la salud calificado. Consulta siempre a tu médico antes de usar cualquier planta con fines medicinales, especialmente si estás embarazada, en periodo de lactancia o tomando medicamentos.',
  },
  fr: {
    'nav.farmAndStay': 'Découvrir',
    'nav.theFarm': 'La Ferme',
    'nav.stay': 'Le Lodge',
    'nav.kitchen': 'La Cuisine',
    'nav.garden': 'Le Jardin',
    'nav.ourStory': 'Notre Histoire',
    'nav.wildlife': 'Faune et Biodiversité',
    'nav.experience': 'Expérience',
    'nav.birdwatching': 'Observation des Oiseaux',
    'nav.hiking': 'Randonnée',
    'nav.journal': 'Journal',
    'nav.shop': 'Boutique',
    'nav.ratesRetreats': 'Tarifs et Retraites',
    'nav.reserve': 'Réserver',
    'footer.faqsContact': 'FAQ et Contact',
    'footer.facebook': 'Facebook',
    'footer.instagram': 'Instagram',
    'footer.youtube': 'YouTube',
    'footer.copyright': '© 2026 Wild on the Farm — Boquete Cloud Forest Lodge, Panama. Tous droits réservés.',
    'footer.legalNotice': 'Mentions Légales',
    'lightbox.close': 'Fermer',
    'lightbox.previous': 'Photo précédente',
    'lightbox.next': 'Photo suivante',
    'language.switch': 'Langue',
    'reserve.defaultHeading': 'Planifiez votre évasion dans les nuages.',
    'reserve.pitch':
      "Dites-nous quand vous aimeriez arriver et ce dont vous rêvez — observation des oiseaux, une déconnexion numérique, ou tout simplement le silence. Nous vous aiderons à organiser un séjour inoubliable.",
    'reserve.contactForm': 'Envoyez-nous un message',
    'reserve.emailSubject': 'Demande de Séjour — Wild on the Farm',
    'reserve.emailBody':
      'Bonjour,\n\nJe souhaiterais séjourner à Wild on the Farm.\n\nDates : du ___ au ___\nNombre de personnes :\nNationalité :\nEnfants de plus de 12 ans :\nActivités qui vous intéressent :\nRégime alimentaire particulier :\nAllergies :\n\nMerci,',
    'journal.continueReading': 'Continuer la Lecture',
    'journal.moreFromJournal': "Plus d'articles du Journal.",
    'journal.allPosts': 'Tous les Articles du Journal →',
    'journal.copyrightNotice':
      "Cet article est © Wild on the Farm, Boquete Cloud Forest Lodge. Tous droits réservés — il ne peut être reproduit, republié ou redistribué sans autorisation préalable écrite.",
    'journal.legalNoticeLink': 'Lire nos mentions légales complètes →',
    'medicalDisclaimer':
      "Ces informations sont fournies à titre éducatif uniquement et reflètent des usages traditionnels et communément documentés de cette plante. Elles ne constituent pas un avis médical et ne remplacent pas les conseils d'un professionnel de santé qualifié. Consultez toujours votre médecin avant d'utiliser une plante à des fins médicinales, en particulier en cas de grossesse, d'allaitement ou de prise de médicaments.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];
