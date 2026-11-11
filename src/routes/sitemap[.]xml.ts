import { createFileRoute } from "@tanstack/react-router";
import { sitemapXml } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { getRequestUrl } = await import("@tanstack/react-start/server");
        const origin = getRequestUrl().origin;
        return new Response(sitemapXml(origin), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
