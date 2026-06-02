"use client";

import { useActionState, useState } from "react";
import { FormShell, SubmitButton } from "../../_shared/FormShell";
import DeleteButton from "../../_shared/DeleteButton";
import ArrayEditor from "../../_shared/ArrayEditor";
import { LocalizedInput } from "../../_shared/LocalizedInput";
import ImageUpload from "../../_shared/ImageUpload";
import { FormLangProvider } from "../../_shared/FormLangContext";
import { ICON_OPTIONS } from "../../_shared/iconOptions";
import { useTranslation } from "../../../i18n/LangContext";
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
  const { t } = useTranslation();
  const isEdit = !!item;
  const action = isEdit
    ? (s: PortfolioFormState, fd: FormData) => updatePortfolioAction(item!.id, s, fd)
    : createPortfolioAction;
  const [state, formAction] = useActionState<PortfolioFormState, FormData>(action, {});

  const [isCommercial, setIsCommercial] = useState<boolean>(item?.isCommercial ?? false);

  return (
    <FormShell
      title={isEdit ? t("admin.portfolioForm.titleEdit") : t("admin.portfolioForm.titleNew")}
      subtitle={t("admin.portfolioForm.subtitle")}
      backHref="/admin/portfolio"
      alert={state.error ? { type: "error", message: state.error } : null}
    >
      <FormLangProvider>
      <form action={formAction} className="admin-form">
        <div className="admin-form-section-title">{t("admin.portfolioForm.sectionMain")}</div>

        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="name" defaultValue={item?.name} label={t("admin.portfolioForm.name")} required placeholder={t("admin.portfolioForm.namePh")} />
          </div>
          <div className="admin-field">
            <LocalizedInput name="tagline" defaultValue={item?.tagline} label={t("admin.portfolioForm.tagline")} placeholder={t("admin.portfolioForm.taglinePh")} />
          </div>
        </div>

        <div className="admin-field">
          <LocalizedInput name="shortDesc" defaultValue={item?.shortDesc} label={t("admin.portfolioForm.shortDesc")} isTextarea required />
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="address" defaultValue={item?.address} label={t("admin.portfolioForm.address")} placeholder={t("admin.portfolioForm.addressPh")} />
          </div>
          <div className="admin-field">
            <LocalizedInput name="landmark" defaultValue={item?.landmark} label={t("admin.portfolioForm.landmark")} placeholder={t("admin.portfolioForm.landmarkPh")} />
          </div>
        </div>

        <div className="admin-field">
          <ImageUpload
            name="image"
            defaultValue={item?.image}
            label={t("admin.portfolioForm.image")}
            required
            hint={t("admin.portfolioForm.imageHint")}
          />
        </div>

        <div className="admin-form-section-title">{t("admin.portfolioForm.sectionCommercial")}</div>

        <div className="admin-field">
          <label className="admin-checkbox">
            <input
              type="checkbox"
              name="isCommercial"
              checked={isCommercial}
              onChange={(e) => setIsCommercial(e.target.checked)}
            />
            <span className="admin-checkbox-label">{t("admin.portfolioForm.isCommercial")}</span>
          </label>
        </div>

        {isCommercial ? (
          <>
            <div className="admin-form-row">
              <div className="admin-field">
                <LocalizedInput name="commBlocks" defaultValue={item?.commBlocks ?? ""} label={t("admin.portfolioForm.commBlocks")} placeholder={t("admin.portfolioForm.commBlocksPh")} />
              </div>
              <div className="admin-field">
                <LocalizedInput name="commUnits" defaultValue={item?.commUnits ?? ""} label={t("admin.portfolioForm.commUnits")} placeholder={t("admin.portfolioForm.commUnitsPh")} />
              </div>
            </div>
            <div className="admin-form-row">
              <div className="admin-field">
                <LocalizedInput name="commStatus" defaultValue={item?.commStatus ?? ""} label={t("admin.portfolioForm.commStatus")} placeholder={t("admin.portfolioForm.commStatusPh")} />
              </div>
              <div className="admin-field">
                <LocalizedInput name="commSize" defaultValue={item?.commSize ?? ""} label={t("admin.portfolioForm.commSize")} placeholder="180 m²" />
              </div>
            </div>
            <div className="admin-field">
              <LocalizedInput name="commBenefits" defaultValue={item?.commBenefits ?? ""} label={t("admin.portfolioForm.commBenefits")} isTextarea placeholder={t("admin.portfolioForm.commBenefitsPh")} />
            </div>
          </>
        ) : null}

        <div className="admin-form-section-title">{t("admin.portfolioForm.sectionTech")}</div>

        <div className="admin-form-row">
          <div className="admin-field">
            <label className="admin-field-label">{t("admin.portfolioForm.renovationType")}</label>
            <select name="renovationType" className="admin-select" defaultValue={item?.renovationType ?? "Kosmetik"}>
              {RENOVATION_TYPES.map((rt) => (
                <option key={rt} value={rt}>{rt}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <LocalizedInput name="duration" defaultValue={item?.duration} label={t("admin.portfolioForm.duration")} placeholder={t("admin.portfolioForm.durationPh")} />
          </div>
          <div className="admin-field">
            <LocalizedInput name="area" defaultValue={item?.area} label={t("admin.portfolioForm.area")} placeholder={t("admin.portfolioForm.areaPh")} />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="pricePerSqm" defaultValue={item?.pricePerSqm} label={t("admin.portfolioForm.pricePerSqm")} placeholder={t("admin.portfolioForm.pricePerSqmPh")} />
          </div>
          <div className="admin-field">
            <LocalizedInput name="rooms" defaultValue={item?.rooms} label={t("admin.portfolioForm.rooms")} placeholder={t("admin.portfolioForm.roomsPh")} />
          </div>
          <div className="admin-field">
            <LocalizedInput name="tech" defaultValue={item?.tech} label={t("admin.portfolioForm.tech")} placeholder={t("admin.portfolioForm.techPh")} />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-field">
            <LocalizedInput name="docs" defaultValue={item?.docs} label={t("admin.portfolioForm.docs")} placeholder={t("admin.portfolioForm.docsPh")} />
          </div>
          <div className="admin-field">
            <LocalizedInput name="price" defaultValue={item?.price} label={t("admin.portfolioForm.price")} placeholder={t("admin.portfolioForm.pricePerSqmPh")} />
          </div>
          <div className="admin-field">
            <LocalizedInput name="badge" defaultValue={item?.badge ?? ""} label={t("admin.portfolioForm.badge")} placeholder={t("admin.portfolioForm.badgePh")} />
          </div>
        </div>

        <div className="admin-form-section-title">{t("admin.portfolioForm.sectionApartments")}</div>

        <div className="admin-field">
          <ArrayEditor
            name="apartments"
            initialJson={item?.apartments}
            fields={[
              { name: "rooms", label: t("admin.portfolioForm.apartmentsRoom"), placeholder: t("admin.portfolioForm.apartmentsRoomPh"), localized: true },
              { name: "size", label: t("admin.portfolioForm.apartmentsSize"), placeholder: t("admin.portfolioForm.apartmentsSizePh"), localized: true },
              { name: "plan", label: t("admin.portfolioForm.apartmentsPlan"), placeholder: t("admin.portfolioForm.apartmentsPlanPh"), grow: 2, localized: true },
            ]}
            addLabel={t("admin.portfolioForm.apartmentsAdd")}
          />
        </div>

        <div className="admin-form-section-title">{t("admin.portfolioForm.sectionAmenities")}</div>

        <div className="admin-field">
          <ArrayEditor
            name="amenities"
            initialJson={item?.amenities}
            fields={[
              { name: "icon", label: t("admin.portfolioForm.iconLabel"), type: "select", options: ICON_OPTIONS },
              { name: "label", label: t("admin.portfolioForm.labelGeneric"), placeholder: t("admin.portfolioForm.amenitiesPh"), grow: 3, localized: true },
            ]}
            addLabel={t("admin.portfolioForm.amenitiesAdd")}
          />
        </div>

        <div className="admin-form-section-title">{t("admin.portfolioForm.sectionSafety")}</div>

        <div className="admin-field">
          <ArrayEditor
            name="safety"
            initialJson={item?.safety}
            fields={[
              { name: "icon", label: t("admin.portfolioForm.iconLabel"), type: "select", options: ICON_OPTIONS },
              { name: "label", label: t("admin.portfolioForm.labelGeneric"), placeholder: t("admin.portfolioForm.safetyPh"), grow: 3, localized: true },
            ]}
            addLabel={t("admin.portfolioForm.safetyAdd")}
          />
        </div>

        <div className="admin-form-section-title">{t("admin.portfolioForm.sectionMatrix")}</div>

        <div className="admin-field">
          <ArrayEditor
            name="matrix"
            initialJson={item?.matrix}
            fields={[
              { name: "icon", label: t("admin.portfolioForm.iconLabel"), type: "select", options: ICON_OPTIONS },
              { name: "type", label: t("admin.portfolioForm.matrixType"), placeholder: t("admin.portfolioForm.matrixTypePh"), localized: true },
              { name: "solution", label: t("admin.portfolioForm.matrixSolution"), placeholder: t("admin.portfolioForm.matrixSolutionPh"), grow: 2, localized: true },
            ]}
            addLabel={t("admin.portfolioForm.matrixAdd")}
          />
        </div>

        <div className="admin-form-section-title">{t("admin.portfolioForm.sectionAdvPay")}</div>

        <div className="admin-field">
          <label className="admin-field-label">{t("admin.portfolioForm.advantages")}</label>
          <ArrayEditor
            name="advantages"
            initialJson={stringListToJson(item?.advantages)}
            fields={[{ name: "value", label: t("admin.portfolioForm.labelGeneric"), placeholder: t("admin.portfolioForm.advantagesPh"), grow: 1, localized: true }]}
            addLabel={t("admin.portfolioForm.advantagesAdd")}
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">{t("admin.portfolioForm.paymentOptions")}</label>
          <ArrayEditor
            name="paymentOptions"
            initialJson={stringListToJson(item?.paymentOptions)}
            fields={[{ name: "value", label: t("admin.portfolioForm.labelGeneric"), placeholder: t("admin.portfolioForm.paymentOptionsPh"), grow: 1, localized: true }]}
            addLabel={t("admin.portfolioForm.paymentOptionsAdd")}
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
          {isEdit ? <DeleteButton action={() => deletePortfolioAction(item!.id)} /> : <span />}
          <SubmitButton />
        </div>
      </form>
      </FormLangProvider>
    </FormShell>
  );
}
