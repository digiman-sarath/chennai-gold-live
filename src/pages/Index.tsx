import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import GoldPriceHero from '@/components/GoldPriceHero';
import GoldPriceTable from '@/components/GoldPriceTable';
import GoldPriceChart from '@/components/GoldPriceChart';
import GoldInfo from '@/components/GoldInfo';
import GoldFAQ from '@/components/GoldFAQ';
import TamilNaduCities from '@/components/TamilNaduCities';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
  updated_at: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPrice();
    
    // Set up real-time subscription for SEO metadata updates
    const channel = supabase
      .channel('seo-updates')
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
        .limit(1)
        .single();

      if (error) throw error;
      setGoldPrice(data);
    } catch (error) {
      console.error('Error fetching gold price for SEO:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use actual gold price date or fallback to current date
  const displayDate = goldPrice 
    ? format(new Date(goldPrice.date), 'MMMM dd, yyyy')
    : format(new Date(), 'MMMM dd, yyyy');

  const price22k = goldPrice?.price_22k_per_gram.toLocaleString('en-IN') || 'N/A';
  const price24k = goldPrice?.price_24k_per_gram.toLocaleString('en-IN') || 'N/A';
  
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
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Today Gold Rate in Chennai - ${displayDate} | 22K ₹${price22k} & 24K ₹${price24k}`} />
        <meta property="og:description" content={`Live gold rates in Chennai updated daily from GoldAPI.io. 22K: ₹${price22k}/gram, 24K: ₹${price24k}/gram. Get current gold prices per gram.`} />
        <meta property="og:url" content="https://chennai-gold-rates.lovable.app" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Chennai Gold Rate ${displayDate} | 22K ₹${price22k} 24K ₹${price24k}`} />
        <meta name="twitter:description" content={`Live gold rates in Chennai updated from GoldAPI.io. 22K: ₹${price22k}, 24K: ₹${price24k} per gram.`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional SEO */}
        <link rel="canonical" href="https://chennai-gold-rates.lovable.app" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Chennai Gold Rates" />
        <meta name="last-modified" content={goldPrice?.updated_at || new Date().toISOString()} />
      </Helmet>

      <div className="fixed right-4 top-4 z-50 flex gap-2">
        <Button onClick={() => navigate('/rates')} variant="default" size="sm">
          Modern View
        </Button>
        <Button onClick={() => navigate('/auth')} variant="outline" size="sm">
          <Shield className="mr-2 h-4 w-4" />
          Admin Login
        </Button>
      </div>

      <main>
        <GoldPriceHero />
        <GoldPriceChart />
        <GoldPriceTable />
        <TamilNaduCities />
        <GoldInfo />
        <GoldFAQ />
      </main>
    </>
  );
};

export default Index;
