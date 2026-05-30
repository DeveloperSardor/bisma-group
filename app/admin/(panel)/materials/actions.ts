"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/auth";
import { uzOf } from "../../../i18n/utils";

export type MatFormState = { error?: string };

async function parse(formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const order = Number(formData.get("order") || 0);
  const isActive = formData.get("isActive") === "on";
  if (!uzOf(name) || !uzOf(type)) throw new Error("Nom va tur bo'sh bo'lmasligi kerak");
  return { name, type, order, isActive };
}

export async function createMaterialAction(_prev: MatFormState, formData: FormData): Promise<MatFormState> {
  try {
    const data = await parse(formData);
    await prisma.materialBrand.create({ data });
    revalidatePath("/admin/materials");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/materials");
}

export async function updateMaterialAction(id: string, _prev: MatFormState, formData: FormData): Promise<MatFormState> {
  try {
    const data = await parse(formData);
    await prisma.materialBrand.update({ where: { id }, data });
    revalidatePath("/admin/materials");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/materials");
}

export async function deleteMaterialAction(id: string) {
  await requireAuth();
  await prisma.materialBrand.delete({ where: { id } });
  revalidatePath("/admin/materials");
  revalidatePath("/");
}
