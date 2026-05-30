"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";
import ChatWidget from "./ChatWidget";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <ChatWidget />
      {children}
    </SmoothScroll>
  );
}
