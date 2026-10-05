import { defaultLocale, type Locale } from '../i18n/ui';

// =============================================================================
// THE JOURNAL'S SECTIONS — the one place a section is declared.
//
// To open a new section:
//   1. Add its key to JOURNAL_SECTION_KEYS below (the order here is the order
//      on the journal index and in the nav menu).
//   2. Add its block to `journalSections`: slug, hero image, and the copy in
//      each language.
//   3. Put `section: <key>` in the frontmatter of the articles that belong
//      to it.
// Everything else follows from this file: the section's page in all four
// languages, its entry in the Journal nav menu, the language switcher, the
// sitemap, the "See all" link on the journal index, the footer link on each
// article, and the list of values `section:` accepts in content.config.ts.
// =============================================================================

export const JOURNAL_SECTION_KEYS = ['what-we-grow', 'farm-notes', 'travel-panama'] as const;

export type JournalSectionKey = (typeof JOURNAL_SECTION_KEYS)[number];

export const JOURNAL_SECTION_ORDER: readonly JournalSectionKey[] = JOURNAL_SECTION_KEYS;

// Sub-headings a section page can sort its articles under. An article opts in
// with `group: <key>` in its frontmatter; a section lists the groups it uses
// (and their order) in its `groups` below. To add a sub-heading: add its key
// here, add it to a section's `groups`, and tag the articles.
export const JOURNAL_GROUP_KEYS = ['vegetables', 'wild-plants', 'herbs', 'fruits', 'flowers'] as const;

export type JournalGroupKey = (typeof JOURNAL_GROUP_KEYS)[number];

interface GroupDef {
  key: JournalGroupKey;
  label: Record<Locale, string>;
}

/** How many of a section's latest articles the journal index previews before "See all". */
export const JOURNAL_PREVIEW_COUNT = 3;

interface SectionCopy {
  /** Short section name — eyebrow label, and the name used in links to the section page. */
  label: string;
  /** Even shorter name for the Journal dropdown in the nav. */
  navLabel: string;
  /** The section's display heading (also the section page's h1). */
  heading: string;
  /** One-sentence teaser shown under the heading on the journal index. */
  teaser: string;
  /** Fuller intro shown as the section page's pull intro. */
  intro: string;
  /** Search-result title for the section page, written around what people search for. */
  seoTitle: string;
  /** Search-result description for the section page (~150 characters). */
  seoDescription: string;
  /** Alt text for the section page's hero image. */
  heroAlt: string;
}

interface SectionDef {
  /** The section page's URL segment per language: /journal/<slug>/, /fr/journal/<slug>/, … Must
   *  not collide with an article's filename in that language. Japanese mirrors English. */
  slug: Record<Locale, string>;
  /** Hero image, as a path for lib/images' img(). */
  heroImage: string;
  /** Which slice of the hero photo to show (CSS background-position); middle if omitted. */
  heroFocus?: string;
  /** Optional sub-headings, in display order. When set, the section page lists its
   *  articles under these instead of in one grid; a group with no published article
   *  yet is simply not shown. */
  groups?: GroupDef[];
  /** Heading for this section's articles that carry no `group` (shown last). */
  ungroupedLabel?: Record<Locale, string>;
  /** Links highlighted at the top of the section page — to an article filed under
   *  another section, or straight to one chapter of it. */
  featuredLinks?: { label: Record<Locale, string>; href: Record<Locale, string> }[];
  copy: Record<Locale, SectionCopy>;
}

