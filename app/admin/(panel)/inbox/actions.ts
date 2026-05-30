"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/auth";

export type InboxFormState = { error?: string };

export async function updateSubmissionAction(
  id: string,
  _prev: InboxFormState,
  formData: FormData,
): Promise<InboxFormState> {
  try {
    await requireAuth();
    const status = String(formData.get("status") || "new").trim();
    const notes = String(formData.get("notes") || "").trim();
    if (!["new", "contacted", "archived"].includes(status)) {
      throw new Error("Holat noto'g'ri");
    }
    await prisma.contactSubmission.update({
      where: { id },
      data: { status, notes },
    });
    revalidatePath("/admin/inbox");
    revalidatePath(`/admin/inbox/${id}`);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/inbox");
}

export async function setSubmissionStatusAction(id: string, status: string) {
  await requireAuth();
  if (!["new", "contacted", "archived"].includes(status)) return;
  await prisma.contactSubmission.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/inbox");
  revalidatePath(`/admin/inbox/${id}`);
}

export async function deleteSubmissionAction(id: string) {
  await requireAuth();
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/inbox");
}
