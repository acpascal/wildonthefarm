---
title: Stay
slug: stay
sections:
  - styles:
      self:
        padding:
          - pt-100vh
          - px-4
    type: GenericSection
    backgroundImage:
      type: BackgroundImage
      altText: altText of the image
      backgroundSize: cover
      backgroundPosition: center
      backgroundRepeat: no-repeat
      opacity: 100
      url: /images/stay.jpg
  - type: GenericSection
    media:
      url: /images/logo.png
      altText: Fun feature preview
      type: ImageBlock
    text: >
      Escape the everyday and reconnect with yourself amidst unparalleled natural beauty. Our three exquisite cabins offer a sanctuary for your wellbeing, seemingly suspended above a breathtaking panorama. Nestled within the embracing tranquility of the cloud forest, your senses will be soothed by the gentle, ever-present sounds of nature.


      Each cabin is a testament to sustainable craftsmanship, built with a deep respect for its environment. The exterior features the remarkable strength and durability of Amargo-amargo, an exceptionally hard tropical wood, while the interior is lined with softer tropical woods, creating a warm, inviting, and naturally healthy atmosphere.


      Here, in the heart of the wild, we offer an exceptional stay that blends authentic comfort with cozy, restorative luxury. Sink into deep, rejuvenating sleep on our carefully selected mattresses, wrapped in soft, high-quality linens. Every small detail, from the natural materials to the thoughtful amenities, has been curated to ensure your stay is infused with happiness and profound relaxation.
    colors: bg-emerald-fg-light
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
      text: Video Tour
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    media:
      title: Title of the video
      url: https://youtu.be/bk39qkZrv5I
      controls: false
      aspectRatio: '16:9'
      goesLast: true
      styles:
        self:
          padding:
            - pt-2
            - pb-2
            - pl-2
            - pr-2
          borderColor: border-dark
          borderStyle: solid
          borderWidth: 1
          borderRadius: large
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
      text: Gallery
      color: text-primary
      styles:
        self:
          textAlign: center
      type: TitleBlock
    items:
      - image:
          url: /images/exterior-1.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
      - image:
          url: /images/interior-1.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
      - image:
          url: /images/bathroom-1.png
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
      - image:
          url: /images/balcony-1.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
      - image:
          url: /images/exterior-2.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/exterior-3.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/interior-2.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/interior-3.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/interior-4.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/bathroom-2.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/bathroom-3.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/balcony-2.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-light-fg-dark
        type: FeaturedItem
      - image:
          url: /images/balcony-3.jpg
          altText: Placeholder Image
          type: ImageBlock
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
  metaTitle: Stay - Boquete Cloud Forest Lodge
  metaDescription: This is the pricing page built with Netlify Create.
  socialImage: /images/main-hero.jpg
  type: Seo
type: PageLayout
---
