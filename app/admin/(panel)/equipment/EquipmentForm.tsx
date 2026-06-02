"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import { FormLangProvider } from "../../_shared/FormLangContext";
import { ICON_OPTIONS } from "../../_shared/iconOptions";
import { useTranslation } from "../../../i18n/LangContext";
import { createEquipmentAction, updateEquipmentAction, deleteEquipmentAction, type EqFormState } from "./actions";

type Equipment = { id: string; name: string; desc: string; icon: string; order: number; isActive: boolean };

export default function EquipmentForm({ item }: { item?: Equipment }) {
  const { t } = useTranslation();
  const isEdit = !!item;
  const action = isEdit
    ? (s: EqFormState, fd: FormData) => updateEquipmentAction(item!.id, s, fd)
    : createEquipmentAction;
  const [state, formAction] = useActionState<EqFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? t("admin.equipmentForm.titleEdit") : t("admin.equipmentForm.titleNew")}
      subtitle={t("admin.equipmentForm.subtitle")}
      backHref="/admin/equipment"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput
              name="name"
              defaultValue={item?.name}
              label={t("admin.equipmentForm.name")}
              required
              placeholder={t("admin.equipmentForm.namePh")}
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">{t("admin.equipmentForm.icon")}</label>
            <select name="icon" className="admin-select" defaultValue={item?.icon ?? "Wrench"}>
              {ICON_OPTIONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <span className="admin-field-hint">{t("admin.equipmentForm.iconHint")}</span>
          </div>
        </div>
        <div className="admin-field">
          <LocalizedInput
            name="desc"
            defaultValue={item?.desc}
            label={t("admin.equipmentForm.desc")}
            isTextarea
            required
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
          {isEdit ? <DeleteButton action={() => deleteEquipmentAction(item!.id)} /> : <span />}
          <SubmitButton />
        </div>
      </form>
      </FormLangProvider>
    </FormShell>
  );
}
