"use client";

import Button from "@/app/components/Button";
import H1 from "@/app/components/H1";
import H2 from "@/app/components/H2";
import P from "@/app/components/P";
import PillCard from "@/app/components/PillCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { APP_TESTFLIGHT_URL, INSTALL_TESTFLIGHT_URL } from "../beta-constants";

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

export default function IosTutorialContent() {
  const [device, setDevice] = useState<DeviceType>("UNKNOWN");

  useEffect(() => {
    requestAnimationFrame(() => {
      setDevice(detectDevice());
    });
  }, []);

  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-5">
      {/* <div className="bg-white p-3 rounded-xl w-46 h-46 shadow-md flex items-center justify-center shrink-0">
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
      </div> */}

      <div className="w-full grid grid-cols-[44px_1fr_44px] items-center">
        <Link href={"/beta/"}>
          <Button size="icon" variant="secondary" icon={ArrowLeft} />
        </Link>

        <H1 className="text-2xl tracking-tight text-center">
          Get ready in just 2 steps!
        </H1>

        {/* Spacer to keep the H1 centered */}
        <div className="w-[44px]" aria-hidden="true" />
      </div>

      <PillCard className="grid gap-4">
        <H2>1. Install TestFlight</H2>
        <P colour="secondary">
          Apple uses TestFlight to let you try out beta apps. Download it from
          the App Store.
        </P>
        <Link href={INSTALL_TESTFLIGHT_URL} className="flex-1 w-full">
          <Button
            variant={device === "ANDROID" ? "fancy" : "tertiary"}
            className="w-full"
          >
            Get TestFlight
          </Button>
        </Link>
      </PillCard>

      <PillCard className="grid gap-4">
        <H2>2. Join the YourLook Beta</H2>
        <P colour="secondary">
          Once TestFlight is installed, tap below to accept the invitation and
          download YourLook.
        </P>
        <Link href={APP_TESTFLIGHT_URL} className="flex-1 w-full">
          <Button
            variant={device === "ANDROID" ? "fancy" : "tertiary"}
            className="w-full"
          >
            Install YourLook
          </Button>
        </Link>
      </PillCard>
    </main>
  );
}
