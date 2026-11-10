import { NextRequest, NextResponse } from "next/server";
import { ANDROID_PLAY_STORE_URL, IOS_APP_STORE_URL } from "../constants";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;

  if (url && key && process.env.NODE_ENV !== "development") {
    const referralSource = req.nextUrl.searchParams.get("ref") || "qr";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const referer = req.headers.get("referer") || "direct";

    // Fire-and-forget analytics tracking
    fetch(`${url}/rest/v1/analytics`, {
      method: "POST",
      headers: {
        apikey: key,
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
    })
      .then((res) => res.body?.cancel())
      .catch((err) => console.error("Analytics failed:", err));
  }

  const platform = (
    req.nextUrl.searchParams.get("platform") ||
    req.nextUrl.searchParams.get("os") ||
    ""
  ).toLowerCase();

  if (platform === "ios" || platform === "apple") {
    return NextResponse.redirect(IOS_APP_STORE_URL, 302);
  }

  if (platform === "android" || platform === "google") {
    return NextResponse.redirect(ANDROID_PLAY_STORE_URL, 302);
  }

  const userAgent = req.headers.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) {
    return NextResponse.redirect(IOS_APP_STORE_URL, 302);
  }

  if (isAndroid) {
    return NextResponse.redirect(ANDROID_PLAY_STORE_URL, 302);
  }

  // Desktop or unrecognized device: redirect to homepage
  return NextResponse.redirect(new URL("/", req.nextUrl), 302);
}
