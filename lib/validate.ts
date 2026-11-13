export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = "Nama minimal 2 karakter.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Format email belum benar.";
  if (v.subject.trim().length < 3) e.subject = "Subjek minimal 3 karakter.";
  const m = v.message.trim().length;
  if (m < 10) e.message = "Pesan minimal 10 karakter.";
  else if (m > 1000) e.message = "Pesan maksimal 1000 karakter.";
  return e;
}
