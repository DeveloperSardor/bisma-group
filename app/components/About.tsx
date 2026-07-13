"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "../i18n/LangContext";
import { getLocalized } from "../i18n/utils";

type Testimonial = {
  id: string;
  category: string;
  author: string;
  age: string;
  quote: string;
  result: string;
  avatar: string;
};

type AboutProps = {
  founded?: string;
  experience?: string;
  projects?: string;
  warranty?: string;
  testimonials?: Testimonial[];
};

export default function About({
  founded = "2014",
  experience = "11",
  projects = "500+",
  warranty = "2 yil",
  testimonials = [],
}: AboutProps) {
  const { lang, t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const active = testimonials[idx];

  const stats = [
    { value: projects, label: t("about.stats.projects") },
    { value: `${experience}+`, label: t("about.stats.experience") },
    { value: founded, label: t("about.stats.founded") },
    { value: getLocalized(warranty, lang) || warranty, label: t("about.stats.warranty") },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <span className="kicker">{t("about.eyebrow")}</span>

        <div className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {active && (
          <div className="testimonial">
            <Quote size={32} strokeWidth={1.3} className="t-quote-icon" />
            <p className="t-text">{getLocalized(active.quote, lang) || active.quote}</p>
            <div className="t-bottom">
              <div className="t-author">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.avatar} alt={getLocalized(active.author, lang) || active.author} />
                <div>
                  <strong>{getLocalized(active.author, lang) || active.author}</strong>
                  <span>{getLocalized(active.age, lang) || active.age}</span>
                </div>
              </div>
              {testimonials.length > 1 && (
                <div className="t-nav">
                  <button
                    onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}
                    aria-label="Previous"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="t-count">
                    {String(idx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => setIdx((idx + 1) % testimonials.length)}
                    aria-label="Next"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .about { padding: 140px 0; background: #ffffff; }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .kicker {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          margin-bottom: 56px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          margin-bottom: 100px;
        }
        .stat {
          padding: 40px 28px;
          border-left: 1px solid rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 200px;
        }
        .stat:first-child { border-left: 0; padding-left: 0; }
        .stat-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.55);
        }
        .stat-value {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 3.6vw, 3rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #1d1d1f;
          line-height: 1;
        }

        .testimonial {
          max-width: 880px;
          margin: 0 auto;
          padding: 60px 40px;
          background: #f5f5f7;
          border-radius: 12px;
          text-align: center;
        }
        .t-quote-icon {
          color: rgba(0,0,0,0.35);
          margin: 0 auto 24px;
          display: block;
        }
        .t-text {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(18px, 1.8vw, 22px);
          line-height: 1.5;
          color: #1d1d1f;
          margin-bottom: 36px;
          letter-spacing: -0.01em;
          font-weight: 400;
        }
        .t-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .t-author {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .t-author img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }
        .t-author strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1d1d1f;
          text-align: left;
        }
        .t-author span {
          display: block;
          font-size: 12.5px;
          color: rgba(0,0,0,0.55);
          text-align: left;
        }
        .t-nav { display: flex; align-items: center; gap: 8px; }
        .t-nav button {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.12);
          color: #1d1d1f;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: all 0.25s var(--ease);
        }
        .t-nav button:hover {
          background: #1d1d1f;
          color: #ffffff;
          border-color: #1d1d1f;
        }
        .t-count {
          font-size: 11.5px;
          color: rgba(0,0,0,0.55);
          font-variant-numeric: tabular-nums;
          padding: 0 8px;
        }

        @media (max-width: 900px) {
          .stats { grid-template-columns: repeat(2, 1fr); }
          .stat:nth-child(odd) { border-left: 0; padding-left: 0; }
          .stat:nth-child(3), .stat:nth-child(4) { border-top: 1px solid rgba(0,0,0,0.08); }
        }
        @media (max-width: 600px) {
          .about { padding: 90px 0; }
          .stats { grid-template-columns: 1fr; margin-bottom: 60px; }
          .stat { border-left: 0 !important; border-top: 1px solid rgba(0,0,0,0.08); padding: 32px 0 !important; min-height: 0; }
          .stat:first-child { border-top: 0; }
          .testimonial { padding: 40px 24px; }
          .t-bottom { flex-direction: column; gap: 18px; }
        }
      `}</style>
    </section>
  );
}
