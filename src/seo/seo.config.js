// Central SEO config — one place to edit titles, descriptions and indexing rules.
export const SITE = {
  url: "https://www.studiovisualfx.com",
  name: "Studio VisualFX",
  locale: "en_LK",
  ogImage: "https://www.studiovisualfx.com/livepreview.jpg",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  ogImageAlt: "Studio VisualFX - wedding, event and commercial videography in Sri Lanka",
};

const INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const PAGES = {
  "/": {
    title: "Studio VisualFX | Wedding Videography & Photography Sri Lanka",
    description:
      "Wedding videographer & photographer in Sri Lanka. Cinematic wedding films, event coverage, music videos and commercial video production from Matara to Colombo.",
    schemaType: "WebPage",
    robots: INDEX,
  },
  "/about": {
    title: "About Studio VisualFX | Cinematic Videography Team",
    description:
      "Meet Studio VisualFX, a Matara-based video production team led by Sasanka Dulanjana, with 7+ years of experience in wedding films, events and commercials.",
    schemaType: "AboutPage",
    breadcrumb: "About",
    robots: INDEX,
  },
  "/film-gallery": {
    title: "Wedding Films Portfolio | Studio VisualFX Sri Lanka",
    description:
      "Cinematic wedding films and wedding videography across Sri Lanka, including Matara and Colombo. Watch recent highlight films and reserve your date.",
    schemaType: "CollectionPage",
    breadcrumb: "Wedding Films",
    robots: INDEX,
  },
  "/commercial": {
    title: "Commercial & Music Video Production | Studio VisualFX",
    description:
      "Commercial videography, brand and promotional videos, music video production and social media reels in Sri Lanka by Studio VisualFX.",
    schemaType: "WebPage",
    breadcrumb: "Commercial & Music Videos",
    robots: INDEX,
  },
  "/privacy-policy": {
    title: "Privacy Policy | Studio VisualFX",
    description: "How Studio VisualFX collects, uses and protects your personal information.",
    schemaType: "WebPage",
    breadcrumb: "Privacy Policy",
    robots: "noindex, follow",
  },
  "/terms-conditions": {
    title: "Terms & Conditions | Studio VisualFX",
    description: "Booking, payment and delivery terms for Studio VisualFX video and photography services.",
    schemaType: "WebPage",
    breadcrumb: "Terms & Conditions",
    robots: "noindex, follow",
  },
};

// Old sitemap URLs that were never real routes (they rendered Home). Send them to the matching section.
export const REDIRECTS = {
  "/testimonials": "/#testimonials",
  "/faq": "/#faq",
  "/contact": "/#contact",
};