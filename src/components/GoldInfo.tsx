import { Card, CardContent } from '@/components/ui/card';
import { Shield, TrendingUp, Clock } from 'lucide-react';

const GoldInfo = () => {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Track Gold Rates in Chennai?</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-primary/20 shadow-elegant transition-all hover:shadow-gold">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Real-Time Updates</h3>
                <p className="text-muted-foreground">
                  Get the most accurate and up-to-date gold rates in Chennai. Our prices are updated daily to reflect current market conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 shadow-elegant transition-all hover:shadow-gold">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Trusted Source</h3>
                <p className="text-muted-foreground">
                  Chennai is one of India's major gold markets. We provide reliable pricing information for both 22K and 24K gold investments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 shadow-elegant transition-all hover:shadow-gold">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Plan Your Purchase</h3>
                <p className="text-muted-foreground">
                  Make informed decisions about when to buy gold. Track price trends and choose the best time for your investment.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 rounded-2xl bg-card p-8 shadow-elegant">
            <h3 className="mb-4 text-2xl font-bold text-foreground">Understanding Gold Purity</h3>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="mb-2 font-semibold text-foreground">22K Gold (91.67% Pure)</h4>
                <p>
                  22 karat gold contains 91.67% pure gold mixed with other metals for durability. It's commonly used for jewelry in India and is ideal for ornaments due to its balance of purity and strength.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-foreground">24K Gold (99.99% Pure)</h4>
                <p>
                  24 karat gold is the purest form, containing 99.99% gold. While softer than 22K, it's preferred for investment purposes like gold coins and bars. It's also used in electronics and medical applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldInfo;
