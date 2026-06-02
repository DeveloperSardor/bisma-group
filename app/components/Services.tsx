"use client";

import { useTranslation } from "../i18n/LangContext";
import { getLocalized } from "../i18n/utils";

type Service = {
  id: string;
  slug: string;
  title: string;
  label: string;
  shortDesc: string;
  icon: string;
};

const SERVICE_IMAGES: Record<string, string> = {
  kosmetik: "/service-kosmetik.webp",
  kapital: "/service-kapital.webp",
  dizayn: "/service-dizayn.webp",
  sanuzel: "/service-sanuzel.webp",
};

export default function Services({ items }: { items: Service[] }) {
  const { lang, t } = useTranslation();

  return (
    <section id="services" className="services">
      <div className="container">
        <span className="kicker">{t("services.eyebrow")}</span>
        <h2 className="title">{t("services.titlePart2")}</h2>

        <div className="grid">
          {items.map((s) => {
            const title = getLocalized(s.title, lang) || s.title;
            const desc = getLocalized(s.shortDesc, lang) || s.shortDesc;
            const img = SERVICE_IMAGES[s.slug] || "/service-kosmetik.webp";
            return (
              <article key={s.id} className="card">
                <div className="card-image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={title} className="card-image" />
                  <div className="card-watermark">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M3 4h7v7H3zM14 4h7v7h-7zM3 13h7v7H3zM14 13h7v7h-7z" stroke="white" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>
                <h3 className="card-title">{title}</h3>
                <p className="card-desc">{desc}</p>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .services { padding: 140px 0; background: #ffffff; }
        .kicker {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          margin-bottom: 14px;
        }
        .title {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 400;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #1d1d1f;
          margin-bottom: 80px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .card { display: flex; flex-direction: column; gap: 18px; }
        .card-image-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #f5f5f7;
          border-radius: 8px;
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s var(--ease);
        }
        .card:hover .card-image { transform: scale(1.05); }
        .card-watermark {
          position: absolute;
          right: 16px;
          bottom: 16px;
          opacity: 0.85;
        }
        .card-title {
          font-family: var(--font-inter);
          font-size: 17px;
          font-weight: 600;
          color: #1d1d1f;
          letter-spacing: 0;
          line-height: 1.3;
        }
        .card-desc {
          font-size: 13.5px;
          color: #6b6b6f;
          line-height: 1.55;
          margin: 0;
        }
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; gap: 32px; }
          .services { padding: 100px 0; }
          .title { margin-bottom: 56px; }
        }
      `}</style>
    </section>
  );
}
