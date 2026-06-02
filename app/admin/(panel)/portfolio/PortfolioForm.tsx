"use client";

import { useActionState, useState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import ArrayEditor from "../../_shared/ArrayEditor";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import ImageUpload from "../../_shared/ImageUpload";
import { FormLangProvider } from "../../_shared/FormLangContext";
import { ICON_OPTIONS } from "../../_shared/iconOptions";
import {
  createPortfolioAction,
  updatePortfolioAction,
  deletePortfolioAction,
  type PortfolioFormState,
} from "./actions";

type Portfolio = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  address: string;
  landmark: string;
  image: string;
  renovationType: string;
  duration: string;
  area: string;
  pricePerSqm: string;
  rooms: string;
  tech: string;
  docs: string;
  price: string;
  apartments: string;
  amenities: string;
  safety: string;
  matrix: string;
  advantages: string;
  paymentOptions: string;
  badge: string | null;
  isCommercial: boolean;
  commBlocks: string | null;
  commUnits: string | null;
  commStatus: string | null;
  commSize: string | null;
  commBenefits: string | null;
  order: number;
  isActive: boolean;
};

const RENOVATION_TYPES = ["Kosmetik", "Kapital", "Dizaynerlik", "Maxsus", "Tijorat"];

// Convert string[] JSON to [{value: string}] for ArrayEditor compatibility.
// Each value may itself be a localized JSON string — keep it intact so the
// editor can hydrate the per-language values.
function stringListToJson(json: string | null | undefined): string {
  if (!json) return "[]";
  try {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) return "[]";
    return JSON.stringify(arr.map((v) => ({ value: typeof v === "string" ? v : JSON.stringify(v) })));
  } catch {
    return "[]";
  }
}

