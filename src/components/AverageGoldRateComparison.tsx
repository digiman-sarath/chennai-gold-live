import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AverageGoldRateComparisonProps {
  city: string;
}

export const AverageGoldRateComparison = ({ city }: AverageGoldRateComparisonProps) => {
  const [averages, setAverages] = useState({
    week: { price22k: 0, price24k: 0 },
    month: { price22k: 0, price24k: 0 },
    quarter: { price22k: 0, price24k: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAverages();
  }, []);

  const fetchAverages = async () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

    // Fetch week average
    const { data: weekData } = await supabase
      .from('gold_prices')
      .select('price_22k_per_gram, price_24k_per_gram')
      .gte('date', weekAgo.toISOString().split('T')[0])
      .order('date', { ascending: false });

    // Fetch month average
    const { data: monthData } = await supabase
      .from('gold_prices')
      .select('price_22k_per_gram, price_24k_per_gram')
      .gte('date', monthAgo.toISOString().split('T')[0])
      .order('date', { ascending: false });

    // Fetch quarter average
    const { data: quarterData } = await supabase
      .from('gold_prices')
      .select('price_22k_per_gram, price_24k_per_gram')
      .gte('date', quarterAgo.toISOString().split('T')[0])
      .order('date', { ascending: false });

    const calculateAverage = (data: any[]) => {
      if (!data || data.length === 0) return { price22k: 0, price24k: 0 };
      const sum22k = data.reduce((acc, item) => acc + item.price_22k_per_gram, 0);
      const sum24k = data.reduce((acc, item) => acc + item.price_24k_per_gram, 0);
      return {
        price22k: Math.round(sum22k / data.length),
        price24k: Math.round(sum24k / data.length)
      };
    };

    setAverages({
      week: calculateAverage(weekData || []),
      month: calculateAverage(monthData || []),
      quarter: calculateAverage(quarterData || [])
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compare Average Gold Rate in {city} for 22K & 24K (1 gram)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="average-comparison">
      <CardHeader>
        <CardTitle>Compare Average Gold Rate in {city} for 22K & 24K (1 gram)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Period</th>
                <th className="text-right py-3 px-4">22K Gold Avg (₹/g)</th>
                <th className="text-right py-3 px-4">24K Gold Avg (₹/g)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Last 7 Days</td>
                <td className="text-right py-3 px-4">₹{averages.week.price22k.toLocaleString('en-IN')}</td>
                <td className="text-right py-3 px-4">₹{averages.week.price24k.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Last 30 Days</td>
                <td className="text-right py-3 px-4">₹{averages.month.price22k.toLocaleString('en-IN')}</td>
                <td className="text-right py-3 px-4">₹{averages.month.price24k.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">Last 90 Days</td>
                <td className="text-right py-3 px-4">₹{averages.quarter.price22k.toLocaleString('en-IN')}</td>
                <td className="text-right py-3 px-4">₹{averages.quarter.price24k.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
