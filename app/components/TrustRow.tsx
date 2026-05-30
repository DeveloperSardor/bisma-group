"use client";

import { ClipboardList, HardHat, ShieldCheck, Camera } from "lucide-react";

const trustItems = [
  {
    Icon: ClipboardList,
    title: "Bo'sh va'dalarsiz",
    desc: "Barcha kafolat, smeta va muddatlar shartnomada yozma ravishda mustahkamlanadi.",
  },
  {
    Icon: HardHat,
    title: "Faqat tajribali ustalar",
    desc: "Brigadalarimizda 5 yildan ortiq tajribali sertifikatlangan ustalar ishlaydi.",
  },
  {
    Icon: ShieldCheck,
    title: "Tekshirilgan materiallar",
    desc: "Knauf, Ceresit, Tikkurila kabi sertifikatlangan brendlar bilangina ishlaymiz.",
  },
  {
    Icon: Camera,
    title: "Foto va video hisobot",
    desc: "Har kuni messendjerga foto va video hisobot — siz nazoratdan voz kechmaysiz.",
  },
];

export default function TrustRow() {
  return (
    <section className="trust-row-section">
      <div className="container">
        <div className="trust-grid">
          {trustItems.map((item) => (
            <div key={item.title} className="trust-card">
              <div className="trust-icon">
                <item.Icon size={22} />
              </div>
              <strong className="trust-title">{item.title}</strong>
              <p className="trust-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .trust-row-section {
          background: #ffffff;
          padding: 70px 0 50px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 768px) {
          .trust-row-section { padding: 50px 0 40px; }
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          background: #fafbfc;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 22px;
          padding: 32px;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 1024px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            padding: 24px;
          }
        }

        @media (max-width: 600px) {
          .trust-grid {
            grid-template-columns: 1fr;
            padding: 22px 20px;
          }
        }

        .trust-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 14px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: all 0.4s ease;
        }

        .trust-card:hover {
          border-color: rgba(41, 151, 255, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
        }

        .trust-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(41, 151, 255, 0.18), rgba(41, 151, 255, 0.05));
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .trust-title {
          font-family: var(--font-inter);
          font-size: 16px;
          color: #1d1d1f;
          font-weight: 500;
          line-height: 1.25;
          letter-spacing: -0.005em;
        }

        .trust-desc {
          font-size: 12.5px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.55;
          font-weight: 400;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
