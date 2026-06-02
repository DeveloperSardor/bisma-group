"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import ArrayEditor from "../../_shared/ArrayEditor";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import { FormLangProvider } from "../../_shared/FormLangContext";
import ImageUpload from "../../_shared/ImageUpload";
import { updateSettingsAction, type SettingsFormState } from "./actions";
import { useTranslation } from "../../../i18n/LangContext";

const dict = {
  uz: {
    eyebrow: "Sozlamalar", title: "Sayt sozlamalari", subtitle: "Aloqa, ofislar, sayt kontenti",
    saved: "Sozlamalar saqlandi ✓",
    heroSec: "Hero bo'limi", heroTitle: "Asosiy sarlavha", heroAccent: "Aksent qismi", heroHint: "Sarlavhaning ranglangan ikkinchi qismi", heroDesc: "Tavsif",
    contactSec: "Aloqa ma'lumotlari", phoneShow: "Telefon (ko'rsatish uchun)", phoneLink: "Telefon (tel: link)", email: "Email",
    officesSec: "Ofislar", addOffice: "Ofis qo'shish", officeName: "Nomi", officeAddress: "Manzil", officeLandmark: "Mo'ljal", officeMap: "Map query",
    aboutSec: "Kompaniya haqida", aboutYear: "Tashkil etilgan yil", aboutExp: "Tajriba (yil)", aboutProj: "Loyihalar soni", aboutWarranty: "Kafolat",
    socialSec: "Ijtimoiy tarmoqlar",
    btnSave: "Saqlash", btnSaving: "Saqlanmoqda..."
  },
  ru: {
    eyebrow: "Настройки", title: "Настройки сайта", subtitle: "Контакты, офисы, контент сайта",
    saved: "Настройки сохранены ✓",
    heroSec: "Секция Hero", heroTitle: "Главный заголовок", heroAccent: "Акцентная часть", heroHint: "Вторая цветная часть заголовка", heroDesc: "Описание",
    contactSec: "Контактная информация", phoneShow: "Телефон (для отображения)", phoneLink: "Телефон (ссылка tel:)", email: "Email",
    officesSec: "Офисы", addOffice: "Добавить офис", officeName: "Название", officeAddress: "Адрес", officeLandmark: "Ориентир", officeMap: "Запрос на карте",
    aboutSec: "О компании", aboutYear: "Год основания", aboutExp: "Опыт (лет)", aboutProj: "Количество проектов", aboutWarranty: "Гарантия",
    socialSec: "Социальные сети",
    btnSave: "Сохранить", btnSaving: "Сохранение..."
  },
  en: {
    eyebrow: "Settings", title: "Site Settings", subtitle: "Contacts, offices, site content",
    saved: "Settings saved ✓",
    heroSec: "Hero section", heroTitle: "Main title", heroAccent: "Accent part", heroHint: "Second colored part of the title", heroDesc: "Description",
    contactSec: "Contact information", phoneShow: "Phone (to display)", phoneLink: "Phone (tel: link)", email: "Email",
    officesSec: "Offices", addOffice: "Add office", officeName: "Name", officeAddress: "Address", officeLandmark: "Landmark", officeMap: "Map query",
    aboutSec: "About Company", aboutYear: "Founded year", aboutExp: "Experience (years)", aboutProj: "Projects count", aboutWarranty: "Warranty",
    socialSec: "Social networks",
    btnSave: "Save", btnSaving: "Saving..."
  }
};

