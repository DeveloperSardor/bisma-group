"use client";

import { useId, useState } from "react";
import { Plus, X } from "lucide-react";

type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select";
  options?: string[]; // for select
  placeholder?: string;
  grow?: number;
  localized?: boolean; // when true, value is stored as JSON {uz,ru,en}
};

type Lang = "uz" | "ru" | "en";

function readLocalized(raw: string): { uz: string; ru: string; en: string } {
  if (!raw) return { uz: "", ru: "", en: "" };
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && ("uz" in parsed || "ru" in parsed || "en" in parsed)) {
      return { uz: parsed.uz || "", ru: parsed.ru || "", en: parsed.en || "" };
    }
  } catch {
    // fall through: plain string
  }
  return { uz: raw, ru: "", en: "" };
}

export default function ArrayEditor({
  name,
  initialJson,
  fields,
  addLabel = "Qator qo'shish",
  emptyHint,
}: {
  name: string;
  initialJson?: string | null;
  fields: FieldDef[];
  addLabel?: string;
  emptyHint?: string;
}) {
  const id = useId();
  const hasLocalized = fields.some((f) => f.localized);

  const parsed: Record<string, string>[] = (() => {
    if (!initialJson) return [];
    try {
      const arr = JSON.parse(initialJson);
      if (!Array.isArray(arr)) return [];
      return arr.map((item) => {
        const obj: Record<string, string> = {};
        for (const f of fields) {
          const v = item?.[f.name];
          if (v == null) {
            obj[f.name] = f.localized ? JSON.stringify({ uz: "", ru: "", en: "" }) : "";
          } else if (f.localized) {
            // Normalize to canonical {uz,ru,en} JSON string. Handle three cases:
            //   1) v is already an object → take uz/ru/en
            //   2) v is a string that parses to a localized JSON → take uz/ru/en
            //   3) v is a plain string → treat as UZ, leave RU/EN empty
            let uz = "", ru = "", en = "";
            if (typeof v === "object" && v !== null) {
              uz = String((v as Record<string, unknown>).uz ?? "");
              ru = String((v as Record<string, unknown>).ru ?? "");
              en = String((v as Record<string, unknown>).en ?? "");
            } else if (typeof v === "string") {
              let used = false;
              if (v.startsWith("{") && v.endsWith("}")) {
                try {
                  const inner = JSON.parse(v);
                  if (
                    inner && typeof inner === "object" &&
                    ("uz" in inner || "ru" in inner || "en" in inner)
                  ) {
                    uz = String(inner.uz ?? "");
                    ru = String(inner.ru ?? "");
                    en = String(inner.en ?? "");
                    used = true;
                  }
                } catch {
                  // not JSON — fall through to plain
                }
              }
              if (!used) {
                uz = v;
              }
            } else {
              uz = String(v);
            }
            obj[f.name] = JSON.stringify({ uz, ru, en });
          } else {
            obj[f.name] = String(v);
          }
        }
        return obj;
      });
    } catch {
      return [];
    }
  })();
  const [rows, setRows] = useState<Record<string, string>[]>(parsed);
  const [activeLang, setActiveLang] = useState<Lang>("uz");

  const updateRow = (i: number, field: string, value: string) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)));
  };
  const updateLocalizedRow = (i: number, field: string, lang: Lang, value: string) => {
    setRows((prev) => prev.map((r, idx) => {
      if (idx !== i) return r;
      const current = readLocalized(r[field] || "");
      const next = { ...current, [lang]: value };
      return { ...r, [field]: JSON.stringify(next) };
    }));
  };
  const removeRow = (i: number) => setRows((prev) => prev.filter((_, idx) => idx !== i));
  const addRow = () => {
    const empty: Record<string, string> = {};
    for (const f of fields) empty[f.name] = f.localized ? JSON.stringify({ uz: "", ru: "", en: "" }) : "";
    setRows((prev) => [...prev, empty]);
  };
  const moveUp = (i: number) => {
    if (i === 0) return;
    setRows((prev) => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  };
  const moveDown = (i: number) => {
    setRows((prev) => {
      if (i === prev.length - 1) return prev;
      const next = [...prev];
      [next[i + 1], next[i]] = [next[i], next[i + 1]];
      return next;
    });
  };

  return (
    <div className="ae-wrap">
      <input type="hidden" name={name} value={JSON.stringify(rows)} />

      {hasLocalized && (
        <div className="ae-lang-bar">
          <span className="ae-lang-bar-label">Til:</span>
          <div className="ae-lang-tabs">
            {(["uz", "ru", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLang(l)}
                className={`ae-lang-tab ${activeLang === l ? "is-active" : ""}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {rows.length === 0 && (
        <div className="ae-empty">
          {emptyHint || "Hozircha qator yo'q. Pastdagi tugma orqali qo'shing."}
        </div>
      )}

      {rows.map((row, i) => (
        <div key={`${id}-${i}`} className="ae-row">
          <div className="ae-handle" title="Tartibni o'zgartirish">
            <button type="button" onClick={() => moveUp(i)} aria-label="Yuqori" className="ae-mini-btn">▲</button>
            <button type="button" onClick={() => moveDown(i)} aria-label="Past" className="ae-mini-btn">▼</button>
          </div>
          <div className="ae-fields">
            {fields.map((f) => {
              const localizedValue = f.localized ? readLocalized(row[f.name] || "") : null;
              const currentValue = f.localized ? (localizedValue ? localizedValue[activeLang] : "") : (row[f.name] || "");
              const onChangeLocalized = (v: string) => updateLocalizedRow(i, f.name, activeLang, v);
              const onChangePlain = (v: string) => updateRow(i, f.name, v);

              return (
                <div key={f.name} className="ae-field" style={{ flex: f.grow ?? 1 }}>
                  <label className="ae-label">
                    {f.label}
                    {f.localized && <span className="ae-lang-tag">{activeLang.toUpperCase()}</span>}
                  </label>
                  {f.type === "select" ? (
                    <select
                      className="admin-select"
                      value={row[f.name] || ""}
                      onChange={(e) => updateRow(i, f.name, e.target.value)}
                    >
                      <option value="">—</option>
                      {f.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      className="admin-textarea"
                      value={currentValue}
                      onChange={(e) => f.localized ? onChangeLocalized(e.target.value) : onChangePlain(e.target.value)}
                      placeholder={f.placeholder}
                      rows={2}
                    />
                  ) : (
                    <input
                      type="text"
                      className="admin-input"
                      value={currentValue}
                      onChange={(e) => f.localized ? onChangeLocalized(e.target.value) : onChangePlain(e.target.value)}
                      placeholder={f.placeholder}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="ae-remove"
            onClick={() => removeRow(i)}
            aria-label="O'chirish"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <button type="button" onClick={addRow} className="ae-add">
        <Plus size={14} />
        {addLabel}
      </button>

      <style jsx>{`
        .ae-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #fafbfc;
          border: 1px dashed var(--border);
          border-radius: 12px;
          padding: 14px;
        }
        .ae-lang-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 6px 10px;
        }
        .ae-lang-bar-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .ae-lang-tabs {
          display: flex;
          gap: 4px;
          background: #f5f5f7;
          padding: 3px;
          border-radius: 8px;
        }
        .ae-lang-tab {
          border: none;
          background: transparent;
          color: #86868b;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .ae-lang-tab.is-active {
          background: #ffffff;
          color: #2997ff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        .ae-empty {
          padding: 16px;
          text-align: center;
          font-size: 12.5px;
          color: var(--muted);
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .ae-row {
          display: flex;
          align-items: stretch;
          gap: 10px;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px;
        }
        .ae-handle {
          display: flex;
          flex-direction: column;
          gap: 2px;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          padding: 0 2px;
        }
        .ae-mini-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--muted);
          padding: 2px 4px;
          font-size: 9px;
          line-height: 1;
        }
        .ae-mini-btn:hover {
          color: var(--cyan);
        }
        .ae-fields {
          display: flex;
          gap: 8px;
          flex: 1;
          min-width: 0;
        }
        @media (max-width: 700px) {
          .ae-fields {
            flex-direction: column;
          }
        }
        .ae-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .ae-label {
          font-size: 9.5px;
          letter-spacing: 0.1em;
          color: var(--muted);
          font-weight: 700;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .ae-lang-tag {
          background: rgba(0, 204, 255, 0.1);
          color: #2997ff;
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 8.5px;
          letter-spacing: 0.06em;
        }
        .ae-remove {
          background: rgba(255, 59, 48, 0.08);
          border: 1px solid rgba(255, 59, 48, 0.18);
          color: var(--danger);
          width: 28px;
          height: 28px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          align-self: flex-start;
          margin-top: 16px;
        }
        .ae-remove:hover {
          background: var(--danger);
          color: #ffffff;
        }
        .ae-add {
          background: var(--surface);
          border: 1px dashed rgba(0, 204, 255, 0.4);
          color: var(--navy);
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          font-family: inherit;
        }
        .ae-add:hover {
          background: rgba(0, 204, 255, 0.06);
          border-color: var(--cyan);
        }
      `}</style>
    </div>
  );
}
