"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/auth";
import { uzOf } from "../../../i18n/utils";

export type EqFormState = { error?: string };

async function parse(formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") || "").trim();
  const desc = String(formData.get("desc") || "").trim();
  const icon = String(formData.get("icon") || "Wrench").trim();
  const order = Number(formData.get("order") || 0);
  const isActive = formData.get("isActive") === "on";
  if (!uzOf(name) || !uzOf(desc)) throw new Error("Nom va izoh bo'sh bo'lmasligi kerak");
  return { name, desc, icon, order, isActive };
}

export async function createEquipmentAction(_prev: EqFormState, formData: FormData): Promise<EqFormState> {
  try {
    const data = await parse(formData);
    await prisma.equipment.create({ data });
    revalidatePath("/admin/equipment");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/equipment");
}

export async function updateEquipmentAction(id: string, _prev: EqFormState, formData: FormData): Promise<EqFormState> {
  try {
    const data = await parse(formData);
    await prisma.equipment.update({ where: { id }, data });
    revalidatePath("/admin/equipment");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/equipment");
}

export async function deleteEquipmentAction(id: string) {
  await requireAuth();
  await prisma.equipment.delete({ where: { id } });
  revalidatePath("/admin/equipment");
  revalidatePath("/");
}
