import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import {
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Store,
  X,
} from "lucide-react";
import {
  ADDRESS,
  CATEGORIES,
  PRODUCTS,
  WHATSAPP,
  whatsappLink,
  type Category,
} from "@/lib/catalog";
import { jsonLd, mapsUrl } from "@/lib/seo";

const getSiteOrigin = createServerFn({ method: "GET" }).handler(async () => {
  const { getRequestUrl } = await import("@tanstack/react-start/server");
  return getRequestUrl().origin;
});

export const Route = createFileRoute("/")({
  loader: () => getSiteOrigin(),
  head: ({ loaderData }) => {
    const origin = loaderData ?? "";
    const canonical = origin ? `${origin}/` : "/";
    return {
      meta: [
        { title: "Chukwunweike | Phones, Accessories & Gadgets in Asaba" },
        {
          name: "description",
          content:
            "iPhone 18 Pro Max, iPhone 16 Pro Max, iPhone 17 Air, Google Pixel, PS5 controllers, AirPods, and Apple Watch at Shop 3, City View Mall, Nnebisi Road, Asaba. Ask on WhatsApp. No prices listed online.",
        },
      ],
      links: [
        { rel: "canonical", href: canonical },
        { rel: "alternate", hrefLang: "en-NG", href: canonical },
        { rel: "alternate", hrefLang: "x-default", href: canonical },
      ],
    };
  },
  component: Home,
});

const shell = "mx-auto w-full max-w-5xl px-4 sm:px-6";

