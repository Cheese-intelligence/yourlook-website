import type { Metadata } from "next";
import IosTutorialContent from "./IosTutorialContent";

export const metadata: Metadata = {
  title: "YourLook Beta Build - iOS",
  description: "Info on how to install on iOS.",
};

export default function IosTutorialPage() {
  return <IosTutorialContent />;
}
