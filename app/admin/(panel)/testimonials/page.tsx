import Link from "next/link";
import { Plus, Edit, Quote } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import DeleteButton from "../../_shared/DeleteButton";
import { deleteTestimonialAction } from "./actions";
import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";
import { getLocalized } from "../../../i18n/utils";

const dict = {
  uz: {
    eyebrow: "Sharhlar", title: "Mijoz sharhlari", subtitle: "\"Mijozlarimiz fikri\" slayderiga qo'shiladi",
    newBtn: "Yangi sharh", empty: "Hozircha sharhlar yo'q", btnAdd: "Qo'shish",
    thAuthor: "Muallif", thQuote: "Sharh", thCategory: "Kategoriya", thStatus: "Holat",
    statusActive: "Faol", statusInactive: "Yashirin"
  },
  ru: {
    eyebrow: "Отзывы", title: "Отзывы клиентов", subtitle: "Отображаются в слайдере \"Отзывы\"",
    newBtn: "Новый отзыв", empty: "Пока нет отзывов", btnAdd: "Добавить",
    thAuthor: "Автор", thQuote: "Отзыв", thCategory: "Категория", thStatus: "Статус",
    statusActive: "Активен", statusInactive: "Скрыт"
  },
  en: {
    eyebrow: "Testimonials", title: "Client Testimonials", subtitle: "Displayed in the \"Client Reviews\" slider",
    newBtn: "New review", empty: "No reviews yet", btnAdd: "Add",
    thAuthor: "Author", thQuote: "Review", thCategory: "Category", thStatus: "Status",
    statusActive: "Active", statusInactive: "Hidden"
  }
};

export default async function TestimonialsListPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("bisma_lang")?.value as Lang) || "uz";
  const t = dict[lang];

  const items = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">{t.eyebrow}</span>
          <h1 className="admin-page-title">{t.title}</h1>
          <p className="admin-page-subtitle">{t.subtitle}</p>
        </div>
        <Link href="/admin/testimonials/new" className="admin-btn admin-btn-primary">
          <Plus size={14} /> {t.newBtn}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Quote size={26} /></div>
            <h3>{t.empty}</h3>
            <Link href="/admin/testimonials/new" className="admin-btn admin-btn-primary"><Plus size={14} /> {t.btnAdd}</Link>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 70 }}></th>
                <th>{t.thAuthor}</th>
                <th>{t.thQuote}</th>
                <th style={{ width: 130 }}>{t.thCategory}</th>
                <th style={{ width: 100 }}>{t.thStatus}</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.avatar} alt={getLocalized(item.author, lang)} className="admin-row-image" style={{ width: 38, height: 38, borderRadius: "50%" }} />
                  </td>
                  <td>
                    <strong style={{ fontWeight: 600 }}>{getLocalized(item.author, lang)}</strong>
                    <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>{getLocalized(item.age, lang)}</div>
                  </td>
                  <td>
                    <span className="admin-truncate">{getLocalized(item.quote, lang)}</span>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge-new">{getLocalized(item.category, lang)}</span>
                  </td>
                  <td>
                    <span className={`admin-badge ${item.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                      {item.isActive ? t.statusActive : t.statusInactive}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/admin/testimonials/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-icon"><Edit size={14} /></Link>
                      <DeleteButton action={deleteTestimonialAction.bind(null, item.id)} size="icon" />
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
