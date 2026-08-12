"use client";

import { useActionState } from "react";
import { Button } from "./components/Button";
import H1 from "./components/H1";
import { Input } from "./components/Input";
import Logo from "./components/Logo";
import P from "./components/P";
import { subscribe } from "./subscribe";

export default function Home() {
  const [state, formAction, pending] = useActionState(subscribe, {
    error: null,
  });

  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-7">
      <div>
        <Logo />
        <H1 className="text-center">YourLook</H1>
        <P className="text-center">
          Join the waiting list to find the style that actually fits you.
        </P>
      </div>
      <form action={formAction} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-zinc-300">
            Your Email
          </label>
          <Input
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="the.best.cut@example.com"
            type="email"
            required
          />
        </div>
        {state?.error && (
          <p className="text-red-400/80 text-sm">Error: {state.error}</p>
        )}
        <Button disabled={pending} className="w-full">
          {pending ? "Signing up..." : "Join waiting list"}
        </Button>
      </form>
    </main>
  );
}
