---
title: Getting Started
---

# Getting Started

Welcome to the **YourLook Website** developer documentation.

This repository serves as the official landing website, beta onboarding portal, contact/feedback intake, and legal document host for the YourLook mobile apps.

## Prerequisites

- **Node.js**: v20+ or **Bun**: v1.1+ (recommended)
- A local `.env` file containing Supabase credentials

## Installation

Clone the repository and install dependencies:

```bash
bun install
# or
npm install
```

## Environment Variables

Copy the example configuration or create `.env`:

```bash
cp .env.example .env
```

The application connects to Supabase REST endpoints for form submissions:

| Variable | Description | Exposure |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Public / Client |
| `SUPABASE_KEY` | Supabase service/anon key | Server-side only |

## Running the Development Server

Start the local Next.js development server:

```bash
bun run dev
# or
npm run dev
```

The application will be running at `http://localhost:3000`.

## Running VitePress Documentation

To preview or edit these docs locally:

```bash
npx vitepress dev docs
```

## Directory Overview

- `app/`: Next.js 16 App Router pages, components, and server actions.
- `app/components/`: Reusable UI library (`Button`, `PillCard`, typography, WebGL shader).
- `app/documents/`: HTML files for Privacy Notice and Terms & Conditions exported from Notion.
- `docs/`: VitePress documentation hub.
- `AGENTS.md`: Concise guidelines for AI coding agents.
