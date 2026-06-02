"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import ImageUpload from "../../_shared/ImageUpload";
import { FormLangProvider } from "../../_shared/FormLangContext";
import { useTranslation } from "../../../i18n/LangContext";
import {
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
  type TestimonialFormState,
} from "./actions";

type Testimonial = {
  id: string;
  category: string;
  author: string;
  age: string;
  quote: string;
  result: string;
  avatar: string;
  order: number;
  isActive: boolean;
};

export default function TestimonialForm({ item }: { item?: Testimonial }) {
  const { t } = useTranslation();
  const isEdit = !!item;
  const action = isEdit
    ? (s: TestimonialFormState, fd: FormData) => updateTestimonialAction(item!.id, s, fd)
    : createTestimonialAction;
  const [state, formAction] = useActionState<TestimonialFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? t("admin.testimonialForm.titleEdit") : t("admin.testimonialForm.titleNew")}
      subtitle={t("admin.testimonialForm.subtitle")}
      backHref="/admin/testimonials"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput
              name="author"
              defaultValue={item?.author}
              label={t("admin.testimonialForm.author")}
              required
              placeholder={t("admin.testimonialForm.authorPh")}
            />
          </div>
          <div className="admin-field">
            <LocalizedInput
              name="category"
              defaultValue={item?.category}
              label={t("admin.testimonialForm.category")}
              required
              placeholder={t("admin.testimonialForm.categoryPh")}
            />
          </div>
        </div>
        <div className="admin-field">
          <LocalizedInput
            name="age"
            defaultValue={item?.age}
            label={t("admin.testimonialForm.age")}
            placeholder={t("admin.testimonialForm.agePh")}
          />
        </div>
        <div className="admin-field">
          <LocalizedInput
            name="quote"
            defaultValue={item?.quote}
            label={t("admin.testimonialForm.quote")}
            isTextarea
            required
          />
        </div>
        <div className="admin-field">
          <LocalizedInput
            name="result"
            defaultValue={item?.result}
            label={t("admin.testimonialForm.result")}
            placeholder={t("admin.testimonialForm.resultPh")}
          />
        </div>
        <div className="admin-field">
          <ImageUpload
            name="avatar"
            defaultValue={item?.avatar}
            label={t("admin.testimonialForm.avatar")}
            hint={t("admin.testimonialForm.avatarHint")}
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
          {isEdit ? <DeleteButton action={() => deleteTestimonialAction(item!.id)} /> : <span />}
          <SubmitButton />
        </div>
      </form>
      </FormLangProvider>
    </FormShell>
  );
}
