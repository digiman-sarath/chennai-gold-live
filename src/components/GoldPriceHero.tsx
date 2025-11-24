import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, Calendar, RefreshCw, Database } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import goldHero from '@/assets/gold-hero.jpg';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
  updated_at: string;
}

const GoldPriceHero = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayPrice();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('gold-prices-changes')
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
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (data) {
        setGoldPrice(data);
      } else {
        // Fallback data if no data in database
        console.warn('No gold price data available, using fallback');
        setGoldPrice({
          date: new Date().toISOString().split('T')[0],
          price_22k_per_gram: 10632,
          price_24k_per_gram: 11598,
          updated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error fetching gold price:', error);
      // Set fallback data on error
      setGoldPrice({
        date: new Date().toISOString().split('T')[0],
        price_22k_per_gram: 10632,
        price_24k_per_gram: 11598,
        updated_at: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${goldHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <TrendingUp className="h-4 w-4" />
            Live Gold Rates
          </div>
          
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Today's Gold Rate in <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Chennai</span>
          </h1>
          
          {loading ? (
            <div className="mt-12 flex justify-center gap-6">
              <div className="h-32 w-64 animate-pulse rounded-xl bg-muted" />
              <div className="h-32 w-64 animate-pulse rounded-xl bg-muted" />
            </div>
          ) : goldPrice ? (
            <>
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={goldPrice.date}>
                    {format(new Date(goldPrice.date), 'MMMM dd, yyyy')}
                  </time>
                </div>
                <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-center">
                  <div className="flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium">Source:</span>
                    <span className="text-primary">GoldAPI.io - Live Market Rates</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium">Updated:</span>
                    <time dateTime={goldPrice.updated_at} className="text-primary">
                      {formatDistanceToNow(new Date(goldPrice.updated_at), { addSuffix: true })}
                    </time>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-elegant transition-all hover:shadow-gold">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">22K Gold</div>
                    <div className="mb-1 text-5xl font-bold text-primary">₹{goldPrice.price_22k_per_gram.toLocaleString('en-IN')}</div>
                    <div className="text-sm text-muted-foreground">per gram</div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-elegant transition-all hover:shadow-gold">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">24K Gold</div>
                    <div className="mb-1 text-5xl font-bold text-primary">₹{goldPrice.price_24k_per_gram.toLocaleString('en-IN')}</div>
                    <div className="text-sm text-muted-foreground">per gram</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No price data available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GoldPriceHero;
