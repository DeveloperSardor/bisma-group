import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  project?: unknown;
  type?: unknown;
  message?: unknown;
};

function clean(value: unknown, max = 500): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const project = clean(body.project, 120) || null;
  const type = clean(body.type, 120) || null;
  const message = clean(body.message, 2000) || null;

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Ism va telefon raqami majburiy" },
      { status: 400 },
    );
  }

  // Minimal phone validation — 7..20 digits
  const digits = phone.replace(/\D+/g, "");
  if (digits.length < 7 || digits.length > 20) {
    return NextResponse.json(
      { ok: false, error: "Telefon raqami noto'g'ri" },
      { status: 400 },
    );
  }

  try {
    const submission = await prisma.contactSubmission.create({
      data: { name, phone, project, type, message, status: "new" },
    });
    return NextResponse.json({ ok: true, id: submission.id });
  } catch (e) {
    console.error("Contact submission failed:", e);
    return NextResponse.json(
      { ok: false, error: "Saqlashda xatolik yuz berdi" },
      { status: 500 },
    );
  }
}
