"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BenefitsSection from "./components/BenefitsSection";
import { Button } from "./components/Button";
import H2 from "./components/H2";
import Logo from "./components/Logo";
import P from "./components/P";
import { ANDROID_PLAY_STORE_URL, IOS_APP_STORE_URL } from "./constants";

type DeviceType = "APPLE" | "ANDROID" | "DESKTOP" | "UNKNOWN";

function detectDevice(): DeviceType {
  const ua = navigator.userAgent;
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isDesktop = /Windows|Macintosh|Linux/i.test(ua) && !isIOS && !isAndroid;

  if (isIOS) return "APPLE";
  if (isAndroid) return "ANDROID";
  if (isDesktop) return "DESKTOP";
  return "UNKNOWN";
}

export default function HomeContent() {
  const [device, setDevice] = useState<DeviceType>("UNKNOWN");
  const [fadeY, setFadeY] = useState(0.6);
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setDevice(detectDevice());
    });

    function updateFadeY() {
      if (!heroRef.current || !textRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();
      if (heroRect.height > 0) {
        const relY = (textRect.top - heroRect.top) / heroRect.height;
        setFadeY(Math.max(0.1, Math.min(0.95, relY)));
      }
    }

    updateFadeY();
    window.addEventListener("resize", updateFadeY);
    return () => window.removeEventListener("resize", updateFadeY);
  }, []);

  return (
    <main className="w-full">
      {/* Above the fold hero accounting for mobile browser UI */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] min-h-dvh flex flex-col justify-end items-center px-6 pb-12 pt-16 overflow-hidden"
      >
        {/* Content pushed down */}
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
          {/* YL Monogram Logo */}
          <Logo className="mb-4" />

          {/* Subtitle / text */}
          <p
            ref={textRef}
            className="text-zinc-400 text-sm sm:text-base font-normal tracking-wide mb-7"
          >
            Now available on Play Store and App Store
          </p>

          {/* Pill buttons using existing Button component with device highlighting */}
          <div className="w-full flex flex-col gap-3">
            <Link
              href={ANDROID_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button
                variant={device === "ANDROID" ? "fancy" : "secondary"}
                className="w-full"
              >
                Android
              </Button>
            </Link>

            <Link
              href={IOS_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button
                variant={device === "APPLE" ? "fancy" : "secondary"}
                className="w-full"
              >
                iOS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* [SECTION 2: THE BENEFITS / FEATURES] */}
      <BenefitsSection />

      {/* [SECTION 3: CLOSING CALL TO ACTION] */}
      <section className="mx-auto max-w-xl w-full px-5 py-20 sm:py-28 text-center flex flex-col items-center">
        <H2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Try YourLook today for free
        </H2>
        <P colour="muted" className="mb-8">
          Available on Android & iOS
        </P>

        <div className="w-full max-w-xs sm:max-w-md flex flex-col sm:flex-row gap-3">
          <Link
            href={ANDROID_PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex-1"
          >
            <Button
              variant={device === "ANDROID" ? "fancy" : "secondary"}
              className="w-full"
            >
              Download for Android
            </Button>
          </Link>

          <Link
            href={IOS_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex-1"
          >
            <Button
              variant={device === "APPLE" ? "fancy" : "secondary"}
              className="w-full"
            >
              Download for iOS
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
