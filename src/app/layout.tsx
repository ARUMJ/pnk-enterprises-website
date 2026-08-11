import type { Metadata, Viewport } from "next";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import RevealObserver from "@/components/motion/RevealObserver";
import { defaultMetadata, siteMeta } from "@/lib/siteMeta";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#0e0c0a",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteMeta.language} className="h-full antialiased">
      <body className="bg-bone text-ink-900 flex min-h-full flex-col">
        <a
          href="#main"
          className="bg-ink-900 text-bone sr-only rounded-full px-5 py-3 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <LocalBusinessJsonLd />
        <RevealObserver />
      </body>
    </html>
  );
}
