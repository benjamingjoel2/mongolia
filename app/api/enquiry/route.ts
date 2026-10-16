import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/planner";

/**
 * Receives adventure-planner submissions.
 * TODO(integration): send to the CRM and notify the specialist by email
 * (e.g. create a lead in the CRM, then send a confirmation email to the traveller).
 * Until then the payload is validated and logged so nothing is lost in server logs.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) },
      { status: 422 },
    );
  }

  const reference = `SNS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const enquiry = { reference, receivedAt: new Date().toISOString(), ...parsed.data };

  // TODO(integration): replace with CRM + email delivery.
  console.log("[enquiry]", JSON.stringify(enquiry, null, 2));

  return NextResponse.json({ ok: true, reference });
}
