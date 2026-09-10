import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Foundhouse | Building Digital Foundations.",
  description:
    "Foundhouse is a software and development studio for founders. We help founders turn ideas into world-class digital products.",
  metadataBase: new URL(process.env.SITE_URL ?? "https://foundhouse.tech"),
  openGraph: {
    title: "Foundhouse | Building Digital Foundations.",
    description: "We help founders turn ideas into world-class digital products.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
