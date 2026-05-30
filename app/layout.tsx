import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";
import { LangProvider } from "./i18n/LangContext";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Bisma Group | Элитное Строительство и Дизайн",
  description: "Bisma Group специализируется на премиальном строительстве и архитектурном проектировании. Мы строим будущее с точностью и совершенством.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body>
        <LangProvider>
          <SiteChrome>{children}</SiteChrome>
        </LangProvider>
      </body>
    </html>
  );
}
