import Link from "next/link";

import { Container } from "@/components/ui/Section";
import localBusiness from "@/data/localBusiness.json";
import { primaryNav } from "@/lib/nav";
import { categoryPath, productCategories } from "@/lib/products";
import { telHref } from "@/lib/contact";

/**
 * Site footer.
 *
 * Server Component. Carries the crawlable secondary navigation and the real,
 * verified contact details — nothing here is invented. No opening hours and no
 * social links are shown, because only social *display names* are known and
 * hours were never supplied.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-ink-200 bg-ink-950 text-ink-200 mt-auto border-t">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1fr_1.3fr]">
          <div>
            <p className="font-display text-bone text-2xl">
              PNK<span className="text-brass-400">.</span> Enterprises
            </p>
            <p className="text-ink-400 mt-1 text-xs tracking-[0.18em] uppercase">
              {localBusiness.legalName}
            </p>
            <p className="text-ink-300 mt-5 max-w-sm text-sm leading-relaxed">
              Household items, vacuum flasks, kitchen equipment and home
              appliances, supplied from Lagos Island and Idumota.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-ink-400 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
              Browse
            </h2>
            <ul className="mt-5 space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-200 hover:text-brass-300 text-sm underline-offset-4 transition-colors hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product ranges">
            <h2 className="text-ink-400 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
              Ranges
            </h2>
            <ul className="mt-5 space-y-3">
              {productCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={categoryPath(category.slug)}
                    className="text-ink-200 hover:text-brass-300 text-sm underline-offset-4 transition-colors hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-ink-400 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
              Contact
            </h2>
            <address className="mt-5 space-y-4 text-sm not-italic">
              <div>
                <p className="text-ink-400">
                  {localBusiness.addresses.main.label}
                </p>
                <p className="text-ink-200 mt-1 leading-relaxed">
                  {localBusiness.addresses.main.formatted}
                </p>
              </div>
              <div>
                <p className="text-ink-400">
                  {localBusiness.addresses.branch.label}
                </p>
                <p className="text-ink-200 mt-1 leading-relaxed">
                  {localBusiness.addresses.branch.formatted}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {localBusiness.phones.map((phone) => (
                  <a
                    key={phone}
                    href={telHref(phone)}
                    className="text-ink-200 hover:text-brass-300 underline-offset-4 transition-colors hover:underline"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${localBusiness.email}`}
                className="text-ink-200 hover:text-brass-300 inline-block break-all underline-offset-4 transition-colors hover:underline"
              >
                {localBusiness.email}
              </a>
            </address>
          </div>
        </div>

        <div className="border-ink-800 text-ink-400 mt-14 flex flex-col gap-2 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {localBusiness.legalName}. Trading as {localBusiness.name}.
          </p>
          <p>Branch: {localBusiness.branchName}</p>
        </div>
      </Container>
    </footer>
  );
}
