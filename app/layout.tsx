import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YourLook",
  description: "Join the waiting list to find the look that actually fits you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-sans h-full antialiased`}>
      <body className="min-h-full bg-[#121212] text-white flex flex-col">
        <div className="flex-1">{children}</div>
        <footer className="py-8 text-center text-zinc-500 text-sm flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
          <a href="/contact-us" className="hover:text-white transition-colors">
            Contact Us
          </a>
          <a
            href="/privacy_policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms_and_conditions"
            className="hover:text-white transition-colors"
          >
            Terms & Conditions
          </a>
        </footer>
      </body>
    </html>
  );
}
