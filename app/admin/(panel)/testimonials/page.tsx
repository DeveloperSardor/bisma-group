import Link from "next/link";
import { Plus, Quote } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";
import { getLocalized } from "../../../i18n/utils";
import TestimonialsTable from "./TestimonialsTable";

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
        <TestimonialsTable
          items={items.map((item) => ({
            id: item.id,
            author: getLocalized(item.author, lang),
            age: getLocalized(item.age, lang),
            quote: getLocalized(item.quote, lang),
            category: getLocalized(item.category, lang),
            avatar: item.avatar,
            isActive: item.isActive,
          }))}
          labels={{
            thAuthor: t.thAuthor,
            thQuote: t.thQuote,
            thCategory: t.thCategory,
            thStatus: t.thStatus,
            statusActive: t.statusActive,
            statusInactive: t.statusInactive,
          }}
        />
      )}
    </>
  );
}
