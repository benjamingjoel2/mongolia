"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = 2026;
const noop = () => () => {};

/** Current year, rendered client-side so prerendered pages never go stale. */
export function Year() {
  return <>{useSyncExternalStore(noop, () => new Date().getFullYear(), () => BUILD_YEAR)}</>;
}
