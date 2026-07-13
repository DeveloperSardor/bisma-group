import { prisma } from "./prisma";

// Retry wrapper for Neon free tier: compute sleeps and P1001 is thrown
// on the first request. We retry up to 3 times with a short delay so the
// compute wakes up before we give up.
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1500): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      const isConnErr =
        err instanceof Error &&
        (err.message.includes("P1001") || err.message.includes("Can't reach database"));
      if (isConnErr && attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      throw err;
    }
  }
  throw new Error("unreachable");
}

export async function getSiteSettings() {
  return withRetry(() =>
    prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: { id: "singleton" },
    })
  );
}

export async function getServices() {
  return withRetry(() =>
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    })
  );
}

export async function getPortfolio(limit?: number) {
  return withRetry(() =>
    prisma.portfolioProject.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: limit,
    })
  );
}

export async function getTestimonials() {
  return withRetry(() =>
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    })
  );
}

export async function getFaqs() {
  return withRetry(() =>
    prisma.faq.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    })
  );
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
