"use server";

export async function verifyPassword(password: string) {
  const correctPassword = process.env.ADMIN_PANEL_PASSWORD;
  return password === correctPassword;
}
