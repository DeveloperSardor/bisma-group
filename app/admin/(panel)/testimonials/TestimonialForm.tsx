"use client";

import { useActionState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import ImageUpload from "../../_shared/ImageUpload";
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
  const isEdit = !!item;
  const action = isEdit
    ? (s: TestimonialFormState, fd: FormData) => updateTestimonialAction(item!.id, s, fd)
    : createTestimonialAction;
  const [state, formAction] = useActionState<TestimonialFormState, FormData>(action, {});

  return (
    <FormShell
      title={isEdit ? "Sharhni tahrirlash" : "Yangi sharh qo'shish"}
      subtitle="Saytdagi mijoz sharhlari (slayder)"
      backHref="/admin/testimonials"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <form action={formAction} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="author" defaultValue={item?.author} label="Muallif" required placeholder="Masalan: Odiljon va Shahnoza" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="category" defaultValue={item?.category} label="Kategoriya (tab nomi)" required placeholder="Masalan: Yosh oilalar" />
          </div>
        </div>
        <div className="admin-field">
          <LocalizedInput name="age" defaultValue={item?.age} label="Yosh / loyiha tafsilotlari" placeholder="Masalan: Kosmetik remont · 58 m²" />
        </div>
        <div className="admin-field">
          <LocalizedInput name="quote" defaultValue={item?.quote} label="Sharh matni" isTextarea required />
        </div>
        <div className="admin-field">
          <LocalizedInput name="result" defaultValue={item?.result} label="Natija (pastdagi yashil banner)" placeholder="Masalan: 30 kunda topshirildi" />
        </div>
        <div className="admin-field">
          <ImageUpload
            name="avatar"
            defaultValue={item?.avatar}
            label="Avatar (mijoz rasmi)"
            hint="Otzyv slayderida ko'rinadigan kichik avatar"
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
          {isEdit ? <DeleteButton action={() => deleteTestimonialAction(item!.id)} /> : <span />}
          <SubmitButton />
        </div>
      </form>
    </FormShell>
  );
}
