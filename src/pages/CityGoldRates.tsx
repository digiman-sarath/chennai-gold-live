import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, TrendingDown, TrendingUp, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import GoldPriceChart from '@/components/GoldPriceChart';
import GoldPriceTable from '@/components/GoldPriceTable';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
  updated_at: string;
}

interface CityInfo {
  name: string;
  description: string;
  marketInfo: string;
  popularAreas: string[];
  highlights: string[];
}

const cityData: Record<string, CityInfo> = {
  chennai: {
    name: 'Chennai',
    description: 'Chennai, the capital of Tamil Nadu, is one of India\'s major gold markets. The city\'s T Nagar, George Town, and Sowcarpet areas are renowned for their extensive gold jewelry collections and competitive pricing.',
    marketInfo: 'Chennai\'s gold market is characterized by traditional temple jewelry, antique designs, and contemporary collections. Major areas like T Nagar house numerous established jewelers including GRT, Lalitha Jewellery, and Prince Jewellery.',
    popularAreas: ['T Nagar', 'George Town', 'Sowcarpet', 'Mylapore', 'Anna Salai'],
    highlights: ['Major gold trading hub', 'Temple jewelry specialist', 'Competitive pricing', 'Established jewelers']
  },
  coimbatore: {
    name: 'Coimbatore',
    description: 'Coimbatore, the textile capital of South India, has a thriving gold market with a strong tradition of jewelry craftsmanship. The city is known for quality gold ornaments and traditional South Indian designs.',
    marketInfo: 'Coimbatore\'s gold market is concentrated in areas like RS Puram, Town Hall, and Oppanakara Street. The city is famous for traditional South Indian gold jewelry and has several multi-generational jewelers.',
    popularAreas: ['RS Puram', 'Town Hall', 'Oppanakara Street', 'Cross Cut Road', 'Brooke Bond'],
    highlights: ['Traditional craftsmanship', 'South Indian designs', 'Family-owned jewelers', 'Quality assurance']
  },
  erode: {
    name: 'Erode',
    description: 'Erode, strategically located in western Tamil Nadu, has a growing gold market serving the agricultural heartland. The city offers both traditional and contemporary gold jewelry with competitive rates.',
    marketInfo: 'Erode\'s gold market has seen significant growth with modern showrooms complementing traditional jewelry shops. The city\'s central location makes it a convenient gold shopping destination for surrounding districts.',
    popularAreas: ['Brough Road', 'Bazaar Street', 'Rangampalayam', 'Perundurai Road'],
    highlights: ['Growing market', 'Competitive pricing', 'Modern showrooms', 'Agricultural hub advantage']
  },
  salem: {
    name: 'Salem',
    description: 'Salem, known as the "Steel City," also has a prominent position in Tamil Nadu\'s gold market. The city offers a mix of traditional and modern gold jewelry with excellent craftsmanship.',
    marketInfo: 'Salem\'s jewelry market is known for trustworthy dealers and quality gold ornaments. Cherry Road and Bazaar areas house numerous gold shops offering both traditional South Indian and contemporary designs.',
    popularAreas: ['Cherry Road', 'Bazaar Street', 'Fort Main Road', 'Five Roads'],
    highlights: ['Trusted dealers', 'Quality ornaments', 'Traditional & modern mix', 'Steel city prestige']
  },
  madurai: {
    name: 'Madurai',
    description: 'Madurai, the temple city, has a rich tradition in gold jewelry deeply connected to its cultural heritage. The city is famous for temple jewelry and traditional South Indian gold ornaments.',
    marketInfo: 'Madurai\'s gold market thrives around the famous Meenakshi Temple area. Town Hall Road, Avani Moola Street, and West Masi Street are major jewelry shopping destinations known for authentic temple jewelry.',
    popularAreas: ['Town Hall Road', 'Avani Moola Street', 'West Masi Street', 'North Masi Street'],
    highlights: ['Temple jewelry capital', 'Cultural heritage', 'Authentic designs', 'Religious significance']
  },
  trichy: {
    name: 'Trichy',
    description: 'Tiruchirappalli (Trichy), with its strategic central location, is an important gold market in Tamil Nadu. The city combines traditional values with modern shopping experiences.',
    marketInfo: 'Trichy\'s gold market is concentrated in areas like Big Bazaar Street, China Bazaar, and NSB Road. The city is known for reliable jewelers and a good mix of traditional temple jewelry and contemporary designs.',
    popularAreas: ['Big Bazaar Street', 'China Bazaar', 'NSB Road', 'Thillai Nagar'],
    highlights: ['Central location', 'Reliable jewelers', 'Temple & modern jewelry', 'Historic market']
  }
};

