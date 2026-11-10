import {
  Bookmark,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Droplets,
  ScanFace,
  Scissors,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import H2 from "./H2";
import H3 from "./H3";
import P from "./P";
import PillCard from "./PillCard";

export default function BenefitsSection() {
  return (
    <section className="mx-auto max-w-6xl w-full px-5 py-16 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <H2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Everything you need for your next look
        </H2>
        <P colour="muted">
          From style discovery to finding the right barber and keeping your cut
          fresh.
        </P>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <PillCard className="flex flex-col justify-between p-6 sm:p-7 bg-[#212121] border border-zinc-800/80 hover:border-zinc-700 transition-all">
          <div className="space-y-3">
            <H3 className="text-xl">
              Real cuts. <span className="text-[#BDCEFF]">Real Stylists.</span>
            </H3>
            <P colour="muted" size="sm">
              Browse verified barber and stylist portfolios with real customer
              results.
            </P>
          </div>

          {/* Visual: Phone UI showcasing stylist profiles and haircut photos */}
          <div className="mt-6 rounded-2xl bg-[#171717] p-4 border border-zinc-800/90 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 text-zinc-300">
                  <Scissors className="w-4 h-4 text-[#BDCEFF]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    Marcus Vance
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-xs text-zinc-400">Master Barber • 8 yrs</div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-zinc-800/70 px-2 py-0.5 rounded-md text-xs text-amber-300 font-medium">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                4.9
              </div>
            </div>

            {/* Haircut photo cards preview */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="h-20 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex flex-col justify-end p-1.5">
                <span className="text-[10px] text-zinc-300 font-medium truncate">
                  Low Taper
                </span>
              </div>
              <div className="h-20 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex flex-col justify-end p-1.5">
                <span className="text-[10px] text-zinc-300 font-medium truncate">
                  Crop Fade
                </span>
              </div>
              <div className="h-20 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex flex-col justify-end p-1.5">
                <span className="text-[10px] text-zinc-300 font-medium truncate">
                  Textured
                </span>
              </div>
            </div>
          </div>
        </PillCard>

        {/* Feature 2 */}
        <PillCard className="flex flex-col justify-between p-6 sm:p-7 bg-[#212121] border border-zinc-800/80 hover:border-zinc-700 transition-all">
          <div className="space-y-3">
            <H3 className="text-xl">Book the pro behind the cut</H3>
            <P colour="muted" size="sm">
              Lock in your preferred specialist directly without phone tags or
              wait times.
            </P>
          </div>

          <div>
            {/* Visual: Appointment booking popover card */}
            <div className="mt-6 rounded-2xl bg-[#171717] p-4 border border-zinc-800/90 shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-zinc-400">
                  Direct Booking
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Instant Confirm
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-800/70 border border-zinc-700/60">
                  <CalendarCheck className="w-4 h-4 text-[#BDCEFF] shrink-0" />
                  <div className="text-xs text-zinc-200">
                    <div className="font-semibold text-white">Friday, Oct 24</div>
                    <div className="text-zinc-400">2:30 PM • 45 min slot</div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    Zero wait time
                  </span>
                  <span className="text-white font-medium">Reserved</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-zinc-500">
              Coming soon
            </div>
          </div>
        </PillCard>

        {/* Feature 3 */}
        <PillCard className="flex flex-col justify-between p-6 sm:p-7 bg-[#212121] border border-zinc-800/80 hover:border-zinc-700 transition-all">
          <div className="space-y-3">
            <H3 className="text-xl">Preview it before the cut</H3>
            <P colour="muted" size="sm">
              Test styles virtually with AR face mapping to see what fits your
              face shape first.
            </P>
          </div>

          <div>
            {/* Visual: Glowing blue face mesh / wireframe preview graphic */}
            <div className="mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-950/30 to-zinc-950 p-4 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.12)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center py-2 text-center">
                <div className="relative mb-3 flex items-center justify-center w-14 h-14 rounded-full border border-cyan-400/50 bg-cyan-950/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <ScanFace className="w-7 h-7 text-cyan-300" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] text-cyan-300 font-mono tracking-wide">
                    AR FACE MAPPING
                  </span>
                  <span className="text-[10px] text-zinc-400">Oval Face</span>
                </div>

                <div className="w-full bg-zinc-900/80 border border-cyan-500/20 rounded-xl px-3 py-1.5 text-xs flex justify-between items-center">
                  <span className="text-zinc-300">Style Match</span>
                  <span className="text-cyan-300 font-semibold">96% High Fit</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-zinc-500">
              Coming soon
            </div>
          </div>
        </PillCard>

        {/* Feature 4 */}
        <PillCard className="flex flex-col justify-between p-6 sm:p-7 bg-[#212121] border border-zinc-800/80 hover:border-zinc-700 transition-all">
          <div className="space-y-3">
            <H3 className="text-xl">Match with the right products</H3>
            <P colour="muted" size="sm">
              Get product recommendations tailored specifically to maintain your
              exact style.
            </P>
          </div>

          <div>
            {/* Visual: Neon wireframe product bottles and sprays */}
            <div className="mt-6 rounded-2xl bg-[#171717] p-4 border border-zinc-800/90 shadow-inner">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-900 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.1)] flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-400/40 flex items-center justify-center mb-2">
                    <Droplets className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="text-xs font-semibold text-white">Matte Clay</div>
                  <div className="text-[10px] text-zinc-400">High Hold • Low Shine</div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-violet-400/30 shadow-[0_0_12px_rgba(167,139,250,0.1)] flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-lg bg-violet-950/50 border border-violet-400/40 flex items-center justify-center mb-2">
                    <Sparkles className="w-4 h-4 text-violet-300" />
                  </div>
                  <div className="text-xs font-semibold text-white">Sea Salt Spray</div>
                  <div className="text-[10px] text-zinc-400">Texture & Volume</div>
                </div>
              </div>

              <div className="mt-2 text-center text-[11px] text-zinc-500">
                Personalized based on hair density & cut
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-zinc-500">
              Coming soon
            </div>
          </div>
        </PillCard>

        {/* Feature 5 */}
        <PillCard className="flex flex-col justify-between p-6 sm:p-7 bg-[#212121] border border-zinc-800/80 hover:border-zinc-700 transition-all md:col-span-2 lg:col-span-1">
          <div className="space-y-3">
            <H3 className="text-xl">Save your best looks</H3>
            <P colour="muted" size="sm">
              Store your cut history, stylist notes, and favorite angles in your
              personal lookbook.
            </P>
          </div>

          {/* Visual: Silhouette profile card with saved style tags */}
          <div className="mt-6 rounded-2xl bg-[#171717] p-4 border border-zinc-800/90 shadow-inner">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 text-zinc-400">
                <User className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  Personal Lookbook
                  <Bookmark className="w-3 h-3 text-[#FFF2C0] fill-[#FFF2C0]" />
                </div>
                <div className="text-[11px] text-zinc-400">Cut History • 4 saved</div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-medium text-zinc-300 border border-zinc-700/60">
                  #LowFade
                </span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-medium text-zinc-300 border border-zinc-700/60">
                  #TexturedFringe
                </span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-medium text-zinc-300 border border-zinc-700/60">
                  #Guard2Taper
                </span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 italic">
                “Guard #1.5 on sides, scissor cut top for texture.”
              </div>
            </div>
          </div>
        </PillCard>
      </div>
    </section>
  );
}
