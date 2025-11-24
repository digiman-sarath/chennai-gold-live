import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, TrendingUp, Calendar, RefreshCw, Database, Sparkles, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import GoldPriceChart from '@/components/GoldPriceChart';
import GoldPriceTable from '@/components/GoldPriceTable';
import GoldInfo from '@/components/GoldInfo';
import GoldFAQ from '@/components/GoldFAQ';
import TamilNaduCities from '@/components/TamilNaduCities';
import { formatDistanceToNow } from 'date-fns';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
  updated_at: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [previousPrice, setPreviousPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPrice();
    
    const channel = supabase
      .channel('homepage-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gold_prices'
        },
        () => {
          fetchLatestPrice();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLatestPrice = async () => {
    try {
      const { data, error } = await supabase
        .from('gold_prices')
        .select('*')
        .order('date', { ascending: false })
        .limit(2);

      if (error) throw error;
      
      if (data && data.length > 0) {
        setGoldPrice(data[0]);
        if (data.length > 1) {
          setPreviousPrice(data[1]);
        }
      }
    } catch (error) {
      console.error('Error fetching gold price:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateChange = (current: number, previous: number | undefined) => {
    if (!previous) return { amount: 0, isPositive: false };
    const change = current - previous;
    return {
      amount: Math.abs(change),
      isPositive: change > 0
    };
  };

  const displayDate = goldPrice 
    ? format(new Date(goldPrice.date), 'MMMM dd, yyyy')
    : format(new Date(), 'MMMM dd, yyyy');

  const price22k = goldPrice?.price_22k_per_gram.toLocaleString('en-IN') || 'N/A';
  const price24k = goldPrice?.price_24k_per_gram.toLocaleString('en-IN') || 'N/A';

  const change22k = goldPrice && previousPrice 
    ? calculateChange(goldPrice.price_22k_per_gram, previousPrice.price_22k_per_gram)
    : null;
  const change24k = goldPrice && previousPrice 
    ? calculateChange(goldPrice.price_24k_per_gram, previousPrice.price_24k_per_gram)
    : null;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Today Gold Rate in Chennai - ${displayDate}`,
    "description": `Live gold rates in Chennai updated daily from GoldAPI.io. Current 22K gold: ₹${price22k}/gram, 24K gold: ₹${price24k}/gram. Track gold price trends and make informed investment decisions.`,
    "url": "https://chennai-gold-rates.lovable.app",
    "dateModified": goldPrice?.updated_at || new Date().toISOString(),
    "mainEntity": {
      "@type": "Product",
      "name": "Gold Rate Chennai",
      "description": `Current gold prices in Chennai for 22K and 24K gold as of ${displayDate}`,
      "category": "Precious Metals",
      "offers": [
        {
          "@type": "Offer",
          "name": "22 Karat Gold",
          "price": goldPrice?.price_22k_per_gram || 0,
          "priceCurrency": "INR",
          "priceValidUntil": goldPrice?.date || new Date().toISOString().split('T')[0]
        },
        {
          "@type": "Offer",
          "name": "24 Karat Gold",
          "price": goldPrice?.price_24k_per_gram || 0,
          "priceCurrency": "INR",
          "priceValidUntil": goldPrice?.date || new Date().toISOString().split('T')[0]
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Today Gold Rate in Chennai - {displayDate} | Live 22K ₹{price22k} & 24K ₹{price24k} Prices</title>
        <meta 
          name="description" 
          content={`Current gold rate in Chennai today ${displayDate} from GoldAPI.io. Live 22K gold: ₹${price22k}/gram, 24K gold: ₹${price24k}/gram. Real-time updates for accurate gold price tracking in Chennai market.`}
        />
        <meta name="keywords" content={`gold rate chennai ${displayDate}, today gold price chennai, 22k gold rate ${price22k}, 24k gold rate ${price24k}, chennai gold price, gold rate today, live gold rates`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Today Gold Rate in Chennai - ${displayDate} | 22K ₹${price22k} & 24K ₹${price24k}`} />
        <meta property="og:description" content={`Live gold rates in Chennai updated daily from GoldAPI.io. 22K: ₹${price22k}/gram, 24K: ₹${price24k}/gram. Get current gold prices per gram.`} />
        <meta property="og:url" content="https://chennai-gold-rates.lovable.app" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Chennai Gold Rate ${displayDate} | 22K ₹${price22k} 24K ₹${price24k}`} />
        <meta name="twitter:description" content={`Live gold rates in Chennai updated from GoldAPI.io. 22K: ₹${price22k}, 24K: ₹${price24k} per gram.`} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        <link rel="canonical" href="https://chennai-gold-rates.lovable.app" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Chennai Gold Rates" />
        <meta name="last-modified" content={goldPrice?.updated_at || new Date().toISOString()} />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Chennai Gold Rates</h2>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/rates')} variant="ghost" size="sm">
              Modern View
            </Button>
            <Button onClick={() => navigate('/auth')} variant="outline" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5 py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12 animate-fade-in">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                  <TrendingUp className="h-4 w-4 animate-pulse" />
                  Live Gold Rates - Updated Daily
                </div>
                
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Today's Gold Rate in{' '}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                    Chennai
                  </span>
                </h1>
                
                {goldPrice && (
                  <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={goldPrice.date} className="font-medium">
                        {displayDate}
                      </time>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Database className="h-3.5 w-3.5 text-primary" />
                        <span>Source: <strong className="text-primary">GoldAPI.io</strong></span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5 text-primary" />
                        <span>Updated: <strong className="text-primary">
                          {formatDistanceToNow(new Date(goldPrice.updated_at), { addSuffix: true })}
                        </strong></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-40 bg-muted rounded-2xl" />
                    </div>
                  ))}
                </div>
              ) : goldPrice ? (
                <div className="grid md:grid-cols-2 gap-6 animate-scale-in">
                  {/* 22K Gold Card */}
                  <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 hover:border-primary/40 transition-all hover:shadow-2xl hover:shadow-primary/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-8">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          22 Karat Gold
                        </div>
                        {change22k && (
                          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                            change22k.isPositive ? 'bg-red-100 dark:bg-red-950 text-red-600' : 'bg-green-100 dark:bg-green-950 text-green-600'
                          }`}>
                            <TrendingUp className={`h-3 w-3 ${change22k.isPositive ? '' : 'rotate-180'}`} />
                            {change22k.isPositive ? '+' : '-'}₹{Math.round(change22k.amount)}
                          </div>
                        )}
                      </div>
                      <div className="mb-2 text-5xl md:text-6xl font-bold text-primary">
                        ₹{goldPrice.price_22k_per_gram.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-muted-foreground">per gram</div>
                    </div>
                  </Card>

                  {/* 24K Gold Card */}
                  <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-accent/5 border-accent/20 hover:border-accent/40 transition-all hover:shadow-2xl hover:shadow-accent/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-8">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          24 Karat Gold
                        </div>
                        {change24k && (
                          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                            change24k.isPositive ? 'bg-red-100 dark:bg-red-950 text-red-600' : 'bg-green-100 dark:bg-green-950 text-green-600'
                          }`}>
                            <TrendingUp className={`h-3 w-3 ${change24k.isPositive ? '' : 'rotate-180'}`} />
                            {change24k.isPositive ? '+' : '-'}₹{Math.round(change24k.amount)}
                          </div>
                        )}
                      </div>
                      <div className="mb-2 text-5xl md:text-6xl font-bold text-accent">
                        ₹{goldPrice.price_24k_per_gram.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-muted-foreground">per gram</div>
                    </div>
                  </Card>
                </div>
              ) : null}

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/gold-rates/chennai')}
                  size="lg"
                  className="group"
                >
                  View Detailed Rates
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  onClick={() => navigate('/rates')}
                  variant="outline"
                  size="lg"
                >
                  Compare Cities
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Price Chart Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Price Trend Analysis</h2>
              <GoldPriceChart />
            </div>
          </div>
        </section>

        {/* Price Breakdown Table */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <GoldPriceTable />
          </div>
        </section>

        {/* Tamil Nadu Cities */}
        <TamilNaduCities />

        {/* Gold Info */}
        <GoldInfo />

        {/* FAQ Section */}
        <GoldFAQ />

        {/* Footer */}
        <footer className="bg-muted/30 border-t border-border py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2025 Chennai Gold Rates. All rights reserved.</p>
            <p className="mt-2">Live gold prices powered by GoldAPI.io</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
