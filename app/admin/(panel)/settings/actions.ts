"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/auth";
import { uzOf } from "../../../i18n/utils";

export type SettingsFormState = { error?: string; success?: boolean };

function normalizeOffices(raw: FormDataEntryValue | null): string {
  if (!raw) return "[]";
  try {
    const arr = JSON.parse(String(raw));
    if (!Array.isArray(arr)) return "[]";
    return JSON.stringify(
      arr
        .map((row) => ({
          name: String(row?.name || "").trim(),
          address: String(row?.address || "").trim(),
          landmark: String(row?.landmark || "").trim(),
          mapsQuery: String(row?.mapsQuery || "").trim(),
        }))
        .filter((row) => uzOf(row.name) || uzOf(row.address)),
    );
  } catch {
    return "[]";
  }
}

export async function updateSettingsAction(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  try {
    await requireAuth();

    const data = {
      heroTitle: String(formData.get("heroTitle") || "").trim(),
      heroTitleAccent: String(formData.get("heroTitleAccent") || "").trim(),
      heroDesc: String(formData.get("heroDesc") || "").trim(),
      heroImage: String(formData.get("heroImage") || "/hero-bg-interior.png").trim() || "/hero-bg-interior.png",
      phone: String(formData.get("phone") || "").trim(),
      phoneRaw: String(formData.get("phoneRaw") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      offices: normalizeOffices(formData.get("offices")),
      aboutFoundedYear: String(formData.get("aboutFoundedYear") || "").trim(),
      aboutExperienceYears: String(formData.get("aboutExperienceYears") || "").trim(),
      aboutProjectsCount: String(formData.get("aboutProjectsCount") || "").trim(),
      aboutWarranty: String(formData.get("aboutWarranty") || "").trim(),
      telegramUrl: String(formData.get("telegramUrl") || "").trim(),
      whatsappUrl: String(formData.get("whatsappUrl") || "").trim(),
      instagramUrl: String(formData.get("instagramUrl") || "").trim(),
    };

    if (!uzOf(data.heroTitle) || !data.phone || !data.email) {
      throw new Error("Hero sarlavha, telefon va email bo'sh bo'lmasligi kerak");
    }

    await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
}
