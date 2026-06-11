"use server";

import { redirect } from "next/navigation";
import { clearSessionCookie } from "../../../lib/auth";
import { adminUrl } from "../../../lib/adminPaths";

export async function logoutAction() {
  await clearSessionCookie();
  redirect(adminUrl("/login"));
}
