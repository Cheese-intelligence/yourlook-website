export type AnalyticsEventType =
  | "click_app_store"
  | "click_play_store"
  | "click_bottom_cta"
  | (string & {});

export interface AnalyticsMetadata {
  source?: string;
  target?: string;
  store?: string;
  path?: string;
  referer?: string;
  user_agent?: string;
  [key: string]: unknown;
}

/**
 * Lightweight client helper to track conversion and funnel events.
 * Sends event telemetry to Supabase (/rest/v1/analytics) via /api/analytics
 * using navigator.sendBeacon (with fetch keepalive fallback) to guarantee
 * delivery even when navigating away to app stores.
 */
export function trackEvent(
  eventName: AnalyticsEventType,
  metadata?: AnalyticsMetadata | string,
): void {
  if (typeof window === "undefined") return;

  const metaObj: AnalyticsMetadata =
    typeof metadata === "string" ? { source: metadata } : (metadata ?? {});

  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get("ref");

  const source =
    metaObj.source ||
    metaObj.target ||
    metaObj.store ||
    refParam ||
    "organic";

  const payload = {
    event_type: eventName,
    path: metaObj.path || window.location.pathname,
    referer: metaObj.referer || document.referrer || "direct",
    source: String(source),
  };

  const payloadString = JSON.stringify(payload);

  // 1. Try navigator.sendBeacon for fast, non-blocking delivery
  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    try {
      const blob = new Blob([payloadString], { type: "application/json" });
      const sent = navigator.sendBeacon("/api/analytics", blob);
      if (sent) return;
    } catch {
      // Fall through to fetch if sendBeacon is blocked or unsupported
    }
  }

  // 2. Fallback to fetch with keepalive: true to survive page transitions
  fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payloadString,
    keepalive: true,
  }).catch((err) => {
    // Analytics failures must never break user interactions
    console.error("trackEvent failed:", err);
  });
}
