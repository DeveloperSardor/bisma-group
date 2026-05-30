"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  CheckCircle2,
  FileText,
  ArrowUpRight,
  Users,
  Wallet,
  Home,
  Search,
  PenLine,
  KeyRound,
  ShieldCheck,
  Hammer,
  Sparkles,
  Calendar,
  Truck,
  Lock,
  Award,
  type LucideIcon,
} from "lucide-react";

type IconLabel = { Icon: LucideIcon; label: string };

const subsidyHero = { value: "5–7 kun", label: "Smeta tayyorlash muddati" };

const subsidyEligible: IconLabel[] = [
  { Icon: PenLine, label: "Onlayn ariza qoldirish" },
  { Icon: Search, label: "Ob'ektni o‘lchov uchun ko‘rish" },
  { Icon: FileText, label: "Aniq smeta tuzish" },
  { Icon: ShieldCheck, label: "Shartnoma imzolash" },
  { Icon: Hammer, label: "Ish boshlanishi" },
];

const subsidyDocs: IconLabel[] = [
  { Icon: Calendar, label: "Belgilangan muddat" },
  { Icon: Wallet, label: "Yashirin to‘lovlar yo‘q" },
  { Icon: Truck, label: "Material yetkazib berish" },
  { Icon: Lock, label: "Mol-mulk himoyasi" },
  { Icon: Sparkles, label: "Yakuniy klininglik" },
];

const mortgageStats = [
  { value: "2 yil", label: "Yozma kafolat" },
  { value: "100%", label: "Aniq smeta" },
  { value: "30+", label: "Sertifikatli brand" },
  { value: "500+", label: "Bajarilgan loyiha" },
];

const mortgageEligible: IconLabel[] = [
  { Icon: Award, label: "Sifat kafolati" },
  { Icon: Calendar, label: "Muddat kafolati" },
  { Icon: Wallet, label: "Narx kafolati" },
  { Icon: ShieldCheck, label: "Material kafolati" },
];

const projectsMortgage = [
  {
    name: "Kosmetik remont",
    image: "https://optim.tildacdn.one/tild3431-6637-4561-b338-646131366230/-/format/webp/07_2-min.jpg.webp",
    bonus: "Tezkor — 30 kunda",
    Icon: PenLine,
  },
  {
    name: "Kapital remont",
    image: "https://optim.tildacdn.one/tild3765-6638-4133-b366-356365393664/-/format/webp/03_2-min.jpg.webp",
    bonus: "Yangi kommunikatsiyalar",
    Icon: KeyRound,
  },
  {
    name: "Dizaynerlik remont",
    image: "https://optim.tildacdn.one/tild3261-3632-4734-b332-343333653933/-/format/webp/02_3-min.jpg.webp",
    bonus: "3D dizayn loyiha bilan",
    Icon: Home,
  },
];

const steps = [
  { id: "01", title: "Ariza qoldiring", desc: "Telefon yoki saytdan bog‘laning.", Icon: PenLine },
  { id: "02", title: "Bepul o‘lchov", desc: "Mutaxassis chiqib aniq smeta tuzadi.", Icon: Search },
  { id: "03", title: "Shartnoma", desc: "Aniq narx, muddat va kafolat shartlari.", Icon: ClipboardCheck },
  { id: "04", title: "Remont jarayoni", desc: "Har kunlik foto-hisobot bilan ish.", Icon: Hammer },
  { id: "05", title: "Topshirish", desc: "Klininglik va kalitlarni topshirish.", Icon: KeyRound },
];

