import { createFileRoute } from "@tanstack/react-router";
import { robotsTxt } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { getRequestUrl } = await import("@tanstack/react-start/server");
        const origin = getRequestUrl().origin;
        return new Response(robotsTxt(origin), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
