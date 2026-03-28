"use server";

import { redirect } from "next/navigation";

export async function subscribe(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_KEY!;

  try {
    const res = await fetch(`${url}/rest/v1/mailing-list`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return { error: "Database rejected the email. Maybe it's a duplicate?" };
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);

    return { error: `Failed to subscribe. ${message}` };
  }

  redirect("/thank-you");

  return { error: null };
}
