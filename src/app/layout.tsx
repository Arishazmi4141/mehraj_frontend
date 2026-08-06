import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "@/src/app/globals.css";
import PageRevealProvider from "@/src/components/common/PageRevealProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MehRaj",
  description:
    "Premium Collection of Men's Wear.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body suppressHydrationWarning>
        <PageRevealProvider>{children}</PageRevealProvider>
      </body>
    </html>
  );
}