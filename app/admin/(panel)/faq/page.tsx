import Link from "next/link";
import { Plus, HelpCircle } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";
import { getLocalized } from "../../../i18n/utils";
import FaqTable from "./FaqTable";

const dict = {
  uz: {
    eyebrow: "FAQ", title: "Savol-javoblar", subtitle: "Saytdagi FAQ bo'limini boshqarish",
    newBtn: "Yangi savol", empty: "Hozircha savollar yo'q", emptyDesc: "Birinchi savol-javobni qo'shing.",
    thQuestion: "Savol", thStatus: "Holat",
    statusActive: "Faol", statusInactive: "Yashirin"
  },
  ru: {
    eyebrow: "FAQ", title: "Вопросы и ответы", subtitle: "Управление разделом FAQ",
    newBtn: "Новый вопрос", empty: "Пока нет вопросов", emptyDesc: "Добавьте первый вопрос-ответ.",
    thQuestion: "Вопрос", thStatus: "Статус",
    statusActive: "Активен", statusInactive: "Скрыт"
  },
  en: {
    eyebrow: "FAQ", title: "Questions & Answers", subtitle: "Manage the FAQ section",
    newBtn: "New question", empty: "No questions yet", emptyDesc: "Add the first question and answer.",
    thQuestion: "Question", thStatus: "Status",
    statusActive: "Active", statusInactive: "Hidden"
  }
};

export default async function FaqListPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("bisma_lang")?.value as Lang) || "uz";
  const t = dict[lang];

  const faqs = await prisma.faq.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">{t.eyebrow}</span>
          <h1 className="admin-page-title">{t.title}</h1>
          <p className="admin-page-subtitle">{t.subtitle}</p>
        </div>
        <Link href="/admin/faq/new" className="admin-btn admin-btn-primary">
          <Plus size={14} />
          {t.newBtn}
        </Link>
      </div>

      {faqs.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <HelpCircle size={26} />
            </div>
            <h3>{t.empty}</h3>
            <p>{t.emptyDesc}</p>
            <Link href="/admin/faq/new" className="admin-btn admin-btn-primary">
              <Plus size={14} /> {t.newBtn}
            </Link>
          </div>
        </div>
      ) : (
        <FaqTable
          items={faqs.map((f) => ({
            id: f.id,
            question: getLocalized(f.question, lang),
            answer: getLocalized(f.answer, lang),
            isActive: f.isActive,
          }))}
          labels={{
            thQuestion: t.thQuestion,
            thStatus: t.thStatus,
            statusActive: t.statusActive,
            statusInactive: t.statusInactive,
          }}
        />
      )}
    </>
  );
}
