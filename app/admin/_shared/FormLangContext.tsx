"use client";

import { createContext, useContext, useState } from "react";

export type FormLang = "uz" | "ru" | "en";

type Ctx = {
  lang: FormLang;
  setLang: (l: FormLang) => void;
};

const FormLangContext = createContext<Ctx | null>(null);

export function useFormLang(): Ctx | null {
  return useContext(FormLangContext);
}

export function FormLangProvider({
  children,
  defaultLang = "uz",
}: {
  children: React.ReactNode;
  defaultLang?: FormLang;
}) {
  const [lang, setLang] = useState<FormLang>(defaultLang);

  return (
    <FormLangContext.Provider value={{ lang, setLang }}>
      <FormLangBar />
      {children}
    </FormLangContext.Provider>
  );
}

function FormLangBar() {
  const ctx = useContext(FormLangContext);
  if (!ctx) return null;
  const { lang, setLang } = ctx;

  return (
    <div className="fl-bar">
      <div className="fl-bar-inner">
        <div className="fl-bar-label">
          <span className="fl-bar-dot" />
          <span>KIRITISH TILI</span>
        </div>
        <div className="fl-tabs">
          {(["uz", "ru", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`fl-tab ${lang === l ? "is-active" : ""}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="fl-bar-hint">Barcha matn maydonlari shu tilga moslashadi</span>
      </div>

      <style jsx>{`
        .fl-bar {
          position: sticky;
          top: 0;
          z-index: 30;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: saturate(180%) blur(14px);
          -webkit-backdrop-filter: saturate(180%) blur(14px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          margin: 0 -24px 20px;
          padding: 10px 24px;
        }
        .fl-bar-inner {
          max-width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .fl-bar-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #6b6b6f;
        }
        .fl-bar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2997ff;
          box-shadow: 0 0 0 4px rgba(41, 151, 255, 0.18);
        }
        .fl-tabs {
          display: inline-flex;
          gap: 3px;
          padding: 3px;
          background: #f5f5f7;
          border-radius: 100px;
        }
        .fl-tab {
          border: 0;
          background: transparent;
          color: #6b6b6f;
          padding: 6px 14px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 100px;
          font-family: inherit;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .fl-tab:hover { color: #1d1d1f; }
        .fl-tab.is-active {
          background: #ffffff;
          color: #1d1d1f;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .fl-bar-hint {
          font-size: 11.5px;
          color: #a1a1a6;
          margin-left: auto;
        }
        @media (max-width: 720px) {
          .fl-bar { margin: 0 -16px 16px; padding: 10px 16px; }
          .fl-bar-hint { display: none; }
        }
      `}</style>
    </div>
  );
}
