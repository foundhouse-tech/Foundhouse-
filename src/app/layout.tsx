import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

const description =
  "Foundhouse builds exceptional software, AI solutions, web applications, and mobile apps that help businesses grow faster.";

export const metadata: Metadata = {
  metadataBase: new URL("https://foundhouse.app"),
  title: "Foundhouse — Building Digital Foundations.",
  description,
  openGraph: {
    type: "website",
    title: "Foundhouse — Building Digital Foundations.",
    description,
    images: ["/images/brand-reference.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foundhouse — Building Digital Foundations.",
    description,
    images: ["/images/brand-reference.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
