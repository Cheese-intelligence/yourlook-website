"use server";

import { redirect } from "next/navigation";

// Define a type for the action state
export type FormState = {
  error: string | null;
};

export async function sendFeedback(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email") as string;
  const feedbackText = formData.get("text") as string;

  if (!feedbackText || !email) {
    return { error: "Please provide both an email and feedback text." };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_KEY!;

  try {
    const feedbackRes = await fetch(`${url}/rest/v1/feedback`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: email,
        text: feedbackText,
      }),
    });

    if (!feedbackRes.ok) {
      return { error: "Failed to submit feedback. Please try again." };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/feedback/thank-you");
}