const CityGoldRates = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [previousPrice, setPreviousPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);

  const cityInfo = city ? cityData[city.toLowerCase()] : cityData.chennai;
  const cityName = cityInfo?.name || 'Chennai';

  useEffect(() => {
    fetchPrices();
    
    const channel = supabase
      .channel(`city-gold-${city}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gold_prices'
        },
        () => {
          fetchPrices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [city]);

  const fetchPrices = async () => {
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
      console.error('Error fetching gold prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateChange = (current: number, previous: number | undefined) => {
    if (!previous) return { amount: 0, percentage: 0, isPositive: false };
    const change = current - previous;
    const percentage = (change / previous) * 100;
    return {
      amount: Math.abs(change),
      percentage: Math.abs(percentage),
      isPositive: change > 0
    };
  };

  const calculate18KPrice = (price24k: number) => {
    return Math.round(price24k * 0.75);
  };

  const handleCityChange = (newCity: string) => {
    navigate(`/gold-rates/${newCity}`);
  };

  if (loading || !goldPrice || !cityInfo) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="h-12 bg-muted rounded w-64" />
            <div className="h-48 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  const price24k = goldPrice.price_24k_per_gram;
  const price22k = goldPrice.price_22k_per_gram;
  const price18k = calculate18KPrice(price24k);

  const change24k = calculateChange(price24k, previousPrice?.price_24k_per_gram);
  const change22k = calculateChange(price22k, previousPrice?.price_22k_per_gram);
  const change18k = calculateChange(price18k, previousPrice ? calculate18KPrice(previousPrice.price_24k_per_gram) : undefined);

  const displayDate = format(new Date(goldPrice.date), 'MMMM dd, yyyy');

  return (
    <>
      <Helmet>
        <title>Gold Rate in {cityName} Today - {displayDate} | 22K ₹{price22k.toLocaleString('en-IN')} & 24K ₹{price24k.toLocaleString('en-IN')}</title>
        <meta 
          name="description" 
          content={`Current gold rate in ${cityName} today ${displayDate}. Live 22K gold: ₹${price22k.toLocaleString('en-IN')}/gram, 24K gold: ₹${price24k.toLocaleString('en-IN')}/gram. Get accurate ${cityName} gold prices with daily updates from GoldAPI.io.`}
        />
        <meta name="keywords" content={`gold rate ${cityName.toLowerCase()}, ${cityName} gold price today, 22k gold ${cityName}, 24k gold ${cityName}, gold rate today ${cityName}, ${cityName} jewellery rates`} />
        
        <meta property="og:title" content={`${cityName} Gold Rate Today - ${displayDate} | Live Prices`} />
        <meta property="og:description" content={`Live gold rates in ${cityName}. 22K: ₹${price22k.toLocaleString('en-IN')}, 24K: ₹${price24k.toLocaleString('en-IN')} per gram.`} />
        
        <meta name="twitter:title" content={`${cityName} Gold Rate ${displayDate}`} />
        <meta name="twitter:description" content={`22K: ₹${price22k.toLocaleString('en-IN')}, 24K: ₹${price24k.toLocaleString('en-IN')}/gram`} />
        
        <link rel="canonical" href={`https://chennai-gold-rates.lovable.app/gold-rates/${city}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-6xl p-6">
          {/* Header */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Gold Rate in {cityName} Today
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time className="text-lg font-medium">
                {displayDate}
              </time>
            </div>
          </div>

          {/* City Selector */}
          <div className="mb-8 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <Select value={city} onValueChange={handleCityChange}>
              <SelectTrigger className="w-64 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="coimbatore">Coimbatore</SelectItem>
                <SelectItem value="erode">Erode</SelectItem>
                <SelectItem value="salem">Salem</SelectItem>
                <SelectItem value="madurai">Madurai</SelectItem>
                <SelectItem value="trichy">Trichy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="space-y-3">
                <div className="text-lg font-semibold text-foreground">
                  24K Gold <span className="text-sm font-normal text-muted-foreground">/gram</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  ₹{price24k.toLocaleString('en-IN')}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${change24k.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {change24k.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {change24k.isPositive ? '+' : '-'} ₹{Math.round(change24k.amount)} ({change24k.percentage.toFixed(2)}%)
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <div className="space-y-3">
                <div className="text-lg font-semibold text-foreground">
                  22K Gold <span className="text-sm font-normal text-muted-foreground">/gram</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  ₹{price22k.toLocaleString('en-IN')}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${change22k.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {change22k.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {change22k.isPositive ? '+' : '-'} ₹{Math.round(change22k.amount)} ({change22k.percentage.toFixed(2)}%)
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <div className="space-y-3">
                <div className="text-lg font-semibold text-foreground">
                  18K Gold <span className="text-sm font-normal text-muted-foreground">/gram</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  ₹{price18k.toLocaleString('en-IN')}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${change18k.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {change18k.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {change18k.isPositive ? '+' : '-'} ₹{Math.round(change18k.amount)} ({change18k.percentage.toFixed(2)}%)
                </div>
              </div>
            </Card>
          </div>

          {/* City Description */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">About {cityName} Gold Market</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">{cityInfo.description}</p>
              <p className="leading-relaxed">{cityInfo.marketInfo}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Popular Gold Shopping Areas</h3>
                  <ul className="space-y-2">
                    {cityInfo.popularAreas.map((area, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Market Highlights</h3>
                  <ul className="space-y-2">
                    {cityInfo.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Price History Chart */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Price History - {cityName}</h2>
            <GoldPriceChart />
          </div>

          {/* Price Breakdown Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Gold Price Breakdown - {cityName}</h2>
            <GoldPriceTable />
          </div>

          {/* Data Source Info */}
          <Card className="p-4 bg-muted/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">
                Source: <strong className="text-primary">GoldAPI.io</strong> - Live Market Rates
              </span>
              <span className="text-muted-foreground">
                Last Updated: <strong className="text-foreground">{format(new Date(goldPrice.updated_at), 'h:mm a, MMM dd')}</strong>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CityGoldRates;
