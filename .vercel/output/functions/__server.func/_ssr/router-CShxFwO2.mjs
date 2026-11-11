import { i as __toESM } from "../_runtime.mjs";
import { _ as createFileRoute, b as require_jsx_runtime, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, q as require_react, v as createRootRoute, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as __exportAll, i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CShxFwO2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-Dn8MmCV_.css";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Chukwunweike | Phones, Accessories & Gadgets in Asaba" },
			{
				name: "description",
				content: "Original iPhones, Samsung Galaxy phones, PlayStation 5 consoles and games, and gadgets at Shop 3, City View Mall, Nnebisi Road, Asaba. Ask on WhatsApp. No prices listed online."
			},
			{
				name: "robots",
				content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
			},
			{
				name: "googlebot",
				content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
			},
			{
				name: "author",
				content: "Chukwunweike Phone Accessories & Gadgets"
			},
			{
				name: "application-name",
				content: "Chukwunweike"
			},
			{
				name: "geo.region",
				content: "NG-DE"
			},
			{
				name: "geo.placename",
				content: "Asaba"
			},
			{
				name: "theme-color",
				content: "#0f6b4c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en-NG",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var $$splitComponentImporter = () => import("./routes-qRLAP52D.mjs");
var getSiteOrigin = createServerFn({ method: "GET" }).handler(createSsrRpc("e9edbc41c1cdf4994dbd2fcf19b6e13d92d2ac54745f49f139077a3e05a13c24"));
var Route$2 = createFileRoute("/")({
	loader: () => getSiteOrigin(),
	head: ({ loaderData }) => {
		const origin = loaderData ?? "";
		const canonical = origin ? `${origin}/` : "/";
		return {
			meta: [{ title: "Chukwunweike | Phones, Accessories & Gadgets in Asaba" }, {
				name: "description",
				content: "Original iPhones, Samsung Galaxy phones, PlayStation 5 consoles and games, and gadgets at Shop 3, City View Mall, Nnebisi Road, Asaba. Ask on WhatsApp. No prices listed online."
			}],
			links: [
				{
					rel: "canonical",
					href: canonical
				},
				{
					rel: "alternate",
					hrefLang: "en-NG",
					href: canonical
				},
				{
					rel: "alternate",
					hrefLang: "x-default",
					href: canonical
				}
			]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var CATEGORIES = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "iphone",
		label: "iPhone"
	},
	{
		id: "samsung",
		label: "Samsung"
	},
	{
		id: "playstation",
		label: "PlayStation"
	},
	{
		id: "gadgets",
		label: "Gadgets"
	}
];
var PRODUCTS = [
	{
		id: "iphone-17",
		name: "iPhone 17",
		category: "iphone",
		blurb: "The new everyday iPhone, in stock at the shop.",
		image: "/catalog/iphone.jpg",
		note: "New arrival"
	},
	{
		id: "iphone-17-pro",
		name: "iPhone 17 Pro",
		category: "iphone",
		blurb: "Pro camera and a brighter display. Ask us which storage we have.",
		image: "/catalog/iphone-pro.jpg",
		note: "Pro"
	},
	{
		id: "galaxy-s26",
		name: "Galaxy S26",
		category: "samsung",
		blurb: "The current Galaxy S series. Original and sealed.",
		image: "/catalog/galaxy-s.jpg",
		note: "Samsung"
	},
	{
		id: "galaxy-s26-ultra",
		name: "Galaxy S26 Ultra",
		category: "samsung",
		blurb: "Large display, S Pen, and a full camera set.",
		image: "/catalog/galaxy.jpg",
		note: "Ultra"
	},
	{
		id: "ps5",
		name: "PlayStation 5",
		category: "playstation",
		blurb: "Disc and digital consoles, plus extra controllers.",
		image: "/catalog/console.jpg",
		note: "Console"
	},
	{
		id: "ps-games",
		name: "PS5 games",
		category: "playstation",
		blurb: "New and popular titles. Tell us the game you want.",
		image: "/catalog/games.jpg",
		note: "Games"
	},
	{
		id: "earbuds",
		name: "Wireless earbuds",
		category: "gadgets",
		blurb: "Everyday buds for calls, music, and commuting.",
		image: "/catalog/earbuds.jpg",
		note: "Audio"
	},
	{
		id: "accessories",
		name: "Cases, cables & power",
		category: "gadgets",
		blurb: "Cases, braided cables, and power banks for iPhone and Galaxy.",
		image: "/catalog/accessories.jpg",
		note: "Accessories"
	}
];
var WHATSAPP = "2349132083551";
function whatsappLink(message) {
	return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}
var ADDRESS = {
	shop: "Shop 3, City View Mall",
	street: "Nnebisi Road, directly opposite Konwea Plaza",
	city: "Asaba, Delta State"
};
var SITE_NAME = "Chukwunweike Phone Accessories & Gadgets";
var SITE_DESCRIPTION = "Original iPhones, Samsung Galaxy phones, PlayStation 5 consoles and games, and gadgets at Shop 3, City View Mall, Nnebisi Road, Asaba. Ask on WhatsApp. No prices listed online.";
var MAPS_QUERY = encodeURIComponent("Shop 3, City View Mall, Nnebisi Road, opposite Konwea Plaza, Asaba, Delta State, Nigeria");
function mapsUrl() {
	return `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
}
function structuredData(origin) {
	const page = `${origin}/`;
	const images = [`${origin}/catalog/shop.jpg`, ...PRODUCTS.map((product) => `${origin}${product.image}`)];
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
				publisher: { "@id": `${page}#store` }
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
					addressCountry: "NG"
				},
				hasMap: mapsUrl(),
				areaServed: {
					"@type": "City",
					name: "Asaba"
				},
				contactPoint: {
					"@type": "ContactPoint",
					telephone: `+${WHATSAPP}`,
					contactType: "customer service",
					availableLanguage: ["English"],
					areaServed: "NG"
				},
				sameAs: [`https://wa.me/${WHATSAPP}`]
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
					image: `${origin}${product.image}`
				}))
			}
		]
	};
}
function jsonLd(origin) {
	return JSON.stringify(structuredData(origin)).replace(/</g, "\\u003c");
}
function xmlEscape(value) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
function robotsTxt(origin) {
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
		""
	].join("\n");
}
function sitemapXml(origin) {
	const images = [{
		loc: `${origin}/catalog/shop.jpg`,
		title: "Chukwunweike shop display"
	}, ...PRODUCTS.map((product) => ({
		loc: `${origin}${product.image}`,
		title: product.name
	}))].map((image) => `    <image:image>\n      <image:loc>${xmlEscape(image.loc)}</image:loc>\n      <image:title>${xmlEscape(image.title)}</image:title>\n    </image:image>`).join("\n");
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
var Route$1 = createFileRoute("/robots.txt")({ server: { handlers: { GET: async () => {
	const { getRequestUrl } = await import("./ssr.mjs").then((n) => n.o).then((n) => n.t);
	const origin = getRequestUrl().origin;
	return new Response(robotsTxt(origin), { headers: {
		"content-type": "text/plain; charset=utf-8",
		"cache-control": "public, max-age=3600"
	} });
} } } });
var Route = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const { getRequestUrl } = await import("./ssr.mjs").then((n) => n.o).then((n) => n.t);
	const origin = getRequestUrl().origin;
	return new Response(sitemapXml(origin), { headers: {
		"content-type": "application/xml; charset=utf-8",
		"cache-control": "public, max-age=3600"
	} });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	RobotsDottxtRoute: Route$1.update({
		id: "/robots.txt",
		path: "/robots.txt",
		getParentRoute: () => Route$3
	}),
	SitemapDotxmlRoute: Route.update({
		id: "/sitemap.xml",
		path: "/sitemap.xml",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { CATEGORIES as a, whatsappLink as c, ADDRESS as i, Route$2 as l, jsonLd as n, PRODUCTS as o, mapsUrl as r, WHATSAPP as s, router_exports as t };
