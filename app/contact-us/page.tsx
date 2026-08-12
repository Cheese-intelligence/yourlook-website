"use client";

import { useActionState } from "react";
import Button from "../components/Button";
import H1 from "../components/H1";
import { Input } from "../components/Input";
import Logo from "../components/Logo";
import P from "../components/P";
import { Textarea } from "../components/TextArea";
import { contactUs } from "./contactUs";

export default function Contact() {
  const [state, formAction, pending] = useActionState(contactUs, {
    error: null,
  });

  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-7">
      <div>
        <Logo />
        <H1 className="text-center">Contact Us</H1>
        <P className="text-center">
          Have a question or need help? Send us a message.
        </P>
      </div>

      <form action={formAction} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-zinc-300">
            Your Email
          </label>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            type="email"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="text" className="text-zinc-300">
            Message
          </label>
          <Textarea
            id="text"
            name="text"
            rows={4}
            placeholder="How can we help?"
            required
          />
        </div>

        {state?.error && (
          <p className="text-red-400/80 text-sm">Error: {state.error}</p>
        )}

        <Button className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </main>
  );
}
