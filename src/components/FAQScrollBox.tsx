import { HelpCircle, MessageCircleQuestion, Users, Search, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FAQItem } from '@/lib/faq-schema';

interface FAQScrollBoxProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  city?: string;
}

const FAQScrollBox = ({ faqs, title, subtitle, city = "Chennai" }: FAQScrollBoxProps) => {
  return (
    <section className="content-section bg-gradient-to-b from-muted/30 to-background" id="faq-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <header className="mb-8 sm:mb-12 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 mb-4">
              <HelpCircle className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 px-4 leading-tight">
              {title || `${city} Gold Rate FAQs - Common Questions Answered`}
            </h2>
            <p className="readable-text max-w-3xl mx-auto px-4">
              {subtitle || `Find comprehensive answers to frequently asked questions about gold rates, investment strategies, purity verification, and buying tips in ${city}. These FAQs address real user queries and popular search intents.`}
            </p>
          </header>

          {/* FAQ Categories Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>Price Related</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-sm font-medium text-secondary">
              <Search className="h-4 w-4" />
              <span>Buying Guide</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-sm font-medium text-accent-foreground">
              <Users className="h-4 w-4" />
              <span>People Also Ask</span>
            </div>
          </div>

          {/* Scrollable FAQ Grid */}
          <div 
            className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-2 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar"
            role="list"
            aria-label="Frequently Asked Questions"
          >
            {faqs.map((faq, index) => (
              <Card 
                key={index}
                className="faq-card group p-5 sm:p-6 bg-card hover:bg-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                role="listitem"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <MessageCircleQuestion className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {faq.question}
                    </h3>
                    <p className="readable-text text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* People Also Ask Section */}
          <div className="mt-10 p-6 sm:p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">People Also Ask About {city} Gold</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-card/50 rounded-xl">
                <Search className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">What is the current gold rate per gram in {city}?</p>
                  <p className="text-xs text-muted-foreground">Live 22K and 24K gold prices updated daily from reliable market sources.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card/50 rounded-xl">
                <Search className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">Is today a good day to buy gold in {city}?</p>
                  <p className="text-xs text-muted-foreground">Compare historical trends and market analysis for informed decisions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card/50 rounded-xl">
                <Search className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">Where to buy BIS hallmarked gold in {city}?</p>
                  <p className="text-xs text-muted-foreground">Find certified jewelers offering authentic hallmarked gold jewelry.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card/50 rounded-xl">
                <Search className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">How to calculate gold price with making charges?</p>
                  <p className="text-xs text-muted-foreground">Use our calculator for accurate total cost including GST and charges.</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Intent CTA */}
          <div className="mt-8 text-center">
            <p className="readable-text">
              <strong className="text-foreground">Still have questions about {city} gold rates?</strong>{' '}
              Our comprehensive guides cover everything from purity verification to investment strategies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQScrollBox;
