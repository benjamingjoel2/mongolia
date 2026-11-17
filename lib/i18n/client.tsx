"use client";

import { createContext, useCallback, useContext } from "react";
import type { Locale } from "./config";
import { translate, type Dict, type Vars } from "./core";

type State = { locale: Locale; dict: Dict };
const I18nContext = createContext<State>({ locale: "en", dict: {} });

export function I18nProvider({ locale, dict, children }: State & { children: React.ReactNode }) {
  return <I18nContext.Provider value={{ locale, dict }}>{children}</I18nContext.Provider>;
}

export const useLocale = (): Locale => useContext(I18nContext).locale;

/** Translator for client components; the dictionary holds only the strings they use. */
export function useT() {
  const { locale, dict } = useContext(I18nContext);
  return useCallback((s: string, vars?: Vars) => translate(locale, dict, s, vars), [locale, dict]);
}