function Home() {
  const origin = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | Category>("all");

  const products = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(origin) }} />
      <div className="bg-primary text-card">
        <div className={`${shell} flex flex-col gap-1 py-2 text-sm sm:flex-row sm:items-center sm:justify-between`}>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" aria-hidden />
            <span>
              {ADDRESS.shop} · {ADDRESS.city}
            </span>
          </p>
          <a
            className="font-semibold underline-offset-2 hover:underline"
            href={whatsappLink("Hello Chukwunweike, I would like to know what is in stock.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp +234 913 208 3551
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-line bg-card">
        <div className={`${shell} flex items-center justify-between gap-4 py-3`}>
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img src="/logo.svg" alt="" width={44} height={44} className="size-10 shrink-0 rounded-md" />
            <span className="min-w-0">
              <span className="block truncate font-serif text-lg leading-none text-ink">Chukwunweike</span>
              <span className="mt-1 block text-xs tracking-wide text-muted uppercase">Phones & gadgets</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-ink md:flex">
            <a href="#collection" className="hover:text-primary">Collection</a>
            <a href="#visit" className="hover:text-primary">Visit</a>
            <a href="#about" className="hover:text-primary">About</a>
          </nav>
          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center rounded-md border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <nav className={`${shell} flex flex-col gap-1 border-t border-line py-3 text-base font-semibold md:hidden`}>
            <a className="rounded-md px-2 py-3 hover:bg-paper" href="#collection" onClick={() => setOpen(false)}>
              Collection
            </a>
            <a className="rounded-md px-2 py-3 hover:bg-paper" href="#visit" onClick={() => setOpen(false)}>
              Visit
            </a>
            <a className="rounded-md px-2 py-3 hover:bg-paper" href="#about" onClick={() => setOpen(false)}>
              About
            </a>
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className={`${shell} py-10 sm:py-14`}>
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">Asaba · City View Mall</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Welcome to Chukwunweike
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            A straightforward shop for iPhone 18 Pro Max, iPhone 16 Pro Max, iPhone 17 Air, Google Pixel, PS5 controllers, AirPods, and Apple Watch. Nothing is priced on this page — send a WhatsApp and we will tell you what is available.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#collection"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 font-semibold text-card hover:bg-primary-dark"
            >
              See the collection
            </a>
            <a
              href={whatsappLink("Hello Chukwunweike, what phones do you have in stock?")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-card px-5 font-semibold text-ink"
            >
              <MessageCircle className="size-4 text-whatsapp" aria-hidden />
              WhatsApp us
            </a>
          </div>
          <img
            src="/catalog/welcome.jpg"
            alt="AirPods Max on display under the Chukwunweike sign"
            className="mt-8 w-full rounded-card border border-line"
          />
        </section>

        <section className="border-y border-line bg-card">
          <ul className={`${shell} grid gap-6 py-6 sm:grid-cols-3`}>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-ink">Original stock</p>
                <p className="text-sm text-muted">Sealed phones and genuine accessories.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Store className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-ink">Walk in anytime</p>
                <p className="text-sm text-muted">Shop 3, opposite Konwea Plaza.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-ink">Ask before you come</p>
                <p className="text-sm text-muted">WhatsApp for colours and availability.</p>
              </div>
            </li>
          </ul>
        </section>

        <section id="collection" className={`${shell} py-12 sm:py-16`}>
          <h2 className="font-serif text-3xl text-ink">The collection</h2>
          <p className="mt-2 text-muted">Prices are not listed. Tap Inquire and we will reply on WhatsApp.</p>
          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
            {CATEGORIES.map((category) => {
              const selected = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(category.id)}
                  className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
                    selected ? "bg-ink text-card" : "bg-card text-ink ring-1 ring-line"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <li key={product.id} id={product.id} className="overflow-hidden rounded-card border border-line bg-card">
                <img src={product.image} alt={product.name} className="aspect-[4/5] w-full bg-paper object-contain object-center" />
                <div className="border-t border-line p-4">
                  <p className="text-xs font-semibold tracking-widest text-primary uppercase">{product.note}</p>
                  <h3 className="mt-1 font-serif text-2xl text-ink">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted">{product.blurb}</p>
                  <a
                    href={whatsappLink(`Hello Chukwunweike, I'm interested in the ${product.name}. Is it available?`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-semibold text-card hover:bg-primary-dark"
                  >
                    Inquire
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="border-t border-line bg-card">
          <div className={`${shell} py-12 sm:py-16`}>
            <h2 className="font-serif text-3xl text-ink">A straightforward shop</h2>
            <p className="mt-3 max-w-2xl text-muted">
              We are a neighbourhood phone shop in Asaba. Come in, look at the phones, and leave with
              something that works. If you are not nearby, send a WhatsApp and we will confirm what is on the
              shelf before you make the trip.
            </p>
            <p className="mt-3 max-w-2xl text-muted">
              We carry iPhone 18 Pro Max, iPhone 16 Pro Max, iPhone 17 Air, Google Pixel phones, PS5 controllers, AirPods, and Apple Watch. Come in and look, or send a WhatsApp first.
            </p>
            <img
              src="/catalog/headphones-keyboards.jpg"
              alt="AirPods Max and iPad Magic Keyboard boxes on the counter"
              className="mt-8 w-full rounded-card border border-line"
            />
          </div>
        </section>
      </main>

      <footer id="visit" className="border-t border-line bg-ink pb-24 text-card">
        <div className={`${shell} py-12`}>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="flex items-center gap-2 font-serif text-2xl">
                <img src="/logo.svg" alt="" width={32} height={32} className="size-8 rounded-md" />
                Chukwunweike
              </p>
              <p className="mt-3 text-sm text-paper/80">Phone accessories and gadgets in Asaba.</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl">Visit the shop</h2>
              <address className="mt-3 text-sm leading-relaxed not-italic">
                {ADDRESS.shop}
                <br />
                {ADDRESS.street}
                <br />
                {ADDRESS.city}
              </address>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-paper/60 uppercase">Contact</p>
              <p className="mt-3 text-sm">
                <a className="hover:underline" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
                  WhatsApp +234 913 208 3551
                </a>
              </p>
              <p className="mt-2 text-sm">
                <a className="hover:underline" href={mapsUrl()} target="_blank" rel="noreferrer">
                  Open in Google Maps
                </a>
              </p>
              <a
                href={whatsappLink("Hello Chukwunweike, I am coming to Shop 3, City View Mall.")}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-whatsapp px-5 text-sm font-semibold text-card"
              >
                <MessageCircle className="size-4" aria-hidden />
                Message on WhatsApp
              </a>
            </div>
          </div>
          <p className="mt-10 border-t border-white/15 pt-4 text-sm text-paper/70">
            © {new Date().getFullYear()} Chukwunweike
          </p>
        </div>
      </footer>

      <a
        href={whatsappLink("Hello Chukwunweike")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-card shadow-lg"
      >
        <MessageCircle className="size-7" />
      </a>
    </div>
  );
}