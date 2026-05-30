import Link from "next/link";
import { Plus, Edit, Briefcase } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import DeleteButton from "../../_shared/DeleteButton";
import { deletePortfolioAction } from "./actions";
import { getLocalized } from "../../../i18n/utils";
import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";

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
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 70 }}></th>
                <th>{t.thName}</th>
                <th style={{ width: 130 }}>{t.thType}</th>
                <th style={{ width: 110 }}>{t.thArea}</th>
                <th style={{ width: 100 }}>{t.thStatus}</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={getLocalized(p.name, lang)}
                      className="admin-row-image"
                      style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    <strong style={{ fontWeight: 600 }}>{getLocalized(p.name, lang)}</strong>
                    <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }} className="admin-truncate">
                      {getLocalized(p.tagline, lang)}
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge-new">
                      {p.isCommercial ? t.commercial : (getLocalized(p.renovationType, lang) || p.renovationType)}
                    </span>
                  </td>
                  <td style={{ color: "var(--muted)" }}>{getLocalized(p.area, lang)}</td>
                  <td>
                    <span className={`admin-badge ${p.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                      {p.isActive ? t.statusActive : t.statusInactive}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link
                        href={`/admin/portfolio/${p.id}`}
                        className="admin-btn admin-btn-secondary admin-btn-icon"
                        aria-label="Tahrirlash"
                      >
                        <Edit size={14} />
                      </Link>
                      <DeleteButton action={deletePortfolioAction.bind(null, p.id)} size="icon" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
