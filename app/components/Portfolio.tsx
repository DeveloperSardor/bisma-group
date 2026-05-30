"use client";

import { useTranslation } from "../i18n/LangContext";
import { getLocalized } from "../i18n/utils";

type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  area: string;
  image: string;
  isCommercial: boolean;
};

export default function Portfolio({ items }: { items: Project[] }) {
  const { lang, t } = useTranslation();
  if (!items || items.length === 0) return null;

  return (
    <section id="projects" className="portfolio">
      <div className="container">
        <div className="head">
          <h2 className="title">{t("portfolio.titlePart2")}</h2>
          <a href="#contact" className="more-btn">{t("portfolio.contactBtn")}</a>
        </div>

        <div className="grid">
          {items.slice(0, 4).map((p) => {
            const name = getLocalized(p.name, lang) || p.name;
            const tagline = getLocalized(p.tagline, lang) || p.tagline;
            return (
              <article key={p.id} className="card">
                <div className="image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={name} />
                </div>
                <div className="meta">
                  <h3 className="name">{name}</h3>
                  <div className="sub">
                    <span>{p.area}</span>
                    {tagline && <span className="dot" />}
                    {tagline && <span className="tagline">{tagline}</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .portfolio { padding: 140px 0; background: #ffffff; }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 64px;
          gap: 24px;
          flex-wrap: wrap;
        }
        .title {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 400;
          letter-spacing: -0.015em;
          color: #1d1d1f;
          max-width: 760px;
          line-height: 1.05;
        }
        .more-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 22px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1d1d1f;
          border: 1px solid rgba(0,0,0,0.15);
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .more-btn:hover { background: #1d1d1f; color: #ffffff; border-color: #1d1d1f; }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        .card { display: flex; flex-direction: column; gap: 18px; cursor: pointer; }
        .image-wrap {
          aspect-ratio: 16/10;
          overflow: hidden;
          background: #f5f5f7;
          border-radius: 8px;
        }
        .image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s var(--ease);
        }
        .card:hover .image-wrap img { transform: scale(1.04); }
        .meta { display: flex; flex-direction: column; gap: 6px; }
        .name {
          font-family: var(--font-inter);
          font-size: 18px;
          font-weight: 600;
          color: #1d1d1f;
          letter-spacing: 0;
        }
        .sub {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #6b6b6f;
          letter-spacing: 0.01em;
        }
        .sub .dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(0,0,0,0.25);
        }
        @media (max-width: 800px) {
          .grid { grid-template-columns: 1fr; }
          .portfolio { padding: 100px 0; }
          .head { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
