"use client";

import React, { useState } from "react";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validate";

const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [v, setV] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");

  const set = (k: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateContact(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      (document.getElementById(`f-${Object.keys(errs)[0]}`) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (r.status === 422) {
        const j = await r.json();
        setErrors(j.errors || {});
        setStatus("idle");
        return;
      }
      if (!r.ok) throw new Error();
      setStatus("ok");
      setV(EMPTY);
    } catch {
      setStatus("fail");
    }
  };

  const field = "w-full bg-transparent border border-on-ink/30 focus:border-secondary focus:outline-none px-4 py-3 text-base rounded-sm placeholder:text-on-ink/40";

  const Row = ({ k, label, children }: { k: keyof ContactInput; label: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={`f-${k}`} className="block text-xs uppercase tracking-label font-bold mb-2">{label}</label>
      {children}
      {errors[k] && <p id={`e-${k}`} className="text-sm text-alert mt-1.5">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <Row k="name" label="Nama">
        <input id="f-name" value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} className={field} />
      </Row>
      <Row k="email" label="Email">
        <input id="f-email" type="email" value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} className={field} />
      </Row>
      <Row k="subject" label="Subjek">
        <input id="f-subject" value={v.subject} onChange={set("subject")} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "e-subject" : undefined} className={field} />
      </Row>
      <Row k="message" label="Pesan">
        <textarea id="f-message" rows={6} value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} className={field} />
        <div className="text-xs text-on-ink/60 mt-1 text-right">{v.message.length}/1000</div>
      </Row>

      <button type="submit" disabled={status === "sending"} className="px-8 py-4 text-xs uppercase tracking-label font-bold bg-on-ink text-ink hover:bg-secondary disabled:opacity-60 rounded-sm">
        {status === "sending" ? "Mengirim..." : "Kirim pesan"}
      </button>

      <div aria-live="polite" className="min-h-[3rem]">
        {status === "ok" && (
          <p className="text-sm p-4 border border-success/50 bg-success/10 rounded-sm">
            Pesan lolos validasi. Catatan: formulir ini masih mode demo, pesan belum diteruskan ke email atau disimpan di server mana pun.
          </p>
        )}
        {status === "fail" && <p className="text-sm p-4 border border-alert/50 bg-alert/10 rounded-sm">Terjadi kesalahan. Coba lagi sebentar lagi.</p>}
      </div>
    </form>
  );
}
