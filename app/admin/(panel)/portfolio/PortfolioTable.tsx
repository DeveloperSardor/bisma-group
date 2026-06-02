"use client";

import Link from "next/link";
import { Edit, GripVertical, Check } from "lucide-react";
import DeleteButton from "../../_shared/DeleteButton";
import { useDragOrder } from "../../_shared/useDragOrder";
import { deletePortfolioAction, reorderPortfolioAction } from "./actions";

type Portfolio = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  area: string;
  renovationType: string;
  isCommercial: boolean;
  isActive: boolean;
};

type Labels = {
  thName: string;
  thType: string;
  thArea: string;
  thStatus: string;
  statusActive: string;
  statusInactive: string;
  commercial: string;
};

export default function PortfolioTable({
  items: initial,
  labels,
}: {
  items: Portfolio[];
  labels: Labels;
}) {
  const { items, rowProps, savedHint, pending } = useDragOrder(
    initial,
    reorderPortfolioAction,
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
            <th>{labels.thName}</th>
            <th style={{ width: 130 }}>{labels.thType}</th>
            <th style={{ width: 110 }}>{labels.thArea}</th>
            <th style={{ width: 100 }}>{labels.thStatus}</th>
            <th style={{ width: 140 }} />
          </tr>
        </thead>
        <tbody>
          {items.map((p, idx) => (
            <tr key={p.id} {...rowProps(idx)} className="sortable-row">
              <td className="drag-cell"><span className="drag-grip"><GripVertical size={14} /></span></td>
              <td>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="admin-row-image"
                  style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover" }}
                />
              </td>
              <td>
                <strong style={{ fontWeight: 600 }}>{p.name}</strong>
                <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }} className="admin-truncate">
                  {p.tagline}
                </div>
              </td>
              <td>
                <span className="admin-badge admin-badge-new">
                  {p.isCommercial ? labels.commercial : p.renovationType}
                </span>
              </td>
              <td style={{ color: "var(--muted)" }}>{p.area}</td>
              <td>
                <span className={`admin-badge ${p.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                  {p.isActive ? labels.statusActive : labels.statusInactive}
                </span>
              </td>
              <td>
                <div className="row-actions">
                  <Link href={`/admin/portfolio/${p.id}`} className="admin-btn admin-btn-secondary admin-btn-icon">
                    <Edit size={14} />
                  </Link>
                  <DeleteButton action={deletePortfolioAction.bind(null, p.id)} size="icon" />
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
