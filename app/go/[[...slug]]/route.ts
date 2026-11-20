import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_GO_REDIRECT,
  GO_REDIRECTS,
  type RedirectTarget,
} from "../redirects";

export const dynamic = "force-dynamic";

const NORMALIZED_REDIRECTS = new Map<string, RedirectTarget>(
  Object.entries(GO_REDIRECTS).map(([key, value]) => [
    key.replace(/^\/+|\/+$/g, "").toLowerCase(),
    value,
  ]),
);

function resolveRedirect(slug: string): {
  destination: string;
  status: 301 | 302 | 307 | 308;
} {
  const target = slug ? NORMALIZED_REDIRECTS.get(slug) : undefined;
  if (!target) {
    return { destination: DEFAULT_GO_REDIRECT, status: 302 };
  }
  if (typeof target === "string") {
    return { destination: target, status: 302 };
  }
  return {
    destination: target.destination,
    status: target.status ?? 302,
  };
}

function trackGoView(req: NextRequest, slug: string, destination: string) {
  const referralSource = req.nextUrl.searchParams.get("ref") || slug || "go";

  if (process.env.NODE_ENV === "development") {
    console.log(
      `dev mode stopped: tracking go redirect view (path: ${req.nextUrl.pathname}, source: ${referralSource}, destination: ${destination})`,
    );
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return;

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
      user_agent: req.headers.get("user-agent") || "unknown",
      referer: req.headers.get("referer") || "direct",
      path: req.nextUrl.pathname,
      source: referralSource,
    }),
  })
    .then((res) => res.body?.cancel())
    .catch((err) => console.error("Analytics failed:", err));
}

function getPublicOrigin(req: NextRequest): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const host = (
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    ""
  )
    .split(",")[0]
    .trim();
  const proto = (req.headers.get("x-forwarded-proto") || "https")
    .split(",")[0]
    .trim();
  if (host) {
    return `${proto}://${host}`;
  }

  return req.nextUrl.origin;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug?: string[] }> },
) {
  const { slug: segments } = await context.params;
  const slug = (segments ?? []).join("/").trim().toLowerCase();

  const { destination, status } = resolveRedirect(slug);
  const targetUrl = new URL(destination, getPublicOrigin(req));

  req.nextUrl.searchParams.forEach((value, key) => {
    if (!targetUrl.searchParams.has(key)) {
      targetUrl.searchParams.set(key, value);
    }
  });

  trackGoView(req, slug, targetUrl.toString());

  const res = NextResponse.redirect(targetUrl, status);
  if (status === 302 || status === 307) {
    res.headers.set("Cache-Control", "no-store, max-age=0");
    res.headers.set("CDN-Cache-Control", "no-store");
  }
  return res;
}
