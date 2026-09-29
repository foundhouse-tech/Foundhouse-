import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const SITE_URL = process.env.SITE_URL ?? "https://foundhouse.tech";

export const metadata: Metadata = {
  title: "Foundhouse | App Development & Launch Studio for Founders in Cincinnati",
  description:
    "Foundhouse is a software and development studio for founders. We help founders turn ideas into world-class digital products.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Foundhouse | Building Digital Foundations.",
    description: "We help founders turn ideas into world-class digital products.",
    type: "website",
  },
};

/** Sitewide Organization schema; helps separate foundhouse.tech from other "Foundhouse"s. */
const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Foundhouse",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: "Software and product studio that helps founders turn ideas into digital products.",
  email: "teamfoundhouse@gmail.com",
  sameAs: ["https://x.com/foundhouseteam", "https://www.instagram.com/teamfoundhouse"],
  founder: { "@type": "Person", name: "Kameron Seabrook" },
  address: { "@type": "PostalAddress", addressLocality: "Cincinnati", addressRegion: "OH", addressCountry: "US" },
  areaServed: "US",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
