"use client";

import Link from "next/link";
import { Edit, GripVertical, Check } from "lucide-react";
import DeleteButton from "../../_shared/DeleteButton";
import { useDragOrder } from "../../_shared/useDragOrder";
import { deleteFaqAction, reorderFaqsAction } from "./actions";

type Faq = { id: string; question: string; answer: string; isActive: boolean };
type Labels = { thQuestion: string; thStatus: string; statusActive: string; statusInactive: string };

export default function FaqTable({ items: initial, labels }: { items: Faq[]; labels: Labels }) {
  const { items, rowProps, savedHint, pending } = useDragOrder(initial, reorderFaqsAction);

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
            <th>{labels.thQuestion}</th>
            <th style={{ width: 130 }}>{labels.thStatus}</th>
            <th style={{ width: 140 }} />
          </tr>
        </thead>
        <tbody>
          {items.map((f, idx) => (
            <tr key={f.id} {...rowProps(idx)} className="sortable-row">
              <td className="drag-cell"><span className="drag-grip"><GripVertical size={14} /></span></td>
              <td>
                <strong style={{ fontWeight: 600 }}>{f.question}</strong>
                <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }} className="admin-truncate">
                  {f.answer}
                </div>
              </td>
              <td>
                <span className={`admin-badge ${f.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                  {f.isActive ? labels.statusActive : labels.statusInactive}
                </span>
              </td>
              <td>
                <div className="row-actions">
                  <Link href={`/admin/faq/${f.id}`} className="admin-btn admin-btn-secondary admin-btn-icon">
                    <Edit size={14} />
                  </Link>
                  <DeleteButton action={deleteFaqAction.bind(null, f.id)} size="icon" />
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
