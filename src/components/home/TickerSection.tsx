const rowOne = [
  "Food Stores",
  "Fashion Boutiques",
  "Pharmacies",
  "Schools",
  "Churches",
  "Logistics Companies",
  "Beauty Salons",
  "Shops & stores",
  "NGOs",
  "Real Estate",
  "Event Planners",
  "Restaurants",
  "Clinics",
  "Law Firms",
];

const rowTwo = [
  "Invoice Automation",
  "Payment Gateways",
  "Business Websites",
  "Mobile Apps",
  "Business Email",
  "Staff Training",
  "Bulk Messaging",
  "Brand Identity",
  "Domain Setup",
  "Digital Ads",
];

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="overflow-hidden py-3">
      <div className={`flex w-max ${reverse ? "animate-marquee-r" : "animate-marquee"}`}>
        {list.map((item, index) => (
          <span key={`${item}-${index}`} className="text-sm font-medium text-cedar-mist">
            {item}
            <span className="mx-3 text-cedar-accent/50">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TickerSection() {
  return (
    <section className="border-y border-white/10 bg-black">
      <div className="mx-auto max-w-[1200px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <Marquee items={rowOne} />
        <Marquee items={rowTwo} reverse />
      </div>
    </section>
  );
}
