import Link from "next/link";
import { Inbox, Phone, Eye } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import DeleteButton from "../../_shared/DeleteButton";
import { deleteSubmissionAction } from "./actions";

import { cookies } from "next/headers";
import type { Lang } from "../../../i18n/dictionaries";

const dict = {
  uz: {
    eyebrow: "Arizalar", title: "Kelgan arizalar", subtitle: "Sayt orqali yuborilgan barcha arizalar",
    all: "Hammasi", empty: "Hozircha arizalar yo'q", emptyDesc: "Sayt orqali yangi ariza kelganida shu yerda paydo bo'ladi.",
    thStatus: "Holat", thClient: "Mijoz", thContact: "Aloqa", thProject: "Loyiha", thDate: "Sana",
    labels: { new: "Yangi", contacted: "Aloqada", archived: "Arxiv" }
  },
  ru: {
    eyebrow: "Заявки", title: "Все заявки", subtitle: "Все заявки отправленные через сайт",
    all: "Все", empty: "Пока нет заявок", emptyDesc: "Новые заявки с сайта появятся здесь.",
    thStatus: "Статус", thClient: "Клиент", thContact: "Контакт", thProject: "Проект", thDate: "Дата",
    labels: { new: "Новый", contacted: "На связи", archived: "Архив" }
  },
  en: {
    eyebrow: "Inbox", title: "Incoming requests", subtitle: "All requests sent via the website",
    all: "All", empty: "No requests yet", emptyDesc: "New requests from the website will appear here.",
    thStatus: "Status", thClient: "Client", thContact: "Contact", thProject: "Project", thDate: "Date",
    labels: { new: "New", contacted: "Contacted", archived: "Archived" }
  }
};

type SearchParams = Promise<{ status?: string }>;

export default async function InboxListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("bisma_lang")?.value as Lang) || "uz";
  const t = dict[lang];

  const params = await searchParams;
  const filter = params?.status;
  const where = filter && ["new", "contacted", "archived"].includes(filter) ? { status: filter } : {};

  const [items, counts] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactSubmission.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const total = counts.reduce((acc, c) => acc + c._count._all, 0);
  const countFor = (s: string) => counts.find((c) => c.status === s)?._count._all ?? 0;

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-title-block">
          <span className="admin-page-eyebrow">{t.eyebrow}</span>
          <h1 className="admin-page-title">{t.title}</h1>
          <p className="admin-page-subtitle">{t.subtitle}</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 16, padding: 0 }}>
        <div style={{ display: "flex", gap: 4, padding: 8, borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
          <Link
            href="/admin/inbox"
            className={`admin-btn admin-btn-secondary ${!filter ? "is-active" : ""}`}
            style={!filter ? { background: "var(--navy)", color: "#fff" } : {}}
          >
            {t.all} <span style={{ opacity: 0.7, marginLeft: 4 }}>({total})</span>
          </Link>
          {(["new", "contacted", "archived"] as const).map((s) => (
            <Link
              key={s}
              href={`/admin/inbox?status=${s}`}
              className="admin-btn admin-btn-secondary"
              style={filter === s ? { background: "var(--navy)", color: "#fff" } : {}}
            >
              {t.labels[s]} <span style={{ opacity: 0.7, marginLeft: 4 }}>({countFor(s)})</span>
            </Link>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <Inbox size={26} />
            </div>
            <h3>{t.empty}</h3>
            <p>{t.emptyDesc}</p>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>{t.thStatus}</th>
                <th>{t.thClient}</th>
                <th>{t.thContact}</th>
                <th>{t.thProject}</th>
                <th style={{ width: 110 }}>{t.thDate}</th>
                <th style={{ width: 160 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className={`admin-status-dot ${s.status}`} aria-hidden style={{ marginRight: 6 }} />
                    <span style={{ fontSize: 12 }}>{t.labels[s.status as keyof typeof t.labels] || s.status}</span>
                  </td>
                  <td>
                    <strong style={{ fontWeight: 600 }}>{s.name}</strong>
                    {s.type ? (
                      <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>{s.type}</div>
                    ) : null}
                  </td>
                  <td>
                    <a href={`tel:${s.phone}`} className="admin-mono" style={{ color: "var(--cyan)", textDecoration: "none" }}>
                      <Phone size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
                      {s.phone}
                    </a>
                  </td>
                  <td style={{ color: "var(--muted)" }}>{s.project || "—"}</td>
                  <td style={{ color: "var(--muted)", fontSize: 12 }}>
                    {new Date(s.createdAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/admin/inbox/${s.id}`} className="admin-btn admin-btn-secondary admin-btn-icon" aria-label="Ko'rish">
                        <Eye size={14} />
                      </Link>
                      <DeleteButton action={deleteSubmissionAction.bind(null, s.id)} size="icon" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
