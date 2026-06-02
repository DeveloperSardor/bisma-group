import Link from "next/link";
import { Plus, Briefcase } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { getLocalized } from "../../../i18n/utils";
import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";
import PortfolioTable from "./PortfolioTable";

const dict = {
  uz: {
    eyebrow: "Portfolio", title: "Portfolio loyihalar", subtitle: "Tugatilgan remont misollari",
    newBtn: "Yangi loyiha", empty: "Hozircha loyihalar yo'q", emptyDesc: "Birinchi portfolio loyihasini qo'shing.",
    thName: "Nomi", thType: "Tur", thArea: "Maydon", thStatus: "Holat",
    statusActive: "Faol", statusInactive: "Yashirin", commercial: "Tijorat"
  },
  ru: {
    eyebrow: "Портфолио", title: "Проекты портфолио", subtitle: "Примеры выполненного ремонта",
    newBtn: "Новый проект", empty: "Пока нет проектов", emptyDesc: "Добавьте первый проект в портфолио.",
    thName: "Название", thType: "Тип", thArea: "Площадь", thStatus: "Статус",
    statusActive: "Активен", statusInactive: "Скрыт", commercial: "Коммерческий"
  },
  en: {
    eyebrow: "Portfolio", title: "Portfolio projects", subtitle: "Completed renovation examples",
    newBtn: "New project", empty: "No projects yet", emptyDesc: "Add the first portfolio project.",
    thName: "Name", thType: "Type", thArea: "Area", thStatus: "Status",
    statusActive: "Active", statusInactive: "Hidden", commercial: "Commercial"
  }
};

export default async function PortfolioListPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("bisma_lang")?.value as Lang) || "uz";
  const t = dict[lang];

  const items = await prisma.portfolioProject.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">{t.eyebrow}</span>
          <h1 className="admin-page-title">{t.title}</h1>
          <p className="admin-page-subtitle">{t.subtitle}</p>
        </div>
        <Link href="/admin/portfolio/new" className="admin-btn admin-btn-primary">
          <Plus size={14} />
          {t.newBtn}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <Briefcase size={26} />
            </div>
            <h3>{t.empty}</h3>
            <p>{t.emptyDesc}</p>
            <Link href="/admin/portfolio/new" className="admin-btn admin-btn-primary">
              <Plus size={14} /> {t.newBtn}
            </Link>
          </div>
        </div>
      ) : (
        <PortfolioTable
          items={items.map((p) => ({
            id: p.id,
            name: getLocalized(p.name, lang),
            tagline: getLocalized(p.tagline, lang),
            image: p.image,
            area: getLocalized(p.area, lang),
            renovationType: getLocalized(p.renovationType, lang) || p.renovationType,
            isCommercial: p.isCommercial,
            isActive: p.isActive,
          }))}
          labels={{
            thName: t.thName,
            thType: t.thType,
            thArea: t.thArea,
            thStatus: t.thStatus,
            statusActive: t.statusActive,
            statusInactive: t.statusInactive,
            commercial: t.commercial,
          }}
        />
      )}
    </>
  );
}
