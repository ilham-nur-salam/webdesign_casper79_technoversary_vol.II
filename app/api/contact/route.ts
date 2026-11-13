import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/validate";

export async function POST(req: Request) {
  let body: Partial<ContactInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Permintaan tidak valid." }, { status: 400 });
  }
  const input: ContactInput = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    subject: String(body.subject ?? ""),
    message: String(body.message ?? ""),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }
  // Mode demo: pesan divalidasi tetapi tidak disimpan atau diteruskan ke layanan email.
  return NextResponse.json({ ok: true, demo: true });
}
