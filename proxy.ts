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

function adminSubdomainUrl(pathname: string, search: string): string {
  const host = process.env.ADMIN_HOST || "admin.bismagroup.uz";
  const proto = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${proto}://${host}${pathname}${search}`;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminOnly = process.env.ADMIN_ONLY === "true";
  const host = req.headers.get("host")?.split(":")[0] ?? "";
  const adminHost = (process.env.ADMIN_HOST || "admin.bismagroup.uz").split(":")[0];

  // Main site: send /admin traffic to the admin subdomain
  if (!adminOnly && pathname.startsWith("/admin")) {
    return NextResponse.redirect(adminSubdomainUrl(pathname, req.nextUrl.search));
  }

  // Admin subdomain process: only serve admin + API routes
  if (adminOnly && host === adminHost && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Standalone admin process (port 3101): redirect root to /admin
  if (adminOnly && host !== adminHost && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Allow /admin/login itself
  if (pathname === "/admin/login") {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (await isValidSession(token)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!(await isValidSession(token))) {
      const url = new URL("/admin/login", req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match everything except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|otf)).*)",
  ],
};
