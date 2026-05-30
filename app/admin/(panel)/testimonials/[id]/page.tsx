import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import TestimonialForm from "../TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) notFound();
  return <TestimonialForm item={item} />;
}
