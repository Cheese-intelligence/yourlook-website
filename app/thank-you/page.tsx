"use client";

import { useState } from "react";

export default function ThankYou() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-5">
      <div className="bg-linear-60 from-[#313338] via-[#222222] to-[#31302D] p-5 rounded-2xl">
        <h1 className="text-2xl font-bold tracking-tight">Thank you!</h1>
        <p>We’ll let you know the second we’re live.</p>
      </div>
      <p>Want to bring a friend?</p>
      <button
        onClick={handleCopy}
        className="w-full rounded-full inline-flex h-10 items-center justify-center bg-linear-to-r from-[#BDCEFF] via-white to-[#FFF2C0] px-4 py-2 text-sm text-black font-bold transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        {copied ? "Invite copied!" : "Copy invite link"}
      </button>
    </main>
  );
}
