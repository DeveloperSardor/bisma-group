"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Save } from "lucide-react";
import DeleteButton from "../../../_shared/DeleteButton";
import { updateSubmissionAction, deleteSubmissionAction, type InboxFormState } from "../actions";

type Submission = {
  id: string;
  name: string;
  phone: string;
  project: string | null;
  type: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function InboxDetail({ item }: { item: Submission }) {
  const action = (s: InboxFormState, fd: FormData) => updateSubmissionAction(item.id, s, fd);
  const [state, formAction, pending] = useActionState<InboxFormState, FormData>(action, {});

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <Link href="/admin/inbox" className="admin-back-link">
            <ArrowLeft size={12} /> Arizalar ro'yxati
          </Link>
          <h1 className="admin-page-title">{item.name}</h1>
          <p className="admin-page-subtitle">
            <Calendar size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
            {new Date(item.createdAt).toLocaleString("uz-UZ", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <a href={`tel:${item.phone}`} className="admin-btn admin-btn-primary">
          <Phone size={14} /> {item.phone}
        </a>
      </div>

      {state.error && (
        <div className="admin-alert admin-alert-error" style={{ marginBottom: 16 }}>
          {state.error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }} className="admin-detail-grid">
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Ariza tafsilotlari</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", rowGap: 12, columnGap: 12, fontSize: 13 }}>
            <span style={{ color: "var(--muted)", fontWeight: 600 }}>Ism</span>
            <span>{item.name}</span>

            <span style={{ color: "var(--muted)", fontWeight: 600 }}>Telefon</span>
            <a href={`tel:${item.phone}`} className="admin-mono" style={{ color: "var(--cyan)" }}>
              {item.phone}
            </a>

            <span style={{ color: "var(--muted)", fontWeight: 600 }}>Loyiha turi</span>
            <span>{item.project || "—"}</span>

            <span style={{ color: "var(--muted)", fontWeight: 600 }}>Ob'ekt turi</span>
            <span>{item.type || "—"}</span>

            {item.message ? (
              <>
                <span style={{ color: "var(--muted)", fontWeight: 600 }}>Xabar</span>
                <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{item.message}</p>
              </>
            ) : null}
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Holatni boshqarish</h2>
          </div>

          <form action={formAction} className="admin-form">
            <div className="admin-field">
              <label className="admin-field-label">Holat</label>
              <select name="status" className="admin-select" defaultValue={item.status}>
                <option value="new">Yangi</option>
                <option value="contacted">Aloqada</option>
                <option value="archived">Arxiv</option>
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Ichki izoh</label>
              <textarea
                name="notes"
                className="admin-textarea"
                rows={5}
                defaultValue={item.notes ?? ""}
                placeholder="Adminstrator uchun eslatmalar..."
              />
            </div>

            <div className="admin-form-footer">
              <DeleteButton action={() => deleteSubmissionAction(item.id)} />
              <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
                <Save size={14} />
                {pending ? "Saqlanmoqda..." : "Saqlash"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
