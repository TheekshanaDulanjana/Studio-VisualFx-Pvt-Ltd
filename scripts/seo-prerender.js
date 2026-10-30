// Vite plugin: after `vite build`, writes one static HTML file per route
// (dist/about/index.html, dist/film-gallery/index.html, …) with that page's
// own <title>, description, canonical, Open Graph tags and real, crawlable
// text inside #root. React replaces that text the moment the app loads, so
// visitors see the normal site - but search engines and link previews get a
// complete page without having to run JavaScript.
import fs from "node:fs";
import path from "node:path";
import { SITE, PAGES } from "../src/seo/seo.config.js";
import { FAQS, FILMS, STATS } from "../src/data/studio.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NAV = `
<nav aria-label="Main">
  <a href="/">Home</a> ·
  <a href="/about">About Sasanka Dulanjana</a> ·
  <a href="/film-gallery">Wedding Films</a> ·
  <a href="/commercial">Commercial &amp; Music Videos</a> ·
  <a href="/#contact">Contact</a>
</nav>`;

const CONTACT = `
<p>Book Studio VisualFX: call <a href="tel:+94776996981">+94 77 699 6981</a>,
WhatsApp <a href="https://wa.me/94776996981">+94 77 699 6981</a> or email
<a href="mailto:svisualfx@gmail.com">svisualfx@gmail.com</a>.</p>`;

const BODY = {
  "/": `
<p>Studio VisualFX is a Matara-based video production studio creating cinematic wedding films, event coverage, music videos and commercial productions for clients across Sri Lanka. With a passion for storytelling, we bring your vision to life.</p>
<h2>Wedding Videography in Matara, Colombo &amp; Across Sri Lanka</h2>
<p>Led by director Sasanka Dulanjana, Studio VisualFX films weddings, pre-wedding shoots, events, music videos and commercials in Matara, Colombo and all over the island.</p>
<h2>Our Services</h2>
<ul>
  <li>Creative Wedding Films</li><li>Event Coverage</li><li>Commercial Productions</li><li>Music Videos</li>
</ul>
<p>${STATS.map((s) => `${esc(s.value)} ${esc(s.label)}`).join(" · ")}</p>
<h2>Frequently Asked Questions</h2>
${FAQS.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("\n")}`,
  "/about": `
<p>With over 7 years of experience in visual storytelling, Studio VisualFX (Pvt) Ltd. has completed 150+ projects across weddings, events, music videos and commercial productions.</p>
<h2>Sasanka Dulanjana - Visionary Director and Creative Storyteller</h2>
<p>Mr. Sasanka Dulanjana is the driving creative force behind Studio VisualFX (Pvt) Ltd., bringing over 10 years of experience in visual storytelling to every project.</p>`,
  "/film-gallery": `
<p>Explore cinematic wedding films by Studio VisualFX, each crafted with creativity, passion, and precision.</p>
<ul>
${FILMS.map((f) => `  <li><a href="${esc(f.link)}">${esc(f.coupleName)} - Wedding Film</a></li>`).join("\n")}
</ul>`,
  "/commercial": `
<p>Commercial videography, brand and promotional videos, music video production and social media reels by Studio VisualFX.</p>`,
};

function setTag(html, re, replacement) {
  return re.test(html) ? html.replace(re, replacement) : html.replace("</head>", `  ${replacement}\n</head>`);
}

export default function seoPrerender() {
  let outDir = "dist";
  return {
    name: "seo-prerender",
    apply: "build",
    configResolved(cfg) {
      outDir = path.resolve(cfg.root, cfg.build.outDir);
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

      for (const [route, page] of Object.entries(PAGES)) {
        const url = route === "/" ? `${SITE.url}/` : `${SITE.url}${route}`;
        let html = template;

        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
        html = setTag(html, /<meta data-rh="true" name="description"[^>]*>/, `<meta data-rh="true" name="description" content="${esc(page.description)}" />`);
        html = setTag(html, /<meta data-rh="true" name="robots"[^>]*>/, `<meta data-rh="true" name="robots" content="${esc(page.robots)}" />`);
        html = setTag(html, /<meta data-rh="true" property="og:title"[^>]*>/, `<meta data-rh="true" property="og:title" content="${esc(page.ogTitle || page.title)}" />`);
        html = setTag(html, /<meta data-rh="true" property="og:description"[^>]*>/, `<meta data-rh="true" property="og:description" content="${esc(page.description)}" />`);
        html = setTag(html, /<meta data-rh="true" name="twitter:title"[^>]*>/, `<meta data-rh="true" name="twitter:title" content="${esc(page.ogTitle || page.title)}" />`);
        html = setTag(html, /<meta data-rh="true" name="twitter:description"[^>]*>/, `<meta data-rh="true" name="twitter:description" content="${esc(page.description)}" />`);
        html = html.replace(
          "</head>",
          `  <link data-rh="true" rel="canonical" href="${url}" />\n  <meta data-rh="true" property="og:url" content="${url}" />\n</head>`
        );

        const content = `
<div class="seo-static" style="max-width:72rem;margin:0 auto;padding:7rem 1.5rem 3rem;color:#fff;font-family:Roboto,sans-serif;line-height:1.6">
<h1 style="font-family:Belleza,sans-serif">${esc(page.h1 || page.title)}</h1>
${BODY[route] || `<p>${esc(page.description)}</p>`}
${CONTACT}
${NAV}
</div>`;
        html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);

        const file = route === "/" ? path.join(outDir, "index.html") : path.join(outDir, route.slice(1), "index.html");
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
      }
    },
  };
}
