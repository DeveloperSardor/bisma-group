import Link from "next/link";
import { Plus, Wrench } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";
import { getLocalized } from "../../../i18n/utils";
import EquipmentTable from "./EquipmentTable";

const dict = {
  uz: {
    eyebrow: "Texnika", title: "Jihozlar va texnika", subtitle: "Saytda ko'rsatiluvchi remont jihozlari",
    newBtn: "Yangi jihoz", empty: "Hozircha jihozlar yo'q", btnAdd: "Qo'shish",
    thName: "Nomi", thIcon: "Ikonka", thStatus: "Holat",
    statusActive: "Faol", statusInactive: "Yashirin"
  },
  ru: {
    eyebrow: "Оборудование", title: "Техника и оборудование", subtitle: "Ремонтное оборудование на сайте",
    newBtn: "Новое оборудование", empty: "Пока нет оборудования", btnAdd: "Добавить",
    thName: "Название", thIcon: "Иконка", thStatus: "Статус",
    statusActive: "Активен", statusInactive: "Скрыт"
  },
  en: {
    eyebrow: "Equipment", title: "Tools & Equipment", subtitle: "Renovation equipment shown on site",
    newBtn: "New equipment", empty: "No equipment yet", btnAdd: "Add",
    thName: "Name", thIcon: "Icon", thStatus: "Status",
    statusActive: "Active", statusInactive: "Hidden"
  }
};

export default async function EquipmentListPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("bisma_lang")?.value as Lang) || "uz";
  const t = dict[lang];

  const items = await prisma.equipment.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">{t.eyebrow}</span>
          <h1 className="admin-page-title">{t.title}</h1>
          <p className="admin-page-subtitle">{t.subtitle}</p>
        </div>
        <Link href="/admin/equipment/new" className="admin-btn admin-btn-primary">
          <Plus size={14} /> {t.newBtn}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Wrench size={26} /></div>
            <h3>{t.empty}</h3>
            <Link href="/admin/equipment/new" className="admin-btn admin-btn-primary"><Plus size={14} /> {t.btnAdd}</Link>
          </div>
        </div>
      ) : (
        <EquipmentTable
          items={items.map((e) => ({
            id: e.id,
            name: getLocalized(e.name, lang),
            desc: getLocalized(e.desc, lang),
            icon: e.icon,
            isActive: e.isActive,
          }))}
          labels={{
            thName: t.thName,
            thIcon: t.thIcon,
            thStatus: t.thStatus,
            statusActive: t.statusActive,
            statusInactive: t.statusInactive,
          }}
        />
      )}
    </>
  );
}
