# Homepage Conversion Optimization Plan (MVP / Early-Access)

> **Context:** YourLook has launched its v1.0 MVP with core features active (Lookbook / Cut formulas and Barber portfolios), while secondary features (Booking, AI Previews, Products) are actively in development. Testing is happening on a small scale without existing app store ratings.

---

## Objective

Maximize the conversion rate (visitor-to-install click and scan rate) during early-stage testing by:
1. Setting clear, immediate expectations around what the app does today.
2. Eliminating friction in the mobile CTA and desktop QR code paths.
3. Repackaging in-progress features from disjointed "coming soon" badges into an exciting product roadmap.
4. Implementing store-click tracking to measure the true conversion funnel.

---

## Proposed Changes & Milestones

### Phase 1: Hero Section & Value Proposition
* **Problem:** *"Try YourLook today for free"* does not communicate what the app does, causing early drop-offs before users scroll.
* **Changes in `app/HomeContent.tsx`:**
  - Add a subtle `v1.0 Early Access` badge above the main headline.
  - Revise headline to focus on the acute problem solved:
    - **Primary Headline:** *"Never get a bad haircut again."*
    - **Subhead:** *"Save your exact cut formulas, keep your haircut history, and browse verified local barber portfolios."*
  - Update reassurance copy:
    - *"No Subscription required • Feedback welcome"*

---

### Phase 2: Mobile CTA Optimization & Native Badges
* **Problem:** Mobile visitors see two buttons (iOS and Android) simultaneously, creating visual clutter and accidental clicks on the wrong OS.
* **Changes in `app/HomeContent.tsx`:**
  - **On iOS:** Show a single high-emphasis primary button: *"Download on App Store"* with an Apple icon. Place a subtle secondary text link below: *"Looking for Android?"*.
  - **On Android:** Show a single high-emphasis primary button: *"Get it on Google Play"* with a Google Play icon. Place a subtle secondary text link below: *"Looking for iOS?"*.
  - **On Unknown/SSR:** Render both buttons with neutral secondary styling until resolved.

---

### Phase 3: Restructure Features into "Live Now" vs "Roadmap"
* **Problem:** 3 out of 5 cards in `app/components/BenefitsSection.tsx` display a grey `"coming soon"` pill, signaling an incomplete product.
* **Changes in `app/components/BenefitsSection.tsx`:**
  - **Section 1 — What you can do today (Primary Grid):**
    - Feature A: **Saved Looks & Barber Formulas** (`SavedLookCard`) — Emphasize photos, angle history, and cut notes.
    - Feature B: **Real Cuts by Verified Stylists** (`StylistsCard`) — Emphasize genuine local portfolio discovery.
  - **Section 2 — Upcoming Features ("On the Roadmap"):**
    - Consolidate *In-App Booking*, *Virtual Cut Previews*, and *Tailored Products* into a dedicated "Coming in upcoming releases" block.
    - Add a direct prompt inviting early testers to vote or submit feedback via `/feedback`.

---

### Phase 4: Conversion Click Tracking (Funnel Telemetry)
* **Problem:** `middleware.ts` records page views, but there is zero visibility into how many visitors click App Store or Play Store buttons.
* **Changes:**
  - Create a lightweight client helper `trackEvent(eventName, metadata)` that sends an event to Supabase (`/rest/v1/analytics`):
    - `event_type: "click_app_store"`
    - `event_type: "click_play_store"`
    - `event_type: "click_bottom_cta"`
  - Measure true conversion:
    $$\text{Conversion Rate} = \frac{\text{Store Clicks}}{\text{Unique Page Views}}$$

---

### Phase 5: Eliminate Layout Shift (CLS) on Desktop
* **Problem:** `device` state defaults to `"UNKNOWN"` on SSR, causing the mobile buttons to render briefly on desktop before jumping to the QR code.
* **Changes:**
  - Use Tailwind responsive breakpoint classes (`hidden lg:flex` for desktop QR and `flex lg:hidden` for mobile buttons) so both layouts render cleanly without waiting for hydration.

---

## Verification & Testing Plan
1. **Mobile Testing:** Verify responsive views on Safari iOS (iPhone) and Chrome Android:
   - Verify that Apple users see the App Store primary button.
   - Verify that Android users see the Google Play primary button.
2. **Desktop Testing:** Verify that scanning the QR code redirects through `/install` directly to the correct app store.
3. **Analytics Testing:** Verify that clicking CTA buttons logs entries in Supabase analytics.
4. **Lighthouse / Performance:** Check CLS (Cumulative Layout Shift) score to ensure no jumping elements.
