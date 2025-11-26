import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatISTDate } from '@/lib/date-utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
}

interface Last10DaysTableProps {
  city: string;
}

export const Last10DaysTable = ({ city }: Last10DaysTableProps) => {
  const [prices, setPrices] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLast10Days();
  }, []);

  const fetchLast10Days = async () => {
    const { data, error } = await supabase
      .from('gold_prices')
      .select('date, price_22k_per_gram, price_24k_per_gram')
      .order('date', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching prices:', error);
    } else if (data) {
      setPrices(data);
    }
    setLoading(false);
  };

  const calculateChange = (current: number, previous: number) => {
    const diff = current - previous;
    const percentChange = ((diff / previous) * 100).toFixed(2);
    return { diff, percentChange };
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gold Rate in {city} for Last 10 Days (1 gram)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="last-10-days">
      <CardHeader>
        <CardTitle>Gold Rate in {city} for Last 10 Days (1 gram)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-right py-3 px-4">22K Gold (₹/g)</th>
                <th className="text-right py-3 px-4">Change</th>
                <th className="text-right py-3 px-4">24K Gold (₹/g)</th>
                <th className="text-right py-3 px-4">Change</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => {
                const prevPrice = prices[index + 1];
                const change22k = prevPrice ? calculateChange(price.price_22k_per_gram, prevPrice.price_22k_per_gram) : null;
                const change24k = prevPrice ? calculateChange(price.price_24k_per_gram, prevPrice.price_24k_per_gram) : null;

                return (
                  <tr key={price.date} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">
                      {formatISTDate(price.date, 'dd MMM yyyy')}
                    </td>
                    <td className="text-right py-3 px-4">
                      ₹{price.price_22k_per_gram.toLocaleString('en-IN')}
                    </td>
                    <td className="text-right py-3 px-4">
                      {change22k ? (
                        <span className={`flex items-center justify-end gap-1 ${change22k.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change22k.diff >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {change22k.diff >= 0 ? '+' : ''}{change22k.diff.toFixed(0)} ({change22k.percentChange}%)
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-right py-3 px-4">
                      ₹{price.price_24k_per_gram.toLocaleString('en-IN')}
                    </td>
                    <td className="text-right py-3 px-4">
                      {change24k ? (
                        <span className={`flex items-center justify-end gap-1 ${change24k.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change24k.diff >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {change24k.diff >= 0 ? '+' : ''}{change24k.diff.toFixed(0)} ({change24k.percentChange}%)
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
