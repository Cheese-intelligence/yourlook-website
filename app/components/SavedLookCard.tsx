"use client";

import {
  Check,
  Copy,
  Loader2,
  MessageSquare,
  MoreVertical,
  Scissors,
  Share2,
} from "lucide-react";
import React, { ReactNode, useState } from "react";
import { cn } from "../lib/utils";
import FeatureCard from "./FeatureCard";

export const ACCENT_YELLOW = "#FFF2C0";

export const DEFAULT_LOOKBOOK_IMAGES = [
  "/images/lookbook/front.jpg",
  "/images/lookbook/side.jpg",
  "/images/lookbook/back.jpg",
];

export interface SavedLookPreviewProps {
  authorName?: string;
  avatarInitial?: string;
  timestamp?: string;
  noteText?: string;
  images?: string[];
  initialCommented?: boolean;
  className?: string;
}

export function SavedLookPreview({
  authorName = "Adam",
  avatarInitial = "A",
  timestamp = "3 days ago",
  noteText = "Textured lob, blunt base, sits above shoulders. Soft internal layers for movement, point-cut ends. Center part, styled with loose waves. Natural root with blonde balayage.",
  images = DEFAULT_LOOKBOOK_IMAGES,
  initialCommented = false,
  className,
}: SavedLookPreviewProps) {
  const displayImages =
    images && images.length > 0 ? images : DEFAULT_LOOKBOOK_IMAGES;
  const [hasComment, setHasComment] = useState(initialCommented);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddComment = () => {
    if (isAddingComment) return;
    setIsAddingComment(true);

    setTimeout(() => {
      setIsAddingComment(false);
      setHasComment(true);
    }, 400);
  };

  const handleReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHasComment(false);
    setIsAddingComment(false);
    setIsMenuOpen(false);
    setCopied(false);
  };

  const handleCopyFormula = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(noteText).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsMenuOpen(false);
    }, 900);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Saved Look Card UI */}
      <div className="rounded-2xl bg-[#323232] p-4 sm:p-4.5 transition-all duration-200">
        <div className="space-y-3">
          {/* Header row: Author avatar, name badge, and timestamp */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-black font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm select-none"
                style={{ backgroundColor: ACCENT_YELLOW }}
              >
                {avatarInitial}
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                  {authorName}&apos;s note
                </span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#424242] text-zinc-300 shrink-0">
                  <Scissors className="w-2.5 h-2.5 -rotate-45" />
                </span>
              </div>
            </div>

            <span className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate whitespace-nowrap shrink-0">
              {timestamp}
            </span>
          </div>

          {/* Photo Gallery Row (Horizontal peek carousel matching design) */}
          <div className="flex gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none py-0.5">
            {displayImages.map((src, idx) => (
              <div
                key={idx}
                className="w-[45%] sm:w-[46%] shrink-0 aspect-[3/4] rounded-xl overflow-hidden bg-[#262626] border border-zinc-700/50 shadow-inner"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Hairstyle angle ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Stylist Cut Formula / Note Text */}
          <div className="pt-0.5">
            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
              {noteText}
            </p>
          </div>

          {/* Interactive Comment Preview Bubble (shown when user clicks Add Comment) */}
          {hasComment && (
            <div className="p-2.5 rounded-xl bg-[#262626] border border-zinc-700/70 transition-all duration-200">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#B5C5F2] text-black font-bold text-[8px] flex items-center justify-center">
                    Y
                  </span>
                  You
                </span>
                <span className="text-[10px] text-zinc-400">Just now</span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-300 leading-normal">
                “Loved the texture! Let&apos;s keep the sides slightly longer
                next time.”
              </p>
            </div>
          )}

          {/* Action Row: Gradient "Add Comment" Button + 3-dots Menu */}
          <div className="pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={hasComment ? handleReset : handleAddComment}
              disabled={isAddingComment}
              title={
                hasComment
                  ? "Comment added! Click to reset"
                  : "Add comment to stylist"
              }
              className="flex-1 h-10 rounded-full text-xs sm:text-sm font-bold text-black transition-transform duration-150 active:scale-[0.98] shadow-sm overflow-hidden cursor-pointer flex items-center justify-center gap-2 select-none"
              style={{
                background: `linear-gradient(to right, #B5C5F2, #FFFFFF, ${ACCENT_YELLOW})`,
              }}
            >
              {isAddingComment ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-black shrink-0" />
                  <span>Adding...</span>
                </>
              ) : hasComment ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black stroke-[3] shrink-0" />
                  <span>Comment Added</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-3.5 h-3.5 text-black stroke-[2.2] shrink-0" />
                  <span>Add Comment</span>
                </>
              )}
            </button>

            {/* Circular 3-dots menu button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title="More options"
                aria-label="More options"
                className="w-10 h-10 rounded-full bg-[#404040] hover:bg-[#4d4d4d] text-zinc-300 hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Popover options menu */}
              {isMenuOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-44 rounded-xl bg-[#262626] border border-zinc-700/80 p-1 shadow-xl z-20">
                  <button
                    type="button"
                    onClick={handleCopyFormula}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-[#383838] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 font-medium">
                          Formula copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy formula</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-[#383838] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Share look</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface SavedLookCardProps {
  className?: string;
  header?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  subtitle?: ReactNode;
  authorName?: string;
  avatarInitial?: string;
  timestamp?: string;
  noteText?: string;
  images?: string[];
  initialCommented?: boolean;
  showComingSoon?: boolean;
}

export default function SavedLookCard({
  className,
  header,
  title = (
    <>
      <span style={{ color: ACCENT_YELLOW }}>Save your best</span> looks
    </>
  ),
  description,
  subtitle = "Store your cut history, stylist formulas, and favorite angles in your personal lookbook.",
  authorName = "Adam",
  avatarInitial = "A",
  timestamp = "3 days ago",
  noteText = "Textured lob, blunt base, sits above shoulders. Soft internal layers for movement, point-cut ends. Center part, styled with loose waves. Natural root with blonde balayage.",
  images = DEFAULT_LOOKBOOK_IMAGES,
  initialCommented = false,
}: SavedLookCardProps) {
  return (
    <FeatureCard
      className={className}
      header={header ?? title}
      description={description ?? subtitle}
      playground={
        <SavedLookPreview
          authorName={authorName}
          avatarInitial={avatarInitial}
          timestamp={timestamp}
          noteText={noteText}
          images={images}
          initialCommented={initialCommented}
        />
      }
    />
  );
}
