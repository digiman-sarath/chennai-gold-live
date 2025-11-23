import { Card, CardContent } from '@/components/ui/card';
import { Shield, TrendingUp, Clock, Target, LineChart, Coins, Calculator, MapPin, Users, Award } from 'lucide-react';

const GoldInfo = () => {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Today Gold Rate in Chennai - Your Complete Guide</h2>
          
          <div className="grid gap-8 md:grid-cols-3 mb-12">
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

          <article className="space-y-8 mb-12">
            <div className="rounded-2xl bg-card p-8 shadow-elegant">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Understanding Gold Prices in Chennai</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Chennai, the capital city of Tamil Nadu, has long been recognized as one of India's premier gold markets. The city's rich cultural heritage and traditional affinity for gold jewelry make it a significant hub for gold trading in South India. Today's gold rate in Chennai is influenced by various factors including international gold prices, currency exchange rates, local demand and supply, and various taxes and duties imposed by the government.
                </p>
                <p>
                  Gold has been an integral part of Indian culture for centuries, symbolizing prosperity, purity, and auspiciousness. In Chennai, gold holds special significance during weddings, festivals, and religious ceremonies. The city's jewelry markets in areas like T Nagar, George Town, and Sowcarpet are renowned across the country for their exquisite craftsmanship and competitive pricing.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-elegant">
              <h3 className="mb-4 text-2xl font-bold text-foreground flex items-center gap-3">
                <Coins className="h-7 w-7 text-primary" />
                Understanding Gold Purity - 22K vs 24K Gold
              </h3>
              <div className="space-y-6 text-muted-foreground">
                <div className="border-l-4 border-primary pl-6">
                  <h4 className="mb-3 text-xl font-semibold text-foreground">22 Karat Gold (91.67% Pure)</h4>
                  <p className="mb-3">
                    22 karat gold contains 91.67% pure gold mixed with other metals like copper, silver, or zinc for added durability and strength. This composition makes it ideal for crafting intricate jewelry designs that require structural integrity. The addition of alloy metals gives 22K gold its characteristic hardness, making it less prone to scratches and deformation during daily wear.
                  </p>
                  <p className="mb-3">
                    In Chennai's jewelry market, 22K gold is the preferred choice for traditional South Indian jewelry including temple jewelry, antique designs, and bridal collections. The slightly lower gold content allows jewelers to create elaborate pieces with fine details that would be impossible with pure 24K gold due to its softness.
                  </p>
                  <p>
                    When purchasing 22K gold jewelry in Chennai, always verify the hallmark certification from the Bureau of Indian Standards (BIS). This ensures you're getting authentic 22 karat gold and protects you from fraud. The making charges for 22K jewelry typically range from 8% to 25% depending on the complexity of the design.
                  </p>
                </div>
                
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="mb-3 text-xl font-semibold text-foreground">24 Karat Gold (99.99% Pure)</h4>
                  <p className="mb-3">
                    24 karat gold represents the purest form of gold available, containing 99.99% pure gold with minimal to no alloy metals. This makes it the preferred choice for investment purposes such as gold coins, bars, and biscuits. Due to its high purity, 24K gold has a distinctive bright yellow color that's highly valued by investors and collectors.
                  </p>
                  <p className="mb-3">
                    While 24K gold is too soft for everyday jewelry, it's extensively used in investment products and certain ceremonial jewelry pieces. In Chennai, reputable jewelers and banks offer certified 24K gold coins and bars that serve as excellent investment instruments. These products come with proper documentation and certification, ensuring their authenticity and resale value.
                  </p>
                  <p>
                    For investors in Chennai looking to diversify their portfolio, 24K gold offers excellent liquidity and can be easily sold or exchanged. The price of 24K gold is typically higher than 22K gold per gram due to its higher purity level. When investing in 24K gold, always purchase from authorized dealers and keep all documentation for future transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-elegant">
              <h3 className="mb-4 text-2xl font-bold text-foreground flex items-center gap-3">
                <LineChart className="h-7 w-7 text-primary" />
                Factors Influencing Gold Rates in Chennai
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The gold rate in Chennai today is determined by a complex interplay of global and local factors. Understanding these factors can help you make informed decisions about when to buy or sell gold.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-foreground mb-2">International Gold Prices</h5>
                    <p className="text-sm">Global gold prices set by the London Bullion Market Association (LBMA) directly impact Chennai's local rates. Fluctuations in international markets are immediately reflected in the local pricing.</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-foreground mb-2">US Dollar Exchange Rate</h5>
                    <p className="text-sm">Since gold is traded internationally in US dollars, the INR-USD exchange rate significantly affects gold prices in Chennai. A weaker rupee typically leads to higher gold prices.</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-foreground mb-2">Import Duties and GST</h5>
                    <p className="text-sm">Government policies on import duties and Goods and Services Tax (GST) directly impact retail gold prices. Currently, gold attracts 3% GST in India along with applicable import duties.</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-foreground mb-2">Local Demand and Supply</h5>
                    <p className="text-sm">Chennai's gold market experiences seasonal demand variations, especially during wedding seasons and festivals like Akshaya Tritiya, Diwali, and Pongal, which can temporarily affect local prices.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-elegant">
              <h3 className="mb-4 text-2xl font-bold text-foreground flex items-center gap-3">
                <MapPin className="h-7 w-7 text-primary" />
                Best Places to Buy Gold in Chennai
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Chennai offers numerous reputable locations for purchasing gold, each with its own unique advantages and specialties. Here are the most popular gold shopping destinations in the city:
                </p>
                <div className="space-y-3">
                  <div className="border-b border-border pb-3">
                    <h5 className="font-semibold text-foreground mb-1">T Nagar (Thyagaraya Nagar)</h5>
                    <p className="text-sm">Known as the shopping hub of Chennai, T Nagar houses numerous established jewelry stores including GRT, Lalitha Jewellery, and Prince Jewellery. This area is famous for competitive pricing and wide variety.</p>
                  </div>
                  <div className="border-b border-border pb-3">
                    <h5 className="font-semibold text-foreground mb-1">George Town</h5>
                    <p className="text-sm">One of Chennai's oldest commercial areas, George Town is home to traditional jewelers specializing in South Indian designs. This area is ideal for those seeking authentic temple jewelry and antique pieces.</p>
                  </div>
                  <div className="border-b border-border pb-3">
                    <h5 className="font-semibold text-foreground mb-1">Sowcarpet</h5>
                    <p className="text-sm">A historic trading area known for wholesale and retail gold business. Many traditional jewelers here have been serving customers for generations, offering both traditional and contemporary designs.</p>
                  </div>
                  <div className="border-b border-border pb-3">
                    <h5 className="font-semibold text-foreground mb-1">Mount Road (Anna Salai)</h5>
                    <p className="text-sm">Home to several premium jewelry showrooms including Tanishq, Joyalukkas, and Malabar Gold. This area is preferred for branded jewelry with standardized pricing and quality certification.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-elegant">
              <h3 className="mb-4 text-2xl font-bold text-foreground flex items-center gap-3">
                <Calculator className="h-7 w-7 text-primary" />
                How to Calculate Gold Price in Chennai
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Understanding how to calculate the final price of gold jewelry is essential for making informed purchases. The total cost includes several components beyond just the base gold rate:
                </p>
                <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                  <p><strong className="text-foreground">Base Gold Price:</strong> Current rate per gram × Weight of gold in grams</p>
                  <p><strong className="text-foreground">Making Charges:</strong> Typically 8-25% of base gold price (varies by design complexity)</p>
                  <p><strong className="text-foreground">GST (3%):</strong> Applied on (Base Gold Price + Making Charges)</p>
                  <p><strong className="text-foreground">Stone Charges:</strong> If applicable, for jewelry with precious or semi-precious stones</p>
                  <p className="pt-3 border-t border-border"><strong className="text-foreground">Final Price = Base Gold Price + Making Charges + GST + Stone Charges</strong></p>
                </div>
                <p className="mt-4">
                  Always ask for a detailed bill that breaks down all these charges. Reputable jewelers in Chennai provide transparent pricing with clear itemization of all costs. Don't hesitate to negotiate making charges, especially on higher-value purchases.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-elegant">
              <h3 className="mb-4 text-2xl font-bold text-foreground flex items-center gap-3">
                <Target className="h-7 w-7 text-primary" />
                Investment Tips for Gold Buyers in Chennai
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Investing in gold requires careful planning and knowledge. Here are essential tips for Chennai-based investors:
                </p>
                <ul className="space-y-3 list-none">
                  <li className="flex gap-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Always verify BIS Hallmark:</strong> Ensure your jewelry carries the official BIS hallmark certification, which guarantees purity and authenticity. This is mandatory for all gold jewelry sold in India.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Track market trends:</strong> Monitor daily gold rates and historical price trends before making large purchases. Our website provides historical data to help you identify favorable buying opportunities.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Buy during off-season:</strong> Consider purchasing gold during non-festival periods when demand is lower, potentially securing better prices and negotiable making charges.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Prefer 24K for investment:</strong> If your primary goal is investment rather than adornment, choose 24K gold coins or bars from reputed sources like banks or certified dealers.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Keep proper documentation:</strong> Maintain all bills, certificates, and purchase receipts. These are crucial for resale, insurance claims, and establishing authenticity.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-elegant">
              <h3 className="mb-4 text-2xl font-bold text-foreground flex items-center gap-3">
                <Users className="h-7 w-7 text-primary" />
                Gold in Chennai Culture and Traditions
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Gold holds profound cultural and religious significance in Chennai and Tamil Nadu. The city's relationship with gold extends beyond mere economic value, deeply rooted in traditions that span millennia.
                </p>
                <p>
                  Tamil weddings in Chennai are incomplete without traditional gold jewelry. Bridal sets often include the iconic temple jewelry, featuring intricate designs inspired by South Indian temple architecture. The Thirumangalyam (sacred wedding thread) contains gold coins or pendants, symbolizing the eternal bond between spouses.
                </p>
                <p>
                  During festivals like Pongal, Tamil New Year, and Navaratri, Chennai families traditionally purchase gold as it's considered auspicious. The festival of Akshaya Tritiya is particularly significant, with many believing that gold bought on this day brings eternal prosperity. Jewelers across Chennai offer special promotions during these occasions.
                </p>
                <p>
                  Temple offerings in Chennai often include gold donations. Many ancient temples in and around the city house incredible collections of gold jewelry and artifacts, showcasing the region's rich golden heritage. The Parthasarathy Temple in Triplicane and Kapaleeshwarar Temple in Mylapore are renowned for their golden treasures.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default GoldInfo;
