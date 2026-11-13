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
        <div className={`${shell} flex flex-col gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm`}>
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

      <header className="sticky top-0 z-20 border-b border-line bg-card/95 backdrop-blur">
        <div className={`${shell} flex items-center justify-between gap-3 py-3`}>
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img src="/logo.svg" alt="" width={44} height={44} className="size-10 shrink-0 rounded-lg sm:size-11" />
            <span className="min-w-0">
              <span className="block truncate font-semibold text-base leading-none text-ink sm:text-lg">Chukwunweike</span>
              <span className="hidden text-xs text-muted min-[420px]:block">Phone accessories & gadgets</span>
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-ink md:flex">
            <a href="#collection" className="hover:text-primary">
              Collection
            </a>
            <a href="#visit" className="hover:text-primary">
              Visit
            </a>
            <a href="#about" className="hover:text-primary">
              About
            </a>
            <a
              href={whatsappLink("Hello Chukwunweike, I would like to chat about a product.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-whatsapp px-4 text-card"
            >
              <MessageCircle className="size-4" aria-hidden />
              Chat
            </a>
          </nav>
          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 text-base font-semibold md:hidden">
            <a className="rounded-lg px-2 py-3 hover:bg-paper" href="#collection" onClick={() => setOpen(false)}>
              Collection
            </a>
            <a className="rounded-lg px-2 py-3 hover:bg-paper" href="#visit" onClick={() => setOpen(false)}>
              Visit
            </a>
            <a className="rounded-lg px-2 py-3 hover:bg-paper" href="#about" onClick={() => setOpen(false)}>
              About
            </a>
            <a
              className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 text-card"
              href={whatsappLink("Hello Chukwunweike, I would like to chat about a product.")}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="size-4" aria-hidden />
              Chat on WhatsApp
            </a>
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className={`${shell} grid items-center gap-8 py-10 md:grid-cols-2 md:py-16 lg:gap-12`}>
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
              Asaba · City View Mall
            </p>
            <h1 className="text-3xl leading-tight font-semibold text-ink sm:text-4xl">
              Welcome to Chukwunweike
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              A straightforward shop for iPhone 18 Pro Max, iPhone 16 Pro Max, iPhone 17 Air, Google Pixel, PS5 controllers, AirPods, and Apple Watch. Nothing is priced on this page — send a WhatsApp and we will tell you what is available.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#collection"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 font-semibold text-card hover:bg-primary-dark"
              >
                See the collection
              </a>
              <a
                href={whatsappLink("Hello Chukwunweike, what phones do you have in stock?")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-card px-5 font-semibold text-ink"
              >
                <MessageCircle className="size-4 text-whatsapp" aria-hidden />
                WhatsApp us
              </a>
            </div>
          </div>
          <img
            src="/catalog/shop.jpg"
            alt="Chukwunweike Phones and Accessories, with AirPods Max boxes under the shop sign"
            className="aspect-[4/3] max-h-80 w-full rounded-card object-cover shadow-sm"
          />
        </section>

        <section className="border-y border-line bg-card">
          <ul className={`${shell} grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3`}>
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
            <li className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-ink">Ask before you come</p>
                <p className="text-sm text-muted">WhatsApp for colours and availability.</p>
              </div>
            </li>
          </ul>
        </section>

        <section id="collection" className={`${shell} py-12 lg:py-16`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-semibold text-2xl text-ink sm:text-3xl">The collection</h2>
              <p className="mt-1 text-muted">Prices are not listed. Tap Inquire and we will reply on WhatsApp.</p>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
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
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {products.map((product) => (
              <li key={product.id} id={product.id} className="flex flex-col overflow-hidden rounded-card border border-line bg-card">
                <img src={product.image} alt={product.name} className="h-56 w-full bg-paper object-contain sm:h-64" />
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">{product.note}</p>
                  <h3 className="mt-1 font-semibold text-xl text-ink">{product.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{product.blurb}</p>
                  <a
                    href={whatsappLink(`Hello Chukwunweike, I'm interested in the ${product.name}. Is it available?`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-card hover:bg-primary-dark"
                  >
                    Inquire
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="bg-card">
          <div className={`${shell} grid gap-8 py-12 md:grid-cols-2 md:items-center lg:py-16`}>
            <div>
              <h2 className="font-semibold text-2xl text-ink sm:text-3xl">A straightforward shop</h2>
              <p className="mt-3 text-muted">
                We are a neighbourhood phone shop in Asaba. Come in, look at the phones, and leave with
                something that works. If you are not nearby, send a WhatsApp and we will confirm what is on the
                shelf before you make the trip.
              </p>
              <p className="mt-3 text-muted">
                We carry iPhone 18 Pro Max, iPhone 16 Pro Max, iPhone 17 Air, Google Pixel phones, PS5 controllers, AirPods, and Apple Watch. Come in and look, or send a WhatsApp first.
              </p>
            </div>
            <img
              src="/catalog/headphones-keyboards.jpg"
              alt="AirPods Max and iPad Magic Keyboard boxes on the counter"
              className="aspect-[4/3] w-full rounded-card object-cover"
            />
          </div>
        </section>

        <section id="visit" className={`${shell} py-12 lg:py-16`}>
          <div className="grid gap-6 rounded-card border border-line bg-card p-5 sm:p-6 md:grid-cols-2">
            <div>
              <h2 className="font-semibold text-2xl text-ink sm:text-3xl">Visit the shop</h2>
              <address className="mt-4 not-italic text-lg leading-relaxed text-ink">
                <strong className="font-semibold">{ADDRESS.shop}</strong>
                <br />
                {ADDRESS.street}
                <br />
                {ADDRESS.city}
              </address>
              <p className="mt-4 text-muted">
                WhatsApp{" "}
                <a className="font-semibold text-primary" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
                  +234 913 208 3551
                </a>
              </p>
              <p className="mt-2 text-sm">
                <a className="font-semibold text-primary" href={mapsUrl()} target="_blank" rel="noreferrer">
                  Open in Google Maps
                </a>
              </p>
              <a
                href={whatsappLink("Hello Chukwunweike, I am coming to Shop 3, City View Mall.")}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-5 font-semibold text-card sm:w-auto"
              >
                <MessageCircle className="size-4" aria-hidden />
                Message on WhatsApp
              </a>
            </div>
            <div className="flex flex-col justify-center rounded-xl bg-paper p-6">
              <p className="font-semibold text-2xl text-ink">City View Mall</p>
              <p className="mt-2 text-muted">Nnebisi Road, Asaba</p>
              <p className="mt-1 text-sm text-muted">Directly opposite Konwea Plaza</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-ink pb-24 text-card md:pb-8">
        <div className={`${shell} flex flex-col gap-2 py-8 text-sm md:flex-row md:items-center md:justify-between`}>
          <p className="flex items-center gap-2 font-semibold text-lg">
            <img src="/logo.svg" alt="" width={28} height={28} className="size-7 rounded-md" />
            Chukwunweike
          </p>
          <p className="text-paper/80">
            {ADDRESS.shop}, {ADDRESS.city}
          </p>
        </div>
      </footer>

      <a
        href={whatsappLink("Hello Chukwunweike")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-4 bottom-4 grid size-14 place-items-center rounded-full bg-whatsapp text-card shadow-lg"
      >
        <MessageCircle className="size-7" />
      </a>
    </div>
  );
}
