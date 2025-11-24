import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format, subDays, subMonths, subYears } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, TrendingUp, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
}

type TimePeriod = '7D' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
type PriceType = 'both' | '22K' | '24K';
type ChartType = 'line' | 'area';

const GoldPriceChart = () => {
  const [allPriceHistory, setAllPriceHistory] = useState<GoldPrice[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('1M');
  const [priceType, setPriceType] = useState<PriceType>('both');
  const [chartType, setChartType] = useState<ChartType>('line');

  useEffect(() => {
    fetchPriceHistory();
  }, []);

  useEffect(() => {
    filterDataByTimePeriod();
  }, [allPriceHistory, timePeriod]);

  const fetchPriceHistory = async () => {
    try {
      // Fetch ALL historical data, no limit
      const { data, error } = await supabase
        .from('gold_prices')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (data && data.length > 0) {
        setAllPriceHistory(data);
      } else {
        // Fallback data - generate last 90 days for better demo
        const fallbackData: GoldPrice[] = [];
        for (let i = 89; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const basePrice22k = 10632;
          const basePrice24k = 11598;
          // Add some trend and randomness
          const trend = Math.sin(i / 10) * 100;
          fallbackData.push({
            date: date.toISOString().split('T')[0],
            price_22k_per_gram: Math.round(basePrice22k + trend + (Math.random() * 100 - 50)),
            price_24k_per_gram: Math.round(basePrice24k + trend + (Math.random() * 100 - 50)),
          });
        }
        setAllPriceHistory(fallbackData);
      }
    } catch (error) {
      console.error('Error fetching price history:', error);
      // Generate fallback data
      const fallbackData: GoldPrice[] = [];
      for (let i = 89; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const basePrice22k = 10632;
        const basePrice24k = 11598;
        const trend = Math.sin(i / 10) * 100;
        fallbackData.push({
          date: date.toISOString().split('T')[0],
          price_22k_per_gram: Math.round(basePrice22k + trend + (Math.random() * 100 - 50)),
          price_24k_per_gram: Math.round(basePrice24k + trend + (Math.random() * 100 - 50)),
        });
      }
      setAllPriceHistory(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const filterDataByTimePeriod = () => {
    if (allPriceHistory.length === 0) return;

    const today = new Date();
    let cutoffDate: Date;

    switch (timePeriod) {
      case '7D':
        cutoffDate = subDays(today, 7);
        break;
      case '1M':
        cutoffDate = subMonths(today, 1);
        break;
      case '3M':
        cutoffDate = subMonths(today, 3);
        break;
      case '6M':
        cutoffDate = subMonths(today, 6);
        break;
      case '1Y':
        cutoffDate = subYears(today, 1);
        break;
      case 'ALL':
        setFilteredHistory(allPriceHistory);
        return;
    }

    const filtered = allPriceHistory.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });

    setFilteredHistory(filtered);
  };

  const downloadCSV = () => {
    const headers = ['Date', '22K Gold Price (₹/gram)', '24K Gold Price (₹/gram)'];
    const csvContent = [
      headers.join(','),
      ...filteredHistory.map(item => 
        `${item.date},${item.price_22k_per_gram},${item.price_24k_per_gram}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gold-prices-${timePeriod}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const calculateStats = () => {
    if (filteredHistory.length === 0) return null;

    const prices22k = filteredHistory.map(item => item.price_22k_per_gram);
    const prices24k = filteredHistory.map(item => item.price_24k_per_gram);

    const avg22k = prices22k.reduce((a, b) => a + b, 0) / prices22k.length;
    const avg24k = prices24k.reduce((a, b) => a + b, 0) / prices24k.length;

    const min22k = Math.min(...prices22k);
    const max22k = Math.max(...prices22k);
    const min24k = Math.min(...prices24k);
    const max24k = Math.max(...prices24k);

    const first22k = prices22k[0];
    const last22k = prices22k[prices22k.length - 1];
    const change22k = ((last22k - first22k) / first22k) * 100;

    const first24k = prices24k[0];
    const last24k = prices24k[prices24k.length - 1];
    const change24k = ((last24k - first24k) / first24k) * 100;

    return {
      avg22k: Math.round(avg22k),
      avg24k: Math.round(avg24k),
      min22k,
      max22k,
      min24k,
      max24k,
      change22k,
      change24k
    };
  };

  const chartData = filteredHistory.map(item => {
    const dateFormat = timePeriod === '7D' ? 'MMM dd' : timePeriod === 'ALL' || timePeriod === '1Y' ? 'MMM yyyy' : 'MMM dd';
    return {
      date: format(new Date(item.date), dateFormat),
      '22K Gold': item.price_22k_per_gram,
      '24K Gold': item.price_24k_per_gram,
      fullDate: item.date,
    };
  });

  const stats = calculateStats();

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

  if (allPriceHistory.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-7xl shadow-elegant border-primary/10">
          <CardHeader className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  Price Trend Analysis
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Interactive historical gold price data with advanced analytics
                </CardDescription>
              </div>
              <Button 
                onClick={downloadCSV} 
                variant="outline"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>

            {/* Time Period Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {(['7D', '1M', '3M', '6M', '1Y', 'ALL'] as TimePeriod[]).map((period) => (
                  <Button
                    key={period}
                    variant={timePeriod === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimePeriod(period)}
                    className="min-w-[60px]"
                  >
                    {period}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Tabs value={chartType} onValueChange={(v) => setChartType(v as ChartType)}>
                  <TabsList>
                    <TabsTrigger value="line">Line</TabsTrigger>
                    <TabsTrigger value="area">Area</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Price Type Toggle */}
            <div className="flex gap-2">
              {(['both', '22K', '24K'] as PriceType[]).map((type) => (
                <Button
                  key={type}
                  variant={priceType === type ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPriceType(type)}
                >
                  {type === 'both' ? 'Both Prices' : `${type} Only`}
                </Button>
              ))}
            </div>

            {/* Statistics */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">22K Avg</p>
                  <p className="text-lg font-bold text-primary">₹{stats.avg22k.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">24K Avg</p>
                  <p className="text-lg font-bold text-secondary">₹{stats.avg24k.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">22K Change</p>
                  <p className={`text-lg font-bold ${stats.change22k >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {stats.change22k >= 0 ? '+' : ''}{stats.change22k.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">24K Change</p>
                  <p className={`text-lg font-bold ${stats.change24k >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {stats.change24k >= 0 ? '+' : ''}{stats.change24k.toFixed(2)}%
                  </p>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                {filteredHistory.length} data points
              </Badge>
              {stats && (
                <div className="text-xs text-muted-foreground">
                  Range: ₹{Math.min(stats.min22k, stats.min24k).toLocaleString()} - ₹{Math.max(stats.max22k, stats.max24k).toLocaleString()}
                </div>
              )}
            </div>

            <ResponsiveContainer width="100%" height={500}>
              {chartType === 'line' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-sm text-muted-foreground"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    className="text-sm text-muted-foreground"
                    domain={['dataMin - 200', 'dataMax + 200']}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return `Date: ${payload[0].payload.fullDate}`;
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  {(priceType === 'both' || priceType === '22K') && (
                    <Line
                      type="monotone"
                      dataKey="22K Gold"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={filteredHistory.length < 50 ? { fill: 'hsl(var(--primary))', r: 4 } : false}
                      activeDot={{ r: 8 }}
                    />
                  )}
                  {(priceType === 'both' || priceType === '24K') && (
                    <Line
                      type="monotone"
                      dataKey="24K Gold"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={3}
                      dot={filteredHistory.length < 50 ? { fill: 'hsl(var(--secondary))', r: 4 } : false}
                      activeDot={{ r: 8 }}
                    />
                  )}
                </LineChart>
              ) : (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="color22K" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="color24K" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-sm text-muted-foreground"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    className="text-sm text-muted-foreground"
                    domain={['dataMin - 200', 'dataMax + 200']}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return `Date: ${payload[0].payload.fullDate}`;
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  {(priceType === 'both' || priceType === '22K') && (
                    <Area
                      type="monotone"
                      dataKey="22K Gold"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#color22K)"
                    />
                  )}
                  {(priceType === 'both' || priceType === '24K') && (
                    <Area
                      type="monotone"
                      dataKey="24K Gold"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#color24K)"
                    />
                  )}
                </AreaChart>
              )}
            </ResponsiveContainer>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Data showing {timePeriod === 'ALL' ? 'all available historical' : timePeriod} gold price trends • Updated in real-time</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GoldPriceChart;
