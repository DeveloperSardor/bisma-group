"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/auth";
import { uzOf } from "../../../i18n/utils";

export type TestimonialFormState = { error?: string };

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || `t-${Date.now()}`;
}

async function parse(formData: FormData, existingSlug?: string) {
  await requireAuth();
  const author = String(formData.get("author") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const age = String(formData.get("age") || "").trim();
  const quote = String(formData.get("quote") || "").trim();
  const result = String(formData.get("result") || "").trim();
  const avatar = String(formData.get("avatar") || "").trim();
  const order = Number(formData.get("order") || 0);
  const isActive = formData.get("isActive") === "on";
  if (!uzOf(author) || !uzOf(category) || !uzOf(quote)) {
    throw new Error("Muallif, kategoriya va sharh bo'sh bo'lmasligi kerak");
  }
  return {
    slug: existingSlug || slugify(uzOf(author) + "-" + Date.now()),
    author, category, age, quote, result, avatar, order, isActive,
  };
}

export async function createTestimonialAction(_prev: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
  try {
    const data = await parse(formData);
    await prisma.testimonial.create({ data });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/testimonials");
}

export async function updateTestimonialAction(id: string, _prev: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
  try {
    const existing = await prisma.testimonial.findUnique({ where: { id }, select: { slug: true } });
    if (!existing) throw new Error("Topilmadi");
    const data = await parse(formData, existing.slug);
    await prisma.testimonial.update({ where: { id }, data });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(id: string) {
  await requireAuth();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function reorderTestimonialsAction(ids: string[]) {
  await requireAuth();
  await prisma.$transaction(
    ids.map((id, order) => prisma.testimonial.update({ where: { id }, data: { order } })),
  );
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
