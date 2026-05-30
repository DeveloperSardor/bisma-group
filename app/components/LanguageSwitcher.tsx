'use client';

import { useTranslation } from '../i18n/LangContext';
import { Lang } from '../i18n/dictionaries';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'nav' }: { variant?: 'nav' | 'admin' }) {
  const { lang, setLang } = useTranslation();

  const langs: { id: Lang; label: string }[] = [
    { id: 'uz', label: 'UZ' },
    { id: 'ru', label: 'RU' },
    { id: 'en', label: 'EN' },
  ];

  return (
    <div className={`lang-switcher ${variant}`}>
      <div className="lang-icon">
        <Globe size={14} strokeWidth={2.5} />
      </div>
      {langs.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          className={`lang-btn ${lang === l.id ? 'active' : ''}`}
        >
          {l.label}
        </button>
      ))}

      <style jsx>{`
        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(0, 0, 0, 0.04);
          padding: 4px;
          border-radius: 100px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .lang-switcher.nav {
          margin-right: 12px;
        }

        .lang-switcher.admin {
          background: #f5f5f7;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .lang-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px 0 6px;
          color: rgba(0, 0, 0, 0.3);
        }

        .lang-btn {
          background: transparent;
          border: none;
          color: rgba(0, 0, 0, 0.4);
          font-size: 11px;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-inter);
          letter-spacing: 0.05em;
        }

        .lang-btn:hover {
          color: rgba(0, 0, 0, 0.8);
        }

        .lang-btn.active {
          background: #ffffff;
          color: #1d1d1f;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        :global(.nav-container) .lang-switcher {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        :global(.nav-container) .lang-icon {
          color: rgba(255, 255, 255, 0.5);
        }

        :global(.nav-container) .lang-btn {
          color: rgba(255, 255, 255, 0.6);
        }

        :global(.nav-container) .lang-btn:hover {
          color: #ffffff;
        }

        :global(.nav-container) .lang-btn.active {
          background: #ffffff;
          color: #1d1d1f;
        }

        :global(.nav-scrolled) .lang-switcher {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        :global(.nav-scrolled) .lang-icon {
          color: rgba(0, 0, 0, 0.3);
        }

        :global(.nav-scrolled) .lang-btn {
          color: rgba(0, 0, 0, 0.4);
        }

        :global(.nav-scrolled) .lang-btn:hover {
          color: rgba(0, 0, 0, 0.8);
        }

        :global(.nav-scrolled) .lang-btn.active {
          background: #ffffff;
          color: #1d1d1f;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
}