export const journalSections: Record<JournalSectionKey, SectionDef> = {
  'what-we-grow': {
    slug: { en: 'organic-garden', es: 'huerto-organico', fr: 'jardin-bio', ja: 'organic-garden' },
    heroImage: 'journal/permaculture/garden-bed-fennel-marigolds.jpg',
    groups: [
      { key: 'vegetables', label: { en: 'Vegetables', fr: 'Légumes', es: 'Verduras', ja: '野菜' } },
      { key: 'wild-plants', label: { en: 'Wild Plants', fr: 'Plantes Sauvages', es: 'Plantas Silvestres', ja: '野草' } },
      {
        key: 'herbs',
        label: {
          en: 'Medicinal & Aromatic Plants',
          fr: 'Plantes Médicinales et Aromatiques',
          es: 'Plantas Medicinales y Aromáticas',
          ja: '薬草とハーブ',
        },
      },
      { key: 'fruits', label: { en: 'Fruits', fr: 'Fruits', es: 'Frutas', ja: '果物' } },
      { key: 'flowers', label: { en: 'Flowers', fr: 'Fleurs', es: 'Flores', ja: '花' } },
    ],
    ungroupedLabel: {
      en: 'Garden Stories & Recipes',
      fr: 'Récits et Recettes du Jardin',
      es: 'Relatos y Recetas del Huerto',
      ja: '菜園の物語とレシピ',
    },
    copy: {
      en: {
        label: 'Our Permaculture and Organic Garden',
        navLabel: 'Organic Garden',
        heading: 'Our guide to growing organic vegetables and fruits, and their nutritional properties.',
        teaser:
          'Plant profiles covering medicinal and therapeutic properties, culinary interest, and how to grow each one yourself — plus the bigger stories behind what comes out of this farm.',
        intro:
          'The organic vegetables and fruits, medicinal and aromatic plants, and flowers we grow in permaculture at 1,800 metres, in the cloud forest above Boquete. For each one: what it’s good for, how to eat it, and how to grow it yourself without chemical inputs.',
        seoTitle: 'Organic Vegetables & Permaculture Garden in Boquete',
        seoDescription:
          'Organic vegetables, herbs and medicinal plants grown in permaculture at 1,800 m in Boquete, Panama: benefits, how to eat them, and how to grow each one.',
        heroAlt: 'A terraced garden bed of fennel, parsley, lettuce and marigolds at Wild on the Farm',
      },
      fr: {
        label: 'Notre Jardin en Permaculture et Bio',
        navLabel: 'Jardin Bio',
        heading: 'Notre guide de culture bio des légumes et des fruits, et de leurs propriétés alimentaires.',
        teaser:
          'Fiches de plantes avec leurs propriétés médicinales et thérapeutiques, leurs usages culinaires, et comment les cultiver vous-même.',
        intro:
          'Les légumes et les fruits bio, les plantes médicinales et aromatiques et les fleurs que nous cultivons en permaculture à 1 800 mètres, dans la forêt nébuleuse au-dessus de Boquete. Pour chacun : ses bienfaits, comment le manger, et comment le cultiver vous-même sans intrants chimiques.',
        seoTitle: 'Légumes Bio et Jardin en Permaculture à Boquete',
        seoDescription:
          'Légumes bio, herbes et plantes médicinales cultivés en permaculture à 1 800 m à Boquete, Panama : bienfaits, comment les manger et comment les cultiver.',
        heroAlt: 'Une planche en terrasse de fenouil, persil, laitues et soucis à Wild on the Farm',
      },
      es: {
        label: 'Nuestro Huerto Orgánico en Permacultura',
        navLabel: 'Huerto Orgánico',
        heading: 'Nuestra guía de cultivo orgánico de verduras y frutas, y sus propiedades alimenticias.',
        teaser:
          'Perfiles de plantas con sus propiedades medicinales y terapéuticas, usos culinarios, y cómo cultivarlas tú mismo.',
        intro:
          'Las verduras y frutas orgánicas, las plantas medicinales y aromáticas y las flores que cultivamos en permacultura a 1.800 metros, en el bosque nuboso sobre Boquete. De cada una: para qué sirve, cómo comerla y cómo cultivarla tú mismo sin insumos químicos.',
        seoTitle: 'Verduras Orgánicas y Huerto en Permacultura en Boquete',
        seoDescription:
          'Verduras orgánicas, hierbas y plantas medicinales cultivadas en permacultura a 1.800 m en Boquete, Panamá: beneficios, cómo comerlas y cómo cultivarlas.',
        heroAlt: 'Un bancal en terraza con hinojo, perejil, lechugas y caléndulas en Wild on the Farm',
      },
      ja: {
        label: 'パーマカルチャーとオーガニックの菜園',
        navLabel: 'オーガニック菜園',
        heading: 'オーガニックの野菜と果物の育て方、そしてその栄養・効能のガイド。',
        teaser:
          '薬用・療法的な効能、料理としての魅力、そして自分で育てる方法まで——この農園から生まれるものの背景にある、より大きな物語とともにお届けする植物図鑑です。',
        intro:
          'ボケテを見下ろす標高1,800メートルの雲霧林で、パーマカルチャーによって育てているオーガニックの野菜と果物、薬草とハーブ、そして花。それぞれの効能、食べ方、そして化学資材を使わずに自分で育てる方法をご紹介します。',
        seoTitle: 'ボケテのオーガニック野菜とパーマカルチャー菜園',
        seoDescription:
          'パナマ・ボケテの標高1,800mで、パーマカルチャーで育てるオーガニックの野菜、ハーブ、薬草。効能、食べ方、育て方をご紹介します。',
        heroAlt: 'Wild on the Farmの段々畑に育つフェンネル、パセリ、レタス、マリーゴールド',
      },
    },
  },
  'farm-notes': {
    slug: { en: 'boquete-guide', es: 'guia-de-boquete', fr: 'guide-de-boquete', ja: 'boquete-guide' },
    heroImage: 'farm/lodges_cloud_forest.jpg',
    // Framed high: the sky and the forested ridge above both lodges.
    heroFocus: 'center 20%',
    copy: {
      en: {
        label: 'Boquete Guide',
        navLabel: 'Boquete Guide',
        heading: 'History and life in the mountains.',
        teaser:
          'Travel guides, local history, trail conditions, Qi Gong and wellness, and whatever else is worth sharing from the farm.',
        intro:
          'A guide to Boquete written from inside its cloud forest: the hiking trails and Volcán Barú, hot springs, coffee, birds and wildlife, the valley’s history, and practical advice for getting here and getting around.',
        seoTitle: 'Boquete Guide: Hiking, History, Coffee & Things to Do',
        seoDescription:
          'A local guide to Boquete, Panama: hiking trails, Volcán Barú, hot springs, coffee, birdwatching, history, and practical travel tips from the cloud forest.',
        heroAlt: 'The green-roofed lodges of Wild on the Farm, beneath the cloud forest above Boquete',
      },
      fr: {
        label: 'Guide de Boquete',
        navLabel: 'Guide de Boquete',
        heading: 'Histoire et vie dans la montagne.',
        teaser:
          "Guides de voyage, histoire locale, état des sentiers, et tout ce qui mérite d'être partagé depuis la ferme.",
        intro:
          "Un guide de Boquete écrit depuis sa forêt nébuleuse : les sentiers de randonnée et le volcan Barú, les sources chaudes, le café, les oiseaux et la faune, l'histoire de la vallée, et des conseils pratiques pour venir et se déplacer.",
        seoTitle: 'Guide de Boquete : Randonnée, Histoire, Café et Activités',
        seoDescription:
          'Un guide local de Boquete, Panama : sentiers de randonnée, volcan Barú, sources chaudes, café, oiseaux, histoire et conseils pratiques depuis la forêt nébuleuse.',
        heroAlt: 'Les lodges au toit végétal de Wild on the Farm, au pied de la forêt nébuleuse au-dessus de Boquete',
      },
      es: {
        label: 'Guía de Boquete',
        navLabel: 'Guía de Boquete',
        heading: 'Historia y vida en la montaña.',
        teaser:
          'Guías de viaje, historia local, condiciones de senderos, y lo que valga la pena compartir desde la finca.',
        intro:
          'Una guía de Boquete escrita desde su bosque nuboso: los senderos y el Volcán Barú, las aguas termales, el café, las aves y la fauna, la historia del valle, y consejos prácticos para llegar y moverse.',
        seoTitle: 'Guía de Boquete: Senderismo, Historia, Café y Qué Hacer',
        seoDescription:
          'Una guía local de Boquete, Panamá: senderos, Volcán Barú, aguas termales, café, aves, historia y consejos prácticos de viaje desde el bosque nuboso.',
        heroAlt: 'Los lodges con techo verde de Wild on the Farm, al pie del bosque nuboso sobre Boquete',
      },
      ja: {
        label: 'ボケテガイド',
        navLabel: 'ボケテガイド',
        heading: '山の歴史と暮らし。',
        teaser:
          '旅行ガイド、地域の歴史、小道の状況、気功とウェルネス、そして農園から分かち合う価値のあるあらゆること。',
        intro:
          '雲霧林のなかから綴るボケテのガイド。ハイキングコースとバルー火山、温泉、コーヒー、野鳥と野生動物、谷の歴史、そしてアクセスや現地での移動に役立つ実用的な情報をお届けします。',
        seoTitle: 'ボケテガイド：ハイキング、歴史、コーヒー、見どころ',
        seoDescription:
          'パナマ・ボケテの現地ガイド。ハイキングコース、バルー火山、温泉、コーヒー、バードウォッチング、歴史、旅の実用情報を雲霧林からお届けします。',
        heroAlt: 'ボケテを見下ろす雲霧林のふもとに建つ、Wild on the Farmの草屋根のロッジ',
      },
    },
  },
  'travel-panama': {
    slug: { en: 'panama-travel', es: 'viajar-por-panama', fr: 'voyager-au-panama', ja: 'panama-travel' },
    heroImage: 'journal/san-blas/san_blas_hero.jpg',
    copy: {
      en: {
        label: 'Travel Panama',
        navLabel: 'Travel Panama',
        heading: 'Stories and guides from beyond Boquete.',
        teaser:
          'Experiences and travel notes from across the country — not just the farm, but the rest of wild Panama.',
        intro:
          'Travel stories and guides from across Panama: the San Blas islands of Guna Yala, the Darién and its Emberá villages, the country’s snakes and wildlife, and honest advice on travelling safely.',
        seoTitle: 'Panama Travel Guides: San Blas, Darién & Beyond',
        seoDescription:
          'Travel stories and guides from across Panama: the San Blas islands of Guna Yala, the Darién and the Emberá, wildlife, and practical safety advice.',
        heroAlt: 'A Guna sailing canoe off the San Blas islands, Panama',
      },
      fr: {
        label: 'Voyager au Panama',
        navLabel: 'Voyager au Panama',
        heading: 'Histoires et guides au-delà de Boquete.',
        teaser:
          'Expériences et carnets de voyage à travers tout le pays — pas seulement la ferme, mais le reste du Panama sauvage.',
        intro:
          'Récits et guides de voyage à travers le Panama : les îles San Blas de Guna Yala, le Darién et ses villages Emberá, les serpents et la faune du pays, et des conseils sincères pour voyager en sécurité.',
        seoTitle: 'Voyager au Panama : San Blas, Darién et Au-delà',
        seoDescription:
          'Récits et guides de voyage à travers le Panama : les îles San Blas de Guna Yala, le Darién et les Emberá, la faune, et des conseils pratiques de sécurité.',
        heroAlt: 'Une pirogue à voile guna au large des îles San Blas, Panama',
      },
      es: {
        label: 'Viajes por Panamá',
        navLabel: 'Viajes por Panamá',
        heading: 'Historias y guías más allá de Boquete.',
        teaser:
          'Experiencias y notas de viaje por todo el país — no solo la finca, sino el resto del Panamá salvaje.',
        intro:
          'Relatos y guías de viaje por todo Panamá: las islas de San Blas en Guna Yala, el Darién y sus aldeas Emberá, las serpientes y la fauna del país, y consejos sinceros para viajar con seguridad.',
        seoTitle: 'Viajar por Panamá: San Blas, Darién y Más Allá',
        seoDescription:
          'Relatos y guías de viaje por Panamá: las islas de San Blas en Guna Yala, el Darién y los Emberá, la fauna, y consejos prácticos de seguridad.',
        heroAlt: 'Un cayuco de vela guna frente a las islas de San Blas, Panamá',
      },
      ja: {
        label: 'パナマを旅する',
        navLabel: 'パナマを旅する',
        heading: 'ボケテの先にある、物語とガイド。',
        teaser:
          'この国全体からの体験談と旅の記録——農園だけでなく、野生に満ちたパナマのその他の土地についても。',
        intro:
          'パナマ各地からの旅の物語とガイド。グナ・ヤラのサン・ブラス諸島、ダリエンとエンベラの村々、この国のヘビや野生動物、そして安全に旅するための率直なアドバイスをお届けします。',
        seoTitle: 'パナマ旅行ガイド：サン・ブラス、ダリエン、その先へ',
        seoDescription:
          'パナマ各地の旅の物語とガイド。グナ・ヤラのサン・ブラス諸島、ダリエンとエンベラ、野生動物、そして安全に旅するための実用的なアドバイス。',
        heroAlt: 'パナマ、サン・ブラス諸島沖を進むグナ族の帆掛けカヌー',
      },
    },
  },
};

