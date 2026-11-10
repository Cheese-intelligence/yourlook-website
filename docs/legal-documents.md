---
title: Legal Documents Workflow
---

# Legal Documents Workflow

The YourLook website hosts official legal documents required for App Store and Google Play compliance:

- **Privacy Policy:** Served at `/privacy_policy`
- **Terms & Conditions:** Served at `/terms_and_conditions`

---

## Architecture

Rather than maintaining fragile React markdown renderers for complex legal contracts, legal pages are stored as standalone HTML documents under `app/documents/`:

```
app/documents/
├── privacy_notice.html
├── terms_and_conditions.html
└── README.md
```

They are delivered via Next.js Route Handlers (`app/privacy_policy/route.ts` and `app/terms_and_conditions/route.ts`):

```ts
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.join(process.cwd(), 'app', 'documents', 'privacy_notice.html');
  const htmlContent = await fs.readFile(filePath, 'utf8');
  return new NextResponse(htmlContent, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
```

---

## Updating Legal Documents

Legal documents originate from Notion source pages:

1. **Source Pages:**
   - [Terms & Conditions Notion](https://app.notion.com/p/T-C-397cd18fd92e80049c4fe73be26fe832)
   - [Privacy Notice Notion](https://app.notion.com/p/PrivacyNotice-397cd18fd92e8047b63fc2a9b6a80c54)
2. **Editing:** Edit the source text directly in the associated Notion workspace (`info.general1810@gmail.com`).
3. **Exporting:** In Notion, export the edited page as **HTML**.
4. **Replacement:** Replace the corresponding HTML file in `app/documents/`:
   - `app/documents/privacy_notice.html`
   - `app/documents/terms_and_conditions.html`
