"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_TOKEN } from "./config";

export async function loginAction(
  prevState: { error?: string } | null,
  formData: FormData,
) {
  const secret = (formData.get("secret") || formData.get("token")) as string;

  // Server-side verification against environment variable
  if (!ADMIN_TOKEN || !secret || secret.trim() !== ADMIN_TOKEN) {
    return { error: "Invalid credentials. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_token", secret.trim(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin");
}
