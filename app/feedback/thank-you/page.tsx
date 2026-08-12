import H2 from "@/app/components/H2";
import P from "@/app/components/P";
import PillCard from "@/app/components/PillCard";

export default function ThankYou() {
  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-5">
      <PillCard>
        <H2>Thank you!</H2>
        <P>We got your feedback and are working on making the app better.</P>
      </PillCard>
    </main>
  );
}
