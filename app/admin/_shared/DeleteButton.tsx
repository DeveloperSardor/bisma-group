"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({
  action,
  confirmText = "O'chirish tasdiqlansin?",
  size = "normal",
}: {
  action: () => Promise<void>;
  confirmText?: string;
  size?: "normal" | "icon";
}) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!window.confirm(confirmText)) return;
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
      aria-label="O'chirish"
    >
      <Trash2 size={size === "icon" ? 14 : 13} />
      {size !== "icon" && (pending ? "O'chirilmoqda..." : "O'chirish")}
    </button>
  );
}
