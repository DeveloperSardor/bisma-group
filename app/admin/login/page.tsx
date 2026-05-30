"use client";

import { useActionState } from "react";
import { LogIn, Lock, User } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <div className="admin-login-shell">
      <form action={formAction} className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo" style={{ background: 'transparent' }}>
            <img src="/logo.png" alt="Bisma Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1>Bisma Admin</h1>
          <p>Boshqaruv paneli — kirish</p>
        </div>

        {state.error && (
          <div className="admin-alert admin-alert-error" style={{ marginBottom: 16 }}>
            {state.error}
          </div>
        )}

        <div className="admin-form">
          <div className="admin-field">
            <label className="admin-field-label" htmlFor="username">
              <User size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
              Foydalanuvchi
            </label>
            <input
              id="username"
              name="username"
              className="admin-input"
              type="text"
              required
              autoComplete="username"
              defaultValue="admin"
              autoFocus
            />
          </div>
          <div className="admin-field">
            <label className="admin-field-label" htmlFor="password">
              <Lock size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
              Parol
            </label>
            <input
              id="password"
              name="password"
              className="admin-input"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", padding: "13px 20px", marginTop: 6 }}
            disabled={pending}
          >
            <LogIn size={15} />
            {pending ? "Kirilmoqda..." : "KIRISH"}
          </button>
          <p className="admin-helper-text" style={{ textAlign: "center", marginTop: 4 }}>
            Demo: <code className="admin-mono">admin / bisma2026</code>
          </p>
        </div>
      </form>
    </div>
  );
}
