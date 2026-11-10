---
title: Web Architecture
---

# Web Architecture

The YourLook website is built as an ultra-lean Next.js 16 application optimized for fast load times, responsive mobile-first presentation, and minimal backend overhead.

## Routing Map

| Route | Handler / Page | Purpose |
| :--- | :--- | :--- |
| `/` | `app/page.tsx` & `app/HomeContent.tsx` | Main landing hero, OS detection, App Store / Google Play links, video tutorials |
| `/contact-us` | `app/contact-us/page.tsx` | User & business inquiry form |
| `/feedback` | `app/feedback/page.tsx` | User product feedback form |
| `/privacy_policy` | `app/privacy_policy/route.ts` | Static raw HTML Privacy Notice |
| `/terms_and_conditions` | `app/terms_and_conditions/route.ts` | Static raw HTML Terms & Conditions |

### Decommissioned Routes (Redirected to `/`)
Configured in `next.config.ts`:
- `/beta` and `/beta/:path*` (permanently redirects to `/`)
- `/thank-you` (permanently redirects to `/`)

---

## Analytics Middleware (`middleware.ts`)

Next.js Edge middleware at `middleware.ts` intercepts requests matching `/` to fire-and-forget an analytics record directly to Supabase (`/rest/v1/analytics`) logging referrer, user-agent, and traffic source (`?ref=`).

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