export default function PortfolioForm({ item }: { item?: Portfolio }) {
  const isEdit = !!item;
  const action = isEdit
    ? (s: PortfolioFormState, fd: FormData) => updatePortfolioAction(item!.id, s, fd)
    : createPortfolioAction;
  const [state, formAction] = useActionState<PortfolioFormState, FormData>(action, {});

  const [isCommercial, setIsCommercial] = useState<boolean>(item?.isCommercial ?? false);

  return (
    <FormShell
      title={isEdit ? "Loyihani tahrirlash" : "Yangi portfolio loyiha"}
      subtitle="Saytdagi &quot;Tugatilgan loyihalar&quot; bo'limiga qo'shiladi"
      backHref="/admin/portfolio"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-form-section-title">Asosiy ma'lumotlar</div>

        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="name" defaultValue={item?.name} label="Loyiha nomi" required placeholder="Yunusobod · Dizaynerlik" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="tagline" defaultValue={item?.tagline} label="Tagline" placeholder="Klassik dizaynerlik remont — 102 m²" />
          </div>
        </div>

        <div className="admin-field">
          <LocalizedInput name="shortDesc" defaultValue={item?.shortDesc} label="Qisqa izoh" isTextarea required />
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="address" defaultValue={item?.address} label="Manzil" placeholder="Toshkent, Yunusobod tumani" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="landmark" defaultValue={item?.landmark} label="Mo'ljal" placeholder="Maktab va metro yonida" />
          </div>
        </div>

        <div className="admin-field">
          <ImageUpload
            name="image"
            defaultValue={item?.image}
            label="Asosiy rasm"
            required
            hint="Loyihaning asosiy ko'rsatish rasmi (yuqori sifatda)"
          />
          <span className="admin-field-hint">Asosiy ko'rsatish rasmi (yuqori sifatda)</span>
        </div>

        <div className="admin-form-section-title">Tijorat loyihasi sozlamasi</div>

        <div className="admin-field">
          <label className="admin-checkbox">
            <input
              type="checkbox"
              name="isCommercial"
              checked={isCommercial}
              onChange={(e) => setIsCommercial(e.target.checked)}
            />
            <span className="admin-checkbox-label">Bu — tijorat loyihasi (ofis, restoran, do'kon)</span>
          </label>
        </div>

        {isCommercial ? (
          <>
            <div className="admin-form-row">
              <div className="admin-field">
                <LocalizedInput name="commBlocks" defaultValue={item?.commBlocks ?? ""} label="Bloklar/xonalar" placeholder="Open-space · 3 alohida xona" />
              </div>
              <div className="admin-field">
                <LocalizedInput name="commUnits" defaultValue={item?.commUnits ?? ""} label="O'lcham" placeholder="180 m² maydon" />
              </div>
            </div>
            <div className="admin-form-row">
              <div className="admin-field">
                <LocalizedInput name="commStatus" defaultValue={item?.commStatus ?? ""} label="Holat" placeholder="Topshirildi" />
              </div>
              <div className="admin-field">
                <LocalizedInput name="commSize" defaultValue={item?.commSize ?? ""} label="Maydon (qisqa)" placeholder="180 m²" />
              </div>
            </div>
            <div className="admin-field">
              <LocalizedInput name="commBenefits" defaultValue={item?.commBenefits ?? ""} label="Foydalari" isTextarea placeholder="Konditsioner · LAN tarmog'i · LED yoritish" />
            </div>
          </>
        ) : null}

        <div className="admin-form-section-title">Texnik xarakteristikalar</div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-field-label">Remont turi</label>
            <select name="renovationType" className="admin-select" defaultValue={item?.renovationType ?? "Kosmetik"}>
              {RENOVATION_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <LocalizedInput name="duration" defaultValue={item?.duration} label="Muddat" placeholder="90 kun" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="area" defaultValue={item?.area} label="Maydon" placeholder="102 m²" />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="pricePerSqm" defaultValue={item?.pricePerSqm} label="Narx / m²" placeholder="$135 / m²" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="rooms" defaultValue={item?.rooms} label="Xonalar" placeholder="3 xonali" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="tech" defaultValue={item?.tech} label="Texnologiya" placeholder="Toza topshiruv" />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="docs" defaultValue={item?.docs} label="Hujjatlar" placeholder="Shartnoma · 2 yil kafolat" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="price" defaultValue={item?.price} label="Umumiy narx" placeholder="$135 / m²" />
          </div>
          <div className="admin-field">
            <LocalizedInput name="badge" defaultValue={item?.badge ?? ""} label="Badge (ixtiyoriy)" placeholder="YANGI / KOTLOVAN" />
          </div>
        </div>

        <div className="admin-form-section-title">Xonalar tarkibi</div>

        <div className="admin-field">
          <ArrayEditor
            name="apartments"
            initialJson={item?.apartments}
            fields={[
              { name: "rooms", label: "Xona", placeholder: "Yashash xonasi", localized: true },
              { name: "size", label: "Maydon", placeholder: "32 m²", localized: true },
              { name: "plan", label: "Reja / uslub", placeholder: "Klassik", grow: 2, localized: true },
            ]}
            addLabel="Xona qo'shish"
          />
        </div>

        <div className="admin-form-section-title">Imkoniyatlar (amenities)</div>

        <div className="admin-field">
          <ArrayEditor
            name="amenities"
            initialJson={item?.amenities}
            fields={[
              { name: "icon", label: "Ikonka", type: "select", options: ICON_OPTIONS },
              { name: "label", label: "Tavsif", placeholder: "3D dizayn-loyiha", grow: 3, localized: true },
            ]}
            addLabel="Imkoniyat qo'shish"
          />
        </div>

        <div className="admin-form-section-title">Xavfsizlik / sifat</div>

        <div className="admin-field">
          <ArrayEditor
            name="safety"
            initialJson={item?.safety}
            fields={[
              { name: "icon", label: "Ikonka", type: "select", options: ICON_OPTIONS },
              { name: "label", label: "Tavsif", placeholder: "Foto · video hisobot", grow: 3, localized: true },
            ]}
            addLabel="Xavfsizlik qo'shish"
          />
        </div>

        <div className="admin-form-section-title">Kim uchun mos (matrix)</div>

        <div className="admin-field">
          <ArrayEditor
            name="matrix"
            initialJson={item?.matrix}
            fields={[
              { name: "icon", label: "Ikonka", type: "select", options: ICON_OPTIONS },
              { name: "type", label: "Kim uchun", placeholder: "Yosh oilalar", localized: true },
              { name: "solution", label: "Yechim", placeholder: "Bolalar xonasi alohida loyihalandi", grow: 2, localized: true },
            ]}
            addLabel="Variant qo'shish"
          />
        </div>

        <div className="admin-form-section-title">Afzalliklar va to'lov</div>

        <div className="admin-field">
          <label className="admin-field-label">Afzalliklar ro'yxati</label>
          <ArrayEditor
            name="advantages"
            initialJson={stringListToJson(item?.advantages)}
            fields={[{ name: "value", label: "Afzallik", placeholder: "3D loyiha asosida bajarildi", grow: 1, localized: true }]}
            addLabel="Afzallik qo'shish"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">To'lov variantlari</label>
          <ArrayEditor
            name="paymentOptions"
            initialJson={stringListToJson(item?.paymentOptions)}
            fields={[{ name: "value", label: "Variant", placeholder: "Naqd", grow: 1, localized: true }]}
            addLabel="To'lov turini qo'shish"
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
          {isEdit ? <DeleteButton action={() => deletePortfolioAction(item!.id)} /> : <span />}
          <SubmitButton />
        </div>
      </form>
      </FormLangProvider>
    </FormShell>
  );
}
