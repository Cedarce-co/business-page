export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return adminRecipientEmails().includes(email.toLowerCase());
}

export function adminRecipientEmails() {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  const login = (process.env.ADMIN_LOGIN_EMAIL ?? "").trim().toLowerCase();
  if (login && !list.includes(login)) list.push(login);
  return list;
}
