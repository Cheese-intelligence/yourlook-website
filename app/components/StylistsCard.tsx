import { Scissors } from "lucide-react";
import React, { ReactNode } from "react";
import FeatureCard from "./FeatureCard";

export interface StylistsCardProps {
  className?: string;
  header?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  subtitle?: ReactNode;
  barberImage?: string;
  barberName?: string;
  barberRole?: string;
  stylistImage?: string;
  stylistName?: string;
  stylistRole?: string;
}

export default function StylistsCard({
  className,
  header,
  title = (
    <>
      Recent Haircuts & <span className="text-[#BDCEFF]">Real Results</span>
    </>
  ),
  description,
  subtitle = "Browse recent haircuts and photos posted directly by local barbers.",
  barberImage = "/images/stylists/barber.jpg",
  barberName = "Liam",
  barberRole = "Barber · Glasgow",
  stylistImage = "/images/stylists/stylist.jpg",
  stylistName = "Chloe",
  stylistRole = "Stylist · Glasgow",
}: StylistsCardProps) {
  return (
    <FeatureCard
      className={className}
      header={header ?? title}
      description={description ?? subtitle}
      playground={
        <div className="w-full rounded-2xl bg-[#323232] border border-zinc-700/50 p-4 flex flex-col gap-3 transition-all duration-200">
          {/* Header row matching Card 1 & Card 2 */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#BDCEFF] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm select-none">
                <Scissors className="w-3.5 h-3.5 -rotate-45 text-black" />
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                  Recent Barber Cuts
                </span>
              </div>
            </div>

            <span className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate whitespace-nowrap shrink-0">
              Glasgow
            </span>
          </div>

          {/* Portraits Grid */}
          <div className="w-full grid grid-cols-2 gap-2 sm:gap-2.5">
            {/* Barber Portrait */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#262626] border border-zinc-700/50 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={barberImage}
                alt={`${barberName} - ${barberRole}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs font-bold text-white tracking-tight truncate block">
                  {barberName}
                </span>
                <span className="text-[10px] text-zinc-300 font-medium tracking-tight block truncate">
                  {barberRole}
                </span>
              </div>
            </div>

            {/* Stylist Portrait */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#262626] border border-zinc-700/50 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stylistImage}
                alt={`${stylistName} - ${stylistRole}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs font-bold text-white tracking-tight truncate block">
                  {stylistName}
                </span>
                <span className="text-[10px] text-zinc-300 font-medium tracking-tight block truncate">
                  {stylistRole}
                </span>
              </div>
            </div>
          </div>

          {/* Note / Caption */}
          <div className="pt-0.5">
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
              Local barbers & stylists share photos of their cuts and real results daily.
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-1 flex items-center gap-2">
            <div className="w-full h-10 rounded-full text-xs sm:text-sm font-bold text-zinc-200 bg-[#262626] border border-zinc-700/60 shadow-sm flex items-center justify-center gap-2 select-none">
              <Scissors className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Browse Barber Posts</span>
            </div>
          </div>
        </div>
      }
    />
  );
}
