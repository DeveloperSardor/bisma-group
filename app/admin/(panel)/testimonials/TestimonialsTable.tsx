"use client";

import Link from "next/link";
import { Edit, GripVertical, Check } from "lucide-react";
import DeleteButton from "../../_shared/DeleteButton";
import { useDragOrder } from "../../_shared/useDragOrder";
import { deleteTestimonialAction, reorderTestimonialsAction } from "./actions";

type Testimonial = {
  id: string;
  author: string;
  age: string;
  quote: string;
  category: string;
  avatar: string;
  isActive: boolean;
};

type Labels = {
  thAuthor: string;
  thQuote: string;
  thCategory: string;
  thStatus: string;
  statusActive: string;
  statusInactive: string;
};

export default function TestimonialsTable({
  items: initial,
  labels,
}: {
  items: Testimonial[];
  labels: Labels;
}) {
  const { items, rowProps, savedHint, pending } = useDragOrder(
    initial,
    reorderTestimonialsAction,
  );

  return (
    <div className="admin-table-wrap sortable-wrap">
      {(pending || savedHint) && (
        <div className={`reorder-hint ${savedHint ? "is-saved" : ""}`}>
          {savedHint ? (<><Check size={12} /> Tartib saqlandi</>) : "Saqlanmoqda..."}
        </div>
      )}
      <table className="admin-table sortable-table">
        <thead>
          <tr>
            <th style={{ width: 40 }} />
            <th style={{ width: 70 }} />
            <th>{labels.thAuthor}</th>
            <th>{labels.thQuote}</th>
            <th style={{ width: 130 }}>{labels.thCategory}</th>
            <th style={{ width: 100 }}>{labels.thStatus}</th>
            <th style={{ width: 140 }} />
          </tr>
        </thead>
        <tbody>
          {items.map((t, idx) => (
            <tr key={t.id} {...rowProps(idx)} className="sortable-row">
              <td className="drag-cell"><span className="drag-grip"><GripVertical size={14} /></span></td>
              <td>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.author} className="admin-row-image" style={{ width: 38, height: 38, borderRadius: "50%" }} />
              </td>
              <td>
                <strong style={{ fontWeight: 600 }}>{t.author}</strong>
                <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>{t.age}</div>
              </td>
              <td><span className="admin-truncate">{t.quote}</span></td>
              <td><span className="admin-badge admin-badge-new">{t.category}</span></td>
              <td>
                <span className={`admin-badge ${t.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                  {t.isActive ? labels.statusActive : labels.statusInactive}
                </span>
              </td>
              <td>
                <div className="row-actions">
                  <Link href={`/admin/testimonials/${t.id}`} className="admin-btn admin-btn-secondary admin-btn-icon">
                    <Edit size={14} />
                  </Link>
                  <DeleteButton action={deleteTestimonialAction.bind(null, t.id)} size="icon" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .sortable-wrap { position: relative; }
        .reorder-hint {
          position: absolute; top: -36px; right: 0;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; font-size: 12px; font-weight: 600;
          color: #6b6b6f; background: #fff;
          border: 1px solid rgba(0,0,0,0.08); border-radius: 100px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06); z-index: 5;
        }
        .reorder-hint.is-saved { color: #1d7d3a; background: #e8f7ec; border-color: #b9e6c6; }
      `}</style>
    </div>
  );
}
