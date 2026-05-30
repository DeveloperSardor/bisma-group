import Link from "next/link";
import { Briefcase, Sparkles, HelpCircle, Quote, Package, Wrench, Inbox, MessageCircle, ArrowRight } from "lucide-react";
import { prisma } from "../../../lib/prisma";

import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminHome() {
  const [
    portfolioCount,
    servicesCount,
    faqCount,
    testimonialsCount,
    materialsCount,
    equipmentCount,
    newSubmissionsCount,
    totalSubmissions,
    recentSubmissions,
  ] = await Promise.all([
    prisma.portfolioProject.count(),
    prisma.service.count(),
    prisma.faq.count(),
    prisma.testimonial.count(),
    prisma.materialBrand.count(),
    prisma.equipment.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <AdminDashboardClient
      newSubmissionsCount={newSubmissionsCount}
      portfolioCount={portfolioCount}
      servicesCount={servicesCount}
      totalSubmissions={totalSubmissions}
      faqCount={faqCount}
      testimonialsCount={testimonialsCount}
      materialsCount={materialsCount}
      equipmentCount={equipmentCount}
      recentSubmissions={recentSubmissions}
    />
  );
}
