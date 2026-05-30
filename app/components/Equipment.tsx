"use client";

import { Wrench, Zap, Layers, Hammer, Package, Truck, ArrowUpRight } from "lucide-react";

const tools = [
  {
    Icon: Layers,
    name: "Mexanizatsiyalashgan shtukaturka",
    desc: "Shtukatur eritmasini bosim ostida bir tekis taqsimlovchi avtomatlashgan qurilma. Katta maydonlarda eng tez va sifatli yechim.",
  },
  {
    Icon: Hammer,
    name: "Beton tozalash mashinasi",
    desc: "Beton polni tekislash va sifatli yuza tayyorlash uchun zatirovka. Polni laminat yoki plitka uchun mukammal tayyorlaydi.",
  },
  {
    Icon: Wrench,
    name: "Suvli plitka kesish dastgohi",
    desc: "Plitka ishlarini katta hajmda bajarish uchun. Suv bilan sovutish — chang yo‘q, qizish yo‘q, tovush ham past.",
  },
  {
    Icon: Zap,
    name: "Pnevmosiqim mashinasi",
    desc: "Eritmani aralashtirib 100 metr balandlikgacha uzatuvchi qurilma. Yuqori qavatlarda tezlikni 5 baravar oshiradi.",
  },
];

const benefits = [
  { Icon: Package, label: "30+ sertifikatlangan brand", value: "Knauf · Ceresit · Tikkurila" },
  { Icon: Truck, label: "Ulgurji narxda yetkazib berish", value: "Bozordan 15–20% arzon" },
  { Icon: Wrench, label: "O‘z texnika parki", value: "Ijara xarajati yo‘q" },
];

export default function Equipment() {
  return (
    <section className="eq-section" id="equipment">
      <div className="container">
        <header className="eq-header">
          <span className="eq-mini">TEXNIKA VA MATERIAL</span>
          <h2 className="eq-h2">
            Eng zamonaviy <span className="title-accent">texnika va materiallar</span>
          </h2>
          <p className="eq-sub">
            Bisma Group o'z texnika parkiga ega. Ish tezligi yuqori, sifati barqaror — sertifikatlangan brendlardan boshqa material ishlatmaymiz.
          </p>
        </header>

        <div className="benefits-strip">
          {benefits.map((b) => (
            <div key={b.label} className="benefit-chip">
              <div className="bc-icon"><b.Icon size={18} /></div>
              <div className="bc-text">
                <span>{b.label}</span>
                <strong>{b.value}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="tools-grid">
          {tools.map((t) => (
            <div key={t.name} className="tool-card">
              <div className="tool-icon">
                <t.Icon size={28} />
              </div>
              <h3 className="tool-name">{t.name}</h3>
              <p className="tool-desc">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="eq-cta">
          <div className="eq-cta-text">
            <strong>Material va texnika — bizning hisobimizdan</strong>
            <span>Siz hech qanday qo‘shimcha jihoz va material qidirmaysiz. Hammasi smetada belgilangan.</span>
          </div>
          <a href="#contact" className="eq-cta-btn">
            BOG'LANISH <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .eq-section {
          padding: 110px 0;
          background: #ffffff;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 768px) {
          .eq-section { padding: 70px 0; }
        }

        @media (max-width: 600px) {
          .eq-section { padding: 56px 0; }
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
        }

        .eq-header {
          text-align: center;
          margin-bottom: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .eq-mini {
          font-size: 11px;
          letter-spacing: 0.5em;
          color: #2997ff;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .eq-h2 {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 3.4vw, 2.8rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: #1d1d1f;
          margin: 0 0 16px;
          line-height: 1.15;
        }

        .title-accent { color: #86868b; font-weight: 500; }

        .eq-sub {
          max-width: 640px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.65;
          font-weight: 300;
          margin: 0;
        }

        .benefits-strip {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 36px;
        }

        @media (max-width: 900px) {
          .benefits-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 520px) {
          .benefits-strip { grid-template-columns: 1fr; }
        }

        .benefit-chip {
          background: linear-gradient(135deg, rgba(41, 151, 255, 0.06), rgba(41, 151, 255, 0.02));
          border: 1px solid rgba(41, 151, 255, 0.15);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .bc-icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: rgba(41, 151, 255, 0.15);
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bc-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .bc-text span {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(0, 0, 0, 0.55);
          font-weight: 700;
          text-transform: uppercase;
        }

        .bc-text strong {
          font-size: 13.5px;
          color: #1d1d1f;
          font-weight: 600;
          line-height: 1.3;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        @media (max-width: 1024px) {
          .tools-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .tools-grid { grid-template-columns: 1fr; gap: 14px; }
        }

        .tool-card {
          background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 18px;
          padding: 26px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.4s ease;
        }

        .tool-card:hover {
          transform: translateY(-4px);
          border-color: rgba(41, 151, 255, 0.25);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
        }

        .tool-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, #1d1d1f 0%, #1c1c4f 100%);
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .tool-name {
          font-family: var(--font-inter);
          font-size: 16.5px;
          color: #1d1d1f;
          font-weight: 500;
          margin: 0;
          line-height: 1.25;
          letter-spacing: -0.005em;
        }

        .tool-desc {
          font-size: 12.5px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.6;
          font-weight: 400;
          margin: 0;
        }

        .eq-cta {
          margin-top: 42px;
          background: linear-gradient(135deg, #1d1d1f 0%, #1c1c4f 100%);
          border-radius: 22px;
          padding: 28px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          box-shadow: 0 14px 38px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(41, 151, 255, 0.18);
        }

        @media (max-width: 768px) {
          .eq-cta {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            padding: 24px;
            margin-top: 32px;
          }
        }

        .eq-cta-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          min-width: 0;
        }

        .eq-cta-text strong {
          font-family: var(--font-inter);
          font-size: 18px;
          color: #ffffff;
          font-weight: 500;
          line-height: 1.3;
        }

        .eq-cta-text span {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
        }

        .eq-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #2997ff;
          color: #1d1d1f;
          padding: 14px 26px;
          border-radius: 100px;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 8px 22px rgba(41, 151, 255, 0.3);
          transition: all 0.3s ease;
        }

        .eq-cta-btn:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(41, 151, 255, 0.4);
        }
      `}</style>
    </section>
  );
}
