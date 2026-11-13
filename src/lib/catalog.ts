export type Category = "iphone" | "google" | "playstation" | "gadgets";

export type Product = {
  id: string;
  name: string;
  category: Category;
  blurb: string;
  image: string;
  note: string;
};

export const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "iphone", label: "iPhone" },
  { id: "google", label: "Google" },
  { id: "playstation", label: "PlayStation" },
  { id: "gadgets", label: "Gadgets" },
];

export const PRODUCTS: Product[] = [
  {
    id: "iphone-18-pro-max",
    name: "iPhone 18 Pro Max",
    category: "iphone",
    blurb: "Sealed boxes in several colours. Ask which storage is on the shelf.",
    image: "/catalog/iphone-18-pro-max.jpg",
    note: "Pro Max",
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    category: "iphone",
    blurb: "Boxed iPhone 16 Pro Max. Send a WhatsApp for the colour you want.",
    image: "/catalog/iphone-16-pro-max.jpg",
    note: "Pro Max",
  },
  {
    id: "iphone-17-air",
    name: "iPhone 17 Air",
    category: "iphone",
    blurb: "iPhone 17 Air, boxed and ready. Ask us what is in stock today.",
    image: "/catalog/iphone-17-air.jpg",
    note: "Air",
  },
  {
    id: "google-pixel",
    name: "Google Pixel",
    category: "google",
    blurb: "Pixel phones on display in the shop, from Pixel 6 up to Pixel 10 Pro XL.",
    image: "/catalog/google-pixel.jpg",
    note: "Google",
  },
  {
    id: "ps5-controller",
    name: "PS5 Controller",
    category: "playstation",
    blurb: "DualSense controllers, plus PS5 consoles on the shelf beside them.",
    image: "/catalog/ps5-controller.jpg",
    note: "PlayStation",
  },
  {
    id: "airpods",
    name: "AirPods",
    category: "gadgets",
    blurb: "Boxed AirPods. Tell us the model and we will confirm what we have.",
    image: "/catalog/airpods.jpg",
    note: "Audio",
  },
  {
    id: "apple-watch",
    name: "Apple Watch",
    category: "gadgets",
    blurb: "Apple Watch with sport bands in several colours.",
    image: "/catalog/apple-watch.jpg",
    note: "Watch",
  },
];

export const WHATSAPP = "2349132083551";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export const ADDRESS = {
  shop: "Shop 3, City View Mall",
  street: "Nnebisi Road, directly opposite Konwea Plaza",
  city: "Asaba, Delta State",
};