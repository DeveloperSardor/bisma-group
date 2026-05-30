import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import PortfolioForm from "../PortfolioForm";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.portfolioProject.findUnique({ where: { id } });
  if (!item) notFound();
  return <PortfolioForm item={item} />;
}