/** UI strings shared by the journal index and the section pages. */
export const journalUi: Record<
  Locale,
  { eyebrow: string; plantProfile: string; readMore: string; seeAll: (count: number, label: string) => string; otherSections: string; allSections: string; backToJournal: string }
> = {
  en: {
    eyebrow: 'The Journal',
    plantProfile: 'Plant Profile',
    readMore: 'Read more →',
    seeAll: (n, label) => `See all ${n} articles in ${label} →`,
    otherSections: 'Keep Exploring',
    allSections: 'More from the Journal.',
    backToJournal: 'The Journal →',
  },
  fr: {
    eyebrow: 'Le Journal',
    plantProfile: 'Fiche Plante',
    readMore: 'Lire la suite →',
    seeAll: (n, label) => `Voir les ${n} articles de « ${label} » →`,
    otherSections: 'Continuer la Lecture',
    allSections: "Plus d'articles du Journal.",
    backToJournal: 'Le Journal →',
  },
  es: {
    eyebrow: 'El Diario',
    plantProfile: 'Perfil de Planta',
    readMore: 'Leer más →',
    seeAll: (n, label) => `Ver los ${n} artículos de «${label}» →`,
    otherSections: 'Seguir Leyendo',
    allSections: 'Más del Diario.',
    backToJournal: 'El Diario →',
  },
  ja: {
    eyebrow: '日誌',
    plantProfile: '植物図鑑',
    readMore: '続きを読む →',
    seeAll: (n, label) => `「${label}」の記事${n}件をすべて見る →`,
    otherSections: '続きを読む',
    allSections: '日誌から、その他の記事。',
    backToJournal: '日誌 →',
  },
};

/** The section page's URL in a given locale. */
export function journalSectionHref(section: JournalSectionKey, locale: Locale): string {
  const slug = journalSections[section].slug[locale];
  return locale === defaultLocale ? `/journal/${slug}/` : `/${locale}/journal/${slug}/`;
}

/** The section whose page lives at this slug in this locale, if any. */
export function journalSectionForSlug(slug: string, locale: Locale): JournalSectionKey | undefined {
  return JOURNAL_SECTION_KEYS.find((key) => journalSections[key].slug[locale] === slug);
}

/** One pageTranslations.ts-shaped entry per section page, so the language switcher and hreflang work. */
export const journalSectionPages = JOURNAL_SECTION_KEYS.map((key) => ({
  id: `journal-${key}`,
  en: journalSectionHref(key, 'en'),
  es: journalSectionHref(key, 'es'),
  fr: journalSectionHref(key, 'fr'),
  ja: journalSectionHref(key, 'ja'),
}));
