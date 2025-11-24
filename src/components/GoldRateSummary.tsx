interface GoldRateSummaryProps {
  price24k: number;
  price22k: number;
  city?: string;
}

export const GoldRateSummary = ({ price24k, price22k, city = "Chennai" }: GoldRateSummaryProps) => {
  const price18k = Math.round(price24k * 0.75);

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold mb-3 text-foreground">TL;DR</h2>
      <p className="text-foreground/90 leading-relaxed">
        The price of gold in {city} today is{" "}
        <span className="font-semibold text-primary">₹{price24k.toLocaleString('en-IN')}</span> per gram for 24 karat gold,{" "}
        <span className="font-semibold text-primary">₹{price22k.toLocaleString('en-IN')}</span> per gram for 22 karat gold and{" "}
        <span className="font-semibold text-primary">₹{price18k.toLocaleString('en-IN')}</span> per gram for 18 karat gold (also called 999 gold).
      </p>
      <p className="text-foreground/80 mt-4 leading-relaxed">
        Gold Rates in {city} are witnessing a steady trend since the start of the year. Demand for gold in {city} has been on the rise, with most of the demand coming for jewellery and less in gold biscuits and gold coins.
      </p>
    </div>
  );
};
