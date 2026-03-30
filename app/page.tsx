"use client";

import { useActionState } from "react";
import { subscribe } from "./subscribe";

export default function Home() {
  const [state, formAction, pending] = useActionState(subscribe, {
    error: null,
  });

  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-7">
      <div>
        {/* Inlined svg for max performance */}
        <svg
          viewBox="0 0 405 312"
          xmlns="http://www.w3.org/2000/svg"
          height={48}
          className="mx-auto mb-5"
        >
          <path
            d="m7.0093 0h58.16c2.596 0 4.9788 1.4366 6.1906 3.7325l63.954 121.17c2.633 4.987 9.781 4.973 12.394-0.025l63.217-120.93c1.207-2.3095 3.597-3.7572 6.203-3.7572l56.407-2.29e-4c1.949 0 3.711 0.79643 4.981 2.0816-14.149 14.757-98.296 105.22-112.19 183.42-8.003 45.054 3 125.17 3 125.17h-63.301c-3.866 0-7.0001-3.134-7.0001-7v-101.04c0-1.114-0.2659-2.212-0.7757-3.203l-97.468-189.41c-2.3973-4.6586 0.985-10.203 6.2242-10.203z"
            fill="#FFFFFF"
          />
          <path
            d="m280.54 249.8c0 3.866 3.134 7 7 7h109.68c3.866 0 7 3.134 7 7v40.244c0 3.866-3.134 7-7 7h-150.82s-21.543-68.324-19.851-114.36c2.611-71.051 44.839-174.71 52.734-193.52 0.797 1.1369 1.266 2.5218 1.266 4.0162v242.61z"
            fill="#FFFFFF"
          />
        </svg>
        <h1 className="text-2xl font-bold tracking-tight text-center">
          YourLook
        </h1>
        <p className="text-center text-gray-300">
          Making every haircut legendary.
        </p>
      </div>
      <form action={formAction} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-zinc-300">
            Your Email
          </label>
          <input
            name="email"
            autoComplete="email"
            inputMode="email"
            className="flex h-12 w-full rounded-xl border-2 border-zinc-800 bg-transparent px-4 py-2 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="the.best.cut@example.com"
            type="email"
            required
          />
        </div>
        {state?.error && (
          <p className="text-red-400/80 text-sm">Error: {state.error}</p>
        )}
        <button
          disabled={pending}
          className="w-full rounded-full inline-flex h-10 items-center justify-center bg-linear-to-r from-[#BDCEFF] via-white to-[#FFF2C0] px-4 py-2 text-sm text-black font-bold transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
        >
          {pending ? "Signing up..." : "Join waiting list"}
        </button>
      </form>
    </main>
  );
}
