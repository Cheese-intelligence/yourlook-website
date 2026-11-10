---
title: Web Architecture
---

# Web Architecture

The YourLook website is built as an ultra-lean Next.js 16 application optimized for fast load times, responsive mobile-first presentation, and minimal backend overhead.

## Routing Map

| Route | Handler / Page | Purpose |
| :--- | :--- | :--- |
| `/` | `app/page.tsx` & `app/HomeContent.tsx` | Main landing hero, OS detection, App Store / Google Play links, video tutorials |
| `/api/analytics` | `app/api/analytics/route.ts` | Telemetry endpoint for client click events (`click_app_store`, `click_play_store`, `click_bottom_cta`) |
| `/contact-us` | `app/contact-us/page.tsx` | User & business inquiry form |
| `/feedback` | `app/feedback/page.tsx` | User product feedback form |
| `/install` | `app/install/route.ts` | Dynamic 302 device redirect directly to iOS App Store / Google Play Store |
| `/privacy_policy` | `app/privacy_policy/route.ts` | Static raw HTML Privacy Notice |
| `/terms_and_conditions` | `app/terms_and_conditions/route.ts` | Static raw HTML Terms & Conditions |

### Decommissioned Routes (Redirected to `/`)
Configured in `next.config.ts`:
- `/beta` and `/beta/:path*` (permanently redirects to `/`)
- `/thank-you` (permanently redirects to `/`)

---

## Analytics & Funnel Telemetry

The platform tracks end-to-end conversion through a combination of edge middleware and client event telemetry:

1. **Page View Telemetry (`middleware.ts`):** Edge middleware intercepts requests to `/` to fire-and-forget a `view` event to Supabase (`/rest/v1/analytics`), logging referrer, user-agent, and traffic source (`?ref=`).
2. **Client Conversion Telemetry (`app/lib/analytics.ts`):** High-priority call-to-action interactions call `trackEvent(eventName, metadata)`. It uses `navigator.sendBeacon` (with `fetch` `keepalive` fallback) to deliver events to `/api/analytics` without blocking page unloads:
   - `click_app_store`: Clicks targeting the iOS App Store.
   - `click_play_store`: Clicks targeting Google Play.
   - `click_bottom_cta`: Clicks on the bottom call-to-action module.

$$\text{Conversion Rate} = \frac{\text{Store Clicks}}{\text{Unique Page Views}}$$

---

## Server Actions & Supabase Integration

Rather than bundling full client-side SDKs, form interactions utilize Next.js **Server Actions** (`"use server";`) that communicate directly with Supabase via standard HTTP `fetch`.

### 1. Form State Management
Forms utilize React 19's `useActionState`:

```tsx
const [state, formAction, pending] = useActionState(contactUs, { error: null });
```

### 2. REST Endpoints

The server actions and middleware write directly to Supabase REST tables:

- **Contact:** `/rest/v1/contact-us` (`email`, `text`)
- **Feedback:** `/rest/v1/feedback` (`email`, `text`)
- **Analytics:** `/rest/v1/analytics` (`event_type`, `user_agent`, `referer`, `path`, `source`)

### 3. Server-Side Redirects

Next.js `redirect()` works by throwing a special `NEXT_REDIRECT` exception. When handling errors in server actions:
```ts
try {
  const res = await fetch(...);
  if (!res.ok) return { error: "Failed to submit" };
} catch (e: unknown) {
  return { error: "Something went wrong" };
}

// Redirect MUST be outside the generic try/catch block
redirect("/contact-us/thank-you");
```

---

## Client-Side Device Detection

Because this website drives downloads for mobile apps, the landing page detects the visitor's operating system:

```ts
type DeviceType = "APPLE" | "ANDROID" | "DESKTOP" | "UNKNOWN";

function detectDevice(): DeviceType {
  const ua = navigator.userAgent;
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isDesktop = /Windows|Macintosh|Linux/i.test(ua) && !isIOS && !isAndroid;

  if (isIOS) return "APPLE";
  if (isAndroid) return "ANDROID";
  if (isDesktop) return "DESKTOP";
  return "UNKNOWN";
}
```

The active device gets visual emphasis (the `"fancy"` gradient variant on `<Button>`), guiding the user directly to their respective store.
