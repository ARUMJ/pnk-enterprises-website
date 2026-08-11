import type { Metadata } from "next";

import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import { defaultMetadata, siteMeta } from "@/lib/siteMeta";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteMeta.language} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        {children}
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
