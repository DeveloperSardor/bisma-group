"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../i18n/LangContext";
import { getLocalized } from "../i18n/utils";

export default function Hero({
  title,
  accent,
  desc,
  image,
}: {
  title?: string;
  accent?: string;
  desc?: string;
  image?: string;
  phone?: string;
  projectsCount?: string;
  experience?: string;
  warranty?: string;
}) {
  const { t, lang } = useTranslation();
  const titleL = getLocalized(title, lang) || t("hero.title");
  const accentL = getLocalized(accent, lang) || t("hero.titleAccent");
  const descL = getLocalized(desc, lang) || t("hero.desc");
  const heroImg = image && image.trim() ? image : "/hero-bg-interior.png";
  // next/image with `fill` requires an absolute/known dimension. For uploaded
  // images served from /uploads, next/image works fine. For external URLs,
  // they'd need remotePatterns; for safety fall back to a plain <img>.
  const isLocalPath = heroImg.startsWith("/");

  return (
    <section className="hero-section">
      <div className="hero-bg-layer">
        {isLocalPath ? (
          <Image
            src={heroImg}
            alt="Bisma Group interior"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={92}
            className="hero-image-main"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImg}
            alt="Bisma Group interior"
            className="hero-image-main"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content" id="hero">
        <h1 className="hero-title">
          <span className="hero-title-line">{titleL}</span>
          <span className="hero-title-line hero-title-accent">{accentL}</span>
        </h1>

        <p className="hero-desc">{descL}</p>

        <div className="hero-actions">
          <a href="#contact" className="hero-btn">
            {t("hero.ctaPrimary")}
            <ArrowRight size={15} strokeWidth={1.6} />
          </a>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden>
        <span className="hero-scroll-line" />
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 720px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0c;
          overflow: hidden;
          text-align: center;
        }

        .hero-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-bg-layer :global(.hero-image-main) {
          object-fit: cover;
          object-position: center;
          filter: brightness(0.78);
          animation: heroZoom 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%),
            linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 100;
          max-width: 1100px;
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-title {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(2.6rem, 7.2vw, 6rem);
          line-height: 1.02;
          letter-spacing: -0.035em;
          color: #ffffff;
          margin: 0 0 28px;
          font-weight: 400;
          display: flex;
          flex-direction: column;
          gap: 0.05em;
        }

        .hero-title-line { display: block; }

        .hero-title-accent {
          font-style: italic;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.78);
        }

        .hero-desc {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: rgba(255, 255, 255, 0.72);
          max-width: 560px;
          margin: 0 auto 40px;
          line-height: 1.6;
          font-weight: 400;
          letter-spacing: 0.005em;
        }

        .hero-actions {
          display: inline-flex;
          align-items: center;
          gap: 14px;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 100px;
          transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease;
        }

        .hero-btn:hover {
          background: #ffffff;
          color: #0a0a0c;
          border-color: #ffffff;
        }

        .hero-scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: 1px;
          height: 56px;
          overflow: hidden;
        }

        .hero-scroll-line {
          display: block;
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 30%,
            rgba(255, 255, 255, 0.85) 50%,
            transparent 70%,
            transparent 100%
          );
          background-size: 100% 200%;
          animation: scrollLine 2.4s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }

        @keyframes scrollLine {
          0% { background-position: 0% 100%; }
          100% { background-position: 0% -100%; }
        }

        @media (max-width: 900px) {
          .hero-section { min-height: 640px; }
          .hero-content { padding: 0 24px; }
          .hero-desc { margin-bottom: 32px; }
        }
      `}</style>
    </section>
  );
}
