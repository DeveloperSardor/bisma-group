import Link from "next/link";
import { Plus, Edit, Package } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import DeleteButton from "../../_shared/DeleteButton";
import { deleteMaterialAction } from "./actions";
import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";
import { getLocalized } from "../../../i18n/utils";

const dict = {
  uz: {
    eyebrow: "Materiallar", title: "Material brendlari", subtitle: "Sertifikatlangan brendlar — saytda ko'rsatiladi",
    newBtn: "Yangi brend", empty: "Hozircha brendlar yo'q", emptyDesc: "Sertifikatlangan brendlarni qo'shing.",
    thBrand: "Brend", thType: "Tur", thStatus: "Holat",
    statusActive: "Faol", statusInactive: "Yashirin"
  },
  ru: {
    eyebrow: "Материалы", title: "Бренды материалов", subtitle: "Сертифицированные бренды — отображаются на сайте",
    newBtn: "Новый бренд", empty: "Пока нет брендов", emptyDesc: "Добавьте сертифицированные бренды.",
    thBrand: "Бренд", thType: "Тип", thStatus: "Статус",
    statusActive: "Активен", statusInactive: "Скрыт"
  },
  en: {
    eyebrow: "Materials", title: "Material Brands", subtitle: "Certified brands — displayed on the site",
    newBtn: "New brand", empty: "No brands yet", emptyDesc: "Add certified brands.",
    thBrand: "Brand", thType: "Type", thStatus: "Status",
    statusActive: "Active", statusInactive: "Hidden"
  }
};

export default async function MaterialsListPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("bisma_lang")?.value as Lang) || "uz";
  const t = dict[lang];

  const items = await prisma.materialBrand.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">{t.eyebrow}</span>
          <h1 className="admin-page-title">{t.title}</h1>
          <p className="admin-page-subtitle">{t.subtitle}</p>
        </div>
        <Link href="/admin/materials/new" className="admin-btn admin-btn-primary">
          <Plus size={14} />
          {t.newBtn}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Package size={26} /></div>
            <h3>{t.empty}</h3>
            <p>{t.emptyDesc}</p>
            <Link href="/admin/materials/new" className="admin-btn admin-btn-primary">
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
                <th>{t.thBrand}</th>
                <th>{t.thType}</th>
                <th style={{ width: 130 }}>{t.thStatus}</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td className="admin-mono" style={{ color: "var(--muted)" }}>{m.order}</td>
                  <td><strong style={{ fontWeight: 600 }}>{getLocalized(m.name, lang)}</strong></td>
                  <td style={{ color: "var(--muted)" }}>{getLocalized(m.type, lang)}</td>
                  <td>
                    <span className={`admin-badge ${m.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                      {m.isActive ? t.statusActive : t.statusInactive}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/admin/materials/${m.id}`} className="admin-btn admin-btn-secondary admin-btn-icon">
                        <Edit size={14} />
                      </Link>
                      <DeleteButton action={deleteMaterialAction.bind(null, m.id)} size="icon" />
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
