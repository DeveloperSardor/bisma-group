"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import { FormLangProvider } from "../../_shared/FormLangContext";
import { useTranslation } from "../../../i18n/LangContext";
import { createFaqAction, updateFaqAction, deleteFaqAction, type FaqFormState } from "./actions";

type Faq = {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
};

export default function FaqForm({ faq }: { faq?: Faq }) {
  const { t } = useTranslation();
  const isEdit = !!faq;
  const action = isEdit
    ? (state: FaqFormState, formData: FormData) => updateFaqAction(faq!.id, state, formData)
    : createFaqAction;
  const [state, formAction] = useActionState<FaqFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? t("admin.faqForm.titleEdit") : t("admin.faqForm.titleNew")}
      subtitle={t("admin.faqForm.subtitle")}
      backHref="/admin/faq"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-field">
          <LocalizedInput
            name="question"
            defaultValue={faq?.question}
            label={t("admin.faqForm.question")}
            required
            placeholder={t("admin.faqForm.questionPh")}
          />
        </div>
        <div className="admin-field">
          <LocalizedInput
            name="answer"
            defaultValue={faq?.answer}
            label={t("admin.faqForm.answer")}
            isTextarea
            required
            placeholder={t("admin.faqForm.answerPh")}
          />
        </div>
        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-field-label">{t("admin.common.order")}</label>
            <input
              type="number"
              name="order"
              className="admin-input"
              defaultValue={faq?.order ?? 0}
            />
            <span className="admin-field-hint">{t("admin.common.orderHint")}</span>
          </div>
          <div className="admin-field" style={{ justifyContent: "flex-end" }}>
            <label className="admin-checkbox">
              <input type="checkbox" name="isActive" defaultChecked={faq?.isActive ?? true} />
              <span className="admin-checkbox-label">{t("admin.common.visible")}</span>
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
      </FormLangProvider>
    </FormShell>
  );
}
