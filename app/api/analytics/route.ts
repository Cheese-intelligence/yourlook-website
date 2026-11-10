import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { error: "Supabase configuration missing" },
      { status: 500 }
    );
  }

  try {
    let body: Record<string, unknown> = {};
    const text = await req.text();
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
      }
    }

    const eventType =
      (body.event_type as string) || (body.eventName as string) || "unknown";
    const userAgent =
      (body.user_agent as string) ||
      req.headers.get("user-agent") ||
      "unknown";
    const referer =
      (body.referer as string) ||
      req.headers.get("referer") ||
      "direct";
    const path = (body.path as string) || "/";
    const source = (body.source as string) || "organic";

    // Supabase REST endpoint only accepts table columns:
    // event_type, user_agent, referer, path, source
    const res = await fetch(`${url}/rest/v1/analytics`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        event_type: eventType,
        user_agent: userAgent,
        referer: referer,
        path: path,
        source: source,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase analytics failed:", res.status, errText);
      return NextResponse.json(
        { error: "Failed to record event" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Analytics route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
