"use client";

import { useSyncExternalStore } from "react";
import { defaultCurrency, type CurrencyCode } from "@/config/site";
import { isCurrencyCode } from "@/lib/currency";

const KEY = "sns.currency";
const listeners = new Set<() => void>();

function read(): CurrencyCode {
  try {
    const v = window.localStorage.getItem(KEY);
    return isCurrencyCode(v) ? v : defaultCurrency;
  } catch {
    return defaultCurrency;
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function setCurrency(code: CurrencyCode) {
  try {
    window.localStorage.setItem(KEY, code);
  } catch {
    /* storage unavailable: keep in-memory only */
  }
  memory = code;
  listeners.forEach((l) => l());
}

let memory: CurrencyCode | null = null;

/** Selected display currency. Server and first client render use USD to avoid hydration mismatch. */
export function useCurrency(): CurrencyCode {
  return useSyncExternalStore(
    subscribe,
    () => memory ?? read(),
    () => defaultCurrency,
  );
}
