const ADMIN_ROOT = "/admin";

/** Internal Next.js route — always /admin/... */
export function adminRoute(path = ""): string {
  if (!path || path === "/") return ADMIN_ROOT;
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.startsWith(ADMIN_ROOT)) return p;
  return `${ADMIN_ROOT}${p}`;
}

/** Browser URL on admin subdomain (no /admin prefix). */
export function adminUrl(path = ""): string {
  const route = adminRoute(path);
  const cleanUrls =
    process.env.ADMIN_ONLY === "true" || process.env.NEXT_PUBLIC_ADMIN_ONLY === "true";
  if (!cleanUrls) return route;
  if (route === ADMIN_ROOT) return "/";
  if (route.startsWith(`${ADMIN_ROOT}/`)) return route.slice(ADMIN_ROOT.length);
  return route;
}

/** Map browser pathname to internal /admin route for active-link checks. */
export function adminPathnameToRoute(pathname: string): string {
  if (pathname.startsWith(ADMIN_ROOT)) return pathname;
  if (pathname === "/") return ADMIN_ROOT;
  return adminRoute(pathname);
}
