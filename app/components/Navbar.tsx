"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../i18n/LangContext";

export default function Navbar({
  phone,
}: {
  phone?: string;
  phoneRaw?: string;
}) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t("nav.portfolio"), href: "#projects" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.equipment"), href: "#equipment" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <>
      <nav className={`nav-azen ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="nav-row">
          <button
            className="nav-burger"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.6} />
          </button>

          <Link href="/" className="nav-brand">
            <span className="nav-logo-circle">
              <Image
                src="/logo.png"
                alt="Bisma Group"
                width={48}
                height={48}
                priority
              />
            </span>
          </Link>

          <a href="#contact" className="nav-cta">
            {t("nav.contactBtn")}
          </a>
        </div>
      </nav>

      <aside className={`drawer ${isMobileMenuOpen ? "is-open" : ""}`} aria-hidden={!isMobileMenuOpen}>
        <button
          className="drawer-close"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} strokeWidth={1.4} />
        </button>

        <nav className="drawer-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="drawer-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="drawer-footer">
          <LanguageSwitcher variant="nav" />
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="drawer-phone">
              {phone}
            </a>
          )}
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <style jsx>{`
        .nav-azen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 24px 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0));
          transition: background 0.4s ease, padding 0.4s ease;
        }

        .nav-azen.is-scrolled {
          background: rgba(10, 10, 12, 0.92);
          backdrop-filter: saturate(150%) blur(16px);
          padding: 14px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .nav-row {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 36px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
        }

        .nav-burger {
          background: transparent;
          border: 0;
          color: #ffffff;
          cursor: pointer;
          padding: 8px;
          margin-left: -8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          justify-self: start;
        }

        .nav-burger:hover { opacity: 0.7; }

        .nav-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.22em;
          justify-self: center;
        }

        .nav-logo-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
        }
        .nav-logo-circle :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .brand-mark {
          color: #ffffff;
          display: inline-flex;
        }

        .brand-light {
          font-weight: 400;
          opacity: 0.65;
          margin-left: 2px;
        }

        .nav-cta {
          justify-self: end;
          display: inline-flex;
          align-items: center;
          padding: 11px 20px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ffffff;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 0;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        .nav-cta:hover {
          background: #ffffff;
          color: #0a0a0c;
          border-color: #ffffff;
        }

        .drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: min(420px, 100%);
          background: #ffffff;
          z-index: 200;
          transform: translateX(-100%);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 80px 40px 40px;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
        }

        .drawer.is-open { transform: translateX(0); }

        .drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 150;
          backdrop-filter: blur(4px);
        }

        .drawer-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: transparent;
          border: 0;
          color: #1d1d1f;
          cursor: pointer;
          padding: 8px;
        }
        .drawer-close:hover { opacity: 0.6; }

        .drawer-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 20px;
        }

        .drawer-link {
          display: block;
          padding: 20px 0;
          font-family: var(--font-serif), serif;
          font-size: 1.7rem;
          font-weight: 500;
          letter-spacing: -0.015em;
          color: #1d1d1f;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          transition: padding-left 0.3s ease, color 0.3s ease;
        }

        .drawer-link:hover { padding-left: 10px; color: #2997ff; }

        .drawer-footer {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .drawer-phone {
          color: #1d1d1f;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .drawer-phone:hover { color: #2997ff; }

        @media (max-width: 700px) {
          .nav-row { padding: 0 20px; }
          .brand-text { font-size: 13px; letter-spacing: 0.18em; }
          .nav-cta { padding: 10px 14px; font-size: 10.5px; letter-spacing: 0.14em; }
        }
        @media (max-width: 480px) {
          .nav-cta { display: none; }
        }
      `}</style>
    </>
  );
}
