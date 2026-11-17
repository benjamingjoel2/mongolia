import { NextResponse, type NextRequest } from "next/server";

const PREFIXED = /^\/(fr|de|es|en)(\/|$)/;

/**
 * English lives at the unprefixed URLs: rewrite them to the "en" locale segment.
 * The router's Next-Url header (the page a client navigation starts from) is rewritten too,
 * so intercepting routes such as the planner modal also work on English pages.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PREFIXED.test(pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  const headers = new Headers(request.headers);
  const from = headers.get("next-url");
  if (from && !PREFIXED.test(from)) headers.set("next-url", from === "/" ? "/en" : `/en${from}`);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Pages only: skip API routes, Next internals, metadata files and anything with a file extension.
  matcher: ["/((?!api/|_next/|icon|apple-icon|manifest|robots|sitemap|opengraph-image|.*\\.[a-z0-9]+$).*)"],
};
