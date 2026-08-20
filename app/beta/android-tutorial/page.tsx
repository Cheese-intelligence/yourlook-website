import type { Metadata } from "next";
import AndroidTutorialContent from "./androidTutorialContent";

export const metadata: Metadata = {
  title: "YourLook Beta Build - Android",
  description: "Info on how to install YourLook on Android.",
};

export default function AndroidTutorialPage() {
  return <AndroidTutorialContent />;
}
