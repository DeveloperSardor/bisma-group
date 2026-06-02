"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useTranslation } from "../../i18n/LangContext";

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
  const { t } = useTranslation();
  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <Link href={backHref} className="admin-back-link">
            <ArrowLeft size={12} /> {t("admin.common.back")}
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
            {t("admin.common.delete")}
          </button>
        </div>
      )}
    </>
  );
}

export function SubmitButton({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation();
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
      <Save size={14} />
      {pending ? t("admin.common.saving") : (children ?? t("admin.common.save"))}
    </button>
  );
}
