import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.next();
  }

  const referralSource = req.nextUrl.searchParams.get("ref") || "organic";

  const userAgent = req.headers.get("user-agent") || "unknown";
  const referer = req.headers.get("referer") || "direct";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;

  // FIRE AND FORGET:
  fetch(`${url}/rest/v1/analytics`, {
    method: "POST",
    headers: {
      apikey: key!,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      event_type: "view",
      user_agent: userAgent,
      referer: referer,
      path: req.nextUrl.pathname,
      source: referralSource,
    }),
  }).catch((err) => console.error("Analytics failed:", err));

  return NextResponse.next();
}
export const config = {
  // This matches ONLY the root. No sub-pages, no images, no scripts.
  matcher: "/",
};
