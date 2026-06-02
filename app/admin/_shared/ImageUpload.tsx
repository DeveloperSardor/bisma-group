"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

type Props = {
  name: string;
  defaultValue?: string;
  label?: string;
  required?: boolean;
  hint?: string;
};

export default function ImageUpload({
  name,
  defaultValue = "",
  label = "Rasm",
  required = false,
  hint,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePick = () => {
    fileRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting same file later
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Yuklashda xatolik");
      }
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setUrl("");
    setError(null);
  };

  return (
    <div className="img-up">
      <label className="admin-field-label">{label}</label>

      {/* Hidden input that actually gets submitted with the form */}
      <input type="hidden" name={name} value={url} required={required} />

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {url ? (
        <div className="img-up-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="preview" />
          <div className="img-up-actions">
            <button type="button" onClick={handlePick} className="img-up-btn" disabled={uploading}>
              {uploading ? <Loader2 size={13} className="spin" /> : <Upload size={13} />}
              {uploading ? "Yuklanmoqda..." : "Almashtirish"}
            </button>
            <button type="button" onClick={handleRemove} className="img-up-btn danger">
              <X size={13} />
              O&apos;chirish
            </button>
          </div>
          <code className="img-up-url">{url}</code>
        </div>
      ) : (
        <button
          type="button"
          onClick={handlePick}
          disabled={uploading}
          className="img-up-empty"
        >
          {uploading ? (
            <>
              <Loader2 size={18} className="spin" />
              <span>Yuklanmoqda...</span>
            </>
          ) : (
            <>
              <ImageIcon size={20} />
              <span>Rasm tanlash</span>
              <small>JPG, PNG, WebP yoki GIF — max 10 MB</small>
            </>
          )}
        </button>
      )}

      {hint && !error && <span className="admin-field-hint">{hint}</span>}
      {error && <span className="img-up-error">{error}</span>}

      <style jsx>{`
        .img-up { display: flex; flex-direction: column; gap: 6px; }
        .img-up-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 28px 16px;
          background: #fafbfc;
          border: 1.5px dashed rgba(0,0,0,0.15);
          border-radius: 12px;
          cursor: pointer;
          color: var(--muted, #6b6b6f);
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 500;
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
        }
        .img-up-empty:hover:not(:disabled) {
          border-color: var(--cyan, #2997ff);
          background: #ffffff;
          color: var(--text, #1d1d1f);
        }
        .img-up-empty small {
          font-size: 11px;
          opacity: 0.7;
          font-weight: 400;
          margin-top: 2px;
        }
        .img-up-preview {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 12px;
          background: #fafbfc;
          border: 1px solid var(--border, rgba(0,0,0,0.08));
          border-radius: 12px;
        }
        .img-up-preview img {
          width: 100%;
          max-height: 320px;
          object-fit: cover;
          border-radius: 8px;
          background: #f5f5f7;
        }
        .img-up-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .img-up-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #ffffff;
          border: 1px solid var(--border, rgba(0,0,0,0.1));
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text, #1d1d1f);
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        .img-up-btn:hover:not(:disabled) {
          border-color: var(--text, #1d1d1f);
        }
        .img-up-btn:disabled { opacity: 0.6; cursor: wait; }
        .img-up-btn.danger {
          background: rgba(255, 59, 48, 0.06);
          border-color: rgba(255, 59, 48, 0.18);
          color: #c0392b;
        }
        .img-up-btn.danger:hover {
          background: #c0392b;
          color: #ffffff;
          border-color: #c0392b;
        }
        .img-up-url {
          font-size: 10.5px;
          color: var(--muted, #6b6b6f);
          word-break: break-all;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          background: #ffffff;
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--border, rgba(0,0,0,0.06));
        }
        .img-up-error {
          font-size: 12.5px;
          color: #c0392b;
          background: rgba(255, 59, 48, 0.06);
          padding: 8px 12px;
          border-radius: 8px;
        }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
