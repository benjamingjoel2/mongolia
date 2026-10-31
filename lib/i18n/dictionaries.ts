import type { Locale } from "./config";
import type { Dict } from "./core";
import fr from "@/i18n/fr.json";
import de from "@/i18n/de.json";
import es from "@/i18n/es.json";

/** Translations keyed by hashKey(English). Server-side only: the browser gets clientDict() slices. */
export const dictionaries: Record<Locale, Dict> = { en: {}, fr, de, es };
