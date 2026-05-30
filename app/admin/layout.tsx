import "./admin.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bisma Admin Panel",
  description: "Bisma Group sayt boshqaruv paneli",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-app">{children}</div>;
}
