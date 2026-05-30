"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/auth";
import { uzOf } from "../../../i18n/utils";

export type ServiceFormState = { error?: string };

function normalizeArrayField(raw: FormDataEntryValue | null): string {
  if (!raw) return "[]";
  try {
    const arr = JSON.parse(String(raw));
    if (!Array.isArray(arr)) return "[]";
    return JSON.stringify(arr.filter((row) => row && Object.values(row).some((v) => String(v).trim() !== "")));
  } catch {
    return "[]";
  }
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || `s-${Date.now()}`;
}

async function parse(formData: FormData, existingSlug?: string) {
  await requireAuth();
  const title = String(formData.get("title") || "").trim();
  const label = String(formData.get("label") || "").trim();
  const shortDesc = String(formData.get("shortDesc") || "").trim();
  const icon = String(formData.get("icon") || "Wrench").trim();
  const contactInfo = String(formData.get("contactInfo") || "").trim();
  const order = Number(formData.get("order") || 0);
  const isActive = formData.get("isActive") === "on";
  const slug = existingSlug || slugify(uzOf(title));
  const bigStats = normalizeArrayField(formData.get("bigStats"));
  const iconFeatures = normalizeArrayField(formData.get("iconFeatures"));
  const iconSpecs = normalizeArrayField(formData.get("iconSpecs"));
  const fractions = normalizeArrayField(formData.get("fractions"));
  if (!uzOf(title) || !uzOf(shortDesc)) throw new Error("Sarlavha va izoh bo'sh bo'lmasligi kerak");
  return {
    slug, title, label, shortDesc, icon, contactInfo, order, isActive,
    bigStats, iconFeatures,
    iconSpecs: iconSpecs === "[]" ? null : iconSpecs,
    fractions: fractions === "[]" ? null : fractions,
  };
}

export async function createServiceAction(_prev: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
  try {
    const data = await parse(formData);
    await prisma.service.create({ data });
    revalidatePath("/admin/services");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/services");
}

export async function updateServiceAction(id: string, _prev: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
  try {
    const existing = await prisma.service.findUnique({ where: { id }, select: { slug: true } });
    if (!existing) throw new Error("Topilmadi");
    const data = await parse(formData, existing.slug);
    await prisma.service.update({ where: { id }, data });
    revalidatePath("/admin/services");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/services");
}

export async function deleteServiceAction(id: string) {
  await requireAuth();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/");
}
