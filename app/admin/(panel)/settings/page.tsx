import { prisma } from "../../../../lib/prisma";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  return (
    <SettingsForm
      settings={{
        heroTitle: settings.heroTitle,
        heroTitleAccent: settings.heroTitleAccent,
        heroDesc: settings.heroDesc,
        heroImage: settings.heroImage,
        phone: settings.phone,
        phoneRaw: settings.phoneRaw,
        email: settings.email,
        offices: settings.offices,
        aboutFoundedYear: settings.aboutFoundedYear,
        aboutExperienceYears: settings.aboutExperienceYears,
        aboutProjectsCount: settings.aboutProjectsCount,
        aboutWarranty: settings.aboutWarranty,
        telegramUrl: settings.telegramUrl,
        whatsappUrl: settings.whatsappUrl,
        instagramUrl: settings.instagramUrl,
      }}
    />
  );
}
