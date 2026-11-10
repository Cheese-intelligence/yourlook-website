import { Check } from "lucide-react";
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
      Real cuts. <span className="text-[#BDCEFF]">Real Stylists.</span>
    </>
  ),
  description,
  subtitle = "Browse verified barber and stylist portfolios with real customer results.",
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
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Barber Portrait */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#262626] border border-zinc-700/60 shadow-inner group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={barberImage}
              alt={`${barberName} - ${barberRole}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 right-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight truncate">
                  {barberName}
                </span>
                <span
                  title="Verified Barber"
                  className="w-3.5 h-3.5 rounded-full bg-[#BDCEFF] text-black flex items-center justify-center shrink-0 shadow-xs"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>
              <span className="text-[10px] text-zinc-300 font-medium tracking-tight block truncate">
                {barberRole}
              </span>
            </div>
          </div>

          {/* Stylist Portrait */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#262626] border border-zinc-700/60 shadow-inner group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stylistImage}
              alt={`${stylistName} - ${stylistRole}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 right-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight truncate">
                  {stylistName}
                </span>
                <span
                  title="Verified Stylist"
                  className="w-3.5 h-3.5 rounded-full bg-[#BDCEFF] text-black flex items-center justify-center shrink-0 shadow-xs"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>
              <span className="text-[10px] text-zinc-300 font-medium tracking-tight block truncate">
                {stylistRole}
              </span>
            </div>
          </div>
        </div>
      }
    />
  );
}
