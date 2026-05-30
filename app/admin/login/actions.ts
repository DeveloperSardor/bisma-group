"use server";

import { redirect } from "next/navigation";
import { authenticate, signSession, setSessionCookie } from "../../../lib/auth";

export async function loginAction(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  if (!username || !password) {
    return { error: "Foydalanuvchi va parolni kiriting" };
  }
  const session = await authenticate(username, password);
  if (!session) {
    return { error: "Login yoki parol noto'g'ri" };
  }
  const token = await signSession(session);
  await setSessionCookie(token);
  redirect("/admin");
}
