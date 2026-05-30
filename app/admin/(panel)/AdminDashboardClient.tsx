"use client";

import Link from "next/link";
import { Briefcase, Sparkles, HelpCircle, Quote, Package, Wrench, Inbox, MessageCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "../../i18n/LangContext";

type StatType = {
  label: string;
  value: number;
  Icon: any;
  href: string;
  highlight?: boolean;
};

type SubmissionType = {
  id: string;
  name: string;
  phone: string;
  project?: string | null;
  status: string;
  createdAt: Date;
};

export default function AdminDashboardClient({
  newSubmissionsCount,
  portfolioCount,
  servicesCount,
  totalSubmissions,
  faqCount,
  testimonialsCount,
  materialsCount,
  equipmentCount,
  recentSubmissions,
}: {
  newSubmissionsCount: number;
  portfolioCount: number;
  servicesCount: number;
  totalSubmissions: number;
  faqCount: number;
  testimonialsCount: number;
  materialsCount: number;
  equipmentCount: number;
  recentSubmissions: SubmissionType[];
}) {
  const { t } = useTranslation();

  const stats: StatType[] = [
    { label: t('admin.dashboardPage.stats.newInbox'), value: newSubmissionsCount, Icon: Inbox, href: "/admin/inbox", highlight: newSubmissionsCount > 0 },
    { label: t('admin.dashboardPage.stats.portfolio'), value: portfolioCount, Icon: Briefcase, href: "/admin/portfolio" },
    { label: t('admin.dashboardPage.stats.services'), value: servicesCount, Icon: Sparkles, href: "/admin/services" },
    { label: t('admin.dashboardPage.stats.totalInbox'), value: totalSubmissions, Icon: MessageCircle, href: "/admin/inbox" },
  ];

  const sections = [
    { label: t('admin.dashboardPage.faq'), value: faqCount, Icon: HelpCircle, href: "/admin/faq" },
    { label: t('admin.dashboardPage.testimonials'), value: testimonialsCount, Icon: Quote, href: "/admin/testimonials" },
    { label: t('admin.dashboardPage.materials'), value: materialsCount, Icon: Package, href: "/admin/materials" },
    { label: t('admin.dashboardPage.equipment'), value: equipmentCount, Icon: Wrench, href: "/admin/equipment" },
  ];

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">Dashboard</span>
          <h1 className="admin-page-title">{t('admin.dashboardPage.title')}</h1>
          <p className="admin-page-subtitle">{t('admin.dashboardPage.subtitle')}</p>
        </div>
        <Link href="/" target="_blank" className="admin-btn admin-btn-secondary">
          {t('admin.dashboardPage.viewSite')} ↗
        </Link>
      </div>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="admin-stat-card"
            style={{
              textDecoration: "none",
              ...(stat.highlight
                ? { borderColor: "rgba(0, 204, 255, 0.4)", background: "linear-gradient(135deg, #ffffff 0%, rgba(0, 204, 255, 0.04) 100%)" }
                : {}),
            }}
          >
            <div className="admin-stat-icon">
              <stat.Icon size={18} />
            </div>
            <div className="admin-stat-value">{stat.value}</div>
            <div className="admin-stat-label">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 20 }} className="admin-dashboard-grid">
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">{t('admin.dashboardPage.recentInbox')}</h2>
            <Link href="/admin/inbox" className="admin-btn admin-btn-secondary admin-btn-icon" aria-label={t('admin.dashboardPage.viewAll')}>
              <ArrowRight size={14} />
            </Link>
          </div>
          {recentSubmissions.length === 0 ? (
            <div className="admin-empty" style={{ padding: "30px 0" }}>
              <div className="admin-empty-icon">
                <Inbox size={26} />
              </div>
              <h3>{t('admin.dashboardPage.emptyInbox')}</h3>
              <p>{t('admin.dashboardPage.emptyInboxDesc')}</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentSubmissions.map((s) => (
                <Link
                  key={s.id}
                  href="/admin/inbox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    background: "#fafbfc",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span
                    className={`admin-status-dot ${s.status}`}
                    aria-hidden
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: "space-between" }}>
                      <strong style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{s.name}</strong>
                      <span style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap" }}>
                        {new Date(s.createdAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 2 }}>
                      <span style={{ fontSize: 12, color: "var(--muted)" }} className="admin-mono">{s.phone}</span>
                      {s.project ? <span style={{ fontSize: 11.5, color: "var(--muted)" }}>· {s.project}</span> : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">{t('admin.dashboardPage.otherSections')}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sections.map((sec) => (
              <Link
                key={sec.label}
                href={sec.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(0, 204, 255, 0.1)",
                    color: "var(--cyan)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <sec.Icon size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{sec.label}</strong>
                  <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{sec.value} {t('admin.dashboardPage.recordsCount')}</span>
                </div>
                <ArrowRight size={14} style={{ color: "var(--muted)" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">{t('admin.dashboardPage.quickStart')}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="admin-quick-grid">
          <Link
            href="/admin/portfolio/new"
            style={{ display: "flex", flexDirection: "column", gap: 6, padding: 14, border: "1px solid var(--border)", borderRadius: 10, textDecoration: "none", color: "inherit", background: "#fafbfc" }}
          >
            <Briefcase size={18} style={{ color: "var(--cyan)" }} />
            <strong style={{ fontSize: 13, fontWeight: 600 }}>{t('admin.dashboardPage.addProject')}</strong>
            <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{t('admin.dashboardPage.addProjectDesc')}</span>
          </Link>
          <Link
            href="/admin/inbox"
            style={{ display: "flex", flexDirection: "column", gap: 6, padding: 14, border: "1px solid var(--border)", borderRadius: 10, textDecoration: "none", color: "inherit", background: "#fafbfc" }}
          >
            <Inbox size={18} style={{ color: "var(--cyan)" }} />
            <strong style={{ fontSize: 13, fontWeight: 600 }}>{t('admin.dashboardPage.viewNewInbox')}</strong>
            <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{newSubmissionsCount} {t('admin.dashboardPage.newInboxDesc')}</span>
          </Link>
          <Link
            href="/admin/settings"
            style={{ display: "flex", flexDirection: "column", gap: 6, padding: 14, border: "1px solid var(--border)", borderRadius: 10, textDecoration: "none", color: "inherit", background: "#fafbfc" }}
          >
            <Sparkles size={18} style={{ color: "var(--cyan)" }} />
            <strong style={{ fontSize: 13, fontWeight: 600 }}>{t('admin.dashboardPage.siteSettings')}</strong>
            <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{t('admin.dashboardPage.siteSettingsDesc')}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
