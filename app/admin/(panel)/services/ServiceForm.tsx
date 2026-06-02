"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import ArrayEditor from "../../_shared/ArrayEditor";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import { FormLangProvider } from "../../_shared/FormLangContext";
import { ICON_OPTIONS } from "../../_shared/iconOptions";
import {
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
  type ServiceFormState,
} from "./actions";

type Service = {
  id: string;
  slug: string;
  title: string;
  label: string;
  shortDesc: string;
  icon: string;
  bigStats: string;
  iconFeatures: string;
  iconSpecs: string | null;
  fractions: string | null;
  contactInfo: string;
  order: number;
  isActive: boolean;
};

export default function ServiceForm({ item }: { item?: Service }) {
  const isEdit = !!item;
  const action = isEdit
    ? (s: ServiceFormState, fd: FormData) => updateServiceAction(item!.id, s, fd)
    : createServiceAction;
  const [state, formAction] = useActionState<ServiceFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? "Xizmatni tahrirlash" : "Yangi xizmat turi"}
      subtitle="Saytdagi &quot;Xizmatlarimiz&quot; bo'limiga qo'shiladi"
      backHref="/admin/services"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="title" defaultValue={item?.title} label="Nomi" required placeholder="Masalan: Kosmetik remont" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="label" defaultValue={item?.label} label="Header label" placeholder="Masalan: TEZKOR YANGILANISH" />
          </div>
        </div>

        <div className="admin-field">
          <LocalizedInput name="shortDesc" defaultValue={item?.shortDesc} label="Qisqa izoh" isTextarea required />
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-field-label">Ikonka</label>
            <select name="icon" className="admin-select" defaultValue={item?.icon ?? "Wrench"}>
              {ICON_OPTIONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <LocalizedInput name="contactInfo" defaultValue={item?.contactInfo} label="Aloqa ma'lumoti" placeholder="+998 78 122 75 75 · Bepul chiqim" />
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Katta statistikalar</label>
          <ArrayEditor
            name="bigStats"
            initialJson={item?.bigStats}
            fields={[
              { name: "value", label: "Qiymat", placeholder: "$80–120", localized: true },
              { name: "label", label: "Tavsif", placeholder: "1 m² narxi", grow: 2, localized: true },
            ]}
            addLabel="Statistika qo'shish"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Asosiy xususiyatlar (ikonka + matn)</label>
          <ArrayEditor
            name="iconFeatures"
            initialJson={item?.iconFeatures}
            fields={[
              { name: "icon", label: "Ikonka", type: "select", options: ICON_OPTIONS },
              { name: "label", label: "Matn", placeholder: "Devor va shift bo'yog'i", grow: 3, localized: true },
            ]}
            addLabel="Xususiyat qo'shish"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Texnik tafsilotlar (ixtiyoriy)</label>
          <ArrayEditor
            name="iconSpecs"
            initialJson={item?.iconSpecs}
            fields={[
              { name: "icon", label: "Ikonka", type: "select", options: ICON_OPTIONS },
              { name: "label", label: "Matn", placeholder: "Demontaj ishlari", grow: 3, localized: true },
            ]}
            addLabel="Tafsilot qo'shish"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Bo'limlar (ixtiyoriy)</label>
          <ArrayEditor
            name="fractions"
            initialJson={item?.fractions}
            fields={[
              { name: "range", label: "Bo'lim", placeholder: "Hammom", localized: true },
              { name: "desc", label: "Tavsif", placeholder: "Plitka, gidroizolyatsiya...", grow: 3, localized: true },
            ]}
            addLabel="Bo'lim qo'shish"
          />
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-field-label">Tartib</label>
            <input type="number" name="order" className="admin-input" defaultValue={item?.order ?? 0} />
          </div>
          <div className="admin-field" style={{ justifyContent: "flex-end" }}>
            <label className="admin-checkbox">
              <input type="checkbox" name="isActive" defaultChecked={item?.isActive ?? true} />
              <span className="admin-checkbox-label">Saytda ko'rsatilsin</span>
            </label>
          </div>
        </div>

        <div className="admin-form-footer">
          {isEdit ? <DeleteButton action={() => deleteServiceAction(item!.id)} /> : <span />}
          <SubmitButton />
        </div>
      </form>
      </FormLangProvider>
    </FormShell>
  );
}
