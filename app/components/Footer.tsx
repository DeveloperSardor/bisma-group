"use client";

import { useState } from "react";
import { ChevronDown, Phone, Mail, MapPin, Send, Check } from "lucide-react";
import { useTranslation } from "../i18n/LangContext";
import { getLocalized } from "../i18n/utils";

type Faq = { id: string; question: string; answer: string };
type Office = { name: string; address: string; landmark: string; mapsQuery: string };

export default function Footer({
  faqs = [],
  offices = [],
  phone,
  phoneRaw,
  email,
  telegram,
  whatsapp,
  instagram,
}: {
  faqs?: Faq[];
  offices?: Office[];
  phone?: string;
  phoneRaw?: string;
  email?: string;
  telegram?: string;
  whatsapp?: string;
  instagram?: string;
}) {
  const { lang, t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id ?? null);
  const [form, setForm] = useState({ name: "", phone: "", project: "Kosmetik remont", type: "Kvartira" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data?.error || "Yuborishda xatolik");
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setForm({ name: "", phone: "", project: "Kosmetik remont", type: "Kvartira" });
      }, 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Yuborishda xatolik");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        {faqs.length > 0 && (
          <div className="faq-block">
            <div className="head-center">
              <span className="kicker">{t("footer.faqEyebrow")}</span>
              <h2 className="title">{t("footer.faqTitle")} {t("footer.faqAccent")}</h2>
            </div>
            <div className="faq-list">
              {faqs.map((f) => {
                const open = openFaq === f.id;
                const q = getLocalized(f.question, lang) || f.question;
                const a = getLocalized(f.answer, lang) || f.answer;
                return (
                  <div key={f.id} className={`faq-item ${open ? "is-open" : ""}`}>
                    <button onClick={() => setOpenFaq(open ? null : f.id)} className="faq-q">
                      <span>{q}</span>
                      <ChevronDown size={18} className="faq-chev" />
                    </button>
                    <div className="faq-a-wrap">
                      <p className="faq-a">{a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="contact-block">
          <div className="contact-text">
            <span className="kicker">{t("footer.contactEyebrow")}</span>
            <h2 className="title" style={{ marginTop: 18 }}>
              {t("footer.contactTitle")} {t("footer.contactAccent")}
            </h2>
            <p className="lead">{t("footer.contactSub")}</p>

            <div className="chips">
              {phone && (
                <a href={`tel:${phoneRaw || phone.replace(/\s/g, "")}`} className="chip">
                  <Phone size={14} strokeWidth={1.8} />
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="chip">
                  <Mail size={14} strokeWidth={1.8} />
                  {email}
                </a>
              )}
            </div>
          </div>

          <div id="form" className="form-wrap">
            {isSuccess ? (
              <div className="success">
                <div className="success-icon"><Check size={28} strokeWidth={2.5} /></div>
                <h3>{t("footer.successTitle")}</h3>
                <p>{t("footer.successDesc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form">
                <div className="field">
                  <label>{t("footer.nameLabel")}</label>
                  <input
                    type="text"
                    required
                    placeholder={t("footer.namePlaceholder")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>{t("footer.phoneLabel")}</label>
                  <input
                    type="tel"
                    required
                    placeholder={t("footer.phonePlaceholder")}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="row">
                  <div className="field">
                    <label>{t("footer.projectLabel")}</label>
                    <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}>
                      <option>Kosmetik remont</option>
                      <option>Kapital remont</option>
                      <option>Dizaynerlik remont</option>
                      <option>Hammom va oshxona</option>
                      <option>Hali aniq emas</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>{t("footer.typeLabel")}</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option>Kvartira</option>
                      <option>Ofis</option>
                      <option>Tijorat joyi</option>
                      <option>Xususiy uy</option>
                    </select>
                  </div>
                </div>

                {submitError && <div className="form-error">{submitError}</div>}

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? t("footer.sending") : t("footer.submitBtn")}
                  <Send size={14} strokeWidth={1.8} />
                </button>
              </form>
            )}
          </div>
        </div>

        {offices.length > 0 && (
          <div className="offices">
            {offices.map((o, i) => (
              <a
                key={i}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  o.mapsQuery || o.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="office"
              >
                <MapPin size={16} strokeWidth={1.8} />
                <div>
                  <strong>{o.name}</strong>
                  <span>{o.address}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="cols">
          <div className="col">
            <h4>BISMA GROUP</h4>
            <a href="#projects">{t("footer.colWorks")}</a>
            <a href="#services">{t("footer.colServices")}</a>
            <a href="#about">{t("footer.colAbout")}</a>
          </div>
          <div className="col">
            <h4>{t("footer.colContact")}</h4>
            {offices[0] && <span className="muted">{offices[0].address}</span>}
            {email && <a href={`mailto:${email}`}>{email}</a>}
            {phone && <a href={`tel:${phoneRaw || phone.replace(/\s/g, "")}`}>{phone}</a>}
          </div>
          <div className="col">
            <h4>{t("footer.colSubscribe")}</h4>
            {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            {telegram && <a href={telegram} target="_blank" rel="noopener noreferrer">Telegram</a>}
            {whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
          </div>
        </div>

        <div className="bottom">
          <span>© {new Date().getFullYear()} Bisma Group</span>
          <span className="muted">Toshkent, O&apos;zbekiston</span>
        </div>
      </div>

      <style jsx>{`
        .footer { background: #ffffff; border-top: 1px solid rgba(0,0,0,0.08); padding: 120px 0 40px; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

        .head-center { text-align: center; margin: 0 auto 56px; max-width: 720px; }
        .kicker {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          margin-bottom: 12px;
        }
        .title {
          font-family: var(--font-inter);
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 400;
          letter-spacing: -0.015em;
          color: #1d1d1f;
          line-height: 1.05;
        }
        .lead {
          font-size: 15.5px;
          line-height: 1.6;
          color: #6b6b6f;
          margin: 22px 0 32px;
          max-width: 440px;
        }

        .faq-block { margin-bottom: 120px; }
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .faq-item { border-bottom: 1px solid rgba(0,0,0,0.08); }
        .faq-q {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          padding: 24px 0;
          background: transparent;
          border: 0;
          cursor: pointer;
          font-family: inherit;
          font-size: 16.5px;
          font-weight: 500;
          text-align: left;
          color: #1d1d1f;
        }
        .faq-chev { color: #86868b; transition: transform 0.35s var(--ease); flex-shrink: 0; }
        .faq-item.is-open .faq-chev { transform: rotate(180deg); }
        .faq-a-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s var(--ease);
        }
        .faq-item.is-open .faq-a-wrap { grid-template-rows: 1fr; }
        .faq-a-wrap > .faq-a { overflow: hidden; }
        .faq-a {
          font-size: 14.5px;
          line-height: 1.65;
          color: #6b6b6f;
          padding-bottom: 24px;
          max-width: 90%;
        }

        .contact-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          padding: 100px 0;
          border-top: 1px solid rgba(0,0,0,0.08);
          align-items: start;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 16px;
          background: #f5f5f7;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          color: #1d1d1f;
        }
        .chip:hover { background: #1d1d1f; color: #ffffff; border-color: #1d1d1f; }

        .form-wrap {
          background: #f5f5f7;
          padding: 36px;
          border-radius: 16px;
        }
        .form { display: flex; flex-direction: column; gap: 18px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b6b6f;
        }
        .field input, .field select {
          width: 100%;
          padding: 13px 16px;
          font-size: 14px;
          font-family: inherit;
          color: #1d1d1f;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          outline: none;
          transition: border-color 0.25s var(--ease);
        }
        .field input:focus, .field select:focus { border-color: #1d1d1f; }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-error {
          padding: 10px 14px;
          background: rgba(255, 59, 48, 0.08);
          color: #c0392b;
          border-radius: 8px;
          font-size: 13px;
        }
        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 26px;
          margin-top: 4px;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff;
          background: #1d1d1f;
          border: 0;
          border-radius: 100px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .submit-btn:hover:not(:disabled) { background: #000000; }
        .submit-btn:disabled { opacity: 0.6; cursor: wait; }

        .success {
          padding: 60px 30px;
          text-align: center;
        }
        .success-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 20px;
          background: #1d1d1f;
          color: #ffffff;
          border-radius: 50%;
          display: grid;
          place-items: center;
        }
        .success h3 { font-size: 20px; font-weight: 500; margin-bottom: 8px; color: #1d1d1f; }
        .success p { color: #6b6b6f; font-size: 14px; }

        .offices {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 40px 0;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .office {
          display: flex;
          gap: 14px;
          padding: 16px 0;
          color: #1d1d1f;
        }
        .office > :global(svg) {
          color: #86868b;
          flex-shrink: 0;
          margin-top: 3px;
        }
        .office strong {
          display: block;
          font-size: 13.5px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .office span {
          display: block;
          font-size: 12.5px;
          color: #6b6b6f;
          line-height: 1.5;
        }

        .cols {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          padding: 60px 0 40px;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .col { display: flex; flex-direction: column; gap: 14px; }
        .col h4 {
          font-family: var(--font-inter);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #1d1d1f;
          margin-bottom: 8px;
        }
        .col a { font-size: 14px; color: #6b6b6f; }
        .col a:hover { color: #1d1d1f; }
        .col .muted { font-size: 13.5px; color: #6b6b6f; }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 28px;
          border-top: 1px solid rgba(0,0,0,0.08);
          font-size: 12.5px;
          color: #6b6b6f;
        }

        @media (max-width: 900px) {
          .contact-block { grid-template-columns: 1fr; gap: 48px; padding: 80px 0; }
          .form-wrap { padding: 28px; }
          .offices { grid-template-columns: 1fr; gap: 4px; }
          .cols { grid-template-columns: 1fr; gap: 32px; }
          .bottom { flex-direction: column; gap: 12px; }
        }
        @media (max-width: 520px) {
          .row { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
