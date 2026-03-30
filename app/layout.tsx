import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YourLook",
  description: "Making every haircut legendary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-sans h-full antialiased`}>
      <body className="min-h-full bg-[#121212] text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
