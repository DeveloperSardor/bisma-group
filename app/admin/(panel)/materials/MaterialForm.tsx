"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import { createMaterialAction, updateMaterialAction, deleteMaterialAction, type MatFormState } from "./actions";

type Material = { id: string; name: string; type: string; order: number; isActive: boolean };

export default function MaterialForm({ item }: { item?: Material }) {
  const isEdit = !!item;
  const action = isEdit
    ? (s: MatFormState, fd: FormData) => updateMaterialAction(item!.id, s, fd)
    : createMaterialAction;
  const [state, formAction] = useActionState<MatFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? "Brendni tahrirlash" : "Yangi material brendi"}
      subtitle={isEdit ? "" : "Sertifikatlangan material yetkazib beruvchi"}
      backHref="/admin/materials"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <form action={formAction} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput
              name="name"
              defaultValue={item?.name}
              label="Brend nomi"
              required
              placeholder="Masalan: Knauf"
            />
          </div>
          <div className="admin-field">
            <LocalizedInput
              name="type"
              defaultValue={item?.type}
              label="Tur / kategoriya"
              required
              placeholder="Masalan: Shpaklyovka · gips"
            />
          </div>
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
          {isEdit ? <DeleteButton action={() => deleteMaterialAction(item!.id)} /> : <span />}
          <SubmitButton />
        </div>
      </form>
    </FormShell>
  );
}
