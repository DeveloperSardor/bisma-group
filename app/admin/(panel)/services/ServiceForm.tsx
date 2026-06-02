"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import ArrayEditor from "../../_shared/ArrayEditor";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import { FormLangProvider } from "../../_shared/FormLangContext";
import { ICON_OPTIONS } from "../../_shared/iconOptions";
import { useTranslation } from "../../../i18n/LangContext";
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
  const { t } = useTranslation();
  const isEdit = !!item;
  const action = isEdit
    ? (s: ServiceFormState, fd: FormData) => updateServiceAction(item!.id, s, fd)
    : createServiceAction;
  const [state, formAction] = useActionState<ServiceFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? t("admin.serviceForm.titleEdit") : t("admin.serviceForm.titleNew")}
      subtitle={t("admin.serviceForm.subtitle")}
      backHref="/admin/services"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="title" defaultValue={item?.title} label={t("admin.serviceForm.name")} required placeholder={t("admin.serviceForm.namePh")} />
          </div>
          <div className="admin-field">
            <LocalizedInput name="label" defaultValue={item?.label} label={t("admin.serviceForm.label")} placeholder={t("admin.serviceForm.labelPh")} />
          </div>
        </div>

        <div className="admin-field">
          <LocalizedInput name="shortDesc" defaultValue={item?.shortDesc} label={t("admin.serviceForm.shortDesc")} isTextarea required />
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-field-label">{t("admin.serviceForm.icon")}</label>
            <select name="icon" className="admin-select" defaultValue={item?.icon ?? "Wrench"}>
              {ICON_OPTIONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <LocalizedInput name="contactInfo" defaultValue={item?.contactInfo} label={t("admin.serviceForm.contactInfo")} placeholder={t("admin.serviceForm.contactInfoPh")} />
          </div>
        </div>

        <div className="admin-field">
          <label className="admin-field-label">{t("admin.serviceForm.bigStats")}</label>
          <ArrayEditor
            name="bigStats"
            initialJson={item?.bigStats}
            fields={[
              { name: "value", label: t("admin.serviceForm.bigStatsValue"), placeholder: t("admin.serviceForm.bigStatsValuePh"), localized: true },
              { name: "label", label: t("admin.serviceForm.bigStatsLabel"), placeholder: t("admin.serviceForm.bigStatsLabelPh"), grow: 2, localized: true },
            ]}
            addLabel={t("admin.serviceForm.bigStatsAdd")}
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">{t("admin.serviceForm.iconFeatures")}</label>
          <ArrayEditor
            name="iconFeatures"
            initialJson={item?.iconFeatures}
            fields={[
              { name: "icon", label: t("admin.serviceForm.icon"), type: "select", options: ICON_OPTIONS },
              { name: "label", label: t("admin.serviceForm.iconText"), placeholder: t("admin.serviceForm.iconTextPh"), grow: 3, localized: true },
            ]}
            addLabel={t("admin.serviceForm.iconFeaturesAdd")}
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">{t("admin.serviceForm.iconSpecs")}</label>
          <ArrayEditor
            name="iconSpecs"
            initialJson={item?.iconSpecs}
            fields={[
              { name: "icon", label: t("admin.serviceForm.icon"), type: "select", options: ICON_OPTIONS },
              { name: "label", label: t("admin.serviceForm.iconText"), placeholder: t("admin.serviceForm.iconSpecsPh"), grow: 3, localized: true },
            ]}
            addLabel={t("admin.serviceForm.iconSpecsAdd")}
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">{t("admin.serviceForm.fractions")}</label>
          <ArrayEditor
            name="fractions"
            initialJson={item?.fractions}
            fields={[
              { name: "range", label: t("admin.serviceForm.fractionsRange"), placeholder: t("admin.serviceForm.fractionsRangePh"), localized: true },
              { name: "desc", label: t("admin.serviceForm.fractionsDesc"), placeholder: t("admin.serviceForm.fractionsDescPh"), grow: 3, localized: true },
            ]}
            addLabel={t("admin.serviceForm.fractionsAdd")}
          />
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-field-label">{t("admin.common.order")}</label>
            <input type="number" name="order" className="admin-input" defaultValue={item?.order ?? 0} />
          </div>
          <div className="admin-field" style={{ justifyContent: "flex-end" }}>
            <label className="admin-checkbox">
              <input type="checkbox" name="isActive" defaultChecked={item?.isActive ?? true} />
              <span className="admin-checkbox-label">{t("admin.common.visible")}</span>
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
