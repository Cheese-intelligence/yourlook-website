import BookingCard from "./BookingCard";
import FeatureCard from "./FeatureCard";
import H2 from "./H2";
import P from "./P";
import SavedLookCard from "./SavedLookCard";
import StylistsCard from "./StylistsCard";

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
        {/* Feature 1: Real Cuts & Real Stylists Showcase */}
        <StylistsCard />

        {/* Feature 2: Interactive Booking Preview */}
        <BookingCard />

        {/* Feature 3 */}
        <FeatureCard
          header="Preview it before the cut"
          description="Test styles virtually to see what fits you before committing."
          showComingSoon
        />

        {/* Feature 4 */}
        <FeatureCard
          header="Match with the right products"
          description="Get product recommendations tailored specifically to maintain your exact style."
          showComingSoon
        />

        {/* Feature 5: Interactive Lookbook / Saved Looks Card */}
        <SavedLookCard className="md:col-span-2 lg:col-span-1" />
      </div>
    </section>
  );
}
