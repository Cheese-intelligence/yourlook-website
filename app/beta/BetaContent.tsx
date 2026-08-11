"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import H1 from "../components/H1";
import P from "../components/P";
import PillCard from "../components/PillCard";

const QR_INSTALL_URL = "https://yourlook.app/beta";
const TESTFLIGHT_URL = "https://testflight.apple.com/join/J6Gj3yUg";
const ANDROID_APK_URL =
  "https://drive.google.com/file/d/1xL5FZuNlZ1_GNxG4r2NzrP83-DDwUemL/view?usp=sharing";

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

export default function BetaContent() {
  const [device, setDevice] = useState<DeviceType>("UNKNOWN");

  useEffect(() => {
    requestAnimationFrame(() => {
      setDevice(detectDevice());
    });
  }, []);

  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-5">
      <PillCard className="gap-4 grid">
        <div className="bg-white p-3 rounded-xl w-46 h-46 shadow-md flex items-center justify-center shrink-0">
          <QRCodeSVG
            value={QR_INSTALL_URL}
            size={160}
            width={160}
            height={160}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="L"
            className="w-40 h-40 block"
          />
        </div>

        <H1 className="text-2xl tracking-tight">YourLook Beta</H1>

        <P colour="secondary">Install preview build here:</P>

        <div className="grid gap-2 w-full">
          <Link href={TESTFLIGHT_URL} className="flex-1 w-full">
            <Button
              variant={device === "APPLE" ? "fancy" : "tertiary"}
              className="w-full"
            >
              Try on iOS
            </Button>
          </Link>
          <Link href={ANDROID_APK_URL} className="flex-1 w-full">
            <Button
              variant={device === "ANDROID" ? "fancy" : "tertiary"}
              className="w-full"
            >
              Try on Android
            </Button>
          </Link>
        </div>
      </PillCard>
    </main>
  );
}
