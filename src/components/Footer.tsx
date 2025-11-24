import { Link } from 'react-router-dom';
import { MapPin, Mail, Calendar, TrendingUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const popularCities = [
    { name: 'Chennai', slug: 'chennai' },
    { name: 'Coimbatore', slug: 'coimbatore' },
    { name: 'Madurai', slug: 'madurai' },
    { name: 'Tiruchirappalli', slug: 'tiruchirappalli' },
    { name: 'Salem', slug: 'salem' },
    { name: 'Tirunelveli', slug: 'tirunelveli' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Rates', path: '/rates' },
  ];

  return (
    <footer className="bg-gradient-to-br from-muted/50 to-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent">
                <span className="text-lg sm:text-xl font-bold text-primary-foreground">TN</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-foreground leading-none">Tamil Nadu</span>
                <span className="text-xs text-muted-foreground leading-none">Gold Rates</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Get live and accurate gold rates across all districts of Tamil Nadu. Updated daily with real-time market data.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Daily Updates from GoldAPI.io</span>
            </div>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Popular Cities
            </h3>
            <ul className="space-y-2">
              {popularCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    to={`/gold-rates/${city.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Information
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Gold rates are sourced from GoldAPI.io and updated daily to provide accurate market prices.
              </p>
              <p>
                Covering all 38 districts of Tamil Nadu with detailed gold rate information.
              </p>
              <div className="pt-2">
                <span className="text-xs text-muted-foreground">
                  © {currentYear} Tamil Nadu Gold Rates. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <p>
              Disclaimer: Gold rates are indicative and may vary by jeweler. Always verify with your local jeweler before making a purchase.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs">Built with ❤️ for Tamil Nadu</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
