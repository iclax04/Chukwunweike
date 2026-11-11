import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as MessageCircle, i as ShieldCheck, o as Menu, r as Store, s as MapPin, t as X } from "../_libs/lucide-react.mjs";
import { a as CATEGORIES, c as whatsappLink, i as ADDRESS, l as Route$2, n as jsonLd, o as PRODUCTS, r as mapsUrl, s as WHATSAPP } from "./router-CShxFwO2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-qRLAP52D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const origin = Route$2.useLoaderData();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const products = (0, import_react.useMemo)(() => filter === "all" ? PRODUCTS : PRODUCTS.filter((item) => item.category === filter), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: jsonLd(origin) }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-primary text-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "size-4 shrink-0",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							ADDRESS.shop,
							" · ",
							ADDRESS.city
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "font-semibold underline-offset-2 hover:underline",
						href: whatsappLink("Hello Chukwunweike, I would like to know what is in stock."),
						target: "_blank",
						rel: "noreferrer",
						children: "WhatsApp +234 913 208 3551"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-card/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#top",
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-lg bg-primary font-semibold text-lg text-card",
								children: "C"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold text-lg leading-none text-ink",
								children: "Chukwunweike"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: "Phone accessories & gadgets"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-6 text-sm font-semibold text-ink md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#collection",
									className: "hover:text-primary",
									children: "Collection"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#visit",
									className: "hover:text-primary",
									children: "Visit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#about",
									className: "hover:text-primary",
									children: "About"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink("Hello Chukwunweike, I would like to chat about a product."),
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex min-h-11 items-center gap-2 rounded-lg bg-whatsapp px-4 text-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										className: "size-4",
										"aria-hidden": true
									}), "Chat"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-lg border border-line md:hidden",
							"aria-label": open ? "Close menu" : "Open menu",
							onClick: () => setOpen((value) => !value),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col gap-1 border-t border-line px-4 py-3 text-base font-semibold md:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "rounded-lg px-2 py-3 hover:bg-paper",
							href: "#collection",
							onClick: () => setOpen(false),
							children: "Collection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "rounded-lg px-2 py-3 hover:bg-paper",
							href: "#visit",
							onClick: () => setOpen(false),
							children: "Visit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "rounded-lg px-2 py-3 hover:bg-paper",
							href: "#about",
							onClick: () => setOpen(false),
							children: "About"
						})
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-sm font-semibold tracking-wide text-primary uppercase",
								children: "Asaba · City View Mall"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-4xl leading-tight font-semibold text-ink md:text-5xl",
								children: "Welcome to Chukwunweike"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-lg text-lg text-muted",
								children: "A straightforward shop for new iPhones, Samsung Galaxy phones, PlayStation consoles and games, and everyday gadgets. Nothing is priced on this page — send a WhatsApp and we will tell you what is available."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#collection",
									className: "inline-flex min-h-11 items-center rounded-lg bg-primary px-5 font-semibold text-card hover:bg-primary-dark",
									children: "See the collection"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink("Hello Chukwunweike, what phones do you have in stock?"),
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-card px-5 font-semibold text-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										className: "size-4 text-whatsapp",
										"aria-hidden": true
									}), "WhatsApp us"]
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/catalog/shop.jpg",
							alt: "The phone display inside Chukwunweike at City View Mall",
							className: "aspect-[16/10] w-full rounded-card object-cover shadow-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-y border-line bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "mt-0.5 size-5 text-primary",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-ink",
										children: "Original stock"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Sealed phones and genuine accessories."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
										className: "mt-0.5 size-5 text-primary",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-ink",
										children: "Walk in anytime"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Shop 3, opposite Konwea Plaza."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										className: "mt-0.5 size-5 text-primary",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-ink",
										children: "Ask before you come"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "WhatsApp for colours and availability."
									})] })]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "collection",
						className: "mx-auto max-w-6xl px-4 py-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-3xl text-ink",
								children: "The collection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted",
								children: "Prices are not listed. Tap Inquire and we will reply on WhatsApp."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								role: "tablist",
								"aria-label": "Product categories",
								children: CATEGORIES.map((category) => {
									const selected = filter === category.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "tab",
										"aria-selected": selected,
										onClick: () => setFilter(category.id),
										className: `min-h-11 rounded-full px-4 text-sm font-semibold ${selected ? "bg-ink text-card" : "bg-card text-ink ring-1 ring-line"}`,
										children: category.label
									}, category.id);
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
							children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								id: product.id,
								className: "flex flex-col overflow-hidden rounded-card border border-line bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.image,
									alt: product.name,
									className: "aspect-[3/4] w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold tracking-wide text-primary uppercase",
											children: product.note
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1 font-semibold text-xl text-ink",
											children: product.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 flex-1 text-sm text-muted",
											children: product.blurb
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: whatsappLink(`Hello Chukwunweike, I'm interested in the ${product.name}. Is it available?`),
											target: "_blank",
											rel: "noreferrer",
											className: "mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-card hover:bg-primary-dark",
											children: "Inquire"
										})
									]
								})]
							}, product.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "about",
						className: "bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold text-3xl text-ink",
									children: "A straightforward shop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted",
									children: "We are a neighbourhood phone shop in Asaba. Come in, look at the phones, and leave with something that works. If you are not nearby, send a WhatsApp and we will confirm what is on the shelf before you make the trip."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted",
									children: "We carry new iPhones, Samsung Galaxy phones, PlayStation 5 consoles and games, and everyday gadgets — cases, cables, power banks, and earbuds."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/catalog/accessories.jpg",
								alt: "Cases, a cable, and a power bank on the counter",
								className: "aspect-[4/3] w-full rounded-card object-cover"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "visit",
						className: "mx-auto max-w-6xl px-4 py-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 rounded-card border border-line bg-card p-6 md:grid-cols-2 md:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold text-3xl text-ink",
									children: "Visit the shop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
									className: "mt-4 not-italic text-lg leading-relaxed text-ink",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "font-semibold",
											children: ADDRESS.shop
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										ADDRESS.street,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										ADDRESS.city
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 text-muted",
									children: [
										"WhatsApp",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "font-semibold text-primary",
											href: `https://wa.me/${WHATSAPP}`,
											target: "_blank",
											rel: "noreferrer",
											children: "+234 913 208 3551"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "font-semibold text-primary",
										href: mapsUrl(),
										target: "_blank",
										rel: "noreferrer",
										children: "Open in Google Maps"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink("Hello Chukwunweike, I am coming to Shop 3, City View Mall."),
									target: "_blank",
									rel: "noreferrer",
									className: "mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-whatsapp px-5 font-semibold text-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										className: "size-4",
										"aria-hidden": true
									}), "Message on WhatsApp"]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-center rounded-xl bg-paper p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-2xl text-ink",
										children: "City View Mall"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-muted",
										children: "Nnebisi Road, Asaba"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: "Directly opposite Konwea Plaza"
									})
								]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line bg-ink text-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-lg",
						children: "Chukwunweike"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-paper/80",
						children: [
							ADDRESS.shop,
							", ",
							ADDRESS.city
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: whatsappLink("Hello Chukwunweike"),
				target: "_blank",
				rel: "noreferrer",
				"aria-label": "Chat on WhatsApp",
				className: "fixed right-4 bottom-4 grid size-14 place-items-center rounded-full bg-whatsapp text-card shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-7" })
			})
		]
	});
}
//#endregion
export { Home as component };
