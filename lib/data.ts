import { prisma } from "./prisma";

export async function getSiteSettings() {
  return prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
}

export async function getServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export async function getPortfolio(limit?: number) {
  return prisma.portfolioProject.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: limit,
  });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export async function getFaqs() {
  return prisma.faq.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export type Office = {
  name: string;
  address: string;
  landmark: string;
  mapsQuery: string;
};

export function parseOffices(json: string): Office[] {
  try {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}
