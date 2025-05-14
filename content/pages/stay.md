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
      url: /images/logo-dark.svg
      altText: Fun feature preview
      type: ImageBlock
    subtitle: High atop the cliffs of Big Sur, the striking views and otherworldly serenity can’t help but stir your soul. Find your calm, and so much more.
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
      text: Spaces To Stir Your Imagination
      color: text-primary
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: View Our Cabins
    items:
      - title: Exterior
        tagline: This is the tagline
        subtitle: This is the item subtitle
        text: |
          Follow the tutorial to build your first Netlify Create site.
        image:
          url: /images/exterior-1.jpg
          altText: Placeholder Image
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            flexDirection: col
        type: FeaturedItem
      - title: Interior
        tagline: This is the tagline
        subtitle: This is the item subtitle
        text: |
          Follow the tutorial to build your first awesome Netlify Create site.
        image:
          url: /images/interior-1.jpg
          altText: Placeholder image
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            flexDirection: col
        type: FeaturedItem
      - title: Bathroom
        tagline: This is the tagline
        subtitle: View
        text: |
          Learn from the tutorial and build your first awesome Netlify Create site.
        image:
          url: /images/bathroom-1.png
          altText: Placeholder image
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            flexDirection: col
        type: FeaturedItem
      - title: Balcony
        tagline: This is the tagline
        subtitle: View
        text: |
          Learn from the tutorial and build your first awesome Netlify Create site.
        image:
          url: /images/balcony-1.jpg
          altText: Placeholder image
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            flexDirection: col
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
  metaTitle: Stay - The Ranch
  metaDescription: This is the pricing page built with Netlify Create.
  socialImage: /images/main-hero.jpg
  type: Seo
type: PageLayout
---
