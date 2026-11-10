"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import BenefitsSection from "./components/BenefitsSection";
import { Button } from "./components/Button";
import H1 from "./components/H1";
import H2 from "./components/H2";
import Logo from "./components/Logo";
import P from "./components/P";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  QR_INSTALL_URL,
} from "./constants";
import { trackEvent } from "./lib/analytics";

type DeviceType = "APPLE" | "ANDROID" | "DESKTOP" | "UNKNOWN";

function MobileCTA({
  device,
  compact = false,
}: {
  device: DeviceType;
  compact?: boolean;
}) {
  const btnClasses = compact
    ? "w-full h-11 text-xs sm:text-sm font-semibold"
    : "w-full h-12";

  const onAppleClick = (secondary = false) => {
    if (compact) {
      trackEvent("click_bottom_cta", {
        target: "app_store",
        type: secondary ? "secondary_link" : "button",
      });
    } else {
      trackEvent("click_app_store", {
        source: "hero_mobile",
        type: secondary ? "secondary_link" : "button",
      });
    }
  };

  const onAndroidClick = (secondary = false) => {
    if (compact) {
      trackEvent("click_bottom_cta", {
        target: "play_store",
        type: secondary ? "secondary_link" : "button",
      });
    } else {
      trackEvent("click_play_store", {
        source: "hero_mobile",
        type: secondary ? "secondary_link" : "button",
      });
    }
  };

  if (device === "APPLE") {
    return (
      <div className="flex flex-col items-center gap-2.5 w-full max-w-xs">
        <Link
          href={IOS_APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
          onClick={() => onAppleClick(false)}
        >
          <Button variant="fancy" className={btnClasses}>
            Download on App Store
          </Button>
        </Link>
        <Link
          href={ANDROID_PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
          onClick={() => onAndroidClick(true)}
        >
          Looking for Android?
        </Link>
      </div>
    );
  }

  if (device === "ANDROID") {
    return (
      <div className="flex flex-col items-center gap-2.5 w-full max-w-xs">
        <Link
          href={ANDROID_PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
          onClick={() => onAndroidClick(false)}
        >
          <Button variant="fancy" className={btnClasses}>
            Get it on Google Play
          </Button>
        </Link>
        <Link
          href={IOS_APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
          onClick={() => onAppleClick(true)}
        >
          Looking for iOS?
        </Link>
      </div>
    );
  }

  // UNKNOWN / SSR: Render both buttons with neutral secondary styling
  return (
    <div
      className={`w-full ${
        compact ? "max-w-xs sm:max-w-sm" : "max-w-xs sm:max-w-md"
      } flex flex-col sm:flex-row gap-2.5 sm:gap-3`}
    >
      <Link
        href={IOS_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex-1"
        onClick={() => onAppleClick(false)}
      >
        <Button variant="secondary" className={btnClasses}>
          Download on App Store
        </Button>
      </Link>

      <Link
        href={ANDROID_PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex-1"
        onClick={() => onAndroidClick(false)}
      >
        <Button
          variant="secondary"
          className={btnClasses}
        >
          Get it on Google Play
        </Button>
      </Link>
    </div>
  );
}

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

  useEffect(() => {
    requestAnimationFrame(() => {
      setDevice(detectDevice());
    });
  }, []);

  return (
    <main className="w-full">
      {/* [SECTION 1: HERO / ABOVE-THE-FOLD CALL TO ACTION] */}
      <section className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 py-20 overflow-hidden text-center">
        {/* Ambient atmospheric glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[500px] h-[350px] bg-gradient-to-tr from-[#bdceff]/10 via-[#fff2c0]/10 to-transparent blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
          {/* Logo Monogram */}
          <Logo className="mb-4" />

          {/* Early Access Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-[#212121] border border-zinc-800 mb-4 tracking-wide shadow-xs">
            Early Access
          </div>

          {/* Headline & Subhead */}
          <H1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-balance">
            Never get a bad haircut again.
          </H1>
          <P colour="muted" className="text-base sm:text-lg mb-8 max-w-lg">
            Save your exact cut formulas, keep your haircut history, and browse
            verified local barber portfolios.
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
                  onClick={() =>
                    trackEvent("click_app_store", { source: "hero_desktop" })
                  }
                >
                  App Store
                </Link>
                <span className="text-zinc-600">•</span>
                <Link
                  href={ANDROID_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                  onClick={() =>
                    trackEvent("click_play_store", { source: "hero_desktop" })
                  }
                >
                  Google Play
                </Link>
              </div>
            </div>
          ) : (
            <MobileCTA device={device} />
          )}

          {/* Micro-trust reassurance */}
          <p className="text-xs text-zinc-500 mt-6 tracking-wide">
            No Subscription required • Feedback welcome
          </p>
        </div>
      </section>

      {/* [SECTION 2: THE BENEFITS / FEATURES] */}
      <BenefitsSection />

      {/* [SECTION 3: FINAL CALL TO ACTION - COMPACT] */}
      <section className="relative flex flex-col justify-center items-center px-6 py-16 sm:py-20 overflow-hidden text-center">
        {/* Ambient atmospheric glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[400px] h-[220px] bg-gradient-to-tr from-[#bdceff]/10 via-[#fff2c0]/10 to-transparent blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
          {/* Compact Logo */}
          <Logo width={48} height={35} className="mb-4 opacity-90" />

          {/* Headline & Subhead */}
          <H2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-balance">
            Try YourLook today{" "}
            <span className="whitespace-nowrap">for free</span>
          </H2>
          <P
            colour="muted"
            size="sm"
            className="text-sm sm:text-base mb-6 max-w-sm"
          >
            Available on iOS & Android
          </P>

          {/* Conditional CTA: Compact horizontal card for Desktop, Compact buttons for Mobile */}
          {device === "DESKTOP" ? (
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 p-5 rounded-3xl bg-[#212121] border border-zinc-800 shadow-xl">
              <div className="bg-white p-3 rounded-2xl shadow-sm shrink-0">
                <QRCodeSVG
                  value={QR_INSTALL_URL}
                  size={184}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
                <span className="text-sm text-zinc-300 font-medium">
                  Scan with your phone to install
                </span>
                <div className="flex items-center gap-2.5">
                  <Link
                    href={IOS_APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("click_bottom_cta", {
                        target: "app_store",
                        source: "bottom_desktop",
                      })
                    }
                  >
                    <Button
                      variant="secondary"
                      className="h-10 px-4 text-xs font-semibold rounded-xl"
                    >
                      App Store
                    </Button>
                  </Link>
                  <Link
                    href={ANDROID_PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("click_bottom_cta", {
                        target: "play_store",
                        source: "bottom_desktop",
                      })
                    }
                  >
                    <Button
                      variant="secondary"
                      className="h-10 px-4 text-xs font-semibold rounded-xl"
                    >
                      Google Play
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <MobileCTA device={device} compact />
          )}

          {/* Micro-trust reassurance */}
          <p className="text-[11px] text-zinc-500 mt-4 tracking-wide">
            No Subscription required • Feedback welcome
          </p>
        </div>
      </section>
    </main>
  );
}
