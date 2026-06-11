import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "bisma_admin_session";

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET || "");
}

async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

function getAdminHost(): string {
  return (process.env.ADMIN_HOST || "admin.bismagroup.uz").split(":")[0];
}

function isAdminSite(req: NextRequest, adminOnly: boolean): boolean {
  const host = req.headers.get("host")?.split(":")[0] ?? "";
  return adminOnly || host === getAdminHost();
}

function toPublicPath(pathname: string): string {
  if (pathname === "/admin") return "/";
  if (pathname.startsWith("/admin/")) return pathname.slice("/admin".length) || "/";
  return pathname;
}

function toInternalPath(pathname: string): string {
  if (pathname === "/") return "/admin";
  return `/admin${pathname}`;
}

function adminSubdomainUrl(pathname: string, search: string): string {
  const host = getAdminHost();
  const proto = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${proto}://${host}${pathname}${search}`;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const search = req.nextUrl.search;
  const adminOnly = process.env.ADMIN_ONLY === "true";
  const onAdminSite = isAdminSite(req, adminOnly);

  // Main site: legacy /admin/* → admin subdomain (clean URLs)
  if (!onAdminSite && pathname.startsWith("/admin")) {
    return NextResponse.redirect(adminSubdomainUrl(toPublicPath(pathname), search));
  }

  if (!onAdminSite) {
    return NextResponse.next();
  }

  // Admin subdomain: hide /admin prefix in the address bar
  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL(toPublicPath(pathname) + search, req.url));
  }

  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const internalPath = toInternalPath(pathname);

  if (internalPath === "/admin/login") {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (await isValidSession(token)) {
      return NextResponse.redirect(new URL("/" + search, req.url));
    }
    return NextResponse.rewrite(new URL(internalPath + search, req.url));
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!(await isValidSession(token))) {
    return NextResponse.redirect(new URL("/login" + search, req.url));
  }

  return NextResponse.rewrite(new URL(internalPath + search, req.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|otf)).*)",
  ],
};
