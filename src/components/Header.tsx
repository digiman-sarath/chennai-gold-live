import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, TrendingDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface GoldPrice {
  price_22k_per_gram: number;
  price_24k_per_gram: number;
  updated_at: string;
}

const Header = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [previousPrice, setPreviousPrice] = useState<GoldPrice | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrices();
    
    const channel = supabase
      .channel('header-gold-prices')
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
          price_22k_per_gram: 10632,
          price_24k_per_gram: 11598,
          updated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error fetching gold prices:', error);
      // Set fallback data on error
      setGoldPrice({
        price_22k_per_gram: 10632,
        price_24k_per_gram: 11598,
        updated_at: new Date().toISOString()
      });
    }
  };

  const calculateChange = (current: number, previous: number | undefined) => {
    if (!previous) return { isPositive: false, percentage: 0 };
    const change = current - previous;
    const percentage = (change / previous) * 100;
    return {
      isPositive: change > 0,
      percentage: Math.abs(percentage)
    };
  };

  const change22k = goldPrice && previousPrice 
    ? calculateChange(goldPrice.price_22k_per_gram, previousPrice.price_22k_per_gram)
    : { isPositive: false, percentage: 0 };

  const change24k = goldPrice && previousPrice
    ? calculateChange(goldPrice.price_24k_per_gram, previousPrice.price_24k_per_gram)
    : { isPositive: false, percentage: 0 };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buying Guide', path: '/buying-guide' },
    { name: 'All Rates', path: '/rates' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Live Gold Price Ticker */}
      {goldPrice && (
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-primary/20">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center gap-6 text-sm overflow-x-auto">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold text-foreground">22K:</span>
                <span className="text-primary font-bold">₹{goldPrice.price_22k_per_gram.toLocaleString('en-IN')}</span>
                <span className={`flex items-center gap-1 text-xs ${change22k.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {change22k.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {change22k.percentage.toFixed(2)}%
                </span>
              </div>
              
              <div className="hidden sm:block h-4 w-px bg-border" />
              
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold text-foreground">24K:</span>
                <span className="text-primary font-bold">₹{goldPrice.price_24k_per_gram.toLocaleString('en-IN')}</span>
                <span className={`flex items-center gap-1 text-xs ${change24k.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {change24k.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {change24k.percentage.toFixed(2)}%
                </span>
              </div>

              <div className="hidden md:block h-4 w-px bg-border" />
              
              <span className="hidden md:inline text-xs text-muted-foreground whitespace-nowrap">
                Live Updates
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="text-xl font-bold text-primary-foreground">CG</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-none">Chennai Gold</span>
              <span className="text-xs text-muted-foreground leading-none">Price</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher />
            <Button
              onClick={() => navigate('/rates')}
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Check Rates
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button
                    onClick={() => {
                      navigate('/rates');
                      setMobileMenuOpen(false);
                    }}
                    className="mx-4"
                  >
                    Check Rates
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
