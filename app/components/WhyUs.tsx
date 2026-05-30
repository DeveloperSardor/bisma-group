"use client";

import { Wallet, ShieldCheck, Calendar, Eye, ArrowUpRight } from "lucide-react";

const reasons = [
  {
    Icon: Wallet,
    title: "Aniq narx",
    desc: "Belgilangan smeta o'zgarmaydi. Yashirin to'lov yoki kutilmagan qo'shimcha xarajatlar bo'lmaydi.",
    bullets: ["Bepul o'lchov va smeta", "Shartnomada qat'iy narx", "Bo'lib to'lash imkoniyati"],
  },
  {
    Icon: ShieldCheck,
    title: "Mol-mulk himoyasi",
    desc: "Sizning mebel va texnikangiz himoya plyonkasi bilan o'rab qo'yiladi va ish tartibli olib boriladi.",
    bullets: ["Polietilen himoya plyonkasi", "Har kunlik chang yig'ish", "Xaviz va sug'urta"],
  },
  {
    Icon: Calendar,
    title: "Belgilangan muddat",
    desc: "Shartnomadagi muddat — qonun. Kechikish bo'lsa, har kun uchun shartnomaviy jarima to'laymiz.",
    bullets: ["Aniq grafik", "Har kunlik nazorat", "Kechikish jarimasi"],
  },
  {
    Icon: Eye,
    title: "Sizning nazoratingizda",
    desc: "Subpodryad yo'q — barcha ish bizning brigadamiz tomonidan. Har kun foto-video hisobot olasiz.",
    bullets: ["Bizning o'z brigadamiz", "Telegram/WhatsApp hisobot", "Istalgan vaqt tashrif"],
  },
];

export default function WhyUs() {
  return (
    <section className="whyus-section" id="why-us">
      <div className="container">
        <header className="whyus-header">
          <span className="whyus-mini">NEGA BIZNI TANLASH KERAK</span>
          <h2 className="whyus-h2">
            Bizni tanlang — <span className="title-accent">xotirjam bo'ling</span>
          </h2>
          <p className="whyus-sub">
            Xarajat nazorati, mol-mulk himoyasi, o'z vaqtida tugatish va to'g'ridan-to'g'ri muloqot — bizning 4 ta asosiy tamoyilimiz.
          </p>
        </header>

        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <div key={r.title} className="reason-card">
              <div className="reason-num">0{i + 1}</div>
              <div className="reason-icon"><r.Icon size={22} /></div>
              <h3 className="reason-title">{r.title}</h3>
              <p className="reason-desc">{r.desc}</p>
              <ul className="reason-bullets">
                {r.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="whyus-cta">
          <div className="cta-text">
            <strong>Ushbu tamoyillarning hammasi shartnomada yozma ravishda</strong>
            <span>Bog'lanish — bepul o'lchov va smeta uchun mutaxassisimiz keladi</span>
          </div>
          <a href="#contact" className="cta-btn">
            BEPUL CHIQIM <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .whyus-section {
          background: #ffffff;
          padding: 110px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 768px) {
          .whyus-section { padding: 70px 0; }
        }

        @media (max-width: 600px) {
          .whyus-section { padding: 56px 0; }
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
        }

        .whyus-header {
          text-align: center;
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .whyus-mini {
          display: block;
          font-size: 11px;
          letter-spacing: 0.5em;
          color: #2997ff;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .whyus-h2 {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 3.4vw, 2.8rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: #1d1d1f;
          margin: 0 0 16px;
          line-height: 1.15;
        }

        .title-accent { color: #86868b; font-weight: 500; }

        .whyus-sub {
          max-width: 620px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.65;
          font-weight: 300;
          margin: 0;
        }

        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 1024px) {
          .reasons-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 480px) {
          .reasons-grid { grid-template-columns: 1fr; gap: 14px; }
        }

        .reason-card {
          background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 18px;
          padding: 28px 22px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.4s ease;
        }

        .reason-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 3px;
          background: linear-gradient(90deg, #2997ff, transparent);
          border-radius: 18px 18px 0 0;
        }

        .reason-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(0, 0, 0, 0.08);
          border-color: rgba(41, 151, 255, 0.25);
        }

        .reason-num {
          position: absolute;
          top: 18px;
          right: 22px;
          font-family: var(--font-inter);
          font-size: 26px;
          color: rgba(41, 151, 255, 0.25);
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .reason-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(41, 151, 255, 0.18), rgba(41, 151, 255, 0.05));
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reason-title {
          font-family: var(--font-inter);
          font-size: 20px;
          color: #1d1d1f;
          font-weight: 500;
          margin: 4px 0 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .reason-desc {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.7);
          line-height: 1.6;
          font-weight: 300;
          margin: 0;
        }

        .reason-bullets {
          list-style: none;
          padding: 0;
          margin: 6px 0 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          padding-top: 14px;
        }

        .reason-bullets li {
          font-size: 12px;
          color: #1d1d1f;
          font-weight: 500;
          padding-left: 16px;
          position: relative;
          line-height: 1.4;
        }

        .reason-bullets li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 6px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2997ff;
        }

        .whyus-cta {
          margin-top: 48px;
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
          .whyus-cta {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            padding: 24px;
            margin-top: 36px;
          }
        }

        .cta-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          min-width: 0;
        }

        .cta-text strong {
          font-family: var(--font-inter);
          font-size: 18px;
          color: #ffffff;
          font-weight: 500;
          line-height: 1.3;
        }

        .cta-text span {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
        }

        .cta-btn {
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

        .cta-btn:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(41, 151, 255, 0.4);
        }
      `}</style>
    </section>
  );
}
