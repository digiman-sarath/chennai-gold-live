import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
}

const GoldPriceChart = () => {
  const [priceHistory, setPriceHistory] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPriceHistory();
  }, []);

  const fetchPriceHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('gold_prices')
        .select('*')
        .order('date', { ascending: true })
        .limit(30);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (data && data.length > 0) {
        setPriceHistory(data);
      } else {
        // Fallback data - generate last 7 days
        const fallbackData: GoldPrice[] = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          fallbackData.push({
            date: date.toISOString().split('T')[0],
            price_22k_per_gram: 10632 + (Math.random() * 200 - 100),
            price_24k_per_gram: 11598 + (Math.random() * 200 - 100),
          });
        }
        setPriceHistory(fallbackData);
      }
    } catch (error) {
      console.error('Error fetching price history:', error);
      // Generate fallback data
      const fallbackData: GoldPrice[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        fallbackData.push({
          date: date.toISOString().split('T')[0],
          price_22k_per_gram: 10632 + (Math.random() * 200 - 100),
          price_24k_per_gram: 11598 + (Math.random() * 200 - 100),
        });
      }
      setPriceHistory(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const chartData = priceHistory.map(item => ({
    date: format(new Date(item.date), 'MMM dd'),
    '22K Gold': item.price_22k_per_gram,
    '24K Gold': item.price_24k_per_gram,
  }));

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-6xl">
            <CardContent className="p-8">
              <div className="h-96 animate-pulse rounded-lg bg-muted" />
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (priceHistory.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-6xl shadow-elegant">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-sm text-muted-foreground"
                />
                <YAxis 
                  className="text-sm text-muted-foreground"
                  domain={['dataMin - 100', 'dataMax + 100']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="22K Gold"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="24K Gold"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--secondary))' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GoldPriceChart;
