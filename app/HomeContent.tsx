"use client";

import Link from "next/link";
import { Button } from "./components/Button";
import { YouTubeCard } from "./components/YouTubeCard";
import { ANDROID_PLAY_STORE_URL, IOS_APP_STORE_URL } from "./constants";

export default function HomeContent() {
  return (
    <main className="w-full">
      {/* Above the fold hero */}
      <section className="relative min-h-screen flex flex-col justify-end items-center px-6 pb-14 pt-16 overflow-hidden">
        {/* Ambient atmospheric glows with brand colors */}
        <div
          className="pointer-events-none absolute -top-16 -left-16 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#BDCEFF]/20 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/3 -right-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#FFF2C0]/15 blur-[120px]"
          aria-hidden="true"
        />

        {/* Content pushed down */}
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
          {/* YL Monogram Logo */}
          <div className="mb-3">
            <svg
              viewBox="0 0 405 312"
              xmlns="http://www.w3.org/2000/svg"
              className="h-18 w-auto fill-white"
            >
              <path d="m7.0093 0h58.16c2.596 0 4.9788 1.4366 6.1906 3.7325l63.954 121.17c2.633 4.987 9.781 4.973 12.394-0.025l63.217-120.93c1.207-2.3095 3.597-3.7572 6.203-3.7572l56.407-2.29e-4c1.949 0 3.711 0.79643 4.981 2.0816-14.149 14.757-98.296 105.22-112.19 183.42-8.003 45.054 3 125.17 3 125.17h-63.301c-3.866 0-7.0001-3.134-7.0001-7v-101.04c0-1.114-0.2659-2.212-0.7757-3.203l-97.468-189.41c-2.3973-4.6586 0.985-10.203 6.2242-10.203z" />
              <path d="m280.54 249.8c0 3.866 3.134 7 7 7h109.68c3.866 0 7 3.134 7 7v40.244c0 3.866-3.134 7-7 7h-150.82s-21.543-68.324-19.851-114.36c2.611-71.051 44.839-174.71 52.734-193.52 0.797 1.1369 1.266 2.5218 1.266 4.0162v242.61z" />
            </svg>
          </div>

          {/* Subtitle / text */}
          <p className="text-zinc-400 text-sm sm:text-base font-normal tracking-wide mb-7">
            Now available on Play Store and App Store
          </p>

          {/* Pill buttons using existing Button component */}
          <div className="w-full flex flex-col gap-3">
            <Link
              href={ANDROID_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button variant="secondary" className="w-full">
                Android
              </Button>
            </Link>

            <Link
              href={IOS_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button variant="secondary" className="w-full">
                ios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Below the fold content */}
      <section className="mx-auto max-w-xl w-full p-5 py-12 space-y-5">
        <YouTubeCard
          title="Stylist: How to Use"
          description="Set up your profile, manage bookings, and send looks to clients."
          videoId="aL15gVn5esw"
        />

        <YouTubeCard
          title="Client: How to Use"
          description="Find top stylists, book sessions, and get your personalized style."
          videoId="lEPsdg5ODIQ"
        />
      </section>
    </main>
  );
}
