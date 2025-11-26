import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { formatISTDate } from '@/lib/date-utils';

interface MonthlyData {
  month: string;
  year: number;
  prices: Array<{
    date: string;
    price_22k_per_gram: number;
    price_24k_per_gram: number;
  }>;
  avgPrice22k: number;
  avgPrice24k: number;
  minPrice22k: number;
  maxPrice22k: number;
}

interface MonthlyPriceHistoryProps {
  city: string;
}

const MONTHS = [
  'November', 'October', 'September', 'August', 'July', 'June',
  'May', 'April', 'March', 'February', 'January'
];

export const MonthlyPriceHistory = ({ city }: MonthlyPriceHistoryProps) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMonths, setOpenMonths] = useState<string[]>(['November']);

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    const { data, error } = await supabase
      .from('gold_prices')
      .select('date, price_22k_per_gram, price_24k_per_gram')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching monthly data:', error);
      setLoading(false);
      return;
    }

    if (data) {
      const grouped: Record<string, any[]> = {};
      
      data.forEach(price => {
        const date = new Date(price.date);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        
        if (!grouped[monthYear]) {
          grouped[monthYear] = [];
        }
        grouped[monthYear].push(price);
      });

      const monthlyArray: MonthlyData[] = Object.entries(grouped).map(([monthYear, prices]) => {
        const [month, year] = monthYear.split(' ');
        const prices22k = prices.map(p => p.price_22k_per_gram);
        const prices24k = prices.map(p => p.price_24k_per_gram);
        
        return {
          month,
          year: parseInt(year),
          prices,
          avgPrice22k: Math.round(prices22k.reduce((a, b) => a + b, 0) / prices22k.length),
          avgPrice24k: Math.round(prices24k.reduce((a, b) => a + b, 0) / prices24k.length),
          minPrice22k: Math.min(...prices22k),
          maxPrice22k: Math.max(...prices22k)
        };
      });

      setMonthlyData(monthlyArray);
    }
    setLoading(false);
  };

  const toggleMonth = (monthYear: string) => {
    setOpenMonths(prev =>
      prev.includes(monthYear)
        ? prev.filter(m => m !== monthYear)
        : [...prev, monthYear]
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historical Price of Gold Rate in {city}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="historical-price">
      <CardHeader>
        <CardTitle>Historical Price of Gold Rate in {city}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {monthlyData.map((data) => {
          const monthYear = `${data.month} ${data.year}`;
          const isOpen = openMonths.includes(monthYear);
          
          return (
            <Collapsible
              key={monthYear}
              open={isOpen}
              onOpenChange={() => toggleMonth(monthYear)}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    <span className="font-semibold">Gold Price Movement in {city}, {monthYear}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg: ₹{data.avgPrice22k.toLocaleString('en-IN')} (22K)
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 space-y-4 bg-card">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">22K Average</div>
                      <div className="text-lg font-semibold">₹{data.avgPrice22k.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">24K Average</div>
                      <div className="text-lg font-semibold">₹{data.avgPrice24k.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">22K Min</div>
                      <div className="text-lg font-semibold">₹{data.minPrice22k.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">22K Max</div>
                      <div className="text-lg font-semibold">₹{data.maxPrice22k.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Date</th>
                          <th className="text-right py-2 px-2">22K (₹/g)</th>
                          <th className="text-right py-2 px-2">24K (₹/g)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.prices.slice(0, 10).map((price) => (
                          <tr key={price.date} className="border-b hover:bg-muted/30">
                            <td className="py-2 px-2">{formatISTDate(price.date, 'dd MMM')}</td>
                            <td className="text-right py-2 px-2">₹{price.price_22k_per_gram.toLocaleString('en-IN')}</td>
                            <td className="text-right py-2 px-2">₹{price.price_24k_per_gram.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
};
