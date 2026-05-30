"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/auth";
import { uzOf } from "../../../i18n/utils";

export type PortfolioFormState = { error?: string };

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || `p-${Date.now()}`
  );
}

function normalizeArrayField(raw: FormDataEntryValue | null): string {
  if (!raw) return "[]";
  try {
    const arr = JSON.parse(String(raw));
    if (!Array.isArray(arr)) return "[]";
    return JSON.stringify(
      arr.filter((row) => row && Object.values(row).some((v) => String(v).trim() !== "")),
    );
  } catch {
    return "[]";
  }
}

function normalizeStringList(raw: FormDataEntryValue | null): string {
  if (!raw) return "[]";
  try {
    const arr = JSON.parse(String(raw));
    if (!Array.isArray(arr)) return "[]";
    return JSON.stringify(
      arr
        .map((row) => (row && typeof row === "object" ? String(row.value || "").trim() : String(row).trim()))
        .filter((s: string) => s !== "" && uzOf(s) !== ""),
    );
  } catch {
    return "[]";
  }
}

async function parse(formData: FormData, existingSlug?: string) {
  await requireAuth();

  const name = String(formData.get("name") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const shortDesc = String(formData.get("shortDesc") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const landmark = String(formData.get("landmark") || "").trim();
  const image = String(formData.get("image") || "").trim();

  const renovationType = String(formData.get("renovationType") || "").trim();
  const duration = String(formData.get("duration") || "").trim();
  const area = String(formData.get("area") || "").trim();
  const pricePerSqm = String(formData.get("pricePerSqm") || "").trim();
  const rooms = String(formData.get("rooms") || "").trim();
  const tech = String(formData.get("tech") || "").trim();
  const docs = String(formData.get("docs") || "").trim();
  const price = String(formData.get("price") || "").trim();
  const badge = String(formData.get("badge") || "").trim() || null;

  const order = Number(formData.get("order") || 0);
  const isActive = formData.get("isActive") === "on";
  const isCommercial = formData.get("isCommercial") === "on";

  const commBlocks = String(formData.get("commBlocks") || "").trim() || null;
  const commUnits = String(formData.get("commUnits") || "").trim() || null;
  const commStatus = String(formData.get("commStatus") || "").trim() || null;
  const commSize = String(formData.get("commSize") || "").trim() || null;
  const commBenefits = String(formData.get("commBenefits") || "").trim() || null;

  const apartments = normalizeArrayField(formData.get("apartments"));
  const amenities = normalizeArrayField(formData.get("amenities"));
  const safety = normalizeArrayField(formData.get("safety"));
  const matrix = normalizeArrayField(formData.get("matrix"));
  const advantages = normalizeStringList(formData.get("advantages"));
  const paymentOptions = normalizeStringList(formData.get("paymentOptions"));

  if (!uzOf(name) || !uzOf(shortDesc) || !image) {
    throw new Error("Nom, qisqa izoh va rasm URL bo'sh bo'lmasligi kerak");
  }

  const slug = existingSlug || slugify(uzOf(name));

  return {
    slug,
    name,
    tagline,
    shortDesc,
    address,
    landmark,
    image,
    renovationType,
    duration,
    area,
    pricePerSqm,
    rooms,
    tech,
    docs,
    price,
    apartments,
    amenities,
    safety,
    matrix,
    advantages,
    paymentOptions,
    badge,
    isCommercial,
    commBlocks,
    commUnits,
    commStatus,
    commSize,
    commBenefits,
    order,
    isActive,
  };
}

export async function createPortfolioAction(
  _prev: PortfolioFormState,
  formData: FormData,
): Promise<PortfolioFormState> {
  try {
    const data = await parse(formData);
    await prisma.portfolioProject.create({ data });
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/portfolio");
}

export async function updatePortfolioAction(
  id: string,
  _prev: PortfolioFormState,
  formData: FormData,
): Promise<PortfolioFormState> {
  try {
    const existing = await prisma.portfolioProject.findUnique({
      where: { id },
      select: { slug: true },
    });
    if (!existing) throw new Error("Topilmadi");
    const data = await parse(formData, existing.slug);
    await prisma.portfolioProject.update({ where: { id }, data });
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/portfolio");
}

export async function deletePortfolioAction(id: string) {
  await requireAuth();
  await prisma.portfolioProject.delete({ where: { id } });
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}
