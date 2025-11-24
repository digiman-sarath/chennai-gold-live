import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp, MousePointer, Eye, BarChart3 } from 'lucide-react';
import { format, subDays } from 'date-fns';

interface Ad {
  id: string;
  title: string;
  impression_count: number;
  click_count: number;
  is_active: boolean;
}

interface AnalyticsData {
  date: string;
  impressions: number;
  clicks: number;
  ad_id: string;
  ad_title: string;
}

const AdAnalytics = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [selectedAd, setSelectedAd] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAds();
    fetchAnalytics();

    // Subscribe to real-time updates for ads table
    const adsChannel = supabase
      .channel('ads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ads'
        },
        (payload) => {
          console.log('Ads table changed:', payload);
          fetchAds(); // Refresh ads data
        }
      )
      .subscribe();

    // Subscribe to real-time updates for ad_analytics table
    const analyticsChannel = supabase
      .channel('analytics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ad_analytics'
        },
        (payload) => {
          console.log('Analytics table changed:', payload);
          fetchAnalytics(); // Refresh analytics data
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(adsChannel);
      supabase.removeChannel(analyticsChannel);
    };
  }, []);

  const fetchAds = async () => {
    const { data, error } = await supabase
      .from('ads')
      .select('id, title, impression_count, click_count, is_active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ads:', error);
      return;
    }

    setAds(data || []);
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd');

    const { data, error } = await supabase
      .from('ad_analytics')
      .select(`
        date,
        impressions,
        clicks,
        ad_id,
        ads (title)
      `)
      .gte('date', thirtyDaysAgo)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
      return;
    }

    const formattedData = (data || []).map((item: any) => ({
      date: format(new Date(item.date), 'MMM dd'),
      impressions: item.impressions,
      clicks: item.clicks,
      ad_id: item.ad_id,
      ad_title: item.ads?.title || 'Unknown',
    }));

    setAnalyticsData(formattedData);
    setLoading(false);
  };

  const getFilteredData = () => {
    if (selectedAd === 'all') {
      // Aggregate data by date for all ads
      const aggregated = analyticsData.reduce((acc: any[], item) => {
        const existing = acc.find(d => d.date === item.date);
        if (existing) {
          existing.impressions += item.impressions;
          existing.clicks += item.clicks;
        } else {
          acc.push({
            date: item.date,
            impressions: item.impressions,
            clicks: item.clicks,
          });
        }
        return acc;
      }, []);
      return aggregated;
    }
    return analyticsData.filter(d => d.ad_id === selectedAd);
  };

  const getTotalMetrics = () => {
    const filtered = selectedAd === 'all' ? ads : ads.filter(a => a.id === selectedAd);
    const totalImpressions = filtered.reduce((sum, ad) => sum + ad.impression_count, 0);
    const totalClicks = filtered.reduce((sum, ad) => sum + ad.click_count, 0);
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

    return { totalImpressions, totalClicks, ctr };
  };

  const metrics = getTotalMetrics();
  const chartData = getFilteredData();

  const chartConfig = {
    impressions: {
      label: 'Impressions',
      color: 'hsl(var(--primary))',
    },
    clicks: {
      label: 'Clicks',
      color: 'hsl(var(--accent))',
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Ad Performance Analytics</h2>
        <select
          value={selectedAd}
          onChange={(e) => setSelectedAd(e.target.value)}
          className="px-4 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="all">All Ads</option>
          {ads.map((ad) => (
            <option key={ad.id} value={ad.id}>
              {ad.title}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalImpressions.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalClicks.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.ctr}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="line" className="space-y-4">
        <TabsList>
          <TabsTrigger value="line">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="bar">
            <BarChart3 className="h-4 w-4 mr-2" />
            Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="line">
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="impressions"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--accent))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar">
          <Card>
            <CardHeader>
              <CardTitle>Daily Comparison (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="impressions" fill="hsl(var(--primary))" />
                    <Bar dataKey="clicks" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Individual Ad Performance Table */}
      {selectedAd === 'all' && (
        <Card>
          <CardHeader>
            <CardTitle>Ad Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Ad Title</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground">Impressions</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground">Clicks</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {ads.map((ad) => {
                    const ctr = ad.impression_count > 0 
                      ? ((ad.click_count / ad.impression_count) * 100).toFixed(2) 
                      : '0.00';
                    return (
                      <tr key={ad.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground">{ad.title}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            ad.is_active 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {ad.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-foreground">{ad.impression_count.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-foreground">{ad.click_count.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-foreground">{ctr}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdAnalytics;
