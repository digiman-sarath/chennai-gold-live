interface GoldRateSummaryProps {
  price24k: number;
  price22k: number;
  city?: string;
}

export const GoldRateSummary = ({ price24k, price22k, city = "Chennai" }: GoldRateSummaryProps) => {
  const price18k = Math.round(price24k * 0.75);

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-3 text-foreground">TL;DR</h2>
      <p className="text-foreground/90 leading-relaxed">
        The live gold price in {city} today is{" "}
        <span className="font-semibold text-primary">₹{price24k.toLocaleString('en-IN')}</span> per gram for 24K,{" "}
        <span className="font-semibold text-primary">₹{price22k.toLocaleString('en-IN')}</span> for 22K, and{" "}
        <span className="font-semibold text-primary">₹{price18k.toLocaleString('en-IN')}</span> for 18K (999 gold). Gold rates in {city} remain steady this year, with growing demand driven mainly by jewellery purchases, while coins and biscuits see lower interest, reflecting local market trends.
      </p>
    </div>
  );
};
