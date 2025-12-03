import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { formatISTDate, getISTDateForSEO } from '@/lib/date-utils';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, TrendingUp, Calendar, RefreshCw, Database, Sparkles, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import GoldPriceTable from '@/components/GoldPriceTable';
import GoldInfo from '@/components/GoldInfo';
import GoldFAQ, { goldFAQData } from '@/components/GoldFAQ';
import RecentArticles from '@/components/RecentArticles';
import TamilNaduCities from '@/components/TamilNaduCities';
import ComprehensiveGoldGuide from '@/components/ComprehensiveGoldGuide';
import AdDisplay from '@/components/AdDisplay';
import { formatDistanceToNow } from 'date-fns';
import { GoldRateSummary } from '@/components/GoldRateSummary';
import { GoldPriceComparison } from '@/components/GoldPriceComparison';
import { Last10DaysTable } from '@/components/Last10DaysTable';
import { AverageGoldRateComparison } from '@/components/AverageGoldRateComparison';
import { MonthlyPriceHistory } from '@/components/MonthlyPriceHistory';
import { generateFAQSchema } from '@/lib/faq-schema';
import BlogSection from '@/components/BlogSection';

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

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (data && data.length > 0) {
        setGoldPrice(data[0]);
        if (data.length > 1) {
          setPreviousPrice(data[1]);
        }
      } else {
        // Fallback data
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

  const calculateChange = (current: number, previous: number | undefined) => {
    if (!previous) return { amount: 0, isPositive: false };
    const change = current - previous;
    return {
      amount: Math.abs(change),
      isPositive: change > 0
    };
  };

  const displayDate = goldPrice 
    ? formatISTDate(goldPrice.date)
    : formatISTDate(new Date());
  
  const seoDate = getISTDateForSEO();

  const price22k = goldPrice?.price_22k_per_gram.toLocaleString('en-IN') || 'N/A';
  const price24k = goldPrice?.price_24k_per_gram.toLocaleString('en-IN') || 'N/A';

  const change22k = goldPrice && previousPrice 
    ? calculateChange(goldPrice.price_22k_per_gram, previousPrice.price_22k_per_gram)
    : null;
  const change24k = goldPrice && previousPrice 
    ? calculateChange(goldPrice.price_24k_per_gram, previousPrice.price_24k_per_gram)
    : null;
  
  // Generate FAQ schema from actual FAQ content
  const faqStructuredData = generateFAQSchema(goldFAQData);

  const sitelinkSearchBoxData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://chennaigoldprice.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://chennaigoldprice.com/gold-rates/{city}"
      },
      "query-input": "required name=city"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://chennaigoldprice.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Chennai Gold Rates",
        "item": "https://chennaigoldprice.com/gold-rates/chennai"
      }
    ]
  };

  const productData22k = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "22 Karat Gold",
    "description": `22 Karat gold rate in Chennai - ${price22k} per gram as of ${displayDate}`,
    "category": "Precious Metals",
    "image": "https://chennaigoldprice.com/gold-hero.jpg",
    "brand": {
      "@type": "Brand",
      "name": "Chennai Gold Market"
    },
    "offers": {
      "@type": "Offer",
      "price": goldPrice?.price_22k_per_gram || 0,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": goldPrice?.date || new Date().toISOString().split('T')[0],
      "url": "https://chennaigoldprice.com",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7
      }
    }
  };

  const productData24k = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "24 Karat Gold",
    "description": `24 Karat gold rate in Chennai - ${price24k} per gram as of ${displayDate}`,
    "category": "Precious Metals",
    "image": "https://chennaigoldprice.com/gold-hero.jpg",
    "brand": {
      "@type": "Brand",
      "name": "Chennai Gold Market"
    },
    "offers": {
      "@type": "Offer",
      "price": goldPrice?.price_24k_per_gram || 0,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": goldPrice?.date || new Date().toISOString().split('T')[0],
      "url": "https://chennaigoldprice.com",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7
      }
    }
  };

  const goldPriceData = {
    "@context": "https://schema.org",
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": goldPrice?.price_22k_per_gram || 0,
    "name": "Gold Rate Chennai",
    "description": `Current gold price in Chennai for ${displayDate}`
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{`Chennai Gold Rate ${seoDate} 22K₹${price22k} 24K₹${price24k}`}</title>
        <meta
          name="description" 
          content={`Current gold rate in Chennai today ${displayDate} from GoldAPI.io. Live 22K gold: ₹${price22k}/gram, 24K gold: ₹${price24k}/gram. Real-time updates for accurate gold price tracking in Chennai market.`}
        />
        <meta name="keywords" content={`gold rate chennai ${displayDate}, today gold price chennai, 22k gold rate ${price22k}, 24k gold rate ${price24k}, chennai gold price, gold rate today, live gold rates`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Today Gold Rate in Chennai - ${displayDate} | 22K ₹${price22k} & 24K ₹${price24k}`} />
        <meta property="og:description" content={`Live gold rates in Chennai updated daily from GoldAPI.io. 22K: ₹${price22k}/gram, 24K: ₹${price24k}/gram. Get current gold prices per gram.`} />
        <meta property="og:url" content="https://chennaigoldprice.com" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Chennai Gold Rate ${displayDate} | 22K ₹${price22k} 24K ₹${price24k}`} />
        <meta name="twitter:description" content={`Live gold rates in Chennai updated from GoldAPI.io. 22K: ₹${price22k}, 24K: ₹${price24k} per gram.`} />
        
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(sitelinkSearchBoxData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productData22k)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productData24k)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(goldPriceData)}
        </script>
        
        <link rel="canonical" href="https://chennaigoldprice.com" />
        <link rel="alternate" hrefLang="en" href="https://chennaigoldprice.com" />
        <link rel="alternate" hrefLang="x-default" href="https://chennaigoldprice.com" />
        {/* Add Tamil version when available: <link rel="alternate" hrefLang="ta" href="https://chennaigoldprice.com/ta" /> */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Chennai Gold Price" />
        <meta name="last-modified" content={goldPrice?.updated_at || new Date().toISOString()} />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Top Banner Ad */}
      <div className="bg-background py-2 sm:py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AdDisplay position="top_banner" />
        </div>
      </div>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-8 sm:mb-12 animate-fade-in">
                <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary border border-primary/20">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
                  Live Gold Rates - Updated Daily
                </div>
                
                <h1 className="seo-h1 text-foreground px-4 mb-4">
                  Today Gold Rate in{' '}
                  <span className="seo-h1-keywords animate-gradient">
                    Chennai
                  </span>
                  {' '}- Live 22K & 24K Gold Price Per Gram
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

              {/* TL;DR Summary - Bottom of Hero */}
              {goldPrice && (
                <div className="mt-12">
                  <GoldRateSummary 
                    price24k={goldPrice.price_24k_per_gram} 
                    price22k={goldPrice.price_22k_per_gram}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Historical Price Comparison */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GoldPriceComparison />
          </div>
        </section>

        {/* Last 10 Days Table */}
        <section id="last-10-days" className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Last10DaysTable city="Chennai" />
          </div>
        </section>

        {/* Average Gold Rate Comparison */}
        <section id="average-comparison" className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AverageGoldRateComparison city="Chennai" />
          </div>
        </section>

        {/* Monthly Price History */}
        <section id="historical-price" className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <MonthlyPriceHistory city="Chennai" />
          </div>
        </section>

        {/* In-Content Ad */}
        <div className="container mx-auto px-4 py-4">
          <AdDisplay position="in_content" />
        </div>

        {/* Price Breakdown Table */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GoldPriceTable />
            
            <div className="max-w-4xl mx-auto mt-8 p-4 sm:p-6 bg-card rounded-xl shadow-elegant border border-border">
              <p className="text-sm sm:text-base text-muted-foreground text-center">
                <strong className="text-foreground">Explore More:</strong> <a href="/gold-rates/tirunelveli" className="text-primary hover:underline font-medium mx-2">Tirunelveli Gold Rates</a> | <a href="/gold-rates/vellore" className="text-primary hover:underline font-medium mx-2">Vellore Gold Prices</a> | <a href="/gold-rates/erode" className="text-primary hover:underline font-medium mx-2">Erode Gold Rates</a> | <a href="https://www.india.gov.in" target="_blank" rel="nofollow noopener noreferrer" className="text-primary hover:underline font-medium mx-2">India.gov.in<span className="sr-only"> (opens in new tab)</span></a> | <a href="https://goldprice.org" target="_blank" rel="nofollow noopener noreferrer" className="text-primary hover:underline font-medium mx-2">Global Gold Price<span className="sr-only"> (opens in new tab)</span></a>
              </p>
            </div>
          </div>
        </section>

        {/* Tamil Nadu Cities */}
        <TamilNaduCities />

        {/* Comprehensive Content - 5000+ words */}
        <section className="bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <ComprehensiveGoldGuide city="Chennai" />
            </div>
          </div>
        </section>

        {/* Gold Info */}
        <GoldInfo />

        {/* Quick Link to Buying Guide */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">New to Gold Buying?</h2>
              <p className="text-muted-foreground mb-6">
                Learn everything about gold purity, making charges, GST calculations, and the best times to buy gold
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/buying-guide')}
                className="group"
              >
                Read Complete Buying Guide
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <GoldFAQ />

        {/* Recent Articles */}
        <RecentArticles />

        {/* Latest Blog Posts */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BlogSection title="Latest Gold Rate Insights" limit={6} />
          </div>
        </section>

        {/* Bottom Banner Ad */}
        <div className="bg-muted/30 py-4 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AdDisplay position="bottom_banner" />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Ad */}
      <AdDisplay position="mobile_sticky" />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
