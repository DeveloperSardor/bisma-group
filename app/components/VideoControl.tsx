"use client";

import { Video, Smartphone, Eye, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

const features = [
  { Icon: Smartphone, label: "Telefon ilovasi orqali kuzatuv" },
  { Icon: Eye, label: "360° aylanuvchi kameralar" },
  { Icon: Clock, label: "24/7 onlayn translyatsiya" },
  { Icon: ShieldCheck, label: "Barcha qadam yozib boriladi" },
];

export default function VideoControl() {
  return (
    <section className="vc-section" id="video-control">
      <div className="container">
        <header className="vc-header">
          <span className="vc-mini">VIDEONAZORAT XIZMATI</span>
          <h2 className="vc-h2">
            Remontni <span className="title-accent">istalgan joydan</span> kuzating
          </h2>
          <p className="vc-sub">
            Sizning xonadoningizga o'rnatilgan kameralar orqali ish jarayonini ish vaqtidan tashqari ham, hatto chet eldan turib ham nazorat qilishingiz mumkin.
          </p>
        </header>

        <div className="vc-grid">
          <div className="vc-info">
            <div className="vc-icon-wrap">
              <Video size={28} />
            </div>
            <h3 className="vc-title">
              Smartfon orqali — chet eldan ham
            </h3>
            <p className="vc-desc">
              Bisma Group sizning ob'ektingizga aqlli kamera o'rnatadi. Bizning ilovamiz orqali ish jarayonini onlayn rejimda kuzatasiz: qaysi material ishlatildi, ish qaysi bosqichda — hammasi ko'rinadi.
            </p>
            <p className="vc-desc">
              Muhim avzalligi — ustalar nazorat ostida ishlaydi, sifat oshadi, har qanday savolingiz video-yozuv orqali tekshiriladi.
            </p>

            <div className="vc-features">
              {features.map((f) => (
                <div key={f.label} className="vc-feature">
                  <div className="vcf-icon"><f.Icon size={16} /></div>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="vc-cta">
              VIDEONAZORAT XIZMATINI ULASH <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="vc-visual">
            <div className="vc-camera-mock">
              <div className="vc-record">
                <span className="vc-rec-dot" />
                <span className="vc-rec-label">REC · LIVE</span>
              </div>
              <div className="vc-screen">
                <div className="vc-screen-grid">
                  <span /><span /><span /><span /><span /><span />
                  <span /><span /><span /><span /><span /><span />
                </div>
                <div className="vc-camera-icon">
                  <Video size={72} />
                </div>
                <div className="vc-overlay-info">
                  <strong>Yunusobod · Kvartira #2</strong>
                  <span>2026-05-10 · 14:32</span>
                </div>
              </div>
              <div className="vc-stats">
                <div className="vc-stat">
                  <span>360°</span>
                  <small>Aylanuvchi</small>
                </div>
                <div className="vc-stat">
                  <span>HD</span>
                  <small>Sifatli yozuv</small>
                </div>
                <div className="vc-stat">
                  <span>24/7</span>
                  <small>Onlayn</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vc-section {
          padding: 110px 0;
          background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
        }

        @media (max-width: 768px) {
          .vc-section { padding: 70px 0; }
        }

        @media (max-width: 600px) {
          .vc-section { padding: 56px 0; }
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
        }

        .vc-header {
          text-align: center;
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vc-mini {
          font-size: 11px;
          letter-spacing: 0.5em;
          color: #2997ff;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .vc-h2 {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 3.4vw, 2.8rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: #1d1d1f;
          margin: 0 0 16px;
          line-height: 1.15;
        }

        .title-accent { color: #86868b; font-weight: 500; }

        .vc-sub {
          max-width: 640px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.65;
          font-weight: 300;
          margin: 0;
        }

        .vc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .vc-grid { grid-template-columns: 1fr; gap: 36px; }
        }

        .vc-info {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .vc-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(41, 151, 255, 0.18), rgba(41, 151, 255, 0.05));
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vc-title {
          font-family: var(--font-inter);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 500;
          color: #1d1d1f;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .vc-desc {
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.7);
          margin: 0;
          font-weight: 300;
        }

        .vc-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 6px;
        }

        @media (max-width: 600px) {
          .vc-features { grid-template-columns: 1fr; }
        }

        .vc-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          padding: 11px 14px;
        }

        .vcf-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: rgba(41, 151, 255, 0.1);
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .vc-feature span {
          font-size: 12.5px;
          color: #1d1d1f;
          font-weight: 500;
          line-height: 1.4;
        }

        .vc-cta {
          margin-top: 6px;
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1d1d1f;
          color: #2997ff;
          padding: 14px 24px;
          border-radius: 100px;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .vc-cta:hover {
          background: #2997ff;
          color: #1d1d1f;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(41, 151, 255, 0.35);
        }

        .vc-visual {
          position: relative;
        }

        .vc-camera-mock {
          background: linear-gradient(135deg, #1d1d1f 0%, #1c1c4f 100%);
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(41, 151, 255, 0.18);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .vc-record {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .vc-rec-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ff3b30;
          animation: vc-pulse 1.6s infinite ease-in-out;
        }

        @keyframes vc-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .vc-rec-label {
          font-size: 11px;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 700;
        }

        .vc-screen {
          position: relative;
          aspect-ratio: 16 / 10;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(41, 151, 255, 0.04) 100%);
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(41, 151, 255, 0.12);
        }

        .vc-screen-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(2, 1fr);
        }

        .vc-screen-grid span {
          border-right: 1px solid rgba(41, 151, 255, 0.06);
          border-bottom: 1px solid rgba(41, 151, 255, 0.06);
        }

        .vc-camera-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(41, 151, 255, 0.25);
        }

        .vc-overlay-info {
          position: absolute;
          left: 16px;
          bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(11, 11, 31, 0.7);
          backdrop-filter: blur(8px);
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid rgba(41, 151, 255, 0.18);
        }

        .vc-overlay-info strong {
          font-family: var(--font-inter);
          font-size: 12px;
          color: #ffffff;
          font-weight: 500;
        }

        .vc-overlay-info span {
          font-size: 10px;
          color: rgba(41, 151, 255, 0.85);
          letter-spacing: 0.04em;
        }

        .vc-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        @media (max-width: 480px) {
          .vc-stats { grid-template-columns: 1fr; }
        }

        .vc-stat {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .vc-stat span {
          font-family: var(--font-inter);
          font-size: 18px;
          color: #2997ff;
          font-weight: 600;
          line-height: 1;
        }

        .vc-stat small {
          font-size: 9.5px;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.55);
          font-weight: 700;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
}
