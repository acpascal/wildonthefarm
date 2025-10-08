---
title: Séjour
slug: sejour
sections:
  - styles:
      self:
        padding:
          - pt-100vh
          - px-4
    type: GenericSection
    backgroundImage:
      type: BackgroundImage
      altText: Texte alternatif de l'image
      backgroundSize: cover
      backgroundPosition: center
      backgroundRepeat: no-repeat
      opacity: 100
      url: /images/stay.jpg
  - type: GenericSection
    media:
      url: /images/logo.png
      altText: Aperçu de la fonctionnalité amusante
      type: ImageBlock
    text: >
      Échappez au quotidien et reconnectez-vous avec vous-même au milieu d'une beauté naturelle inégalée. Nos trois cabanes exquises offrent un sanctuaire pour votre bien-être, semblant suspendues au-dessus d'un panorama à couper le souffle. Nichées dans la tranquillité enveloppante de la forêt de nuages, vos sens seront apaisés par les sons doux et omniprésents de la nature.

      Chaque cabane est un témoignage d'un artisanat durable, construit avec un profond respect pour son environnement. L'extérieur met en valeur la remarquable solidité et durabilité de l'Amargo-amargo, un bois tropical exceptionnellement dur, tandis que l'intérieur est revêtu de bois tropicaux plus doux, créant une atmosphère chaleureuse, accueillante et naturellement saine.

      Ici, au cœur de la nature sauvage, nous offrons un séjour exceptionnel qui allie confort authentique et luxe réparateur et chaleureux. Plongez dans un sommeil profond et régénérant sur nos matelas soigneusement sélectionnés, enveloppés de draps doux et de haute qualité. Chaque petit détail, des matériaux naturels aux commodités réfléchies, a été conçu pour que votre séjour soit imprégné de bonheur et de relaxation profonde.
    colors: bg-lime-fg-light
    styles:
      self:
        padding:
          - pb-16
          - pt-16
          - pl-16
          - pr-16
        justifyContent: center
        flexDirection: col
      subtitle:
        textAlign: center
  - title:
      text: Visite Vidéo
      color: text-black
      styles:
        self:
          textAlign: center
      type: TitleBlock
    media:
      title: Titre de la vidéo
      url: https://youtu.be/bk39qkZrv5I
      controls: false
      aspectRatio: '16:9'
      goesLast: true
      styles:
        self:
          borderColor: border-black
          borderStyle: solid
          borderWidth: 16
      type: VideoBlock
      autoplay: false
      loop: true
      muted: false
    colors: bg-light-fg-dark
    styles:
      self:
        flexDirection: col
        justifyContent: center
    type: GenericSection
  - title:
      text: Galerie
      color: text-black
      styles:
        self:
          textAlign: center
      type: TitleBlock
    items:
      - image:
          url: /images/exterior-1.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
      - image:
          url: /images/interior-1.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
      - image:
          url: /images/bathroom-1.png
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
      - image:
          url: /images/balcony-1.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
      - image:
          url: /images/exterior-2.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/exterior-3.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/interior-2.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/interior-3.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/interior-4.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/bathroom-2.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/bathroom-3.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/balcony-2.jpg
          altText: Image de remplacement
          type: ImageBlock
          styles:
            self:
              borderColor: 'border-black'
              borderStyle: 'solid'
              borderWidth: 16
        colors: bg-light-fg-dark
        type: FeaturedItem
    variant: two-col-grid
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding:
          - pt-16
          - pl-8
          - pb-16
          - pr-8
        justifyContent: center
      subtitle:
        textAlign: center
    type: FeaturedItemsSection
seo:
  metaTitle: Séjour
  metaDescription: Séjournez dans nos cabanes artisanales au milieu des panoramas de la forêt de nuages—confort luxueux, design durable et solitude réparatrice pour une retraite d'une semaine.
  socialImage: /images/stay.jpg
  type: Seo
type: PageLayout
---
