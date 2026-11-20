"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  QR_INSTALL_URL,
} from "../constants";
import { trackEvent } from "../lib/analytics";
import { Button } from "./Button";

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
        <Button variant="secondary" className={btnClasses}>
          Get it on Google Play
        </Button>
      </Link>
    </div>
  );
}

/**
 * Client-only device-aware download CTA (QR code on desktop, OS-highlighted
 * store buttons on mobile, dual neutral buttons during SSR/unknown).
 */
export default function DeviceDownloadCTA({
  variant = "hero",
}: {
  variant?: "hero" | "bottom";
}) {
  const [device, setDevice] = useState<DeviceType>("UNKNOWN");

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDevice(detectDevice());
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const minHeightClass =
    variant === "bottom"
      ? "min-h-[98px] sm:min-h-[250px]"
      : "min-h-[106px] sm:min-h-[272px]";

  if (device === "DESKTOP") {
    if (variant === "bottom") {
      return (
        <div className={`w-full flex items-center justify-center ${minHeightClass}`}>
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
        </div>
      );
    }

    return (
      <div className={`w-full flex items-center justify-center ${minHeightClass}`}>
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
      </div>
    );
  }

  return (
    <div className={`w-full flex items-center justify-center ${minHeightClass}`}>
      <MobileCTA device={device} compact={variant === "bottom"} />
    </div>
  );
}
