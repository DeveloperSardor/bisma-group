"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, DollarSign, Calendar, ChevronDown, ChevronUp, Check, Sparkles, Send } from "lucide-react";

const vacanciesData = [
  {
    id: "master",
    title: "Universal usta (otdelochnik)",
    salary: "8 000 000 - 18 000 000 so‘m",
    type: "Loyiha asosida",
    schedule: "Dush - Shan, 08:00 - 18:00",
    duties: [
      "Devor va shiftni shpaklyovka qilish, tekislash va bo‘yashni sifatli darajada bajarish.",
      "Plitka yotqizish, gidroizolyatsiya va germetik ishlarni standart bo‘yicha amalga oshirish.",
      "Pol qoplamalarini o‘rnatish — laminat, parket, plintus va plinkalarni sifatli o‘rnatish.",
      "Brigadir va prorab nazoratida muddat va smetadan chetga chiqmasdan ish bajarish.",
    ],
    requirements: [
      "Otdelochnik sifatida kamida 3 yil tajriba va o‘z asboblari mavjudligi.",
      "Knauf, Ceresit, Volma kabi sertifikatlangan materiallar bilan ishlay olish.",
      "Sifatli detallarga e'tibor, mol-mulk himoyasi va tartibli ish o‘rni tutish.",
      "Brigadada tinch va hurmat bilan ishlash, mijoz bilan muloqotda professional bo‘lish.",
    ],
  },
  {
    id: "smetchik",
    title: "Smetchik (smeta tuzuvchi)",
    salary: "10 000 000 - 18 000 000 so‘m + Bonus",
    type: "To‘liq stavka",
    schedule: "Dush - Shan, 09:00 - 18:00",
    duties: [
      "Mijoz ob'ektiga chiqib o‘lchov olish va aniq smeta tuzish (5–7 ish kuni ichida).",
      "Material va ish narxlarini bozor narxlarini hisobga olib doimo yangilab borish.",
      "Mijoz bilan smeta detallarini tushuntirish va variantlar taklif qilish (kosmetik / kapital / dizaynerlik).",
      "Brigadir va prorab bilan smeta bo‘yicha aniq texnik topshiriq tayyorlash.",
    ],
    requirements: [
      "Qurilish yoki remont sohasida smeta tuzish bo‘yicha kamida 2 yil tajriba.",
      "AutoCAD yoki shu kabi loyihalashtirish dasturlarida ishlash ko‘nikmasi.",
      "Material narxlari, normalar va GOST standartlarini bilish.",
      "Mijoz bilan ravon muloqot va yozma hujjatlarni aniq tuzish qobiliyati.",
    ],
  },
];

const perks = [
  "Raqobatbardosh va o‘z vaqtida to‘lanadigan barqaror oylik maosh",
  "Sotuv hajmidan beriladigan yuqori va cheksiz oylik foizlar (bonuslar)",
  "Professional jamoa va shaxsiy rivojlanish uchun maxsus treninglar",
  "Toshkent shahrining shinam ofisida, barcha qulayliklar bilan ishlash",
];

