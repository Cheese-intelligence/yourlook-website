"use client";

import {
  CalendarCheck,
  CalendarPlus,
  Check,
  CornerUpRight,
  Loader2,
  RotateCcw,
  X,
} from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import FeatureCard from "./FeatureCard";

export interface BookingPreviewProps {
  shopName?: string;
  statusText?: string;
  timeSlot?: string;
  address?: string;
  initialBooked?: boolean;
  className?: string;
}

export function BookingPreview({
  shopName = "Acme Barber Studio",
  statusText = "Open · 8am - 5pm",
  timeSlot = "Tomorrow · 3:00 PM",
  address = "123 Example Street, Nowhere · 555-0199",
  initialBooked = false,
  className,
}: BookingPreviewProps) {
  const [isBooked, setIsBooked] = useState(initialBooked);
  const [isBooking, setIsBooking] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastTimeoutId, setToastTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleBook = () => {
    if (isBooking) return;
    setIsBooking(true);

    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);

      if (toastTimeoutId) clearTimeout(toastTimeoutId);
      setShowToast(true);
      const id = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      setToastTimeoutId(id);
    }, 450);
  };

  const handleDismissToast = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    setShowToast(false);
  };

  const handleReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    setShowToast(false);
    setIsBooked(false);
    setIsBooking(false);
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
          <Check className="w-4 h-4 text-black stroke-[3]" />
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-semibold text-white tracking-tight">
            Demo Completed
          </p>
          <p className="text-[11px] text-zinc-300 leading-snug mt-0.5">
            No real appointment was scheduled. This is a simulated preview of
            our upcoming in-app booking.
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

      {/* Booking Card UI */}
      <div className="rounded-2xl bg-[#323232] border border-zinc-700/50 p-4 sm:p-4.5 transition-all duration-200">
        <div className="space-y-2.5">
          {/* Header row: Shop Name, Demo Badge & Reset control */}
          <div className="flex items-center justify-between h-5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                {shopName}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-[#262626] border border-zinc-600/60 text-zinc-300 shrink-0 select-none">
                Interactive Demo
              </span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              title="Reset booking demo"
              aria-label="Reset booking demo"
              className={cn(
                "flex items-center gap-1 text-[10px] sm:text-[11px] text-zinc-400 hover:text-white transition-opacity duration-150 px-1.5 py-0.5 rounded hover:bg-[#404040] cursor-pointer",
                isBooked ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Row 1: Neon Green Dot (#4AFF59) + Status */}
          <div className="flex items-center gap-2 h-5">
            <span className="w-2 h-2 rounded-full bg-[#4AFF59] shrink-0 shadow-[0_0_6px_#4AFF59]" />
            <span className="text-xs sm:text-sm font-semibold text-white truncate">
              {isBooked ? "Demo Confirmed (Simulated)" : statusText}
            </span>
          </div>

          {/* Row 2: Calendar icon + Time slot */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium h-5">
            <CalendarCheck className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="truncate">{timeSlot}</span>
          </div>

          {/* Row 3: CornerUpRight arrow + Address (Disabled, strictly non-clickable) */}
          <div
            className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300 font-medium h-5 pointer-events-none select-none cursor-default"
            aria-disabled="true"
          >
            <CornerUpRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{address}</span>
          </div>

          {/* Action Button: Book button */}
          <div className="pt-1.5">
            <button
              type="button"
              onClick={isBooked ? handleReset : handleBook}
              disabled={isBooking}
              title={
                isBooked
                  ? "Demo completed (no real booking). Click to reset"
                  : "Click to test booking demo"
              }
              className="w-full h-10 rounded-full text-xs sm:text-sm font-bold text-black transition-transform duration-150 active:scale-[0.98] shadow-sm overflow-hidden bg-linear-to-r from-[#B5C5F2] via-white to-[#FFF4C4] cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              {isBooking ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-black shrink-0" />
                  <span>Booking (Demo)...</span>
                </>
              ) : isBooked ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black stroke-[3] shrink-0" />
                  <span>Booked (Demo)</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-3.5 h-3.5 text-black stroke-[2.5] shrink-0" />
                  <span>Book (Demo)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface BookingCardProps {
  className?: string;
  header?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  subtitle?: ReactNode;
  shopName?: string;
  statusText?: string;
  timeSlot?: string;
  address?: string;
  initialBooked?: boolean;
  showComingSoon?: boolean;
}

export default function BookingCard({
  className,
  header,
  title = (
    <>
      <span className="text-[#FFF2C0]">Book the pro</span> behind the cut
    </>
  ),
  description,
  subtitle = "Love a look? Book an appointment with the exact barber who made it.",
  shopName = "Acme Barber Studio",
  statusText = "Open · 8am - 5pm",
  timeSlot = "Tomorrow · 3:00 PM",
  address = "123 Example Street, Nowhere · 555-0199",
  initialBooked = false,
  showComingSoon = true,
}: BookingCardProps) {
  return (
    <FeatureCard
      className={className}
      header={header ?? title}
      description={description ?? subtitle}
      showComingSoon={showComingSoon}
      playground={
        <BookingPreview
          shopName={shopName}
          statusText={statusText}
          timeSlot={timeSlot}
          address={address}
          initialBooked={initialBooked}
        />
      }
    />
  );
}
