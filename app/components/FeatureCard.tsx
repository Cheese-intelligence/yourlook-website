import React, { ReactNode } from "react";
import { cn } from "../lib/utils";
import H3 from "./H3";
import P from "./P";
import PillCard from "./PillCard";

export interface FeatureCardProps {
  /**
   * Header text or component. If a React element (like `<H3>`) is passed,
   * it renders directly; otherwise it wraps in `<H3>`.
   */
  header?: ReactNode;
  /** Alias for header */
  title?: ReactNode;
  /** Subtitle or description text/node */
  description?: ReactNode;
  /** Alias for description */
  subtitle?: ReactNode;
  /** Swappable playground / interactive widget slot */
  playground?: ReactNode;
  /** Children also alias as playground slot */
  children?: ReactNode;
  /** Toggles the consistent "coming soon" badge at the bottom */
  showComingSoon?: boolean;
  /** Alias for showComingSoon */
  comingSoon?: boolean;
  className?: string;
}

export default function FeatureCard({
  header,
  title,
  description,
  subtitle,
  playground,
  children,
  showComingSoon,
  comingSoon,
  className,
}: FeatureCardProps) {
  const resolvedHeader = header ?? title;
  const resolvedDescription = description ?? subtitle;
  const resolvedSlot = playground ?? children;
  const hasComingSoon = showComingSoon ?? comingSoon;

  return (
    <PillCard
      className={cn(
        "flex flex-col justify-between p-6 sm:p-7 bg-[#212121] border border-zinc-800/80",
        className,
      )}
    >
      <div className="space-y-2">
        {resolvedHeader && (
          <div className="min-h-[2.75rem] sm:min-h-[3.25rem] flex items-start">
            {React.isValidElement(resolvedHeader) &&
            (resolvedHeader.type === H3 ||
              (typeof resolvedHeader.type === "string" &&
                resolvedHeader.type.startsWith("h"))) ? (
              resolvedHeader
            ) : (
              <H3 className="text-lg sm:text-xl font-bold leading-snug">{resolvedHeader}</H3>
            )}
          </div>
        )}

        {resolvedDescription && (
          <div className="min-h-[2.5rem] sm:min-h-[2.75rem] flex items-start">
            {typeof resolvedDescription === "string" ? (
              <P colour="muted" size="sm" className="text-xs sm:text-sm leading-relaxed">
                {resolvedDescription}
              </P>
            ) : (
              resolvedDescription
            )}
          </div>
        )}
      </div>

      {resolvedSlot && (
        <div className="mt-5 flex-1 flex flex-col justify-start w-full min-h-0">
          {resolvedSlot}
        </div>
      )}

      {hasComingSoon && (
        <div className={cn("flex justify-center", resolvedSlot ? "mt-4" : "mt-auto pt-6")}>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide text-zinc-400 bg-[#323232] border border-zinc-700/60">
            coming soon
          </span>
        </div>
      )}
    </PillCard>
  );
}

export { FeatureCard };
