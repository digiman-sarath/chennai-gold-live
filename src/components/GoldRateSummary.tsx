import { getISTDateForSEO } from '@/lib/date-utils';

interface GoldRateSummaryProps {
  price24k: number;
  price22k: number;
  city?: string;
}

const summaryVariations = [
  (city: string, price24k: string, price22k: string, price18k: string, date: string) =>
    `The live gold price in ${city} today (${date}) is ${price24k} per gram for 24K, ${price22k} for 22K, and ${price18k} for 18K. Rates remain steady, driven by strong jewellery buying trends and reduced interest in gold coins and biscuits.`,
  
  (city: string, price24k: string, price22k: string, price18k: string, date: string) =>
    `${city}'s gold market today shows consistent pricing, with 24K at ${price24k}, 22K at ${price22k}, and 18K at ${price18k}. Jewellery demand continues to rise steadily, while gold biscuits and coins witness comparatively lower traction due to evolving consumer preferences.`,
  
  (city: string, price24k: string, price22k: string, price18k: string, date: string) =>
    `Today's live gold rate in ${city} (${date}) stands at ${price24k} for 24K, ${price22k} for 22K, and ${price18k} for 18K. Market stability reflects strong jewellery purchases, with significantly reduced buyer focus on gold coins and investment-grade biscuits.`,
  
  (city: string, price24k: string, price22k: string, price18k: string, date: string) =>
    `The ${city} gold rate today is ${price24k} for 24K, ${price22k} for 22K, and ${price18k} for 18K. Annual price trends show steady movement, supported primarily by jewellery demand, while gold biscuits and coins experience noticeably weaker market interest.`,
  
  (city: string, price24k: string, price22k: string, price18k: string, date: string) =>
    `Gold prices in ${city} today (${date}) remain stable at ${price24k} for 24K, ${price22k} for 22K, and ${price18k} for 18K. Consumer behaviour reflects stronger jewellery-related buying, with coins and biscuits seeing lower appeal across the local gold market.`
];

export const GoldRateSummary = ({ price24k, price22k, city = "Chennai" }: GoldRateSummaryProps) => {
  const price18k = Math.round(price24k * 0.75);
  const currentDate = getISTDateForSEO();
  
  // Format prices with rupee symbol
  const formattedPrice24k = `₹${price24k.toLocaleString('en-IN')}`;
  const formattedPrice22k = `₹${price22k.toLocaleString('en-IN')}`;
  const formattedPrice18k = `₹${price18k.toLocaleString('en-IN')}`;
  
  // Select a random variation
  const randomIndex = Math.floor(Math.random() * summaryVariations.length);
  const selectedVariation = summaryVariations[randomIndex];
  const summaryText = selectedVariation(city, formattedPrice24k, formattedPrice22k, formattedPrice18k, currentDate);

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-3 text-foreground">TL;DR</h2>
      <p className="text-foreground/90 leading-relaxed">
        {summaryText}
      </p>
    </div>
  );
};
