import BookingCard from "./BookingCard";
import FeatureCard from "./FeatureCard";
import H2 from "./H2";
import H3 from "./H3";
import LoyaltyCard from "./LoyaltyCard";
import P from "./P";
import SavedLookCard from "./SavedLookCard";
import StylistsCard from "./StylistsCard";

export default function BenefitsSection() {
  return (
    <section className="mx-auto max-w-6xl w-full px-5 py-16 space-y-16">
      {/* Overall Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <H2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Everything you need for your next look
        </H2>
        <P colour="muted">
          From style discovery to finding the right barber and keeping your cut
          fresh.
        </P>
      </div>

      {/* Section 1 — What you can do today (Primary Grid) */}
      <div className="space-y-6">
        <div className="space-y-1">
          <H3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What you can do today
          </H3>
          <P colour="muted" size="sm">
            Core features live in the app today to capture your style, earn rewards,
            and find the right stylist.
          </P>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Feature A: Saved Looks & Cut Formulas */}
          <SavedLookCard
            header={
              <>
                <span className="text-[#FFF2C0]">Saved Looks</span>
                {" & Cut Formulas"}
              </>
            }
            description="Store multi-angle photos and cut notes so your stylist gets it right every visit."
          />

          {/* Feature B: Loyalty Cards & Stamp Rewards */}
          <LoyaltyCard
            header={
              <>
                <span className="text-[#FFF2C0]">Loyalty Cards</span>
                {" & Stamp Rewards"}
              </>
            }
            description="In available shops, collect stamps with every visit and claim free rewards."
          />

          {/* Feature C: Recent Haircuts & Real Results */}
          <StylistsCard
            header={
              <>
                Recent Haircuts &{" "}
                <span className="text-[#BDCEFF]">Real Results</span>
              </>
            }
            description="Browse recent haircuts and photos posted directly by local barbers."
          />
        </div>
      </div>

      {/* Section 2 — Upcoming Features */}
      <div className="space-y-6">
        <div className="space-y-1">
          <H3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Upcoming releases
          </H3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming 1: In-App Booking */}
          <BookingCard
            showComingSoon={false}
            header="In-App Booking"
            description="Book an appointment directly with the exact barber or stylist behind the cut you love."
          />

          {/* Upcoming 2: Virtual Cut Previews */}
          <FeatureCard
            header="Virtual Cut Previews"
            description="Test styles virtually to see what fits your face and hair type before committing."
            showComingSoon={false}
            playground={
              <div className="w-full flex-1 flex items-center justify-center min-h-[220px] sm:min-h-[260px] overflow-hidden py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/svgs/preview-cut.svg"
                  alt="Virtual Cut Previews"
                  className="w-full h-full max-h-[260px] sm:max-h-[300px] object-contain scale-110"
                  loading="lazy"
                />
              </div>
            }
          />

          {/* Upcoming 3: Tailored Products */}
          <FeatureCard
            header="Tailored Products"
            description="Get product recommendations tailored specifically to maintain your exact style."
            showComingSoon={false}
            playground={
              <div className="w-full flex-1 flex items-center justify-center min-h-[220px] sm:min-h-[260px] overflow-hidden py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/svgs/products.svg"
                  alt="Tailored Products"
                  className="w-full h-full max-h-[260px] sm:max-h-[300px] object-contain scale-[1.35]"
                  loading="lazy"
                />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
