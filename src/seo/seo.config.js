// Central SEO config.
// title   = what shows in the browser tab (and Google uses it as the page title)
// ogTitle = longer, keyword-rich title for link previews when shared
// - one place to edit titles, descriptions and indexing rules.
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
    title: "Studio VisualFX", // browser tab
    ogTitle: "Wedding Videographer in Matara & Colombo | Studio VisualFX", // link previews (Facebook / WhatsApp / X)
    description:
      "Cinematic wedding videography & photography in Matara, Colombo and across Sri Lanka by Sasanka Dulanjana. Wedding films, events, music videos & commercials.",
    h1: "Studio VisualFX - Wedding Videography in Matara, Colombo & Sri Lanka",
    schemaType: "WebPage",
    robots: INDEX,
  },
  "/about": {
    title: "About - Studio VisualFX", // browser tab
    ogTitle: "Sasanka Dulanjana - Videographer & Director | Studio VisualFX", // link previews (Facebook / WhatsApp / X)
    description:
      "Meet Sasanka Dulanjana and Studio VisualFX, a Matara-based wedding videography and video production team with 7+ years of experience and 150+ projects.",
    h1: "About Sasanka Dulanjana & Studio VisualFX",
    schemaType: "AboutPage",
    breadcrumb: "About",
    robots: INDEX,
  },
  "/film-gallery": {
    title: "Our Films - Studio VisualFX", // browser tab
    ogTitle: "Wedding Films Sri Lanka - Matara & Colombo | Studio VisualFX", // link previews (Facebook / WhatsApp / X)
    description:
      "Watch cinematic wedding films by Studio VisualFX - wedding videography in Matara, Colombo and across Sri Lanka. See recent highlight films and reserve your date.",
    h1: "Wedding Films by Studio VisualFX",
    schemaType: "CollectionPage",
    breadcrumb: "Wedding Films",
    robots: INDEX,
  },
  "/commercial": {
    title: "Commercial - Studio VisualFX", // browser tab
    ogTitle: "Commercial & Music Video Production Sri Lanka | Studio VisualFX", // link previews (Facebook / WhatsApp / X)
    description:
      "Commercial videography, brand and promotional videos, music video production and social media reels in Matara, Colombo and across Sri Lanka by Studio VisualFX.",
    h1: "Commercial & Music Video Production",
    schemaType: "WebPage",
    breadcrumb: "Commercial & Music Videos",
    robots: INDEX,
  },
  "/privacy-policy": {
    title: "Privacy Policy - Studio VisualFX", // browser tab
    ogTitle: "Privacy Policy | Studio VisualFX", // link previews (Facebook / WhatsApp / X)
    description: "How Studio VisualFX collects, uses and protects your personal information.",
    schemaType: "WebPage",
    breadcrumb: "Privacy Policy",
    robots: "noindex, follow",
  },
  "/terms-conditions": {
    title: "Terms & Conditions - Studio VisualFX", // browser tab
    ogTitle: "Terms & Conditions | Studio VisualFX", // link previews (Facebook / WhatsApp / X)
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