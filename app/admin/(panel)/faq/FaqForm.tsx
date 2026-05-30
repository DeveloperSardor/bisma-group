"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import { createFaqAction, updateFaqAction, deleteFaqAction, type FaqFormState } from "./actions";

type Faq = {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
};

export default function FaqForm({ faq }: { faq?: Faq }) {
  const isEdit = !!faq;
  const action = isEdit
    ? (state: FaqFormState, formData: FormData) => updateFaqAction(faq!.id, state, formData)
    : createFaqAction;
  const [state, formAction] = useActionState<FaqFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? "FAQ tahrirlash" : "Yangi savol qo'shish"}
      subtitle={isEdit ? "Mavjud savolni o'zgartiring" : "Saytdagi FAQ bo'limiga yangi savol qo'shing"}
      backHref="/admin/faq"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <form action={formAction} className="admin-form">
        <div className="admin-field">
          <LocalizedInput
            name="question"
            defaultValue={faq?.question}
            label="Savol"
            required
            placeholder="Masalan: Kvartira remonti qancha vaqt davom etadi?"
          />
        </div>
        <div className="admin-field">
          <LocalizedInput
            name="answer"
            defaultValue={faq?.answer}
            label="Javob"
            isTextarea
            required
            placeholder="Batafsil javob..."
          />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-field-label">Tartib raqami</label>
            <input
              type="number"
              name="order"
              className="admin-input"
              defaultValue={faq?.order ?? 0}
            />
            <span className="admin-field-hint">Kichikroq raqam yuqorida turadi</span>
          </div>
          <div className="admin-field" style={{ justifyContent: "flex-end" }}>
            <label className="admin-checkbox">
              <input type="checkbox" name="isActive" defaultChecked={faq?.isActive ?? true} />
              <span className="admin-checkbox-label">Saytda ko'rsatilsin</span>
            </label>
          </div>
        </div>

        <div className="admin-form-footer">
          {isEdit ? (
            <DeleteButton action={() => deleteFaqAction(faq!.id)} />
          ) : (
            <span />
          )}
          <SubmitButton />
        </div>
      </form>
    </FormShell>
  );
}
