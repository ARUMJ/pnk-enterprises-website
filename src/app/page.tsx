import type { Metadata } from "next";

import CategoryGrid from "@/components/sections/CategoryGrid";
import ContactCta from "@/components/sections/ContactCta";
import Heritage from "@/components/sections/Heritage";
import Hero from "@/components/sections/Hero";
import ValueProposition from "@/components/sections/ValueProposition";
import { pageMetadata } from "@/lib/siteMeta";

export const metadata: Metadata = pageMetadata({
  title: "Household Items, Kitchen Equipment & Home Appliances in Lagos",
  description:
    "PNK ENTERPRISES supplies vacuum flasks, kitchen equipment, home appliances, coolers and household items from Lagos Island and Ebute Ero Market, Idumota, to customers across Nigeria.",
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <CategoryGrid />
      <ValueProposition />
      <Heritage />
      <ContactCta />
    </main>
  );
}
