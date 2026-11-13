import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import SiteShell from "@/components/SiteShell";

const inter = localFont({
  src: "../public/fonts/Inter.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const geist = localFont({
  src: [
    {
      path: "../public/fonts/Geist.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "FORESTWATCH — Edukasi Karhutla Indonesia", template: "%s | FORESTWATCH" },
  description:
    "Web edukasi karhutla Indonesia: pahami penyebabnya, cegah dari sekarang, ketahui tindakan saat melihat api, dan ikut memulihkan hutan dan lahan gambut.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${geist.variable}`}>
      <body className="bg-ink text-on-ink font-sans antialiased selection:bg-primary selection:text-on-ink">
        <LenisProvider>
          <SiteShell>{children}</SiteShell>
        </LenisProvider>
      </body>
    </html>
  );
}
