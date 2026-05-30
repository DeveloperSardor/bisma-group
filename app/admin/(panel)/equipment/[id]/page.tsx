import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import EquipmentForm from "../EquipmentForm";

export default async function EditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.equipment.findUnique({ where: { id } });
  if (!item) notFound();
  return <EquipmentForm item={item} />;
}
