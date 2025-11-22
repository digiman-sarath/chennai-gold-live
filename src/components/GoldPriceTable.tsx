import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
}

const weights = [
  { label: '1 Gram', grams: 1 },
  { label: '8 Grams (1 Sovereign)', grams: 8 },
  { label: '10 Grams', grams: 10 },
  { label: '100 Grams', grams: 100 },
];

const GoldPriceTable = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);

  useEffect(() => {
    fetchTodayPrice();
    
    const channel = supabase
      .channel('gold-prices-table')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gold_prices'
        },
        () => {
          fetchTodayPrice();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTodayPrice = async () => {
    try {
      const { data, error } = await supabase
        .from('gold_prices')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      setGoldPrice(data);
    } catch (error) {
      console.error('Error fetching gold price:', error);
    }
  };

  if (!goldPrice) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-4xl shadow-elegant">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">Gold Price Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-4 text-left font-semibold text-foreground">Weight</th>
                    <th className="pb-4 text-right font-semibold text-foreground">22K Gold</th>
                    <th className="pb-4 text-right font-semibold text-foreground">24K Gold</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((weight) => (
                    <tr key={weight.grams} className="border-b transition-colors hover:bg-muted/50">
                      <td className="py-4 font-medium text-foreground">{weight.label}</td>
                      <td className="py-4 text-right font-semibold text-primary">
                        ₹{(goldPrice.price_22k_per_gram * weight.grams).toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 text-right font-semibold text-primary">
                        ₹{(goldPrice.price_24k_per_gram * weight.grams).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GoldPriceTable;
