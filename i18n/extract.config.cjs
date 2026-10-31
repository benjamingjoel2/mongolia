/* Settings for scripts/i18n-extract.cjs */
module.exports = {
  // Evaluated; every visible string (see SKIP_KEYS in lib/i18n/core.ts) is translatable.
  dataModules: [
    "data/adventures.ts", "data/regions.ts", "data/experiences.ts", "data/festivals.ts", "data/stays.ts",
    "data/faqs.ts", "data/legal.ts", "data/months.ts", "data/packing.ts", "data/taxonomy.ts",
    "lib/images.ts", "config/site.ts", "lib/planner.ts",
  ],
  // Exports that hold codes, colours or paths rather than copy.
  skipExports: ["palette", "planHref", "intro", "currencyOrder", "defaultCurrency", "stepKeys", "budgetChoices", "stepWhen", "stepWhere", "stepStyle", "stepWho", "stepContact", "stepSchemas", "enquirySchema"],
  // Data modules whose copy is shown inside client components (shipped to the browser).
  clientData: ["config/site.ts", "data/taxonomy.ts", "lib/planner.ts"],
  // Modules whose plain string literals are copy (labels and validation messages).
  literalModules: ["lib/planner.ts", "lib/filters.ts"],
  extra: (req) => {
    const { faqs } = req("../data/faqs.ts");
    return [...new Set(faqs.map((f) => f.topic))];
  },
};
