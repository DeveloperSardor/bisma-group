'use client';

import { useState, useEffect } from "react";
import { useFormLang, type FormLang } from "./FormLangContext";

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
  const formCtx = useFormLang();
  const [val, setVal] = useState<LocalizedValue>({ uz: "", ru: "", en: "" });
  const [localLang, setLocalLang] = useState<FormLang>("uz");

  // Use global form lang when wrapped in FormLangProvider, otherwise local lang.
  const activeLang: FormLang = formCtx ? formCtx.lang : localLang;
  const setActiveLang = formCtx ? formCtx.setLang : setLocalLang;
  const standalone = !formCtx;

  useEffect(() => {
    if (defaultValue) {
      try {
        const parsed = JSON.parse(defaultValue);
        if (typeof parsed === 'object' && parsed !== null && ('uz' in parsed || 'ru' in parsed || 'en' in parsed)) {
          setVal({
            uz: parsed.uz || "",
            ru: parsed.ru || "",
            en: parsed.en || ""
          });
          return;
        }
      } catch {
        // not JSON — treat as plain UZ
      }
      setVal({ uz: defaultValue, ru: "", en: "" });
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVal((prev) => ({ ...prev, [activeLang]: e.target.value }));
  };

  return (
    <div className="form-group" style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", gap: 10 }}>
        <label style={{ margin: 0, display: "inline-flex", alignItems: "center", gap: 6 }}>
          {label} {required && "*"}
          <span style={{
            background: "rgba(41,151,255,0.12)",
            color: "#2997ff",
            padding: "1px 7px",
            borderRadius: 100,
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}>{activeLang.toUpperCase()}</span>
        </label>

        {standalone && (
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
        )}
      </div>

      {isTextarea ? (
        <textarea
          value={val[activeLang]}
          onChange={handleChange}
          required={required && activeLang === 'uz'}
          placeholder={placeholder}
          rows={4}
          style={{ width: "100%", padding: "12px", border: "1px solid #e5e5ea", borderRadius: "10px", resize: "vertical", fontFamily: "inherit" }}
        />
      ) : (
        <input
          type="text"
          value={val[activeLang]}
          onChange={handleChange}
          required={required && activeLang === 'uz'}
          placeholder={placeholder}
          style={{ width: "100%", padding: "12px", border: "1px solid #e5e5ea", borderRadius: "10px", fontFamily: "inherit" }}
        />
      )}

      {/* Hidden input to submit the JSON stringified value */}
      <input type="hidden" name={name} value={JSON.stringify(val)} />
    </div>
  );
}
