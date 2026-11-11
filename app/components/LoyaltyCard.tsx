"use client";

import { Check, Gift, Info, Sparkles, X } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QR_INSTALL_URL } from "../constants";
import { cn } from "../lib/utils";
import FeatureCard from "./FeatureCard";
import Logo from "./Logo";

export interface LoyaltyPreviewProps {
  shopName?: string;
  totalStamps?: number;
  completedStamps?: number;
  className?: string;
}

export function LoyaltyPreview({
  shopName = "Sudo Cuts",
  totalStamps = 10,
  completedStamps = 10,
  className,
}: LoyaltyPreviewProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastTimeoutId, setToastTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleClaim = () => {
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    setShowToast(true);
    const id = setTimeout(() => {
      setShowToast(false);
    }, 4500);
    setToastTimeoutId(id);
  };

  const handleDismissToast = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    setShowToast(false);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutId) clearTimeout(toastTimeoutId);
    };
  }, [toastTimeoutId]);

  return (
    <div className={cn("w-full relative", className)}>
      {/* Toast Notification */}
      <div
        role="alert"
        aria-live="polite"
        className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-[96%] max-w-sm rounded-2xl p-3.5 bg-[#18181b]/95 backdrop-blur-md border border-[#FFF2C0]/40 shadow-2xl transition-all duration-300 ease-out flex items-start gap-3",
          showToast
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        )}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#BDCEFF] to-[#FFF2C0] flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-4 h-4 text-black" />
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-semibold text-white tracking-tight">
            Demo Reward
          </p>
          <p className="text-[11px] text-zinc-300 leading-snug mt-0.5">
            You can&apos;t claim this one here, but you can download the app and
            collect stamps with partner shops!
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismissToast}
          aria-label="Close notification"
          className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Unified Cohesive Inner Card */}
      <div className="rounded-2xl bg-[#323232] border border-zinc-700/50 p-4 flex flex-col gap-3 transition-all duration-200">
        {/* Top Section: Customer Member QR Code */}
        <div className="relative rounded-xl bg-[#262626] border border-zinc-700/40 p-3 sm:p-3.5 flex flex-col items-center justify-center overflow-hidden shadow-inner">
          {/* Ambient subtle glow */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 w-24 h-24 bg-[#FFF2C0]/10 blur-xl rounded-full"
            aria-hidden="true"
          />

          {/* Monogram */}
          <Logo width={32} height={23} className="mb-2 opacity-95" />

          {/* QR Code */}
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <QRCodeSVG
              value={QR_INSTALL_URL}
              size={92}
              level="M"
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <span className="text-[11px] font-bold text-white tracking-tight mt-2">
            YourLook
          </span>
        </div>

        {/* Bottom Section: Shop Loyalty Stamp Card */}
        <div className="space-y-3">
          {/* Header Row: Shop name & Stamp count */}
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
              {shopName}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-zinc-400">
              {completedStamps}/{totalStamps} Stamps
            </span>
          </div>

          {/* Stamps Track with connecting line */}
          <div className="relative py-1 px-0.5">
            {/* Connecting line */}
            <div
              className="absolute left-2.5 right-2.5 top-1/2 -translate-y-1/2 h-[2px] bg-white/70 z-0"
              aria-hidden="true"
            />

            {/* Stamp nodes */}
            <div className="relative z-10 flex items-center justify-between">
              {Array.from({ length: totalStamps }).map((_, idx) => {
                const isStamped = idx < completedStamps;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-xs",
                      isStamped
                        ? "bg-white text-black"
                        : "bg-[#262626] border border-zinc-600 text-zinc-500"
                    )}
                  >
                    {isStamped && (
                      <Check className="w-2.5 h-2.5 stroke-[3] text-black" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row: Claim Reward + Info Button */}
          <div className="pt-0.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleClaim}
              className="flex-1 h-10 rounded-full text-xs sm:text-sm font-bold text-black transition-transform duration-150 active:scale-[0.98] shadow-sm bg-linear-to-r from-[#B5C5F2] via-white to-[#FFF2C0] cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              <Gift className="w-3.5 h-3.5 text-black shrink-0" />
              <span>Claim Reward</span>
            </button>

            <button
              type="button"
              onClick={handleClaim}
              aria-label="Loyalty card info"
              title="Loyalty card info"
              className="w-10 h-10 rounded-full bg-[#262626] border border-zinc-700/60 hover:bg-[#383838] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface LoyaltyCardProps {
  className?: string;
  header?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  subtitle?: ReactNode;
  shopName?: string;
  totalStamps?: number;
  completedStamps?: number;
  showComingSoon?: boolean;
}

export default function LoyaltyCard({
  className,
  header,
  title = (
    <>
      <span className="text-[#FFF2C0]">Loyalty Cards</span> & Stamp Rewards
    </>
  ),
  description,
  subtitle = "In available shops, collect stamps with every visit and claim free rewards.",
  shopName = "Sudo Cuts",
  totalStamps = 10,
  completedStamps = 10,
  showComingSoon = false,
}: LoyaltyCardProps) {
  return (
    <FeatureCard
      className={className}
      header={header ?? title}
      description={description ?? subtitle}
      showComingSoon={showComingSoon}
      playground={
        <LoyaltyPreview
          shopName={shopName}
          totalStamps={totalStamps}
          completedStamps={completedStamps}
        />
      }
    />
  );
}
