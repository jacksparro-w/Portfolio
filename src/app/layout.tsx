import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

export const metadata: Metadata = {
  title: "Brajin S J | Software Developer",
  description: "The personal portfolio and engineering journey of Brajin S J.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Navigation />
        <div className="site-shell">{children}</div>
      </body>
    </html>
  );
}
