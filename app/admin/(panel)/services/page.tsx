import Link from "next/link";
import { Plus, Edit, Sparkles } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import DeleteButton from "../../_shared/DeleteButton";
import { deleteServiceAction } from "./actions";
import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";
import { getLocalized } from "../../../i18n/utils";

const dict = {
  uz: {
    eyebrow: "Xizmatlar", title: "Xizmat turlari", subtitle: "Saytdagi \"Xizmatlarimiz\" bo'limini boshqarish",
    newBtn: "Yangi xizmat", empty: "Hozircha xizmatlar yo'q", emptyDesc: "Birinchi xizmat turini qo'shing.",
    thName: "Nomi", thIcon: "Ikonka", thStatus: "Holat",
    statusActive: "Faol", statusInactive: "Yashirin"
  },
  ru: {
    eyebrow: "Услуги", title: "Виды услуг", subtitle: "Управление разделом \"Наши услуги\"",
    newBtn: "Новая услуга", empty: "Пока нет услуг", emptyDesc: "Добавьте первую услугу.",
    thName: "Название", thIcon: "Иконка", thStatus: "Статус",
    statusActive: "Активен", statusInactive: "Скрыт"
  },
  en: {
    eyebrow: "Services", title: "Service types", subtitle: "Manage the \"Our Services\" section",
    newBtn: "New service", empty: "No services yet", emptyDesc: "Add the first service type.",
    thName: "Name", thIcon: "Icon", thStatus: "Status",
    statusActive: "Active", statusInactive: "Hidden"
  }
};

export default async function ServicesListPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("bisma_lang")?.value as Lang) || "uz";
  const t = dict[lang];

  const items = await prisma.service.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">{t.eyebrow}</span>
          <h1 className="admin-page-title">{t.title}</h1>
          <p className="admin-page-subtitle">{t.subtitle}</p>
        </div>
        <Link href="/admin/services/new" className="admin-btn admin-btn-primary">
          <Plus size={14} />
          {t.newBtn}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Sparkles size={26} /></div>
            <h3>{t.empty}</h3>
            <p>{t.emptyDesc}</p>
            <Link href="/admin/services/new" className="admin-btn admin-btn-primary">
              <Plus size={14} /> {t.newBtn}
            </Link>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>{t.thName}</th>
                <th>Slug</th>
                <th style={{ width: 130 }}>{t.thIcon}</th>
                <th style={{ width: 120 }}>{t.thStatus}</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td className="admin-mono" style={{ color: "var(--muted)" }}>{s.order}</td>
                  <td>
                    <strong style={{ fontWeight: 600 }}>{getLocalized(s.title, lang)}</strong>
                    <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }} className="admin-truncate">{getLocalized(s.shortDesc, lang)}</div>
                  </td>
                  <td className="admin-mono" style={{ color: "var(--muted)" }}>{s.slug}</td>
                  <td className="admin-mono" style={{ color: "var(--muted)" }}>{s.icon}</td>
                  <td>
                    <span className={`admin-badge ${s.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                      {s.isActive ? t.statusActive : t.statusInactive}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/admin/services/${s.id}`} className="admin-btn admin-btn-secondary admin-btn-icon" aria-label="Tahrirlash">
                        <Edit size={14} />
                      </Link>
                      <DeleteButton action={deleteServiceAction.bind(null, s.id)} size="icon" />
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
