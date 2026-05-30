'use client';
import { Package } from "lucide-react";

const partners = [
  { name: "Knauf", type: "Shpaklyovka · gips" },
  { name: "Ceresit", type: "Plitka yelimlari" },
  { name: "Volma", type: "Tekislash aralashmalari" },
  { name: "Tikkurila", type: "Premium bo‘yoqlar" },
  { name: "Kerama Marazzi", type: "Italyan plitka" },
  { name: "Grohe", type: "Premium santexnika" },
  { name: "Schneider Electric", type: "Elektr jihozlari" },
  { name: "Egger", type: "Yevropa laminat" },
];

export default function Clients() {
  return (
    <section className="partners-stable-section" id="partners">
      <div className="stable-wrap">

        <div className="stable-header">
          <span className="stable-mini">MATERIAL HAMKORLAR</span>
          <h2 className="stable-h2">Faqat sertifikatlangan brendlar bilan ishlaymiz</h2>
        </div>

        <div className="partners-grid-minimal">
          {partners.map((partner, idx) => (
            <div key={idx} className="partner-badge-mini">
              <Package size={16} color="#2997ff" />
              <span className="partner-name-text">
                <strong>{partner.name}</strong>
                <small>{partner.type}</small>
              </span>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .partners-stable-section {
          width: 100%;
          background: #ffffff;
          padding: 60px 0;
        }

        .stable-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .stable-header {
          text-align: center;
        }

        .stable-mini { 
          display: block; 
          font-size: 10px; 
          letter-spacing: 0.4em; 
          color: #2997ff; 
          margin-bottom: 10px; 
          font-weight: 700; 
        }

        .stable-h2 { 
          font-family: var(--font-inter); 
          font-size: 24px; 
          margin: 0; 
          font-weight: 500; 
          color: var(--brand-navy); 
        }

        .partners-grid-minimal {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 10px;
          perspective: 1000px;
        }

        @media (max-width: 1024px) {
          .partners-grid-minimal {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .partners-grid-minimal {
            grid-template-columns: 1fr;
          }
        }

        .partner-badge-mini {
          background: #f9fafb;
          border: 1px solid rgba(0, 0, 0, 0.04);
          padding: 14px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }

        .partner-badge-mini:hover {
          background: #ffffff;
          border-color: rgba(41, 151, 255, 0.25);
          box-shadow: 0 12px 30px rgba(41, 151, 255, 0.12);
          transform: translateY(-4px) rotateX(4deg) rotateY(-4deg);
        }

        .partner-name-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          color: var(--brand-navy);
        }

        .partner-name-text strong {
          font-size: 13px;
          font-weight: 600;
        }

        .partner-name-text small {
          font-size: 10.5px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.55);
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
}
