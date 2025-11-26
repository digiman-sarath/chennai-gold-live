import { useState, useEffect } from 'react';
import { getCitySpecificContent } from '@/lib/city-gold-content';

interface GoldRateSummaryProps {
  price24k: number;
  price22k: number;
  city?: string;
}

export const GoldRateSummary = ({ price24k, price22k, city = "Chennai" }: GoldRateSummaryProps) => {
  const [summaryText, setSummaryText] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const content = await getCitySpecificContent(city, price24k, price22k);
      setSummaryText(content);
      setLoading(false);
    };

    fetchContent();
  }, [city, price24k, price22k]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3 text-foreground">TL;DR</h2>
        <div className="h-16 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-3 text-foreground">TL;DR</h2>
      <p className="text-foreground/90 leading-relaxed">
        {summaryText}
      </p>
    </div>
  );
};
