---
title: Dine
slug: dine
sections:
  - title:
      text: Dine
      color: text-light
      styles:
        self:
          textAlign: center
      type: TitleBlock
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding:
          - pt-80
          - pl-4
          - pb-80
          - pr-4
        alignItems: center
        flexDirection: row-reverse
        justifyContent: center
    type: GenericSection
    backgroundImage:
      type: BackgroundImage
      altText: altText of the image
      backgroundSize: cover
      backgroundPosition: center
      backgroundRepeat: no-repeat
      opacity: 100
      url: /images/dine.jpg
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
  - type: GenericSection
    actions:
      - label: View All
        altText: ''
        url: '/aboutus/#dine'
        style: secondary
        elementId: ''
        type: Link
      - label: View Some
        altText: ''
        url: '/aboutus/#dine-other'
        style: secondary
        elementId: ''
        type: Link
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
  - type: GenericSection
    title:
      text: Dine Amongst the Clouds
      color: text-dark
      type: TitleBlock
    text: >
      Sierra Mar restuarant sits high atop the cliffs of Big Sur, offering breathtaking views alongside inspired, artfully-prepared cuisine and a Wine Spectator Grand Award-winning wine list.
    media:
      url: /images/dine.jpg
      altText: Unblock your team boost your time to production preview
      elementId: ''
      type: ImageBlock
    badge:
      label: Dine
      color: text-primary
      type: Badge
    elementId: dine-other
    colors: bg-emerald-fg-light
    styles:
      self:
        alignItems: center
        flexDirection: row
        padding:
          - pr-32
  - type: GenericSection
    title:
      text: Dine Amongst the Clouds
      color: text-dark
      type: TitleBlock
    text: >
      Sierra Mar restuarant sits high atop the cliffs of Big Sur, offering breathtaking views alongside inspired, artfully-prepared cuisine and a Wine Spectator Grand Award-winning wine list.
    media:
      url: /images/finca.jpeg
      altText: Unblock your team boost your time to production preview
      elementId: ''
      goesLast: true
      type: ImageBlock
    badge:
      label: Dine
      color: text-primary
      type: Badge
    elementId: 'dine'
    colors: bg-orange-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: row
        padding:
          - pl-32
seo:
  metaTitle: Dine - The Ranch
  metaDescription: This is the pricing page built with Netlify Create.
  socialImage: /images/main-hero.jpg
  type: Seo
type: PageLayout
---
