import BenefitsSection from "./components/BenefitsSection";
import DeviceDownloadCTA from "./components/DeviceDownloadCTA";
import H1 from "./components/H1";
import H2 from "./components/H2";
import Logo from "./components/Logo";
import P from "./components/P";

export default function HomeContent() {
  return (
    <main className="w-full">
      {/* [SECTION 1: HERO / ABOVE-THE-FOLD CALL TO ACTION] */}
      <section className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 py-20 overflow-hidden text-center">
        {/* Ambient atmospheric glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="w-[680px] h-[480px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(189, 206, 255, 0.08) 0%, rgba(255, 242, 192, 0.06) 35%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
          {/* Logo Monogram */}
          <Logo className="mb-4" />

          {/* Early Access Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-zinc-400 bg-[#212121] border border-zinc-800 mb-4 tracking-wide shadow-xs">
            Early Access
          </div>

          {/* Headline & Subhead */}
          <H1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-balance">
            Never get a bad haircut again.
          </H1>
          <P colour="muted" className="text-base sm:text-lg mb-8 max-w-lg">
            Save your exact cut formulas, keep your haircut history, and browse
            recent haircuts with real results.
          </P>

          {/* Conditional CTA: QR code for Desktop, Direct Buttons for Mobile */}
          <DeviceDownloadCTA variant="hero" />

          {/* Micro-trust reassurance */}
          <p className="text-xs text-zinc-500 mt-6 tracking-wide">
            No Subscription required • Feedback welcome
          </p>
        </div>
      </section>

      {/* [SECTION 2: THE BENEFITS / FEATURES] */}
      <BenefitsSection />

      {/* [SECTION 3: FINAL CALL TO ACTION - COMPACT] */}
      <section className="relative flex flex-col justify-center items-center px-6 py-16 sm:py-20 overflow-hidden text-center">
        {/* Ambient atmospheric glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="w-[560px] h-[340px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(189, 206, 255, 0.08) 0%, rgba(255, 242, 192, 0.06) 35%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
          {/* Compact Logo */}
          <Logo width={48} height={35} className="mb-4 opacity-90" />

          {/* Headline & Subhead */}
          <H2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-balance">
            Try YourLook today{" "}
            <span className="whitespace-nowrap">for free</span>
          </H2>
          <P
            colour="muted"
            size="sm"
            className="text-sm sm:text-base mb-6 max-w-sm"
          >
            Available on iOS & Android
          </P>

          {/* Conditional CTA: Compact horizontal card for Desktop, Compact buttons for Mobile */}
          <DeviceDownloadCTA variant="bottom" />

          {/* Micro-trust reassurance */}
          <p className="text-[11px] text-zinc-500 mt-4 tracking-wide">
            No Subscription required • Feedback welcome
          </p>
        </div>
      </section>
    </main>
  );
}