type Settings = {
  heroTitle: string;
  heroTitleAccent: string;
  heroDesc: string;
  heroImage: string;
  phone: string;
  phoneRaw: string;
  email: string;
  offices: string;
  aboutFoundedYear: string;
  aboutExperienceYears: string;
  aboutProjectsCount: string;
  aboutWarranty: string;
  telegramUrl: string;
  whatsappUrl: string;
  instagramUrl: string;
};

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(updateSettingsAction, {});
  const { lang } = useTranslation();
  const t = dict[lang] || dict.uz;

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">{t.eyebrow}</span>
          <h1 className="admin-page-title">{t.title}</h1>
          <p className="admin-page-subtitle">{t.subtitle}</p>
        </div>
      </div>

      {state.error && (
        <div className="admin-alert admin-alert-error" style={{ marginBottom: 16 }}>
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="admin-alert admin-alert-success" style={{ marginBottom: 16 }}>
          {t.saved}
        </div>
      )}

      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">{t.heroSec}</h2>
          </div>

          <div className="admin-form-row">
            <div className="admin-field">
              <LocalizedInput name="heroTitle" defaultValue={settings.heroTitle} label={t.heroTitle} required />
            </div>
            <div className="admin-field">
              <LocalizedInput name="heroTitleAccent" defaultValue={settings.heroTitleAccent} label={t.heroAccent} />
              <span className="admin-field-hint">{t.heroHint}</span>
            </div>
          </div>

          <div className="admin-field">
            <LocalizedInput name="heroDesc" defaultValue={settings.heroDesc} label={t.heroDesc} isTextarea />
          </div>

          <div className="admin-field">
            <ImageUpload
              name="heroImage"
              defaultValue={settings.heroImage}
              label="Hero orqa fon rasm"
              hint="Bosh sahifa katta tepa fon rasmi (yuqori sifatda, kengligi 1920px+)"
            />
          </div>
        </div>

        <div className="admin-card" style={{ marginTop: 16 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">{t.contactSec}</h2>
          </div>

          <div className="admin-form-row">
            <div className="admin-field">
              <label className="admin-field-label">{t.phoneShow}</label>
              <input type="text" name="phone" className="admin-input" required defaultValue={settings.phone} placeholder="+998 78 122 75 75" />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">{t.phoneLink}</label>
              <input type="text" name="phoneRaw" className="admin-input" defaultValue={settings.phoneRaw} placeholder="+998781227575" />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-field-label">{t.email}</label>
            <input type="email" name="email" className="admin-input" required defaultValue={settings.email} placeholder="info@bismagroup.uz" />
          </div>
        </div>

        <div className="admin-card" style={{ marginTop: 16 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">{t.officesSec}</h2>
          </div>
          <ArrayEditor
            name="offices"
            initialJson={settings.offices}
            fields={[
              { name: "name", label: t.officeName, placeholder: "Markaziy ofis", localized: true },
              { name: "address", label: t.officeAddress, placeholder: "Toshkent, Yunusobod tumani, ...", grow: 2, localized: true },
              { name: "landmark", label: t.officeLandmark, placeholder: "Mustaqillik metrosi yonida", grow: 2, localized: true },
              { name: "mapsQuery", label: t.officeMap, placeholder: "Toshkent+Yunusobod" },
            ]}
            addLabel={t.addOffice}
          />
        </div>

        <div className="admin-card" style={{ marginTop: 16 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">{t.aboutSec}</h2>
          </div>

          <div className="admin-form-row">
            <div className="admin-field">
              <label className="admin-field-label">{t.aboutYear}</label>
              <input type="text" name="aboutFoundedYear" className="admin-input" defaultValue={settings.aboutFoundedYear} placeholder="2014" />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">{t.aboutExp}</label>
              <input type="text" name="aboutExperienceYears" className="admin-input" defaultValue={settings.aboutExperienceYears} placeholder="11" />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">{t.aboutProj}</label>
              <input type="text" name="aboutProjectsCount" className="admin-input" defaultValue={settings.aboutProjectsCount} placeholder="500+" />
            </div>
            <div className="admin-field">
              <LocalizedInput name="aboutWarranty" defaultValue={settings.aboutWarranty} label={t.aboutWarranty} placeholder="2 yil" />
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ marginTop: 16 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">{t.socialSec}</h2>
          </div>

          <div className="admin-form-row">
            <div className="admin-field">
              <label className="admin-field-label">Telegram URL</label>
              <input type="url" name="telegramUrl" className="admin-input" defaultValue={settings.telegramUrl} placeholder="https://t.me/..." />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">WhatsApp URL</label>
              <input type="url" name="whatsappUrl" className="admin-input" defaultValue={settings.whatsappUrl} placeholder="https://wa.me/..." />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Instagram URL</label>
              <input type="url" name="instagramUrl" className="admin-input" defaultValue={settings.instagramUrl} placeholder="https://instagram.com/..." />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
            <Save size={14} />
            {pending ? t.btnSaving : t.btnSave}
          </button>
        </div>
      </form>
      </FormLangProvider>
    </>
  );
}
