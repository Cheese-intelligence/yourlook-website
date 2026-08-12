"use server";

import { redirect } from "next/navigation";

export type FormState = {
  error: string | null;
};

export async function contactUs(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email") as string;
  const message = formData.get("text") as string;

  if (!message || !email) {
    return { error: "Please provide both an email and a message." };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_KEY!;

  try {
    const res = await fetch(`${url}/rest/v1/contact-us`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: email,
        text: message,
      }),
    });

    if (!res.ok) {
      return { error: "Failed to send message. Please try again." };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/contact-us/thank-you");
}
