import { z } from "zod";

/** Shared planner schema: validated per step in the browser and in full by /api/enquiry. */

export const festivalChoices = [
  { value: "naadam", label: "Naadam", hint: "July" },
  { value: "golden-eagle-festival", label: "Golden Eagle Festival", hint: "Early October" },
  { value: "tsagaan-sar", label: "Tsagaan Sar", hint: "January or February" },
  { value: "none", label: "No festival", hint: "Any time" },
] as const;

export const ridingChoices = [
  { value: "none", label: "None", hint: "Never ridden, or not for years" },
  { value: "some", label: "Some", hint: "Comfortable at walk and trot" },
  { value: "confident", label: "Confident", hint: "Happy cantering over open ground" },
] as const;

export const fitnessChoices = [
  { value: "easy", label: "Easy-going", hint: "Short walks, mostly by vehicle" },
  { value: "moderate", label: "Moderate", hint: "Half-day hikes or rides" },
  { value: "active", label: "Active", hint: "Full days on foot or in the saddle" },
  { value: "very-active", label: "Very active", hint: "Multi-day treks, altitude, cold" },
] as const;

export const dietaryChoices = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Halal", "Nut allergy"] as const;

/** Budget bands stored in USD; labels are converted with the currency switcher. */
export const budgetChoices = [
  { value: "under-3000", min: 0, max: 3000 },
  { value: "3000-4500", min: 3000, max: 4500 },
  { value: "4500-6000", min: 4500, max: 6000 },
  { value: "6000-plus", min: 6000, max: null },
  { value: "unsure", min: null, max: null },
] as const;

export const contactChoices = ["Email", "WhatsApp", "Telephone"] as const;

export const dialCodes = [
  { code: "+1", label: "US/Canada +1" },
  { code: "+44", label: "UK +44" },
  { code: "+61", label: "Australia +61" },
  { code: "+64", label: "New Zealand +64" },
  { code: "+49", label: "Germany +49" },
  { code: "+33", label: "France +33" },
  { code: "+31", label: "Netherlands +31" },
  { code: "+41", label: "Switzerland +41" },
  { code: "+46", label: "Sweden +46" },
  { code: "+353", label: "Ireland +353" },
  { code: "+65", label: "Singapore +65" },
  { code: "+81", label: "Japan +81" },
  { code: "+82", label: "South Korea +82" },
  { code: "+976", label: "Mongolia +976" },
] as const;

const enumOf = <T extends readonly { value: string }[]>(list: T) =>
  z.enum(list.map((x) => x.value) as [T[number]["value"], ...T[number]["value"][]]);

export const stepWhen = z.object({
  month: z.coerce.number({ message: "Choose a month" }).int().min(1, "Choose a month").max(12),
  flexible: z.enum(["yes", "no"], { message: "Let us know if your dates are flexible" }),
  days: z.coerce.number().int().min(5, "At least 5 days").max(30, "Up to 30 days"),
  festival: enumOf(festivalChoices),
});

export const stepWhere = z
  .object({
    regions: z.array(z.string()).default([]),
    activities: z.array(z.string()).default([]),
    helpMeChoose: z.boolean().default(false),
  })
  .refine((v) => v.helpMeChoose || v.regions.length + v.activities.length > 0, {
    message: "Pick at least one region or activity, or choose “Help me choose”",
    path: ["regions"],
  });

export const stepStyle = z.object({
  style: z.enum(["group", "private"], { message: "Choose group or private" }),
  comfort: z.enum(["traditional", "comfortable", "luxury"], { message: "Choose a comfort level" }),
  riding: enumOf(ridingChoices),
  fitness: enumOf(fitnessChoices),
});

export const stepWho = z
  .object({
    adults: z.coerce.number().int().min(1, "At least one adult").max(20, "For groups over 20, tell us in the notes"),
    children: z.coerce.number().int().min(0).max(10),
    childAges: z.array(z.coerce.number().int().min(0, "Age 0 to 17").max(17, "Age 0 to 17")).default([]),
    dietary: z.array(z.string()).default([]),
    dietaryNotes: z.string().max(500).optional().default(""),
    budget: enumOf(budgetChoices),
  })
  .refine((v) => v.childAges.length === v.children, {
    message: "Add an age for each child",
    path: ["childAges"],
  });

export const stepContact = z
  .object({
    name: z.string().trim().min(2, "Tell us your name").max(120),
    email: z.string().trim().email("Enter a valid email address"),
    dialCode: z.string().regex(/^\+\d{1,4}$/, "Choose a country code"),
    phone: z
      .string()
      .trim()
      .regex(/^[\d\s()-]{0,20}$/, "Numbers, spaces and dashes only")
      .optional()
      .default(""),
    contactMethods: z.array(z.enum(contactChoices)).min(1, "Choose at least one way to reach you"),
    notes: z.string().max(2000).optional().default(""),
    consent: z.literal(true, { message: "Please agree so we can reply to you" }),
  })
  .refine((v) => !v.contactMethods.some((m) => m !== "Email") || v.phone.replace(/\D/g, "").length >= 6, {
    message: "Add a phone number for WhatsApp or telephone",
    path: ["phone"],
  });

export const stepSchemas = [stepWhen, stepWhere, stepStyle, stepWho, stepContact] as const;

export const enquirySchema = z.object({
  when: stepWhen,
  where: stepWhere,
  style: stepStyle,
  who: stepWho,
  contact: stepContact,
  source: z.string().max(200).optional(),
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;

export const stepKeys = ["when", "where", "style", "who", "contact"] as const;
export const stepLabels = ["When", "Where & what", "Style", "Who", "Contact"] as const;
