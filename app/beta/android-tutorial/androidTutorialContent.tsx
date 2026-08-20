"use client";

import Button from "@/app/components/Button";
import H1 from "@/app/components/H1";
import H2 from "@/app/components/H2";
import P from "@/app/components/P";
import PillCard from "@/app/components/PillCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ANDROID_APK_URL } from "../beta-constants";

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

export default function AndroidTutorialContent() {
  const [device, setDevice] = useState<DeviceType>("UNKNOWN");

  useEffect(() => {
    requestAnimationFrame(() => {
      setDevice(detectDevice());
    });
  }, []);

  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-5">
      <div className="w-full grid grid-cols-[48px_1fr_48px] items-center">
        <Link href="/beta">
          <Button size="icon" variant="secondary" icon={ArrowLeft} />
        </Link>

        <H1 className="text-2xl tracking-tight text-center">
          Get ready in just 2 steps!
        </H1>

        {/* Spacer to keep the H1 centered */}
        <div className="w-11" aria-hidden="true" />
      </div>

      <PillCard className="grid gap-4">
        <H2>1. Download the APK</H2>
        <P colour="secondary">
          Download the latest Android installation file directly to your device.
        </P>
        <Link
          href={ANDROID_APK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 w-full"
        >
          <Button
            variant={device === "ANDROID" ? "fancy" : "tertiary"}
            className="w-full"
          >
            Download APK
          </Button>
        </Link>
      </PillCard>

      <PillCard className="grid gap-4">
        <H2>2. Install & Allow Permissions</H2>
        <P>
          Tap <strong>Settings</strong> and enable{" "}
          <strong>&quot;Install unknown apps&quot;</strong> (or &quot;Allow from
          this source&quot;).
        </P>
      </PillCard>
    </main>
  );
}
