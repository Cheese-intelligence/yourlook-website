---
title: UI Components & Design System
---

# UI Components & Design System

The website adheres to a unified dark theme matching the YourLook brand identity (`#121212` background, `#212121` card surfaces, and pastel gradient accents).

All shared UI components live in `app/components/`.

---

## 1. Button (`app/components/Button.tsx`)

A polymorphic button powered by `class-variance-authority` (CVA).

### Variants
- `fancy`: Primary call-to-action featuring a linear pastel gradient (`#BDCEFF` via `white` to `#FFF2C0`) with bold black text.
- `secondary`: Default dark surface (`#212121`) with white text and `#323232` hover.
- `tertiary`: Elevated surface (`#323232`) with white text.
- `danger`: Dark red surface (`#2f2222`) with `#ff6b6b` text.
- `ghost`: Transparent background with subtle white hover fill.

### Sizes & Rounding
- **Sizes**: `default` (`h-12`), `lg` (`h-[72px]`), `icon` (`h-12 w-12`).
- **Rounding**:
  - `all-rounded`: `rounded-3xl` (standard pill)
  - `flat-bottom`: `rounded-t-3xl rounded-b-md`
  - `flat-top`: `rounded-b-3xl rounded-t-md`
  - `full-flat`: `rounded-md`

### Usage Example
```tsx
import { Button } from "@/app/components/Button";
import { ArrowRight } from "lucide-react";

<Button variant="fancy" rounding="all-rounded" withArrow>
  Download App
</Button>
```

---

## 2. PillCard (`app/components/PillCard.tsx`)

The standard container for content sections, forms, and cards.

```tsx
import PillCard from "@/app/components/PillCard";

<PillCard rounding="all-rounded" className="space-y-4">
  {/* Card Content */}
</PillCard>
```

---

## 3. Typography (`app/components/H1.tsx`, `H2.tsx`, `H3.tsx`, `P.tsx`)

Standardized typography elements:

- `<H1>`: Main page headings (`text-3xl font-bold text-white`).
- `<H2>`: Section headings (`text-xl font-bold text-white`).
- `<H3>`: Card headings (`text-lg font-bold text-white`).
- `<P>`: Paragraph copy supporting `colour="primary"` (white) or `colour="secondary"` (`text-zinc-400`).

---

## 4. Forms (`Input.tsx` & `TextArea.tsx`)

Dark-themed inputs with border highlights on focus:

```tsx
import { Input } from "@/app/components/Input";
import { Textarea } from "@/app/components/TextArea";

<Input placeholder="you@example.com" type="email" required />
<Textarea placeholder="Write your message..." rows={4} required />
```

---

## 5. Logo (`app/components/Logo.tsx`)

The vector YourLook "YL" monogram. Supports scalable width, height, and custom fill colors:

```tsx
import Logo from "@/app/components/Logo";

<Logo width={86} height={63} color="white" />
```

---

## 6. Hair Shader Background (`app/components/HairShaderBg.tsx`)

A full-viewport WebGL canvas fragment shader that renders fluid, silky flowing hair strands with organic clumping and procedural noise.

- Dynamically adjusts to screen aspect ratio (landscape vs portrait).
- Uses `fadeY` prop to smoothly blend from hair animation into the page's `#121212` background.
