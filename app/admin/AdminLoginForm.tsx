"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import PillCard from "@/app/components/PillCard";
import H2 from "@/app/components/H2";
import P from "@/app/components/P";

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-[75svh] flex items-center justify-center px-4 py-12">
      <PillCard className="w-full max-w-sm p-8 space-y-6 bg-[#212121] border border-zinc-800 text-center">
        <div className="space-y-2">
          <H2 className="text-2xl font-bold">Admin Portal</H2>
          <P colour="muted" size="sm">
            Enter your credentials to continue.
          </P>
        </div>

        <form action={formAction} className="space-y-4">
          <Input
            name="secret"
            type="password"
            placeholder="Password"
            required
            autoFocus
            className="w-full"
          />

          {state?.error && (
            <p className="text-xs text-red-400 font-medium">{state.error}</p>
          )}

          <Button
            type="submit"
            variant="fancy"
            className="w-full h-11 text-sm font-semibold"
            disabled={pending}
          >
            {pending ? "Verifying..." : "Sign In"}
          </Button>
        </form>
      </PillCard>
    </div>
  );
}
