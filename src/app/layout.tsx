import type { Metadata } from "next";
import "./globals.css";
import "./journal-turn.css";
import { Navigation } from "@/components/layout/Navigation";
import { JournalController } from "@/components/animations/JournalController";

export const metadata: Metadata = {
  title: "Brajin S J | Software Developer",
  description: "The personal portfolio and engineering journey of Brajin S J.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JournalController />
        <Navigation />
        <main className="site-shell" tabIndex={-1}>{children}</main>
      </body>
    </html>
  );
}
