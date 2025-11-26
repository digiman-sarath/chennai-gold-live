import { getCitySpecificContent } from '@/lib/city-gold-content';

interface GoldRateSummaryProps {
  price24k: number;
  price22k: number;
  city?: string;
}

export const GoldRateSummary = ({ price24k, price22k, city = "Chennai" }: GoldRateSummaryProps) => {
  const summaryText = getCitySpecificContent(city, price24k, price22k);

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-3 text-foreground">TL;DR</h2>
      <p className="text-foreground/90 leading-relaxed">
        {summaryText}
      </p>
    </div>
  );
};
