"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useTranslation } from "../../i18n/LangContext";

export default function DeleteButton({
  action,
  confirmText,
  size = "normal",
}: {
  action: () => Promise<void>;
  confirmText?: string;
  size?: "normal" | "icon";
}) {
  const { t } = useTranslation();
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!window.confirm(confirmText || t("admin.common.deleteConfirm"))) return;
    startTransition(async () => {
      await action();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`admin-btn admin-btn-danger ${size === "icon" ? "admin-btn-icon" : ""}`}
      aria-label={t("admin.common.delete")}
    >
      <Trash2 size={size === "icon" ? 14 : 13} />
      {size !== "icon" && (pending ? t("admin.common.deleting") : t("admin.common.delete"))}
    </button>
  );
}
