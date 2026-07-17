import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import type { MarketingImage } from "@/lib/marketing-images";

export type CatalogCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string | null;
};

function CatalogCard({ card }: { card: CatalogCardItem }) {
  const Icon = card.icon;

  return (
    <Link
      href={card.href}
      className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#121110]/90 shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-cedar-accent/35 hover:bg-[#18150f] hover:shadow-[0_28px_80px_rgba(0,0,0,0.48)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cedar-accent/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
      />
      <div className="relative flex flex-1 flex-col p-7 sm:p-8">
        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-cedar-accent/15 bg-cedar-accentSoft">
          <Icon className="h-6 w-6 text-cedar-accent" aria-hidden />
        </div>
        {card.badge ? (
          <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cedar-accent">
            {card.badge}
          </span>
        ) : null}
        <h3 className="text-xl font-bold leading-snug text-cedar-ivory sm:text-2xl">
          {card.title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-cedar-mist sm:text-[0.95rem]">
          {card.description}
        </p>
      </div>
    </Link>
  );
}

type MarketingCatalogLayoutProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  cards: CatalogCardItem[];
  ctaTitle: string;
  ctaText: string;
  panelImage: MarketingImage;
};

/** Auth-style sticky intro left + scrolling card grid right */
export default function MarketingCatalogLayout({
  eyebrow,
  title,
  description,
  cards,
  ctaTitle,
  ctaText,
  panelImage,
}: MarketingCatalogLayoutProps) {
  const leftColumn = cards.filter((_, index) => index % 2 === 0);
  const rightColumn = cards.filter((_, index) => index % 2 === 1);

  return (
    <>
      <section className="relative bg-black pb-24 lg:pb-32">
        <div className="relative mx-auto grid min-h-screen w-full max-w-[min(1440px,100%)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
          <div className="relative hidden lg:block">
            <div className="site-sticky-panel flex flex-col">
              <div className="relative flex-1 overflow-hidden border-r border-white/10">
                <Image
                  src={panelImage.src}
                  alt={panelImage.alt}
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="relative flex h-full flex-col justify-end px-10 pb-12 pt-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cedar-accent">
                    {eyebrow}
                  </p>
                  <h1 className="mt-6 max-w-md font-display text-5xl leading-[1.02] tracking-tight text-cedar-ivory lg:text-[4.25rem]">
                    {title}
                  </h1>
                  <p className="mt-6 max-w-sm text-base leading-relaxed text-white/75 sm:text-lg">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="site-scroll-column px-4 pb-8 sm:px-8 lg:px-10 lg:pb-16">
            <div className="mb-8 border border-white/10 bg-white/[0.03] px-3 py-3 sm:px-4">
              <WayfindingStrip zone="site" tone="onDark" />
            </div>

            <div className="relative mb-10 min-h-[26rem] overflow-hidden rounded-[2rem] border border-white/10 lg:hidden">
              <Image
                src={panelImage.src}
                alt={panelImage.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15" />
              <div className="relative flex min-h-[26rem] flex-col justify-end p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cedar-accent">
                  {eyebrow}
                </p>
                <h1 className="mt-5 font-display text-4xl leading-tight text-cedar-ivory sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-7 lg:gap-8">
              <div className="flex flex-col gap-5 sm:gap-7 lg:gap-8 lg:pt-6">
                {leftColumn.map((card) => (
                  <CatalogCard key={card.id} card={card} />
                ))}
              </div>
              <div className="flex flex-col gap-5 sm:mt-16 sm:gap-7 lg:mt-28 lg:gap-8">
                {rightColumn.map((card) => (
                  <CatalogCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950 py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="relative grid overflow-hidden rounded-[2rem] border border-cedar-accent/20 bg-black px-8 py-12 sm:px-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 85% 100%, rgba(31,58,95,0.16), transparent 60%)",
              }}
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">
                Ready when you are
              </p>
              <h2 className="mt-4 font-display text-3xl text-cedar-ivory sm:text-4xl">
                {ctaTitle}
              </h2>
              <p className="mt-3 max-w-xl text-cedar-mist">{ctaText}</p>
            </div>
            <Button href="/contact" variant="accent" className="relative mt-8 px-8 lg:mt-0">
              Build with us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
