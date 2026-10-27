import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "YourLook",
  description: "Now available on Play Store and App Store.",
};

export default function Home() {
  return <HomeContent />;
}
