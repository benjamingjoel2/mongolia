import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  message: z.string().trim().min(5).max(4000),
  consent: z.literal(true),
});

/** Contact form endpoint. TODO(integration): forward to the shared inbox / CRM. */
export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 422 });
  console.log("[contact]", JSON.stringify({ receivedAt: new Date().toISOString(), ...parsed.data }));
  return NextResponse.json({ ok: true });
}
