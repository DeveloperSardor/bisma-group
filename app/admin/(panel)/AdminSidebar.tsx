"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Briefcase, Sparkles, HelpCircle, Quote, Package, Wrench, Inbox, Settings, Menu, X } from "lucide-react";
import { logoutAction } from "./actions";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "../../i18n/LangContext";
import { adminPathnameToRoute } from "../../../lib/adminPaths";

type NavItem = {
  href: string;
  label: string;
  Icon: typeof LayoutDashboard;
  badge?: number;
};

export default function AdminSidebar({
  username,
  newSubmissions,
}: {
  username: string;
  newSubmissions: number;
}) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const groups: { label: string; items: NavItem[] }[] = [
    {
      label: t('admin.sidebar.general'),
      items: [
        { href: "/admin", label: t('admin.sidebar.dashboard'), Icon: LayoutDashboard },
        { href: "/admin/inbox", label: t('admin.sidebar.inbox'), Icon: Inbox, badge: newSubmissions },
      ],
    },
    {
      label: t('admin.sidebar.content'),
      items: [
        { href: "/admin/portfolio", label: t('admin.sidebar.portfolio'), Icon: Briefcase },
        { href: "/admin/services", label: t('admin.sidebar.services'), Icon: Sparkles },
        { href: "/admin/faq", label: t('admin.sidebar.faq'), Icon: HelpCircle },
        { href: "/admin/testimonials", label: t('admin.sidebar.testimonials'), Icon: Quote },
        { href: "/admin/materials", label: t('admin.sidebar.materials'), Icon: Package },
        { href: "/admin/equipment", label: t('admin.sidebar.equipment'), Icon: Wrench },
      ],
    },
    {
      label: t('admin.sidebar.settingsGroup'),
      items: [{ href: "/admin/settings", label: t('admin.sidebar.settings'), Icon: Settings }],
    },
  ];

  const routePath = adminPathnameToRoute(pathname ?? "/");

  const isActive = (href: string) => {
    if (href === "/admin") return routePath === "/admin";
    return routePath === href || routePath.startsWith(href + "/");
  };

  return (
    <>
      <div className="admin-mobile-topbar">
        <Link href="/admin" className="admin-mobile-brand">
          <div className="admin-mobile-logo">
            <img src="/logo.png" alt="Bisma Logo" />
          </div>
          <strong>Bisma Group</strong>
        </Link>
        <button
          type="button"
          className="admin-sidebar-toggle"
          aria-label="Menyu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`admin-sidebar-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
      <Link href="/admin" className="admin-brand" style={{ textDecoration: "none", marginBottom: "16px" }}>
        <div className="admin-brand-logo">
          <img src="/logo.png" alt="Bisma Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="admin-brand-info">
          <strong>Bisma Group</strong>
          <span>Admin Panel</span>
        </div>
      </Link>

      <div style={{ padding: "0 24px", marginBottom: "24px" }}>
        <LanguageSwitcher variant="admin" />
      </div>

      <nav className="admin-nav">
        {groups.map((group) => (
          <div key={group.label} className="admin-nav-group">
            <span className="admin-nav-group-label">{group.label}</span>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link ${isActive(item.href) ? "is-active" : ""}`}
              >
                <item.Icon size={17} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="admin-nav-badge">{item.badge}</span>
                ) : null}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user">
          <div className="admin-user-avatar">{username.charAt(0).toUpperCase()}</div>
          <div className="admin-user-info">
            <strong>{username}</strong>
            <span>Administrator</span>
          </div>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="admin-logout-btn">
            <LogOut size={14} />
            {t('admin.logout')}
          </button>
        </form>
      </div>
    </aside>
    </>
  );
}
