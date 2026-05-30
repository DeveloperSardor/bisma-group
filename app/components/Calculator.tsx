"use client";

import { useState, useMemo } from "react";
import { Calculator as CalcIcon, Home, Wrench, Palette, Bath, ArrowUpRight, Plus, Check } from "lucide-react";

const renovationTypes = [
  { id: "kosmetik", label: "Kosmetik", Icon: Home, min: 80, max: 120 },
  { id: "kapital", label: "Kapital", Icon: Wrench, min: 120, max: 150 },
  { id: "dizayn", label: "Dizaynerlik", Icon: Palette, min: 150, max: 170 },
];

const addOns = [
  { id: "kitchen", label: "Oshxona yangilash", price: 1200 },
  { id: "bathroom", label: "Hammom yangilash", price: 1500 },
  { id: "smart", label: "Smart-uy tizimi", price: 800 },
  { id: "design", label: "3D dizayn-loyiha", price: 600 },
];

const formatUsd = (n: number) =>
  "$" + n.toLocaleString("en-US");

export default function Calculator() {
  const [type, setType] = useState("kosmetik");
  const [area, setArea] = useState(60);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const activeType = renovationTypes.find((t) => t.id === type) || renovationTypes[0];

  const { min, max, addonsTotal } = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = addOns.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
    const min = activeType.min * area + addonsTotal;
    const max = activeType.max * area + addonsTotal;
    return { min, max, addonsTotal };
  }, [type, area, selectedAddons, activeType]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <section className="calc-section" id="calculator">
      <div className="container">
        <header className="calc-header">
          <span className="calc-mini">TEZKOR HISOB</span>
          <h2 className="calc-h2">
            Remont narxini <span className="title-accent">o'zingiz hisoblang</span>
          </h2>
          <p className="calc-sub">
            Taxminiy smeta uchun — aniq narx mutaxassis o'lchov olganidan keyin shartnomada belgilanadi.
          </p>
        </header>

        <div className="calc-grid">
          <div className="calc-inputs">
            <div className="calc-block">
              <label className="calc-label">1. Remont turi</label>
              <div className="type-row">
                {renovationTypes.map((t) => (
                  <button
                    key={t.id}
                    className={`type-btn ${type === t.id ? "active" : ""}`}
                    onClick={() => setType(t.id)}
                  >
                    <t.Icon size={18} />
                    <span>{t.label}</span>
                    <small>${t.min}–{t.max}/m²</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-block">
              <label className="calc-label">
                2. Maydon: <strong className="area-display">{area} m²</strong>
              </label>
              <input
                type="range"
                min={20}
                max={250}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="area-slider"
              />
              <div className="slider-bounds">
                <span>20 m²</span>
                <span>250 m²</span>
              </div>
            </div>

            <div className="calc-block">
              <label className="calc-label">3. Qo'shimcha xizmatlar</label>
              <div className="addons-grid">
                {addOns.map((a) => {
                  const checked = selectedAddons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      className={`addon-chip ${checked ? "active" : ""}`}
                      onClick={() => toggleAddon(a.id)}
                      type="button"
                    >
                      <span className="addon-check">
                        {checked ? <Check size={13} /> : <Plus size={13} />}
                      </span>
                      <span className="addon-label">{a.label}</span>
                      <span className="addon-price">+${a.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="calc-output">
            <div className="output-icon">
              <CalcIcon size={26} />
            </div>
            <span className="output-label">Taxminiy smeta</span>
            <strong className="output-price">
              {formatUsd(min)} <span>—</span> {formatUsd(max)}
            </strong>
            <div className="output-breakdown">
              <div className="breakdown-row">
                <span>{activeType.label} remont · {area} m²</span>
                <strong>
                  {formatUsd(activeType.min * area)} – {formatUsd(activeType.max * area)}
                </strong>
              </div>
              {addonsTotal > 0 && (
                <div className="breakdown-row">
                  <span>Qo'shimcha xizmatlar ({selectedAddons.length})</span>
                  <strong>+{formatUsd(addonsTotal)}</strong>
                </div>
              )}
            </div>
            <a href="#contact" className="output-btn">
              ANIQ SMETA OLISH <ArrowUpRight size={14} />
            </a>
            <p className="output-note">
              <Bath size={12} /> Hammom va oshxona uchun maxsus loyiha — alohida hisoblanadi.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calc-section {
          padding: 110px 0;
          background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
        }

        @media (max-width: 768px) {
          .calc-section { padding: 70px 0; }
        }

        @media (max-width: 600px) {
          .calc-section { padding: 56px 0; }
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
        }

        .calc-header {
          text-align: center;
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .calc-mini {
          font-size: 11px;
          letter-spacing: 0.5em;
          color: #2997ff;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .calc-h2 {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 3.4vw, 2.8rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: #1d1d1f;
          margin: 0 0 16px;
          line-height: 1.15;
        }

        .title-accent { color: #86868b; font-weight: 500; }

        .calc-sub {
          max-width: 620px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.65;
          font-weight: 300;
          margin: 0;
        }

        .calc-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .calc-grid { grid-template-columns: 1fr; }
        }

        .calc-inputs {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 22px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 600px) {
          .calc-inputs { padding: 24px 20px; gap: 22px; }
        }

        .calc-block {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .calc-label {
          font-size: 13px;
          color: #1d1d1f;
          font-weight: 600;
          letter-spacing: -0.005em;
        }

        .area-display {
          color: #2997ff;
          font-family: var(--font-inter);
          font-size: 18px;
          font-weight: 600;
          margin-left: 6px;
        }

        .type-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        @media (max-width: 900px) {
          .type-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 480px) {
          .type-row { grid-template-columns: 1fr; }
        }

        .type-btn {
          background: #fafbfc;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 14px;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          color: rgba(0, 0, 0, 0.7);
        }

        .type-btn :global(svg) {
          color: rgba(0, 0, 0, 0.55);
        }

        .type-btn span {
          font-size: 13px;
          font-weight: 600;
          color: #1d1d1f;
        }

        .type-btn small {
          font-size: 10.5px;
          color: rgba(0, 0, 0, 0.55);
          letter-spacing: 0.02em;
        }

        .type-btn:hover {
          border-color: rgba(41, 151, 255, 0.25);
          background: rgba(41, 151, 255, 0.03);
        }

        .type-btn.active {
          background: #1d1d1f;
          border-color: #1d1d1f;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
        }

        .type-btn.active :global(svg) { color: #2997ff; }
        .type-btn.active span { color: #ffffff; }
        .type-btn.active small { color: rgba(255, 255, 255, 0.65); }

        .area-slider {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: linear-gradient(
            to right,
            #2997ff 0%,
            #2997ff calc((var(--val, 60) - 20) / 230 * 100%),
            rgba(0, 0, 0, 0.1) calc((var(--val, 60) - 20) / 230 * 100%),
            rgba(0, 0, 0, 0.1) 100%
          );
          border-radius: 100px;
          outline: none;
        }

        .area-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #2997ff;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(41, 151, 255, 0.3);
          transition: transform 0.2s ease;
        }

        .area-slider::-webkit-slider-thumb:hover {
          transform: scale(1.12);
        }

        .area-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #2997ff;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(41, 151, 255, 0.3);
        }

        .slider-bounds {
          display: flex;
          justify-content: space-between;
          font-size: 10.5px;
          color: rgba(0, 0, 0, 0.5);
          letter-spacing: 0.02em;
          font-weight: 600;
        }

        .addons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        @media (max-width: 600px) {
          .addons-grid { grid-template-columns: 1fr; }
        }

        .addon-chip {
          background: #fafbfc;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          text-align: left;
        }

        .addon-chip:hover {
          border-color: rgba(41, 151, 255, 0.3);
          background: rgba(41, 151, 255, 0.03);
        }

        .addon-chip.active {
          border-color: #2997ff;
          background: rgba(41, 151, 255, 0.08);
        }

        .addon-check {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.06);
          color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .addon-chip.active .addon-check {
          background: #2997ff;
          color: #1d1d1f;
        }

        .addon-label {
          font-size: 12.5px;
          font-weight: 500;
          color: #1d1d1f;
          flex: 1;
        }

        .addon-price {
          font-size: 11.5px;
          font-weight: 700;
          color: #2997ff;
        }

        .calc-output {
          background: linear-gradient(135deg, #1d1d1f 0%, #1c1c4f 100%);
          border-radius: 22px;
          padding: 32px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(41, 151, 255, 0.18);
          position: sticky;
          top: 100px;
        }

        @media (max-width: 900px) {
          .calc-output { position: static; }
        }

        @media (max-width: 600px) {
          .calc-output { padding: 24px 20px; }
        }

        .output-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(41, 151, 255, 0.18);
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .output-label {
          font-size: 11px;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 255, 0.55);
          font-weight: 700;
        }

        .output-price {
          font-family: var(--font-inter);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: #2997ff;
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .output-price span {
          color: rgba(41, 151, 255, 0.5);
          font-weight: 300;
          margin: 0 4px;
        }

        .output-breakdown {
          margin-top: 4px;
          padding: 16px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .breakdown-row span {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 400;
        }

        .breakdown-row strong {
          font-size: 12.5px;
          color: #ffffff;
          font-weight: 600;
          white-space: nowrap;
        }

        .output-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #2997ff;
          color: #1d1d1f;
          padding: 16px 26px;
          border-radius: 100px;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-decoration: none;
          margin-top: 4px;
          box-shadow: 0 8px 22px rgba(41, 151, 255, 0.3);
          transition: all 0.3s ease;
        }

        .output-btn:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(41, 151, 255, 0.4);
        }

        .output-note {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.5;
          margin: 4px 0 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .output-note :global(svg) {
          color: #2997ff;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
