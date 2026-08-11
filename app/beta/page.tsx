import type { Metadata } from "next";
import BetaContent from "./BetaContent";

export const metadata: Metadata = {
  title: "YourLook Beta Build",
  description: "Install the latest preview build for iOS and Android.",
};

export default function BetaPage() {
  return <BetaContent />;
}
