import { redirect } from "next/navigation";
import { getCurrentSession } from "../../../lib/auth";
import { adminUrl } from "../../../lib/adminPaths";
import { prisma } from "../../../lib/prisma";
import AdminSidebar from "./AdminSidebar";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentSession();
  if (!session) redirect(adminUrl("/login"));

  const newSubmissions = await prisma.contactSubmission.count({ where: { status: "new" } });

  return (
    <div className="admin-shell">
      <AdminSidebar username={session.username} newSubmissions={newSubmissions} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
