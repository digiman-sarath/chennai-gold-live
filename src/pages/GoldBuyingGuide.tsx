import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Calculator, Shield, TrendingDown, AlertCircle, CheckCircle, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const GoldBuyingGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Complete Gold Buying Guide 2024 - Purity, Making Charges, GST & Best Times | Chennai Gold Rates</title>
        <meta 
          name="description" 
          content="Expert gold buying guide covering purity hallmarks, making charge calculations, GST rates, best buying times, and tips to get the best value when purchasing gold jewelry in India."
        />
        <meta name="keywords" content="gold buying guide, gold purity check, hallmark gold, making charges, GST on gold, when to buy gold, gold purchasing tips, BIS hallmark" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Buy Gold Jewelry in India",
            "description": "Complete guide to buying gold jewelry including purity checking, understanding making charges, GST calculations, and timing your purchase",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Check Gold Purity",
                "text": "Verify BIS hallmark certification and karat stamp on gold jewelry to ensure purity"
              },
              {
                "@type": "HowToStep",
                "name": "Understand Making Charges",
                "text": "Calculate making charges which typically range from 6% to 25% of gold value depending on design complexity"
              },
              {
                "@type": "HowToStep",
                "name": "Factor in GST",
                "text": "Add 3% GST on gold value plus making charges to calculate total cost"
              }
            ]
          })}
        </script>
        
        <link rel="canonical" href="https://chennaigoldprice.com/buying-guide" />
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Expert Guide</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Complete Gold Buying Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know before buying gold jewelry - from checking purity to calculating final costs
          </p>
        </div>

        {/* Quick Summary */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            Quick Summary
          </h2>
          <ul className="space-y-2 text-foreground/90">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Always buy BIS hallmarked gold to ensure purity and authenticity</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Making charges typically range from 6% to 25% - negotiate for better rates</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Total GST is 3% on (gold value + making charges)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Best buying periods: Akshaya Tritiya, Dhanteras, post-wedding season (July-August)</span>
            </li>
          </ul>
        </Card>

        {/* Main Content Sections */}
        <div className="space-y-8">
          {/* Section 1: Gold Purity Checking */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">1. Checking Gold Purity</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Understanding Karat System</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-accent/10 border-accent/20">
                    <h4 className="font-semibold text-foreground mb-2">24K Gold (999)</h4>
                    <p className="text-sm text-muted-foreground">99.9% pure gold. Too soft for jewelry, mainly used for coins and bars.</p>
                  </Card>
                  <Card className="p-4 bg-primary/10 border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">22K Gold (916)</h4>
                    <p className="text-sm text-muted-foreground">91.6% pure gold. Most popular for jewelry in India. Good balance of purity and durability.</p>
                  </Card>
                  <Card className="p-4 bg-secondary/10 border-secondary/20">
                    <h4 className="font-semibold text-foreground mb-2">18K Gold (750)</h4>
                    <p className="text-sm text-muted-foreground">75% pure gold. More durable, used for intricate designs and studded jewelry.</p>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">BIS Hallmark Certification</h3>
                <p className="text-muted-foreground mb-4">
                  Since June 2021, BIS hallmarking is mandatory for gold jewelry in India. Here's what to look for:
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="hallmark-1">
                    <AccordionTrigger>What is BIS Hallmark?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        BIS (Bureau of Indian Standards) hallmark is a certification that guarantees the purity of gold. It includes:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                        <li>BIS logo</li>
                        <li>Purity grade (e.g., 916 for 22K)</li>
                        <li>Assaying and Hallmarking Centre's mark</li>
                        <li>Jeweller's identification mark</li>
                        <li>6-digit alphanumeric HUID (Hallmark Unique Identification)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="hallmark-2">
                    <AccordionTrigger>How to Verify Hallmark?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-muted-foreground">
                        <p><strong>Step 1:</strong> Look for the BIS logo on the jewelry piece</p>
                        <p><strong>Step 2:</strong> Check the purity number (916, 750, etc.)</p>
                        <p><strong>Step 3:</strong> Verify the 6-digit HUID using BIS Care app or website</p>
                        <p><strong>Step 4:</strong> Ensure the jeweler is BIS-certified (ask for certification)</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="hallmark-3">
                    <AccordionTrigger>Common Hallmark Frauds to Avoid</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Fake hallmark stamps - always verify HUID online</li>
                        <li>Hallmark on clasp only (entire piece should be hallmarked)</li>
                        <li>Mismatched purity - weight should match hallmark purity</li>
                        <li>Old stock without HUID (post-June 2021 jewelry must have HUID)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </Card>

          {/* Section 2: Making Charges */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">2. Understanding Making Charges</h2>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground">
                Making charges are fees charged by jewelers for crafting gold jewelry. They vary based on design complexity, brand, and negotiation.
              </p>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Typical Making Charge Ranges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <span className="font-medium">Simple chains & bangles</span>
                    <Badge variant="secondary">6% - 14%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <span className="font-medium">Medium complexity jewelry</span>
                    <Badge variant="secondary">15% - 20%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <span className="font-medium">Intricate designs & studded jewelry</span>
                    <Badge variant="secondary">20% - 25%+</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <span className="font-medium">Machine-made jewelry</span>
                    <Badge variant="secondary">8% - 12%</Badge>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Making Charge Calculation Example</h3>
                <div className="space-y-2 text-foreground/90">
                  <p><strong>Scenario:</strong> Buying a 10-gram 22K gold necklace</p>
                  <p>Gold rate: ₹6,500/gram</p>
                  <p>Making charge: 15%</p>
                  <hr className="my-3 border-border" />
                  <p>Gold value: 10g × ₹6,500 = <strong>₹65,000</strong></p>
                  <p>Making charges: ₹65,000 × 15% = <strong>₹9,750</strong></p>
                  <p className="text-lg font-semibold pt-2">Subtotal: ₹74,750</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tips to Reduce Making Charges</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Buy during festive sales and offers (Akshaya Tritiya, Diwali)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Choose simpler designs or machine-made jewelry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Negotiate - making charges are often flexible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Buy in bulk for better rates on making charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Consider exchange offers (old gold) - some jewelers waive making charges</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Section 3: GST Calculations */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">3. GST on Gold Jewelry</h2>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground">
                GST (Goods and Services Tax) on gold jewelry is 3% on the total value including making charges.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-accent/10 border-accent/20">
                  <h3 className="text-lg font-semibold text-foreground mb-3">GST Breakdown</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• GST on gold: <strong>3%</strong></li>
                    <li>• GST on making charges: <strong>5%</strong></li>
                    <li>• Effective GST: <strong>~3% on total</strong></li>
                  </ul>
                </Card>

                <Card className="p-6 bg-primary/10 border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Important Notes</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Always ask for GST invoice</li>
                    <li>• Invoice must have jeweler's GSTIN</li>
                    <li>• Required for resale/exchange</li>
                    <li>• Helps in claiming warranty</li>
                  </ul>
                </Card>
              </div>

              <div className="p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Complete Price Calculation</h3>
                <div className="space-y-2 text-foreground/90">
                  <p className="font-medium">Example: 10-gram 22K gold necklace</p>
                  <hr className="my-3 border-border" />
                  <p>Gold value: 10g × ₹6,500 = <strong>₹65,000</strong></p>
                  <p>Making charges (15%): ₹65,000 × 15% = <strong>₹9,750</strong></p>
                  <p>Subtotal: ₹65,000 + ₹9,750 = <strong>₹74,750</strong></p>
                  <p>GST (3%): ₹74,750 × 3% = <strong>₹2,243</strong></p>
                  <hr className="my-3 border-primary/30" />
                  <p className="text-xl font-bold text-primary">Final Price: ₹76,993</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <strong>Note:</strong> GST rates are subject to change. Always verify current rates with your jeweler and check the invoice carefully.
                </div>
              </div>
            </div>
          </Card>

          {/* Section 4: Best Times to Buy */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">4. Best Times to Buy Gold</h2>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground">
                Timing your gold purchase can save you money through both price fluctuations and special offers from jewelers.
              </p>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Auspicious Days & Festivals</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-5 bg-primary/5 border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">Akshaya Tritiya</h4>
                    <p className="text-sm text-muted-foreground mb-2">April/May - Most auspicious day for gold purchase</p>
                    <p className="text-xs text-muted-foreground">Jewelers offer special discounts and waive making charges</p>
                  </Card>
                  <Card className="p-5 bg-accent/5 border-accent/20">
                    <h4 className="font-semibold text-foreground mb-2">Dhanteras</h4>
                    <p className="text-sm text-muted-foreground mb-2">October/November - Day before Diwali</p>
                    <p className="text-xs text-muted-foreground">Major sales, discounts up to 25% on making charges</p>
                  </Card>
                  <Card className="p-5 bg-secondary/5 border-secondary/20">
                    <h4 className="font-semibold text-foreground mb-2">Diwali</h4>
                    <p className="text-sm text-muted-foreground mb-2">October/November</p>
                    <p className="text-xs text-muted-foreground">Extended festive offers and schemes</p>
                  </Card>
                  <Card className="p-5 bg-primary/5 border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">Pongal/Makar Sankranti</h4>
                    <p className="text-sm text-muted-foreground mb-2">January</p>
                    <p className="text-xs text-muted-foreground">Regional sales and special collections</p>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Price-Based Timing</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Post-Wedding Season (July-August)</h4>
                    <p className="text-sm text-muted-foreground">
                      Demand drops after peak wedding season, often leading to better deals and negotiation power
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">When Gold Prices Dip</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor daily gold rates and buy when prices drop. Use our price comparison tool to track trends.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">End of Financial Quarter</h4>
                    <p className="text-sm text-muted-foreground">
                      Jewelers often offer discounts to meet sales targets (March, June, September, December)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Gold Buying Schemes</h3>
                <p className="text-muted-foreground mb-4">
                  Many jewelers offer gold saving schemes where you can save monthly and get benefits:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">11-month scheme: Pay for 11 months, get 12th month free or discount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Zero making charges on maturity amount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Helps in planning big purchases like wedding jewelry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Read terms carefully - some schemes have restrictions</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Additional Tips */}
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Final Tips for Smart Gold Buying</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Do's
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Always buy BIS hallmarked gold</li>
                  <li>✓ Verify HUID on BIS website/app</li>
                  <li>✓ Get proper invoice with jeweler's GSTIN</li>
                  <li>✓ Weigh jewelry in front of you</li>
                  <li>✓ Compare prices across 3-4 jewelers</li>
                  <li>✓ Check return/exchange policy</li>
                  <li>✓ Keep all certificates safe</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Don'ts
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✗ Don't buy without hallmark certification</li>
                  <li>✗ Don't pay cash (always use digital payment for trail)</li>
                  <li>✗ Don't skip weighing the jewelry</li>
                  <li>✗ Don't accept jewelry without proper invoice</li>
                  <li>✗ Don't buy from uncertified jewelers</li>
                  <li>✗ Don't fall for "too good to be true" offers</li>
                  <li>✗ Don't ignore checking old gold purity during exchange</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Buy Gold?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Check today's live gold rates in Chennai and use our price comparison tool to make an informed decision
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/')}>
              Check Today's Gold Rates
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/gold-rates/chennai')}>
              View Detailed Analysis
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GoldBuyingGuide;
