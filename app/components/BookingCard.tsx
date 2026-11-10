"use client";

import {
  CalendarCheck,
  CalendarPlus,
  Check,
  CornerUpRight,
  Loader2,
  RotateCcw,
} from "lucide-react";
import React, { ReactNode, useState } from "react";
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
  shopName = "Fullstack Barbers",
  statusText = "Open · 8am - 5pm",
  timeSlot = "Tomorrow · 3:00 PM",
  address = "1555 Dalmatian St · 5 min away",
  initialBooked = false,
  className,
}: BookingPreviewProps) {
  const [isBooked, setIsBooked] = useState(initialBooked);
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = () => {
    if (isBooking) return;
    setIsBooking(true);

    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);
    }, 450);
  };

  const handleReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsBooked(false);
    setIsBooking(false);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Booking Card UI - No nested wrappers or black outlines */}
      <div
        className={cn(
          "rounded-2xl bg-[#323232] p-4 sm:p-4.5 transition-all duration-200",
        )}
      >
        <div className="space-y-2.5">
          {/* Header row: Shop Name & Reset control */}
          <div className="flex items-center justify-between h-5">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
              {shopName}
            </span>
            <button
              type="button"
              onClick={handleReset}
              title="Reset booking demo"
              aria-label="Reset booking demo"
              className={cn(
                "flex items-center gap-1 text-[10px] sm:text-[11px] text-zinc-400 hover:text-white transition-opacity duration-150 px-1.5 py-0.5 rounded hover:bg-[#404040] cursor-pointer",
                isBooked ? "opacity-100" : "opacity-0 pointer-events-none",
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
              {isBooked ? "Booking Confirmed" : statusText}
            </span>
          </div>

          {/* Row 2: Calendar icon + Time slot */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium h-5">
            <CalendarCheck className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="truncate">{timeSlot}</span>
          </div>

          {/* Row 3: CornerUpRight arrow + Address */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium h-5">
            <CornerUpRight className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="truncate">{address}</span>
          </div>

          {/* Action Button: ONLY keep Book button */}
          <div className="pt-1.5">
            <button
              type="button"
              onClick={isBooked ? handleReset : handleBook}
              disabled={isBooking}
              title={
                isBooked ? "Booking confirmed! Click to reset" : "Click to book"
              }
              className="w-full h-10 rounded-full text-xs sm:text-sm font-bold text-black transition-transform duration-150 active:scale-[0.98] shadow-sm overflow-hidden bg-linear-to-r from-[#B5C5F2] via-white to-[#FFF4C4] cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              {isBooking ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-black shrink-0" />
                  <span>Booking...</span>
                </>
              ) : isBooked ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black stroke-[3] shrink-0" />
                  <span>Booked</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-3.5 h-3.5 text-black stroke-[2.5] shrink-0" />
                  <span>Book</span>
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
  shopName = "Fullstack Barbers",
  statusText = "Open · 8am - 5pm",
  timeSlot = "Tomorrow · 3:00 PM",
  address = "1555 Dalmatian St · 5 min away",
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
