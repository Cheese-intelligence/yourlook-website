import { Metadata } from "next";
import Feedback from "./Feedback";

export const metadata: Metadata = {
  title: "YourLook - Feedback",
  description: "We’d love to hear your thoughts or suggestions.",
};

export function page() {
  return <Feedback />;
}
