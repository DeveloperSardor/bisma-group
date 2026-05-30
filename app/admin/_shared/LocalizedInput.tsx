'use client';

import { useState, useEffect } from "react";

type LocalizedValue = {
  uz: string;
  ru: string;
  en: string;
};

export function LocalizedInput({
  name,
  defaultValue,
  label,
  required = false,
  isTextarea = false,
  placeholder = ""
}: {
  name: string;
  defaultValue?: string;
  label: string;
  required?: boolean;
  isTextarea?: boolean;
  placeholder?: string;
}) {
  const [val, setVal] = useState<LocalizedValue>({ uz: "", ru: "", en: "" });
  const [activeLang, setActiveLang] = useState<'uz' | 'ru' | 'en'>('uz');

  useEffect(() => {
    if (defaultValue) {
      try {
        const parsed = JSON.parse(defaultValue);
        if (typeof parsed === 'object' && parsed !== null) {
          setVal({
            uz: parsed.uz || "",
            ru: parsed.ru || "",
            en: parsed.en || ""
          });
        } else {
          // Fallback if it was a plain string
          setVal({ uz: defaultValue, ru: defaultValue, en: defaultValue });
        }
      } catch {
        setVal({ uz: defaultValue, ru: defaultValue, en: defaultValue });
      }
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVal({ ...val, [activeLang]: e.target.value });
  };

  return (
    <div className="form-group" style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <label style={{ margin: 0 }}>{label} {required && "*"}</label>
        <div style={{ display: "flex", gap: "4px", background: "#f5f5f7", padding: "4px", borderRadius: "8px" }}>
          {(['uz', 'ru', 'en'] as const).map(l => (
            <button
              key={l}
              type="button"
              onClick={() => setActiveLang(l)}
              style={{
                border: "none",
                background: activeLang === l ? "#ffffff" : "transparent",
                color: activeLang === l ? "#2997ff" : "#86868b",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: activeLang === l ? "0 2px 5px rgba(0,0,0,0.05)" : "none",
                textTransform: "uppercase"
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {isTextarea ? (
        <textarea
          value={val[activeLang]}
          onChange={handleChange}
          required={required && activeLang === 'uz'}
          placeholder={`${placeholder} (${activeLang.toUpperCase()})`}
          rows={4}
          style={{ width: "100%", padding: "12px", border: "1px solid #e5e5ea", borderRadius: "10px", resize: "vertical", fontFamily: "inherit" }}
        />
      ) : (
        <input
          type="text"
          value={val[activeLang]}
          onChange={handleChange}
          required={required && activeLang === 'uz'}
          placeholder={`${placeholder} (${activeLang.toUpperCase()})`}
          style={{ width: "100%", padding: "12px", border: "1px solid #e5e5ea", borderRadius: "10px", fontFamily: "inherit" }}
        />
      )}

      {/* Hidden input to submit the JSON stringified value */}
      <input type="hidden" name={name} value={JSON.stringify(val)} />
    </div>
  );
}
