import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PriceComparison {
  period: string;
  date: string;
  price22k: number;
  price24k: number;
  change22k: number;
  change24k: number;
  changePercent22k: number;
  changePercent24k: number;
}

export const GoldPriceComparison = () => {
  const [comparisons, setComparisons] = useState<PriceComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState<{ price22k: number; price24k: number } | null>(null);

  useEffect(() => {
    fetchComparisonData();
  }, []);

  const fetchComparisonData = async () => {
    try {
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      // Get today's price
      const { data: todayData } = await supabase
        .from('gold_prices')
        .select('price_22k_per_gram, price_24k_per_gram, date')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (!todayData) {
        setLoading(false);
        return;
      }

      setCurrentPrice({
        price22k: todayData.price_22k_per_gram,
        price24k: todayData.price_24k_per_gram
      });

      const comparisonsData: PriceComparison[] = [];

      // Get historical prices
      const periods = [
        { name: 'Last Week', date: oneWeekAgo },
        { name: 'Last Month', date: oneMonthAgo },
        { name: 'Last Year', date: oneYearAgo }
      ];

      for (const period of periods) {
        const { data: historicalData } = await supabase
          .from('gold_prices')
          .select('price_22k_per_gram, price_24k_per_gram, date')
          .lte('date', period.date.toISOString().split('T')[0])
          .order('date', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (historicalData) {
          const change22k = todayData.price_22k_per_gram - historicalData.price_22k_per_gram;
          const change24k = todayData.price_24k_per_gram - historicalData.price_24k_per_gram;
          const changePercent22k = (change22k / historicalData.price_22k_per_gram) * 100;
          const changePercent24k = (change24k / historicalData.price_24k_per_gram) * 100;

          comparisonsData.push({
            period: period.name,
            date: historicalData.date,
            price22k: historicalData.price_22k_per_gram,
            price24k: historicalData.price_24k_per_gram,
            change22k,
            change24k,
            changePercent22k,
            changePercent24k
          });
        }
      }

      setComparisons(comparisonsData);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChangeIndicator = (change: number, changePercent: number) => {
    const isPositive = change > 0;
    const isNeutral = change === 0;
    
    const colorClass = isNeutral 
      ? 'text-muted-foreground' 
      : isPositive 
        ? 'text-red-600 dark:text-red-400' 
        : 'text-green-600 dark:text-green-400';
    
    const Icon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

    return (
      <div className={`flex items-center gap-1 font-medium ${colorClass}`}>
        <Icon className="h-4 w-4" />
        <span>
          {isPositive ? '+' : ''}{change.toFixed(0)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </Card>
    );
  }

  if (!currentPrice || comparisons.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-4">Historical Price Comparison</h2>
      <p className="text-muted-foreground mb-6">
        Compare today's gold rates with previous periods to track price trends
      </p>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">Period</TableHead>
              <TableHead className="min-w-[100px]">Date</TableHead>
              <TableHead className="text-right min-w-[120px]">22K Gold</TableHead>
              <TableHead className="text-right min-w-[150px]">22K Change</TableHead>
              <TableHead className="text-right min-w-[120px]">24K Gold</TableHead>
              <TableHead className="text-right min-w-[150px]">24K Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-accent/50">
              <TableCell className="font-semibold">Today</TableCell>
              <TableCell className="text-muted-foreground">Current</TableCell>
              <TableCell className="text-right font-semibold text-primary">
                ₹{currentPrice.price22k.toLocaleString('en-IN')}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">-</TableCell>
              <TableCell className="text-right font-semibold text-primary">
                ₹{currentPrice.price24k.toLocaleString('en-IN')}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">-</TableCell>
            </TableRow>
            {comparisons.map((comparison, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{comparison.period}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(comparison.date).toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </TableCell>
                <TableCell className="text-right">
                  ₹{comparison.price22k.toLocaleString('en-IN')}
                </TableCell>
                <TableCell className="text-right">
                  {renderChangeIndicator(comparison.change22k, comparison.changePercent22k)}
                </TableCell>
                <TableCell className="text-right">
                  ₹{comparison.price24k.toLocaleString('en-IN')}
                </TableCell>
                <TableCell className="text-right">
                  {renderChangeIndicator(comparison.change24k, comparison.changePercent24k)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-red-600" />
            <span>Price increased</span>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <TrendingDown className="h-4 w-4 text-green-600" />
            <span>Price decreased</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
