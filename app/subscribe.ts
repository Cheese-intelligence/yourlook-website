"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function subscribe(prevState: unknown, formData: FormData) {
  const head = await headers();
  const userAgent = head.get("user-agent") || "unknown";
  const referer = head.get("referer") || "direct";
  const email = formData.get("email") as string;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_KEY!;

  try {
    const [mailingRes] = await Promise.all([
      // 1. The Mailing List
      fetch(`${url}/rest/v1/mailing-list`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email }),
      }),

      // 2. The Analytics Log
      fetch(`${url}/rest/v1/analytics`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          event_type: "signup",
          user_agent: userAgent,
          referer: referer,
          path: "/",
        }),
      }),
    ]);

    if (!mailingRes.ok) {
      return { error: "You're likely already on the list!" };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/thank-you");

  // goofy next js fix
  return { error: null };
}
