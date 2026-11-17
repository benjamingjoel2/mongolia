/* Collects every English string the site can show and writes:
 *   i18n/source.json       { key: English }  (what translators work from)
 *   i18n/client-keys.json  [key]             (strings client components need in the browser)
 * and reports missing translations per locale. Keys are hashKey(English) from lib/i18n/hash.ts.
 * Run: node scripts/i18n-extract.cjs [--strict]
 */
const fs = require("fs"), path = require("path"), Module = require("module");
const ts = require("typescript");
const root = path.join(__dirname, "..");

// Minimal TypeScript loader with the "@/" alias, enough to evaluate data modules.
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (req, parent, ...rest) {
  if (req.startsWith("@/")) req = path.join(root, req.slice(2));
  if (req === "server-only") return require.resolve("./noop.cjs");
  try { return origResolve.call(this, req, parent, ...rest); } catch (e) {
    for (const ext of [".ts", ".tsx", "/index.ts"]) { try { return origResolve.call(this, req + ext, parent, ...rest); } catch {} }
    throw e;
  }
};
for (const ext of [".ts", ".tsx"]) {
  require.extensions[ext] = (m, filename) => {
    const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, resolveJsonModule: true }, fileName: filename });
    m._compile(out.outputText, filename);
  };
}
const { copyStrings } = require(path.join(root, "lib/i18n/core.ts"));
const { hashKey } = require(path.join(root, "lib/i18n/hash.ts"));
const cfg = require(path.join(root, "i18n/extract.config.cjs"));
const hasWords = (s) => /\p{L}{2}/u.test(s);

const strings = new Map(); // key -> English
const clientKeys = new Set();
const add = (s, client) => {
  if (typeof s !== "string" || !hasWords(s)) return;
  const k = hashKey(s);
  const prev = strings.get(k);
  if (prev !== undefined && prev !== s) throw new Error(`Hash collision: ${JSON.stringify(prev)} / ${JSON.stringify(s)}`);
  strings.set(k, s);
  if (client) clientKeys.add(k);
};

// 1. Data modules (evaluated, so computed strings are included)
for (const rel of cfg.dataModules) {
  const mod = require(path.join(root, rel));
  const client = cfg.clientData.includes(rel);
  for (const [name, v] of Object.entries(mod)) {
    if (typeof v === "function" || cfg.skipExports.includes(name)) continue;
    for (const s of copyStrings(v)) add(s, client);
  }
}
for (const s of cfg.extra(require)) add(s, false);

// 2. t("…") and msg("…") literals in source files, plus plain literals in literalModules
const srcFiles = [];
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) { if (!["node_modules", ".next"].includes(f.name)) walk(p); } else if (/\.tsx?$/.test(f.name)) srcFiles.push(p); } };
for (const d of ["app", "components", "lib", "config", "data"]) walk(path.join(root, d));
const fileStrings = new Map();
const importsOf = new Map();
for (const file of srcFiles) {
  const src = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rel = path.relative(root, file);
  const literal = cfg.literalModules.includes(rel);
  const found = [];
  const imps = [];
  const visit = (n) => {
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) {
      if (n.moduleSpecifier) imps.push(n.moduleSpecifier.text);
      return;
    }
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && ["t", "msg"].includes(n.expression.text)) {
      const a = n.arguments[0];
      if (a && (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a))) found.push(a.text);
    }
    if (literal && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) && (/^[A-Z]/.test(n.text) || / /.test(n.text)) && !/[\\^$]/.test(n.text)) found.push(n.text);
    ts.forEachChild(n, visit);
  };
  visit(sf);
  fileStrings.set(file, found);
  importsOf.set(file, { imps, client: /^["']use client["']/.test(src.trimStart()) });
}

// 3. Client graph: files reachable from "use client" files
const resolveImp = (from, spec) => {
  const base = spec.startsWith("@/") ? path.join(root, spec.slice(2)) : spec.startsWith(".") ? path.join(path.dirname(from), spec) : null;
  if (!base) return null;
  for (const ext of ["", ".ts", ".tsx", "/index.ts"]) if (fs.existsSync(base + ext) && fs.statSync(base + ext).isFile()) return base + ext;
  return null;
};
const clientFiles = new Set();
const stack = [...importsOf.entries()].filter(([, v]) => v.client).map(([f]) => f);
while (stack.length) {
  const f = stack.pop();
  if (clientFiles.has(f)) continue;
  clientFiles.add(f);
  for (const s of importsOf.get(f)?.imps ?? []) { const r = resolveImp(f, s); if (r && importsOf.has(r)) stack.push(r); }
}
for (const [f, list] of fileStrings) for (const s of list) add(s, clientFiles.has(f));

const source = Object.fromEntries([...strings.entries()].sort((a, b) => a[1].localeCompare(b[1])));
fs.writeFileSync(path.join(root, "i18n/source.json"), JSON.stringify(source, null, 1) + "\n");
fs.writeFileSync(path.join(root, "i18n/client-keys.json"), JSON.stringify([...clientKeys].sort()) + "\n");
console.log(`${Object.keys(source).length} strings, ${clientKeys.size} client keys`);
for (const l of ["fr", "de", "es"]) {
  const dict = JSON.parse(fs.readFileSync(path.join(root, `i18n/${l}.json`), "utf8"));
  const missing = Object.keys(source).filter((k) => !dict[k]);
  const stale = Object.keys(dict).filter((k) => !source[k]);
  console.log(`${l}: ${missing.length} missing, ${stale.length} unused`);
  if (process.argv.includes("--strict") && missing.length) process.exitCode = 1;
}