export default function Workflow() {
  const [activeTab, setActiveTab] = useState<"subsidy" | "mortgage">("subsidy");

  return (
    <section id="mortgage" className="mortgage-section">
      <div className="container">
        {/* Header */}
        <header className="finance-header-centered">
          <span className="finance-mini-label">JARAYON VA KAFOLATLAR</span>
          <h2 className="finance-h2">
            Aloqadan <span className="title-accent">topshirilgunga qadar</span>
          </h2>
          <p className="finance-subtitle">
            Bizning ish jarayonimiz — har bir bosqich aniq, shartnomali va siz uchun shaffof.
          </p>
        </header>

        {/* Tab Buttons */}
        <div className="finance-tab-buttons" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "subsidy"}
            className={`finance-tab-btn ${activeTab === "subsidy" ? "is-active" : ""}`}
            onClick={() => setActiveTab("subsidy")}
          >
            <ClipboardCheck size={15} />
            <span>Jarayon</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "mortgage"}
            className={`finance-tab-btn ${activeTab === "mortgage" ? "is-active" : ""}`}
            onClick={() => setActiveTab("mortgage")}
          >
            <ShieldCheck size={15} />
            <span>Kafolatlar</span>
          </button>
        </div>

        {/* Panels */}
        <AnimatePresence mode="wait">
          {activeTab === "subsidy" && (
            <motion.div
              key="subsidy"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="panel-stack"
            >
              {/* SUBSIDY HERO */}
              <div className="hero-card">
                <div className="hero-card-text">
                  <div className="hc-icon-wrap"><ClipboardCheck size={20} /></div>
                  <h3>Bizning ish jarayonimiz — shaffof va aniq</h3>
                  <p>Aloqadan boshlab kalit topshirilgunga qadar — har bir bosqich shartnomada belgilangan va siz nazoratdan voz kechmaysiz.</p>
                </div>
                <div className="hero-card-stat">
                  <span>O‘RTA HAMDA</span>
                  <strong>{subsidyHero.value}</strong>
                  <span className="hcs-sub">{subsidyHero.label}</span>
                </div>
              </div>

              {/* TWO-COL: ELIGIBLE + DOCS */}
              <div className="grid-two">
                <div className="block-card">
                  <div className="block-card-header">
                    <div className="bch-icon"><Users size={16} /></div>
                    <h4>Hamkorlik bosqichlari</h4>
                  </div>
                  <div className="icon-tile-grid">
                    {subsidyEligible.map((e, i) => (
                      <div key={i} className="w-tile">
                        <div className="wt-icon"><e.Icon size={17} /></div>
                        <span>{e.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="block-card block-card-dark">
                  <div className="block-card-header">
                    <div className="bch-icon dark"><FileText size={16} /></div>
                    <h4>Bizdan oladigan narsalaringiz</h4>
                  </div>
                  <div className="icon-tile-grid">
                    {subsidyDocs.map((d, i) => (
                      <div key={i} className="w-tile dark">
                        <div className="wt-icon dark"><d.Icon size={17} /></div>
                        <span>{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "mortgage" && (
            <motion.div
              key="mortgage"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="panel-stack"
            >
              {/* MORTGAGE HERO */}
              <div className="hero-card">
                <div className="hero-card-text">
                  <div className="hc-icon-wrap"><ShieldCheck size={20} /></div>
                  <h3>Bisma Group — 4 ta yozma kafolat</h3>
                  <p>Sifat, muddat, narx va materiallar — hammasi shartnomada belgilangan. 2 yil davomida har qanday kamchilikni bepul tuzatamiz.</p>
                </div>
              </div>

              {/* MORTGAGE STATS GRID */}
              <div className="mortgage-stats-grid">
                {mortgageStats.map((s, i) => (
                  <div key={i} className="m-stat-card">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* MORTGAGE ELIGIBLE */}
              <div className="block-card">
                <div className="block-card-header">
                  <div className="bch-icon"><Users size={16} /></div>
                  <h4>Bizning 4 ta yozma kafolatimiz</h4>
                </div>
                <div className="icon-tile-grid">
                  {mortgageEligible.map((e, i) => (
                    <div key={i} className="w-tile">
                      <div className="wt-icon"><e.Icon size={17} /></div>
                      <span>{e.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PROJECTS COMPARISON — visual cards */}
        <div className="section-block">
          <div className="section-eyebrow">
            <span className="se-num">01</span>
            <span className="se-line" />
            <span className="se-title">REMONT TURLARI</span>
          </div>
          <h3 className="section-title">
            Har bir kvartira uchun <span className="title-accent">to‘g‘ri yechim</span>
          </h3>

          <div className="project-mortgage-grid">
            {projectsMortgage.map((p, i) => (
              <div key={i} className="pm-card">
                <div className="pm-image">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className="pm-image-grad" />
                  <span className="pm-name">{p.name}</span>
                </div>
                <div className="pm-body">
                  <div className="pm-row">
                    <Wallet size={13} />
                    <div>
                      <span>1 m² NARX</span>
                      <strong>$80 – $170</strong>
                    </div>
                  </div>
                  <div className="pm-row">
                    <Calendar size={13} />
                    <div>
                      <span>MUDDAT</span>
                      <strong className="cyan">30 – 120 kun</strong>
                    </div>
                  </div>
                  <div className="pm-row">
                    <CheckCircle2 size={13} />
                    <div>
                      <span>KAFOLAT</span>
                      <strong className="green">2 yil</strong>
                    </div>
                  </div>
                  <div className="pm-bonus">
                    <p.Icon size={14} />
                    <span>{p.bonus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TIMELINE — visual numbered steps */}
        <div className="section-block">
          <div className="section-eyebrow">
            <span className="se-num">02</span>
            <span className="se-line" />
            <span className="se-title">JARAYON BOSQICHLARI</span>
          </div>
          <h3 className="section-title">
            Remont jarayoni — <span className="title-accent">5 oson qadam</span>
          </h3>

          <div className="timeline-row">
            {steps.map((step, i) => (
              <div key={i} className="tl-step">
                <div className="tl-circle">
                  <step.Icon size={20} />
                  <span className="tl-num">{step.id}</span>
                </div>
                <h5>{step.title}</h5>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA NOTE */}
        <div className="finance-note-cta">
          <div className="fnc-text">
            <span className="fnc-eyebrow">⚡ BEPUL CHIQISH BUGUN</span>
            <p>
              Bugun ariza qoldiring — mutaxassisimiz ish kunining 24 soat ichida bepul o‘lchov uchun keladi.
            </p>
          </div>
          <a href="#contact" className="finance-cta-btn">
            BEPUL SMETA OLISH <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .mortgage-section {
          padding: 120px 0;
          background: #ffffff;
          color: var(--text-main);
        }

        @media (max-width: 768px) {
          .mortgage-section { padding: 80px 0; }
        }

        @media (max-width: 600px) {
          .mortgage-section { padding: 60px 0; }
          .hero-card { padding: 22px 20px; }
          .hero-card-stat { padding: 18px 20px; }
          .block-card { padding: 22px 18px; }
          .finance-note-cta { padding: 22px 20px; }
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
        }

        .finance-header-centered {
          text-align: center;
          margin-bottom: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .finance-mini-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.5em;
          color: #2997ff;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .finance-h2 {
          font-family: var(--font-inter);
          font-size: clamp(1.45rem, 5vw, 2.8rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: var(--text-main);
          margin: 0 0 16px;
          line-height: 1.15;
        }

        .title-accent { color: #86868b; font-weight: 500; }

        .finance-subtitle {
          max-width: 600px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.65;
          font-weight: 300;
          margin: 0;
        }

        /* TABS */
        .finance-tab-buttons {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin: 0 auto 36px;
          padding: 6px;
          border-radius: 100px;
          background: #fafbfc;
          border: 1px solid rgba(0, 0, 0, 0.06);
          width: fit-content;
        }

        .finance-tab-btn {
          background: transparent;
          border: none;
          color: rgba(0, 0, 0, 0.65);
          padding: 11px 22px;
          font-size: 12.5px;
          font-weight: 600;
          border-radius: 100px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .finance-tab-btn:hover {
          color: #1d1d1f;
          background: rgba(0, 0, 0, 0.04);
        }

        .finance-tab-btn.is-active {
          background: #1d1d1f;
          color: #2997ff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        /* PANEL STACK */
        .panel-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* HERO CARD */
        .hero-card {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 32px;
          align-items: center;
          background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 22px;
          padding: 32px 36px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 900px) {
          .hero-card { grid-template-columns: 1fr; padding: 24px; gap: 20px; }
        }

        .hero-card-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hc-icon-wrap {
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

        .hero-card-text h3 {
          font-family: var(--font-inter);
          font-size: clamp(1.4rem, 2vw, 1.75rem);
          color: #1d1d1f;
          font-weight: 500;
          margin: 0;
          line-height: 1.2;
        }

        .hero-card-text p {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.7);
          font-weight: 300;
          margin: 0;
        }

        .hero-card-stat {
          background: linear-gradient(135deg, #1d1d1f 0%, #1c1c4f 100%);
          color: white;
          padding: 24px 26px;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hero-card-stat span {
          font-size: 9.5px;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 255, 0.55);
          font-weight: 700;
        }

        .hero-card-stat strong {
          font-family: var(--font-inter);
          font-size: clamp(1.6rem, 2.6vw, 2.2rem);
          color: #2997ff;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .hcs-sub {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.45;
          margin-top: 6px;
        }

        /* MORTGAGE STATS GRID */
        .mortgage-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        @media (max-width: 768px) {
          .mortgage-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .m-stat-card {
          background: linear-gradient(135deg, #1d1d1f 0%, #1d1d5c 100%);
          color: white;
          padding: 22px 20px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
        }

        .m-stat-card strong {
          font-family: var(--font-inter);
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          color: #2997ff;
          font-weight: 500;
          line-height: 1;
        }

        .m-stat-card span {
          font-size: 10.5px;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 700;
          text-transform: uppercase;
        }

        /* GRID TWO */
        .grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        @media (max-width: 900px) {
          .grid-two { grid-template-columns: 1fr; }
        }

        /* BLOCK CARD */
        .block-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 26px;
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.025);
        }

        .block-card-dark {
          background: linear-gradient(135deg, #1d1d1f 0%, #1c1c4f 100%);
          border-color: transparent;
          color: white;
        }

        .block-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .block-card-dark .block-card-header {
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }

        .bch-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: rgba(41, 151, 255, 0.1);
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bch-icon.dark { background: rgba(41, 151, 255, 0.15); }

        .block-card-header h4 {
          font-family: var(--font-inter);
          font-size: 17px;
          color: #1d1d1f;
          font-weight: 500;
          margin: 0;
        }

        .block-card-dark .block-card-header h4 { color: #ffffff; }

        /* ICON TILE GRID */
        .icon-tile-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        @media (min-width: 600px) and (max-width: 900px) {
          .icon-tile-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .w-tile {
          background: #fafbfc;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 12px;
          padding: 13px;
          display: flex;
          align-items: center;
          gap: 11px;
          transition: all 0.3s ease;
        }

        .w-tile:hover {
          border-color: rgba(41, 151, 255, 0.3);
          background: rgba(41, 151, 255, 0.03);
          transform: translateY(-2px);
        }

        .w-tile.dark {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.06);
        }

        .w-tile.dark:hover {
          background: rgba(41, 151, 255, 0.08);
          border-color: rgba(41, 151, 255, 0.3);
        }

        .wt-icon {
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

        .wt-icon.dark { background: rgba(41, 151, 255, 0.15); }

        .w-tile span {
          font-size: 12.5px;
          color: #1d1d1f;
          font-weight: 500;
          line-height: 1.35;
        }

        .w-tile.dark span { color: #ffffff; }

        /* SECTION EYEBROW */
        .section-block {
          margin-top: 60px;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .section-block { margin-top: 40px; }
        }

        .section-eyebrow {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .se-num {
          font-family: var(--font-inter);
          font-size: 38px;
          font-weight: 300;
          color: #2997ff;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .se-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.12), transparent);
        }

        .se-title {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: rgba(0, 0, 0, 0.55);
          font-weight: 700;
        }

        .section-title {
          font-family: var(--font-inter);
          font-size: clamp(1.5rem, 2.2vw, 1.95rem);
          color: #1d1d1f;
          font-weight: 400;
          margin: 0 0 28px;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        /* PROJECT MORTGAGE GRID */
        .project-mortgage-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 900px) and (min-width: 601px) {
          .project-mortgage-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .project-mortgage-grid {
            display: flex;
            grid-template-columns: none;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 12px;
            padding: 4px 20px 8px;
            margin: 0 -20px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .project-mortgage-grid::-webkit-scrollbar { display: none; }
          .project-mortgage-grid > * {
            scroll-snap-align: start;
            flex-shrink: 0;
            width: 80%;
            max-width: 320px;
          }
        }

        .pm-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.025);
        }

        .pm-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(0, 0, 0, 0.08);
        }

        .pm-image {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .pm-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .pm-card:hover .pm-image img { transform: scale(1.05); }

        .pm-image-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.85) 100%);
        }

        .pm-name {
          position: absolute;
          left: 18px;
          bottom: 16px;
          color: white;
          font-family: var(--font-inter);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.005em;
        }

        .pm-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pm-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pm-row :global(svg) {
          color: #2997ff;
          flex-shrink: 0;
        }

        .pm-row > div {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .pm-row span {
          font-size: 8.5px;
          letter-spacing: 0.2em;
          color: rgba(0, 0, 0, 0.5);
          font-weight: 700;
        }

        .pm-row strong {
          font-size: 12.5px;
          color: #1d1d1f;
          font-weight: 600;
        }

        .pm-row strong.cyan { color: #2997ff; }
        .pm-row strong.green { color: #34c759; }

        .pm-bonus {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: linear-gradient(135deg, rgba(41, 151, 255, 0.08), rgba(41, 151, 255, 0.02));
          border: 1px solid rgba(41, 151, 255, 0.18);
          border-radius: 10px;
          margin-top: 4px;
        }

        .pm-bonus :global(svg) {
          color: #2997ff;
          flex-shrink: 0;
        }

        .pm-bonus span {
          font-size: 12px;
          color: #1d1d1f;
          font-weight: 600;
          line-height: 1.3;
        }

        /* TIMELINE */
        .timeline-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          position: relative;
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .timeline-row { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 768px) and (min-width: 601px) {
          .timeline-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 600px) {
          .timeline-row {
            display: flex;
            grid-template-columns: none;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 10px;
            padding: 4px 20px 8px;
            margin: 0 -20px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .timeline-row::-webkit-scrollbar { display: none; }
          .timeline-row > * {
            scroll-snap-align: start;
            flex-shrink: 0;
            width: 70%;
            max-width: 240px;
          }
        }

        .tl-step {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 16px;
          padding: 22px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: all 0.4s ease;
          position: relative;
        }

        .tl-step:hover {
          transform: translateY(-3px);
          border-color: rgba(41, 151, 255, 0.3);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.06);
        }

        .tl-circle {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #1d1d1f 0%, #1c1c4f 100%);
          color: #2997ff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .tl-num {
          position: absolute;
          top: -7px;
          right: -7px;
          background: #2997ff;
          color: #1d1d1f;
          font-family: var(--font-inter);
          font-size: 11px;
          font-weight: 700;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0;
          border: 2px solid #ffffff;
        }

        .tl-step h5 {
          font-family: var(--font-inter);
          font-size: 14px;
          color: #1d1d1f;
          font-weight: 600;
          margin: 0;
        }

        .tl-step p {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.6);
          margin: 0;
        }

        /* CTA NOTE */
        .finance-note-cta {
          margin-top: 60px;
          background: linear-gradient(135deg, #1d1d1f 0%, #1c1c4f 100%);
          border-radius: 18px;
          padding: 28px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          color: white;
          border: 1px solid rgba(41, 151, 255, 0.15);
          box-shadow: 0 14px 38px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .finance-note-cta { flex-direction: column; padding: 24px; text-align: center; }
        }

        .fnc-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .fnc-eyebrow {
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #2997ff;
          font-weight: 700;
        }

        .fnc-text p {
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          font-weight: 300;
        }

        .finance-cta-btn {
          background: #2997ff;
          color: #1d1d1f;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 14px 24px;
          border-radius: 100px;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 8px 22px rgba(41, 151, 255, 0.3);
        }

        .finance-cta-btn:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(41, 151, 255, 0.4);
        }
      `}</style>
    </section>
  );
}
