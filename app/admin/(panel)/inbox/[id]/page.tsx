import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import InboxDetail from "./InboxDetail";

export default async function InboxDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!item) notFound();
  return <InboxDetail item={{ ...item, createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString() }} />;
}
