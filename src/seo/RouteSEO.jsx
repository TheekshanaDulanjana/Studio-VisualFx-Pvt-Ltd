import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE, PAGES } from "./seo.config";
import { FAQS, FILMS } from "../data/studio";

const normalize = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export default function RouteSEO() {
  const { pathname } = useLocation();
  const path = normalize(pathname);
  const page = PAGES[path];

  // Unknown URL: keep it out of the index and don't declare a canonical.
  if (!page) {
    return (
      <Helmet>
        <title>{`Page Not Found - ${SITE.name}`}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
    );
  }

  const url = path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;

  const graph = [
    {
      "@type": page.schemaType,
      "@id": `${url}#webpage`,
      url,
      name: page.ogTitle || page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#business` },
      inLanguage: "en-LK",
    },
  ];

  // Page-specific structured data
  if (path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  if (path === "/about") {
    graph[0].mainEntity = { "@id": `${SITE.url}/#sasanka-dulanjana` };
  }

  if (path === "/film-gallery") {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#films`,
      name: "Wedding films by Studio VisualFX",
      itemListElement: FILMS.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${f.coupleName} - Wedding Film`,
        url: f.link,
      })),
    });
  }

  if (path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: url },
      ],
    });
  }

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={page.robots} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={page.ogTitle || page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE.ogImage} />
      <meta property="og:image:width" content={SITE.ogImageWidth} />
      <meta property="og:image:height" content={SITE.ogImageHeight} />
      <meta property="og:image:alt" content={SITE.ogImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.ogTitle || page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={SITE.ogImage} />
      <meta name="twitter:image:alt" content={SITE.ogImageAlt} />

      <script type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}
      </script>
    </Helmet>
  );
}