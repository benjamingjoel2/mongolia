/**
 * Single source of truth for brand, palette, currencies, contact details and navigation.
 * Anything marked PLACEHOLDER must be replaced before launch.
 */

export const site = {
  name: "Steppe & Sky",
  shortName: "Steppe & Sky",
  tagline: "Nothing between you and the sky.",
  promise:
    "Real Mongolia, done properly. Planned by one dedicated specialist and led by local guides.",
  description:
    "Small-group and private adventures across Mongolia: the steppe, the Gobi Desert and the Altai, with nomad families, local guides and drivers. Planned by one dedicated specialist from your first message to the day you fly home.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://steppeandsky.tourground.com",
  locale: "en",
} as const;

/** Brand palette. Mirrored as CSS custom properties in app/globals.css. */
export const palette = {
  sky: "#2F6FB5", // eternal sky blue
  steppe: "#5E7A45", // steppe grass green
  gobi: "#D9A441", // Gobi sand gold
  felt: "#B3261E", // deep felt red (ger doors, traditional dress)
  charcoal: "#1C1D1F",
  offwhite: "#F7F4EE",
  sand: "#EFE7DA", // soft panel tint
} as const;

export const contact = {
  email: "steppeandsky@tourground.com",
  phone: "+976 0000 0000", // PLACEHOLDER
  phoneHref: "tel:+97600000000", // PLACEHOLDER
  whatsappNumber: "97600000000", // PLACEHOLDER, digits only, used for wa.me/[NUMBER]
  whatsappMessage: "Hello Steppe & Sky, I'd like to plan an adventure in Mongolia.",
  address: "Ulaanbaatar, Mongolia", // PLACEHOLDER
  hours: "Mon to Fri, 9:00 to 18:00 Ulaanbaatar time (UTC+8)",
  social: {
    instagram: "https://instagram.com/", // PLACEHOLDER
  },
} as const;

export const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`;

/* ---------- Currencies ---------- */

export type CurrencyCode = "USD" | "EUR" | "GBP" | "AUD" | "MNT";

export interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Units of this currency per 1 USD. */
  rate: number;
  /** Round converted prices to this step so they read as list prices. */
  roundTo: number;
  locale: string;
}

/** All prices in /data are stored in USD. Rates are static: update them regularly. Last set: Oct 2026 (indicative). */
export const currencies: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", label: "US dollar", symbol: "$", rate: 1, roundTo: 10, locale: "en-US" },
  EUR: { code: "EUR", label: "Euro", symbol: "€", rate: 0.92, roundTo: 10, locale: "en-IE" },
  GBP: { code: "GBP", label: "British pound", symbol: "£", rate: 0.79, roundTo: 10, locale: "en-GB" },
  AUD: { code: "AUD", label: "Australian dollar", symbol: "A$", rate: 1.52, roundTo: 10, locale: "en-AU" },
  MNT: { code: "MNT", label: "Mongolian tögrög", symbol: "₮", rate: 3400, roundTo: 10000, locale: "mn-MN" },
};

export const currencyOrder: CurrencyCode[] = ["USD", "EUR", "GBP", "AUD", "MNT"];
export const defaultCurrency: CurrencyCode = "USD";

/* ---------- Navigation ---------- */

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Adventures", href: "/adventures" },
  { label: "Regions", href: "/regions" },
  { label: "Experiences", href: "/experiences" },
  { label: "Festivals", href: "/festivals" },
  { label: "When to go", href: "/when-to-go" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

/** Items pinned to the mobile bottom bar (the rest live in the menu sheet). */
export const mobileBarNav: NavItem[] = [
  { label: "Adventures", href: "/adventures" },
  { label: "Regions", href: "/regions" },
  { label: "Festivals", href: "/festivals" },
];

export const footerNav: NavItem[][] = [
  [
    { label: "Adventures", href: "/adventures" },
    { label: "Regions", href: "/regions" },
    { label: "Experiences", href: "/experiences" },
    { label: "Festivals", href: "/festivals" },
  ],
  [
    { label: "When to go", href: "/when-to-go" },
    { label: "What to pack", href: "/what-to-pack" },
    { label: "Responsible travel", href: "/responsible-travel" },
    { label: "FAQ", href: "/faq" },
  ],
  [
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
];

export const legalNav: NavItem[] = [
  { label: "Booking terms", href: "/faq#cancellations" }, // PLACEHOLDER until real terms exist
  { label: "Privacy", href: "/contact#privacy" }, // PLACEHOLDER
];

export const planHref = "/plan-my-adventure";

/** Intro reel shown once per session on the homepage. Set `video` to an .mp4 path to replace the image reel. */
export const intro = {
  enabled: true,
  video: null as string | null,
  durationMs: 9000,
};
