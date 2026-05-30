import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import ServiceForm from "../ServiceForm";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.service.findUnique({ where: { id } });
  if (!item) notFound();
  return <ServiceForm item={item} />;
}
