# Agent Guidelines for YourLook Website (`yourlook-website`)

Welcome to the **YourLook Website** codebase. This repository hosts the public web presence for the **YourLook** platform (mobile apps on iOS & Android).

> **Core Purpose:** The web repository is intentionally lean. Its scope is **landing page, app download routing, onboarding/tutorials, feedback/contact forms, and legal compliance pages (Privacy Policy, Terms & Conditions)**.

---

## 1. Tech Stack Overview

- **Framework:** Next.js 16 (App Router, React Compiler enabled)
- **UI & Runtime:** React 19, TypeScript 5
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";` in `app/globals.css`), `class-variance-authority` (cva), `clsx`, `tailwind-merge`
- **Icons:** `lucide-react`
- **Graphics / Shaders:** Custom WebGL fragment shader (`app/components/HairShaderBg.tsx`)
- **Backend / Database:** Supabase via direct REST endpoints (called inside Server Actions)
- **Package Manager:** Bun (`bun install`, `bun run dev`) / npm
- **Documentation:** VitePress (`docs/`)

---

## 2. Repository Structure

```
yourlook-website/
├── AGENTS.md                  # This file (Agent instructions & standard patterns)
├── proxy.ts                   # Next.js 16 proxy for analytics tracking (matcher: "/")
├── app/
│   ├── layout.tsx             # Root layout (dark theme, global footer with legal links)
│   ├── page.tsx               # Main landing page (delegates to HomeContent.tsx)
│   ├── HomeContent.tsx        # Client hero section: WebGL hair shader + OS detector + download buttons + YouTube guides
│   ├── constants.ts           # Global URLs (App Store, Play Store, install QR URL)
│   ├── globals.css            # Tailwind v4 entry point
│   ├── icon.svg               # Web icon
│   │
│   ├── components/            # Reusable UI component library
│   │   ├── Button.tsx         # CVA button (fancy gradient, secondary, tertiary, danger, ghost)
│   │   ├── PillCard.tsx       # Pill-shaped card with rounding variants
│   │   ├── H1.tsx, H2.tsx, H3.tsx, P.tsx # Typography components
│   │   ├── Input.tsx          # Form text input
│   │   ├── TextArea.tsx       # Form textarea
│   │   ├── Logo.tsx           # Scalable YL vector monogram
│   │   ├── HairShaderBg.tsx   # Interactive WebGL animated hair shader
│   │   └── YouTubeCard.tsx    # Responsive YouTube embed card (privacy-enhanced)
│   │
│   ├── contact-us/            # Contact form (Server action + thank-you page)
│   ├── feedback/              # Feedback form (Server action + thank-you page)
│   │
│   ├── api/
│   │   └── analytics/route.ts # Telemetry endpoint (records click events to Supabase)
│   ├── lib/
│   │   ├── analytics.ts       # Client tracking helper (trackEvent)
│   │   └── utils.ts           # Class merging helper (cn)
│   │
│   ├── documents/             # Raw HTML legal documents exported from Notion
│   │   ├── privacy_notice.html
│   │   ├── terms_and_conditions.html
│   │   └── README.md
│   ├── install/route.ts       # 302 redirect directly to App Store / Play Store
│   ├── privacy_policy/route.ts       # Serves privacy_notice.html directly
│   └── terms_and_conditions/route.ts # Serves terms_and_conditions.html directly
│
├── docs/                      # VitePress documentation hub
└── next.config.ts             # Next.js configuration (redirects, compiler flags)
```

---

## 3. Engineering Rules & Conventions

### A. Component Design System
Always reuse established components from `app/components/` instead of writing raw HTML elements:
- **Buttons:** Use `<Button variant="..." size="..." rounding="...">`.
  - `fancy`: Highlighted primary action with warm-to-cool pastel gradient (`#BDCEFF` -> `white` -> `#FFF2C0`) and black text.
  - `secondary`: Dark grey (`#212121`), white text.
  - `tertiary`: Medium grey (`#323232`).
  - `danger`: Dark reddish background with `#ff6b6b` text.
  - `ghost`: Transparent with hover tint.
- **Cards:** Use `<PillCard rounding="...">` with rounded borders (`rounded-3xl` by default).
- **Typography:** Use `<H1>`, `<H2>`, `<H3>`, `<P>` components for consistent hierarchy and text styling.
- **Brand Logo:** Use `<Logo width={...} height={...} color={...} />`.

### B. Styling Standards
- **Backgrounds:** Global background is `#121212`. Cards and interactive blocks use `#212121` or `#323232`.
- **Text colors:** Primary white, muted `text-zinc-400` / `text-zinc-500`.
- **Responsive units:** Use mobile-first design. Account for mobile browser address bars using `min-h-[100svh]` or `min-h-dvh`.
- **Tailwind v4:** Note that Tailwind CSS v4 is used (`@import "tailwindcss";`). Do not look for `tailwind.config.js`; configure theme rules directly in CSS or PostCSS if needed.

### C. Server Actions & Supabase Integration
- Server Actions must declare `"use server";` at top of the file.
- Contact and feedback forms use React 19's `useActionState`:
  ```tsx
  const [state, formAction, pending] = useActionState(serverActionFn, { error: null });
  ```
- Supabase calls use direct REST queries using `process.env.NEXT_PUBLIC_SUPABASE_URL` and `process.env.SUPABASE_KEY` with headers:
  ```ts
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  }
  ```
- **Important:** Next.js `redirect()` works by throwing an internal error (`NEXT_REDIRECT`). If wrapping calls in `try/catch`, ensure `redirect()` is called **outside** the `try` block or re-throw the redirect error.

### D. Legal Documents
- `privacy_notice.html` and `terms_and_conditions.html` are exported from official Notion pages.
- They are served directly via Route Handlers (`app/privacy_policy/route.ts` and `app/terms_and_conditions/route.ts`) as raw HTML with `Content-Type: text/html; charset=utf-8`.
- If modifying legal text, follow the procedure in `app/documents/README.md` (edit in Notion, export as HTML, replace file).

### E. Device Detection Pattern
Landing and tutorial pages highlight the user's current operating system (`APPLE` vs `ANDROID` vs `DESKTOP`).
See `detectDevice()` in `app/HomeContent.tsx`:
```ts
const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /Android/i.test(ua);
```
Ensure client components defer detection until mount (`useEffect` / `requestAnimationFrame`) to prevent SSR hydration mismatches.

---

## 4. Verification & Dev Workflow

- **Run Dev Server:** `bun run dev` (or `npm run dev`)
- **Lint Code:** `bun run lint` (or `npm run lint`)
- **Docs Server:** `bun run docs:dev` (or `npx vitepress dev docs`)
