"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

export function FormShell({
  title,
  subtitle,
  backHref,
  children,
  onDelete,
  alert,
}: {
  title: string;
  subtitle?: string;
  backHref: string;
  children: React.ReactNode;
  onDelete?: () => void;
  alert?: { type: "error" | "success"; message: string } | null;
}) {
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <Link href={backHref} className="admin-back-link">
            <ArrowLeft size={12} /> Orqaga
          </Link>
          <h1 className="admin-page-title">{title}</h1>
          {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
        </div>
      </div>

      {alert && (
        <div className={`admin-alert admin-alert-${alert.type}`} style={{ marginBottom: 16 }}>
          {alert.message}
        </div>
      )}

      <div className="admin-card">{children}</div>

      {onDelete && (
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <button type="button" onClick={onDelete} className="admin-btn admin-btn-danger">
            <Trash2 size={14} />
            O'chirish
          </button>
        </div>
      )}
    </>
  );
}

export function SubmitButton({ children = "Saqlash" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
      <Save size={14} />
      {pending ? "Saqlanmoqda..." : children}
    </button>
  );
}
