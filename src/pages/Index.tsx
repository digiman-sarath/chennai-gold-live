import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import GoldPriceHero from '@/components/GoldPriceHero';
import GoldPriceTable from '@/components/GoldPriceTable';
import GoldPriceChart from '@/components/GoldPriceChart';
import GoldInfo from '@/components/GoldInfo';
import GoldFAQ from '@/components/GoldFAQ';

const Index = () => {
  const navigate = useNavigate();
  const today = format(new Date(), 'MMMM dd, yyyy');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Today Gold Rate in Chennai - ${today}`,
    "description": "Live gold rates in Chennai updated daily. Get current 22K and 24K gold prices per gram. Track gold price trends and make informed investment decisions.",
    "url": "https://chennai-gold-rates.lovable.app",
    "mainEntity": {
      "@type": "Product",
      "name": "Gold Rate Chennai",
      "description": "Current gold prices in Chennai for 22K and 24K gold",
      "category": "Precious Metals"
    }
  };

  return (
    <>
      <Helmet>
        <title>Today Gold Rate in Chennai - {today} | Live 22K & 24K Gold Prices</title>
        <meta 
          name="description" 
          content={`Current gold rate in Chennai today ${today}. Live updates for 22 carat and 24 carat gold prices per gram. Track daily gold price changes in Chennai market.`}
        />
        <meta name="keywords" content="gold rate chennai, today gold price chennai, 22k gold rate, 24k gold rate, chennai gold price, gold rate today" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Today Gold Rate in Chennai - ${today}`} />
        <meta property="og:description" content="Live gold rates in Chennai updated daily. Get current 22K and 24K gold prices per gram." />
        <meta property="og:url" content="https://chennai-gold-rates.lovable.app" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Today Gold Rate in Chennai - ${today}`} />
        <meta name="twitter:description" content="Live gold rates in Chennai updated daily. Get current 22K and 24K gold prices per gram." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Additional SEO */}
        <link rel="canonical" href="https://chennai-gold-rates.lovable.app" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Chennai Gold Rates" />
      </Helmet>

      <div className="fixed right-4 top-4 z-50">
        <Button onClick={() => navigate('/auth')} variant="outline" size="sm">
          <Shield className="mr-2 h-4 w-4" />
          Admin Login
        </Button>
      </div>

      <main>
        <GoldPriceHero />
        <GoldPriceChart />
        <GoldPriceTable />
        <GoldInfo />
        <GoldFAQ />
      </main>
    </>
  );
};

export default Index;
