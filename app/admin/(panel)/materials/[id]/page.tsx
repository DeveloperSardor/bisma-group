import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import MaterialForm from "../MaterialForm";

export default async function EditMaterialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.materialBrand.findUnique({ where: { id } });
  if (!item) notFound();
  return <MaterialForm item={item} />;
}
