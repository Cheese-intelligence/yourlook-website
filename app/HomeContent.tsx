"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import BenefitsSection from "./components/BenefitsSection";
import { Button } from "./components/Button";
import H2 from "./components/H2";
import Logo from "./components/Logo";
import P from "./components/P";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  QR_INSTALL_URL,
} from "./constants";

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
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setDevice(detectDevice());
    });
  }, []);

  return (
    <main className="w-full">
      {/* Above the fold hero accounting for mobile browser UI */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[100svh] flex flex-col justify-end items-center px-6 pb-12 pt-16 overflow-hidden"
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

      {/* [SECTION 3: CLOSING CALL TO ACTION - 80vh EPIC FINALE] */}
      <section className="relative min-h-[80svh] flex flex-col justify-center items-center px-6 py-20 overflow-hidden text-center">
        {/* Ambient atmospheric glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[500px] h-[350px] bg-gradient-to-tr from-[#bdceff]/10 via-[#fff2c0]/10 to-transparent blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
          {/* Logo Monogram */}
          <Logo className="mb-5" />

          {/* Headline & Subhead */}
          <H2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-balance">
            Try YourLook today <span className="whitespace-nowrap">for free</span>
          </H2>
          <P colour="muted" className="text-base sm:text-lg mb-8 max-w-md">
            Available on iOS & Android
          </P>

          {/* Conditional CTA: QR code for Desktop, Direct Buttons for Mobile */}
          {device === "DESKTOP" ? (
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col items-center p-5 rounded-3xl bg-[#212121] border border-zinc-800 shadow-2xl">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  <QRCodeSVG
                    value={QR_INSTALL_URL}
                    size={144}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                <span className="text-xs text-zinc-400 font-medium mt-3">
                  Scan to install on iOS & Android
                </span>
              </div>

              {/* Direct store links below QR */}
              <div className="flex items-center gap-3">
                <Link
                  href={IOS_APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  App Store
                </Link>
                <span className="text-zinc-600">•</span>
                <Link
                  href={ANDROID_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  Google Play
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xs sm:max-w-md flex flex-col sm:flex-row gap-3">
              <Link
                href={ANDROID_PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex-1"
              >
                <Button
                  variant={device === "ANDROID" ? "fancy" : "secondary"}
                  className="w-full h-12"
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
                  className="w-full h-12"
                >
                  Download for iOS
                </Button>
              </Link>
            </div>
          )}

          {/* Micro-trust reassurance */}
          <p className="text-xs text-zinc-500 mt-6 tracking-wide">
            Free to download • No subscription required
          </p>
        </div>
      </section>
    </main>
  );
}
