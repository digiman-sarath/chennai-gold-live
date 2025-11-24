import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ComprehensiveGoldGuide from '@/components/ComprehensiveGoldGuide';
import AdDisplay from '@/components/AdDisplay';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, TrendingDown, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
  updated_at: string;
}

type MetalType = 'gold' | 'silver' | 'platinum';

const ModernGoldRates = () => {
  const navigate = useNavigate();
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [previousPrice, setPreviousPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('gold');
  const [selectedCity, setSelectedCity] = useState('chennai');

  useEffect(() => {
    fetchPrices();
    
    const channel = supabase
      .channel('modern-gold-rates')
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
  }, []);

  const fetchPrices = async () => {
    try {
      // Get latest 2 prices to calculate change
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

  // Calculate 18K gold price (75% pure)
  const calculate18KPrice = (price24k: number) => {
    return Math.round(price24k * 0.75);
  };

  if (loading || !goldPrice) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-32" />
              <div className="h-12 bg-muted rounded w-64" />
              <div className="h-48 bg-muted rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const price24k = goldPrice.price_24k_per_gram;
  const price22k = goldPrice.price_22k_per_gram;
  const price18k = calculate18KPrice(price24k);

  const change24k = calculateChange(price24k, previousPrice?.price_24k_per_gram);
  const change22k = calculateChange(price22k, previousPrice?.price_22k_per_gram);
  const change18k = calculateChange(price18k, previousPrice ? calculate18KPrice(previousPrice.price_24k_per_gram) : undefined);

  return (
    <>
      <Header />
      
      {/* Top Banner Ad */}
      <AdDisplay position="top_banner" />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Gold Rates</span>
        </button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
          Gold Rate in Chennai
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-6">
          <Calendar className="h-4 w-4" />
          <time className="text-lg font-medium">
            {format(new Date(goldPrice.date), 'dd MMMM yyyy')}
          </time>
        </div>

        {/* Metal Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => setSelectedMetal('gold')}
            className={selectedMetal === 'gold' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-100 text-green-700 hover:bg-green-200'}
            size="sm"
          >
            Gold
          </Button>
          <Button
            onClick={() => setSelectedMetal('silver')}
            variant="outline"
            className={selectedMetal === 'silver' ? 'bg-accent' : 'bg-muted/30 border-muted'}
            size="sm"
            disabled
          >
            Silver
          </Button>
          <Button
            onClick={() => setSelectedMetal('platinum')}
            variant="outline"
            className={selectedMetal === 'platinum' ? 'bg-accent' : 'bg-muted/30 border-muted'}
            size="sm"
            disabled
          >
            Platinum
          </Button>
        </div>

        {/* City Selector */}
        <div className="mb-8">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-48 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="mumbai" disabled>Mumbai (Coming Soon)</SelectItem>
              <SelectItem value="delhi" disabled>Delhi (Coming Soon)</SelectItem>
              <SelectItem value="bangalore" disabled>Bangalore (Coming Soon)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        </div>

        {/* In-Content Ad */}
        <div className="container mx-auto px-6 my-8">
          <AdDisplay position="in_content" />
        </div>

        {/* Price Cards */}
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {/* 24K Gold */}
          <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900">
            <div className="space-y-3">
              <div className="text-lg font-semibold text-foreground">
                24K Gold <span className="text-sm font-normal text-muted-foreground">/g</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                ₹{price24k.toLocaleString('en-IN')}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${change24k.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change24k.isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {change24k.isPositive ? '+' : '-'} ₹{Math.round(change24k.amount)}
              </div>
            </div>
          </Card>

          {/* 22K Gold */}
          <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900">
            <div className="space-y-3">
              <div className="text-lg font-semibold text-foreground">
                22K Gold <span className="text-sm font-normal text-muted-foreground">/g</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                ₹{price22k.toLocaleString('en-IN')}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${change22k.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change22k.isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {change22k.isPositive ? '+' : '-'} ₹{Math.round(change22k.amount)}
              </div>
            </div>
          </Card>

          {/* 18K Gold */}
          <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900">
            <div className="space-y-3">
              <div className="text-lg font-semibold text-foreground">
                18K Gold <span className="text-sm font-normal text-muted-foreground">/g</span>
              </div>
              <div className="text-3xl font-bold text-foreground">
                ₹{price18k.toLocaleString('en-IN')}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${change18k.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change18k.isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {change18k.isPositive ? '+' : '-'} ₹{Math.round(change18k.amount)}
              </div>
            </div>
          </Card>
          </div>

          {/* Description */}
          <div className="text-muted-foreground leading-relaxed">
            <p>
              The price of gold in Chennai today is <strong className="text-foreground">₹{price24k.toLocaleString('en-IN')}</strong> per gram for 24 karat gold, <strong className="text-foreground">₹{price22k.toLocaleString('en-IN')}</strong> per gram for 22 karat gold and <strong className="text-foreground">₹{price18k.toLocaleString('en-IN')}</strong> per gram for 18 karat gold (also called 999 gold, 916 gold, and 750 gold respectively).
            </p>
            <button 
              onClick={() => navigate('/')}
              className="text-foreground font-medium underline mt-2 hover:text-primary transition-colors"
            >
              Read More...
            </button>
          </div>

          {/* Data Source Info */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Source: <strong className="text-primary">GoldAPI.io</strong> - Live Market Rates
              </span>
              <span className="text-muted-foreground">
                Updated: <strong className="text-foreground">{format(new Date(goldPrice.updated_at), 'h:mm a')}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive SEO Content */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <ComprehensiveGoldGuide city="Chennai" />
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <AdDisplay position="bottom_banner" />

      {/* Mobile Sticky Ad */}
      <AdDisplay position="mobile_sticky" />
      
      <Footer />
    </>
  );
};

export default ModernGoldRates;
