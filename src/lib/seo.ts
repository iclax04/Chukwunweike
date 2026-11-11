import { ADDRESS, PRODUCTS, WHATSAPP } from "@/lib/catalog";

export const SITE_NAME = "Chukwunweike Phone Accessories & Gadgets";

export const SITE_DESCRIPTION =
  "Original iPhones, Samsung Galaxy phones, PlayStation 5 consoles and games, and gadgets at Shop 3, City View Mall, Nnebisi Road, Asaba. Ask on WhatsApp. No prices listed online.";

const MAPS_QUERY = encodeURIComponent(
  "Shop 3, City View Mall, Nnebisi Road, opposite Konwea Plaza, Asaba, Delta State, Nigeria",
);

export function mapsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
}

export function structuredData(origin: string) {
  const page = `${origin}/`;
  const images = [
    `${origin}/catalog/shop.jpg`,
    ...PRODUCTS.map((product) => `${origin}${product.image}`),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${page}#website`,
        url: page,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-NG",
        publisher: { "@id": `${page}#store` },
      },
      {
        "@type": ["MobilePhoneStore", "LocalBusiness"],
        "@id": `${page}#store`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: page,
        image: images,
        telephone: `+${WHATSAPP}`,
        currenciesAccepted: "NGN",
        address: {
          "@type": "PostalAddress",
          streetAddress: `${ADDRESS.shop}, ${ADDRESS.street}`,
          addressLocality: "Asaba",
          addressRegion: "Delta",
          addressCountry: "NG",
        },
        hasMap: mapsUrl(),
        areaServed: {
          "@type": "City",
          name: "Asaba",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${WHATSAPP}`,
          contactType: "customer service",
          availableLanguage: ["English"],
          areaServed: "NG",
        },
        sameAs: [`https://wa.me/${WHATSAPP}`],
      },
      {
        "@type": "ItemList",
        "@id": `${page}#collection`,
        name: "Phones, games, and gadgets",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          description: product.blurb,
          url: `${page}#${product.id}`,
          image: `${origin}${product.image}`,
        })),
      },
    ],
  };
}

export function jsonLd(origin: string) {
  return JSON.stringify(structuredData(origin)).replace(/</g, "\\u003c");
}

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&" + "amp;")
    .replaceAll("<", "&" + "lt;")
    .replaceAll(">", "&" + "gt;")
    .replaceAll('"', "&" + "quot;");
}

export function robotsTxt(origin: string) {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: Googlebot-Image",
    "Allow: /",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");
}

export function sitemapXml(origin: string) {
  const images = [
    { loc: `${origin}/catalog/shop.jpg`, title: "Chukwunweike shop display" },
    ...PRODUCTS.map((product) => ({
      loc: `${origin}${product.image}`,
      title: product.name,
    })),
  ]
    .map(
      (image) =>
        `    <image:image>\n      <image:loc>${xmlEscape(image.loc)}</image:loc>\n      <image:title>${xmlEscape(image.title)}</image:title>\n    </image:image>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${xmlEscape(`${origin}/`)}</loc>
    <lastmod>2026-11-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${images}
  </url>
</urlset>
`;
}
