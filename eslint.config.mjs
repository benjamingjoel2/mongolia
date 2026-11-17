import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Cloudflare (OpenNext) build output.
    ".open-next/**",
    ".wrangler/**",
    // Node build scripts (CommonJS) and local translation scratch files.
    "scripts/**/*.cjs",
    ".i18n-work/**",
    "i18n/*.cjs",
  ]),
]);

export default eslintConfig;
