"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/auth";
import { uzOf } from "../../../i18n/utils";

export type FaqFormState = { error?: string; success?: boolean };

async function parseFaqForm(formData: FormData) {
  await requireAuth();
  const question = String(formData.get("question") || "").trim();
  const answer = String(formData.get("answer") || "").trim();
  const order = Number(formData.get("order") || 0);
  const isActive = formData.get("isActive") === "on";
  if (!uzOf(question) || !uzOf(answer)) {
    throw new Error("Savol va javob bo'sh bo'lmasligi kerak");
  }
  return { question, answer, order, isActive };
}

export async function createFaqAction(_prev: FaqFormState, formData: FormData): Promise<FaqFormState> {
  try {
    const data = await parseFaqForm(formData);
    await prisma.faq.create({ data });
    revalidatePath("/admin/faq");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/faq");
}

export async function updateFaqAction(id: string, _prev: FaqFormState, formData: FormData): Promise<FaqFormState> {
  try {
    const data = await parseFaqForm(formData);
    await prisma.faq.update({ where: { id }, data });
    revalidatePath("/admin/faq");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/faq");
}

export async function deleteFaqAction(id: string) {
  await requireAuth();
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/");
}