export default function Vacancies() {
  const [expandedId, setExpandedId] = useState<string | null>(vacanciesData[0].id);
  const [formData, setFormData] = useState({ name: "", phone: "", job: vacanciesData[0].title, text: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", job: vacanciesData[0].title, text: "" });
      }, 5000);
    }
  };

  return (
    <section id="vacancies" className="vacancies-section">
      <div className="container">
        {/* Header */}
        <header className="vacancies-header">
          <span className="vac-mini-label">KARYERA</span>
          <h2 className="vac-h2">
            Bizning jamoaga <span className="title-accent">qo‘shiling!</span>
          </h2>
          <p className="vac-subtitle">
            Bisma Group o‘z jamoasini kengaytiradi — sifatli ishni qadrlaydigan ustalar va smetchikllar uchun joylar bor.
          </p>
        </header>

        <div className="vacancies-grid">
          {/* Left Column: Job Cards */}
          <div className="job-cards-list">
            <h3 className="column-title">Mavjud vakansiyalar:</h3>
            <div className="cards-stack">
              {vacanciesData.map((job) => {
                const isExpanded = expandedId === job.id;
                return (
                  <div key={job.id} className={`job-card ${isExpanded ? "active" : ""}`}>
                    <div className="job-card-header" onClick={() => toggleExpand(job.id)}>
                      <div className="header-text-part">
                        <h4>{job.title}</h4>
                        <div className="job-meta-row">
                          <span className="job-meta-badge salary">
                            <DollarSign size={12} />
                            {job.salary}
                          </span>
                          <span className="job-meta-badge">
                            <Briefcase size={12} />
                            {job.type}
                          </span>
                          <span className="job-meta-badge">
                            <Calendar size={12} />
                            {job.schedule}
                          </span>
                        </div>
                      </div>
                      <button className="expand-btn">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="job-card-body"
                        >
                          <div className="body-inner-content">
                            <div className="body-section">
                              <h5>Asosiy vazifalari:</h5>
                              <ul className="bullet-list">
                                {job.duties.map((duty, idx) => (
                                  <li key={idx}>{duty}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="body-section mt-16">
                              <h5>Nomzodga qo‘yiladigan talablar:</h5>
                              <ul className="bullet-list">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </div>

                            <button
                              className="btn-apply-direct"
                              onClick={() => setFormData({ ...formData, job: job.title })}
                            >
                              SHU LAVOZIMGA ARIZA TOPSHIRISH
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Perks and Quick Form */}
          <div className="vacancies-info-sidebar">
            {/* Perks */}
            <div className="perks-card">
              <div className="perks-header">
                <Sparkles size={22} color="#2997ff" />
                <h4>Nima uchun Bisma Group jamoasi?</h4>
              </div>
              <ul className="perks-list">
                {perks.map((perk, idx) => (
                  <li key={idx}>
                    <Check size={16} color="#34c759" className="check-icon" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick apply form */}
            <div className="apply-quick-card">
              <h4>Tezkor ariza qoldirish</h4>
              <p>Rezyumeingizni yoki aloqa ma’lumotlaringizni qoldiring, biz siz bilan tez orada bog‘lanamiz.</p>

              {isSubmitted ? (
                <div className="success-banner">
                  <Check size={32} color="#34c759" />
                  <h5>Arizangiz muvaffaqiyatli yuborildi!</h5>
                  <p>Kadrlar bo‘limi mutaxassisi siz bilan tez fursatda aloqaga chiqadi.</p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="quick-job-form">
                  <div className="form-group-dense">
                    <label>Ismingiz va familiyangiz *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Odilbek Karimov"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group-dense">
                    <label>Telefon raqamingiz *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 (90) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group-dense">
                    <label>Sizni qiziqtirgan lavozim</label>
                    <select
                      value={formData.job}
                      onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                    >
                      {vacanciesData.map((j) => (
                        <option key={j.id} value={j.title}>
                          {j.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-dense">
                    <label>O‘zingiz haqida qisqacha (rezyume havolasi yoki tajriba)</label>
                    <textarea
                      placeholder="Tajribangiz, ta’limingiz yoki rezyume havolasi..."
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-submit-job">
                    ARIZANI YUBORISH <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vacancies-section {
          padding: 120px 0;
          background-color: #fafbfc;
          color: var(--text-main);
          border-top: 1px solid rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .container {
          max-width: 1250px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .vacancies-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vac-mini-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.5em;
          color: #2997ff;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .vac-h2 {
          font-family: var(--font-inter);
          font-size: clamp(1.5rem, 5.5vw, 3.2rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: var(--text-main);
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .title-accent { color: #86868b; font-weight: 500; }

        .vac-subtitle {
          max-width: 650px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.7;
          font-weight: 300;
          margin: 0;
        }

        /* Grid */
        .vacancies-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .vacancies-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .column-title {
          font-family: var(--font-inter);
          font-size: 18px;
          color: #1d1d1f;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .cards-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .job-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.01);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .job-card.active,
        .job-card:hover {
          border-color: rgba(41, 151, 255, 0.3);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .job-card-header {
          padding: 24px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .header-text-part h4 {
          font-family: var(--font-inter);
          font-size: 18px;
          color: #1d1d1f;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .job-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .job-meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.03);
          color: rgba(0, 0, 0, 0.6);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .job-meta-badge.salary {
          background: rgba(41, 151, 255, 0.06);
          color: #2997ff;
        }

        .expand-btn {
          background: transparent;
          border: none;
          color: rgba(0, 0, 0, 0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .job-card.active .expand-btn {
          color: #2997ff;
        }

        .job-card-body {
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .body-inner-content {
          padding: 30px;
        }

        .body-section h5 {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(0, 0, 0, 0.5);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bullet-list li {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.75);
          position: relative;
          padding-left: 18px;
        }

        .bullet-list li::before {
          content: "•";
          position: absolute;
          left: 4px;
          color: #2997ff;
          font-weight: 700;
          font-size: 16px;
          top: -1px;
        }

        .mt-16 {
          margin-top: 16px;
        }

        .btn-apply-direct {
          background: #1d1d1f;
          color: #2997ff;
          border: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 14px 24px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 24px;
          transition: all 0.3s ease;
        }

        .btn-apply-direct:hover {
          background: #2997ff;
          color: #1d1d1f;
          box-shadow: 0 8px 25px rgba(41, 151, 255, 0.25);
        }

        /* Sidebar Column */
        .vacancies-info-sidebar {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .perks-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.01);
        }

        .perks-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 15px;
          margin-bottom: 20px;
        }

        .perks-header h4 {
          font-family: var(--font-inter);
          font-size: 16px;
          color: #1d1d1f;
          font-weight: 600;
          margin: 0;
        }

        .perks-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .perks-list li {
          display: flex;
          align-items: start;
          gap: 12px;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.8);
        }

        .perks-list li :global(.check-icon) {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Apply quick card */
        .apply-quick-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.01);
        }

        .apply-quick-card h4 {
          font-family: var(--font-inter);
          font-size: 16px;
          color: #1d1d1f;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .apply-quick-card p {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.5);
          margin-bottom: 20px;
        }

        .quick-job-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-group-dense {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group-dense label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.6);
        }

        .form-group-dense input,
        .form-group-dense select,
        .form-group-dense textarea {
          background: #fafbfc;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #1d1d1f;
          transition: border-color 0.3s ease;
        }

        .form-group-dense input:focus,
        .form-group-dense select:focus,
        .form-group-dense textarea:focus {
          border-color: #2997ff;
          outline: none;
          background: #ffffff;
        }

        .form-group-dense textarea {
          resize: vertical;
          min-height: 80px;
        }

        .btn-submit-job {
          background: #2997ff;
          color: #1d1d1f;
          border: none;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 14px 0;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .btn-submit-job:hover {
          background: #1d1d1f;
          color: #2997ff;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        /* Success banner */
        .success-banner {
          background: rgba(52, 199, 89, 0.06);
          border: 1px solid rgba(52, 199, 89, 0.15);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .success-banner h5 {
          font-family: var(--font-inter);
          font-size: 16px;
          color: #1d1d1f;
          font-weight: 600;
          margin: 0;
        }

        .success-banner p {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.6);
          margin: 0;
        }
      `}</style>
    </section>
  );
}
