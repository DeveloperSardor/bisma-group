"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import { FormLangProvider } from "../../_shared/FormLangContext";
import { useTranslation } from "../../../i18n/LangContext";
import { createMaterialAction, updateMaterialAction, deleteMaterialAction, type MatFormState } from "./actions";

type Material = { id: string; name: string; type: string; order: number; isActive: boolean };

export default function MaterialForm({ item }: { item?: Material }) {
  const { t } = useTranslation();
  const isEdit = !!item;
  const action = isEdit
    ? (s: MatFormState, fd: FormData) => updateMaterialAction(item!.id, s, fd)
    : createMaterialAction;
  const [state, formAction] = useActionState<MatFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? t("admin.materialForm.titleEdit") : t("admin.materialForm.titleNew")}
      subtitle={isEdit ? "" : t("admin.materialForm.subtitle")}
      backHref="/admin/materials"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput
              name="name"
              defaultValue={item?.name}
              label={t("admin.materialForm.name")}
              required
              placeholder={t("admin.materialForm.namePh")}
            />
          </div>
          <div className="admin-field">
            <LocalizedInput
              name="type"
              defaultValue={item?.type}
              label={t("admin.materialForm.type")}
              required
              placeholder={t("admin.materialForm.typePh")}
            />
          </div>
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
          {isEdit ? <DeleteButton action={() => deleteMaterialAction(item!.id)} /> : <span />}
          <SubmitButton />
        </div>
      </form>
      </FormLangProvider>
    </FormShell>
  );
}
