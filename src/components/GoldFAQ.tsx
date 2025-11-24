import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { FAQItem } from "@/lib/faq-schema";

export const goldFAQData: FAQItem[] = [
  {
    question: "What is today's gold rate in Chennai?",
    answer: "Today's gold rate in Chennai is updated daily on our website. The price varies for 22K and 24K gold and is displayed per gram. Check the live rates at the top of this page for the most current pricing."
  },
    {
      question: "What is the difference between 22K and 24K gold?",
      answer: "22K gold contains 91.67% pure gold mixed with other metals for durability, ideal for jewelry. 24K gold is 99.99% pure gold, softer, and preferred for investment purposes like coins and bars."
    },
    {
      question: "Why do gold rates change daily in Chennai?",
      answer: "Gold rates fluctuate based on international market prices, US dollar exchange rates, demand-supply dynamics, and government policies including import duties and GST. These factors cause daily variations."
    },
    {
      question: "How is the gold rate determined in Chennai?",
      answer: "Chennai gold rates are based on international gold prices from LBMA (London Bullion Market Association), local demand, INR-USD exchange rate, import duties, and GST. Local jewelers add their margins and making charges."
    },
    {
      question: "Is there GST on gold in Chennai?",
      answer: "Yes, gold purchases in Chennai attract 3% GST on the total value including the base gold price and making charges. This is standard across India."
    },
    {
      question: "What are making charges for gold jewelry in Chennai?",
      answer: "Making charges in Chennai typically range from 8% to 25% of the base gold price, depending on the complexity of the design, craftsmanship involved, and the jeweler. Simple designs have lower charges."
    },
    {
      question: "How can I verify if gold is genuine in Chennai?",
      answer: "Always check for the BIS (Bureau of Indian Standards) hallmark on gold jewelry. The hallmark certifies purity. Additionally, purchase only from reputed jewelers who provide proper certification and bills."
    },
    {
      question: "What is BIS hallmark on gold?",
      answer: "BIS hallmark is a certification mark that guarantees the purity of gold as per Indian standards. It's mandatory for all gold jewelry sold in India and includes details like purity, jeweler's identification, and year of marking."
    },
    {
      question: "Where can I buy gold in Chennai?",
      answer: "Popular gold buying locations in Chennai include T Nagar, George Town, Sowcarpet, and Mount Road (Anna Salai). These areas house numerous reputed jewelers offering both traditional and contemporary designs."
    },
    {
      question: "Which is better for investment: 22K or 24K gold?",
      answer: "24K gold is better for pure investment as it contains 99.99% gold with higher resale value. 22K gold is preferred for jewelry that you'll wear, offering better durability due to alloy mixing."
    },
    {
      question: "Can I negotiate gold prices in Chennai?",
      answer: "While the base gold rate is fixed based on market prices, you can often negotiate the making charges with jewelers in Chennai, especially for larger purchases or during off-season periods."
    },
    {
      question: "What is the best time to buy gold in Chennai?",
      answer: "The best time is when gold prices are lower and during off-season periods (non-festival times). However, auspicious occasions like Akshaya Tritiya, Diwali, and Pongal are traditionally preferred despite higher prices."
    },
    {
      question: "How do international gold prices affect Chennai rates?",
      answer: "International gold prices directly impact Chennai rates as India imports most of its gold. When global prices rise or fall, Chennai prices follow suit, typically reflecting changes within 24 hours."
    },
    {
      question: "What are the most trusted jewelers in Chennai?",
      answer: "Trusted jewelers in Chennai include GRT Jewellers, Lalitha Jewellery, Prince Jewellery, Joyalukkas, Malabar Gold & Diamonds, Tanishq, and NAC Jewellers, among others. Always verify BIS certification regardless of the jeweler."
    },
    {
      question: "How much gold can I buy in Chennai without any limit?",
      answer: "There's no limit on buying gold in Chennai, but you must provide valid identification for purchases. For large transactions, PAN card is mandatory. Maintain proper documentation for tax purposes."
    },
    {
      question: "What is old gold exchange value in Chennai?",
      answer: "Old gold exchange value is calculated based on current gold rates minus making charges and a small deduction for purity testing. The exact value depends on purity (assessed after melting) and current market rates."
    },
    {
      question: "Do Chennai gold rates differ from other cities?",
      answer: "Yes, gold rates can vary slightly between cities due to local taxes, transportation costs, and demand-supply dynamics. However, the difference is usually minimal as base international prices remain the same."
    },
    {
      question: "What is gold coin investment in Chennai?",
      answer: "Gold coins (typically 24K) are pure gold investment products available in various weights (1g, 5g, 10g, etc.) from banks and certified jewelers. They come with purity certificates and are ideal for portfolio diversification."
    },
    {
      question: "How to calculate total gold price including making charges?",
      answer: "Total price = (Gold rate per gram × Weight) + Making charges + GST on (gold price + making charges) + Stone charges (if any). Always ask for a detailed breakdown."
    },
    {
      question: "What is temple jewelry in Chennai?",
      answer: "Temple jewelry is traditional South Indian jewelry featuring intricate designs inspired by temple architecture and deities. Chennai is famous for authentic temple jewelry, particularly in George Town and Sowcarpet areas."
    },
    {
      question: "Can I buy gold online in Chennai?",
      answer: "Yes, many reputed jewelers in Chennai offer online purchasing with home delivery. Ensure the seller is certified, provides proper documentation, and offers authenticated BIS hallmarked jewelry."
    },
    {
      question: "What is digital gold and is it available in Chennai?",
      answer: "Digital gold allows you to buy gold in small denominations online through apps and platforms. It's available in Chennai through various financial platforms, offering the convenience of owning gold without physical storage."
    },
    {
      question: "How is gold purity tested in Chennai?",
      answer: "Gold purity is tested using various methods including touchstone test, electronic gold testing machines, X-ray fluorescence, and fire assay. Certified jewelers and assay centers in Chennai offer testing services."
    },
    {
      question: "What are gold schemes offered by Chennai jewelers?",
      answer: "Chennai jewelers offer gold savings schemes where you pay monthly installments for 11 months and receive bonus amount/waived making charges in the 12th month. Terms vary by jeweler."
    },
    {
      question: "Is there any tax on gold jewelry in Chennai?",
      answer: "GST at 3% is applicable on gold jewelry purchases. For income tax purposes, gold holdings don't require separate declaration unless sold for profit, which may attract capital gains tax."
    },
    {
      question: "What documentation is needed to buy gold in Chennai?",
      answer: "For regular purchases, a valid government ID is sufficient. For purchases above ₹2 lakhs, PAN card is mandatory. Always collect detailed bills with itemized charges for your records."
    },
    {
      question: "How does rupee-dollar rate affect gold prices in Chennai?",
      answer: "Since gold is priced in US dollars internationally, a weaker rupee makes gold more expensive in Chennai, while a stronger rupee can reduce prices. Currency fluctuations directly impact local gold rates."
    },
    {
      question: "What is Sovereign Gold Bond and can I buy it in Chennai?",
      answer: "Sovereign Gold Bonds (SGBs) are government securities denominated in grams of gold. Available through banks and post offices in Chennai, they offer 2.5% annual interest plus gold price appreciation."
    },
    {
      question: "How to sell gold in Chennai?",
      answer: "You can sell gold to jewelers, gold buyers, or through organized exchanges. Get your gold assessed for purity, compare offers from multiple buyers, and ensure proper documentation during the sale."
    },
    {
      question: "What is the difference between gold rate and gold price?",
      answer: "Gold rate refers to the base market price per gram, while gold price is the total amount paid including making charges, GST, and other applicable charges. Always clarify which is being quoted."
    },
    {
      question: "Are there import duties on gold in India affecting Chennai prices?",
      answer: "Yes, gold imports attract customs duty (currently around 15%), which significantly impacts retail prices in Chennai. Changes in import duties by the government directly affect local gold rates."
    },
    {
      question: "What is antique gold jewelry in Chennai?",
      answer: "Antique gold jewelry features traditional, vintage-style designs with oxidized finish. Chennai's George Town and T Nagar areas are renowned for authentic antique gold jewelry craftsmanship."
    },
    {
      question: "How to check gold rate history in Chennai?",
      answer: "Our website provides historical gold rate trends through interactive charts. You can view past prices to identify patterns and make informed purchase decisions based on historical data."
    },
    {
      question: "What is the minimum gold I can buy in Chennai?",
      answer: "There's no minimum limit. You can buy gold jewelry starting from 1 gram or even purchase small gold coins. Many jewelers also offer lightweight designs for budget-conscious buyers."
    },
    {
      question: "Do gold prices vary within Chennai areas?",
      answer: "While base gold rates remain similar across Chennai, final prices may vary slightly between areas due to differences in making charges, overhead costs, and jeweler margins."
    },
    {
      question: "What is MCX gold rate and how does it relate to Chennai?",
      answer: "MCX (Multi Commodity Exchange) provides futures prices for gold trading. These rates influence but don't directly determine retail gold prices in Chennai, which also factor in local dynamics."
    },
    {
      question: "Can NRIs buy gold in Chennai?",
      answer: "Yes, Non-Resident Indians can buy gold in Chennai during their visits. They must provide valid identification and comply with customs regulations when carrying gold abroad."
    },
    {
      question: "What is gold ETF and is it available to Chennai residents?",
      answer: "Gold ETFs (Exchange Traded Funds) are financial instruments representing physical gold. Chennai residents can invest in gold ETFs through stock exchanges, offering convenient gold investment without storage concerns."
    },
    {
      question: "How to store gold safely in Chennai?",
      answer: "Options include bank lockers, home safes, or vault storage services. Always insure your gold jewelry and maintain proper documentation. Many Chennai banks offer secure locker facilities."
    },
    {
      question: "What is hallmarking mandatory for in Chennai?",
      answer: "BIS hallmarking is mandatory for all gold jewelry sold in Chennai (and India) as per government regulations. This ensures customers receive certified purity levels and protects against fraud."
    },
    {
      question: "How often do gold rates update in Chennai?",
      answer: "Gold rates in Chennai are typically updated daily, usually in the morning. Some jewelers may adjust prices during the day if there are significant international market movements."
    },
    {
      question: "What is gold purity percentage?",
      answer: "Gold purity is measured in karats or percentage. 24K = 99.99% pure, 22K = 91.67% pure, 18K = 75% pure. Higher karat means higher purity and gold content."
    },
    {
      question: "Can I get a loan against gold in Chennai?",
      answer: "Yes, many banks and NBFCs in Chennai offer gold loans where you pledge your gold jewelry as collateral. Interest rates and loan-to-value ratios vary by lender."
    },
    {
      question: "What are wedding gold traditions in Chennai?",
      answer: "Chennai Tamil weddings feature extensive gold jewelry for brides including Thirumangalyam (sacred thread), temple jewelry sets, bangles, and anklets. Gold symbolizes prosperity and auspiciousness."
    },
    {
      question: "How to identify fake gold in Chennai?",
      answer: "Check for BIS hallmark, conduct magnet test (gold is non-magnetic), verify weight against size, check color consistency, and buy only from certified jewelers. When in doubt, get professional testing."
    },
    {
      question: "What is the role of gold in Hindu festivals in Chennai?",
      answer: "Gold plays a central role in Chennai's Hindu festivals. It's considered auspicious to buy gold during Akshaya Tritiya, Diwali, Pongal, and Navaratri. Gold offerings are made to temples and deities."
    },
    {
      question: "Are there gold ATMs in Chennai?",
      answer: "Yes, some locations in Chennai have gold ATMs where you can purchase small gold coins (0.5g to 100g) using debit/credit cards. These machines dispense authenticated gold with purity certificates."
    },
    {
      question: "What is the difference between yellow and white gold?",
      answer: "Yellow gold is gold in its natural color with traditional alloys. White gold is alloyed with white metals like palladium or nickel and rhodium-plated, giving it a silver appearance. Both are available in Chennai."
    },
    {
      question: "How does inflation affect gold prices in Chennai?",
      answer: "Gold is considered an inflation hedge. During high inflation periods, gold prices typically rise as investors seek stable value stores. Chennai gold rates reflect this global trend."
    },
    {
      question: "What is gold bar investment in Chennai?",
      answer: "Gold bars are rectangular pieces of refined 24K gold available in various weights (10g to 1kg). Banks and certified dealers in Chennai sell gold bars with purity certificates, ideal for serious investors."
    },
    {
      question: "Can I customize jewelry designs in Chennai?",
      answer: "Yes, many Chennai jewelers offer customization services. You can create bespoke designs, modify existing patterns, or recreate family heirlooms. Customization may involve higher making charges and lead time."
    },
    {
      question: "What is the Chennai gold market timing?",
      answer: "Most gold jewelry stores in Chennai operate from 10:00 AM to 9:00 PM on weekdays and weekends. Timings may vary during festivals when extended hours are common."
    },
    {
      question: "How to clean gold jewelry at home in Chennai?",
      answer: "Mix mild soap with warm water, soak jewelry for 15 minutes, gently brush with soft toothbrush, rinse thoroughly, and dry with soft cloth. Avoid harsh chemicals. Professional cleaning is recommended periodically."
    },
    {
      question: "What is gold recycling in Chennai?",
      answer: "Gold recycling involves melting old or broken jewelry to create new pieces. Chennai jewelers accept old gold in exchange, deducting minimal wastage charges. This is an economical way to update your collection."
    },
    {
      question: "Are there gold exhibitions in Chennai?",
      answer: "Yes, Chennai hosts regular gold and jewelry exhibitions, especially during festival seasons. These exhibitions feature multiple jewelers offering competitive prices, new designs, and special promotions."
    },
    {
      question: "What is the cultural significance of gold in Tamil Nadu?",
      answer: "In Tamil Nadu and Chennai, gold symbolizes wealth, purity, and divine blessings. It's integral to life events from birth to death, featuring prominently in religious ceremonies, weddings, and festivals."
    },
    {
      question: "How to maintain gold jewelry in Chennai's climate?",
      answer: "Chennai's humid climate requires careful gold maintenance. Store in dry, airtight containers with silica gel packets. Clean regularly, avoid exposure to chemicals, perfumes, and lotions. Keep separate to prevent scratching."
    },
    {
      question: "What is the process of buying gold in Chennai?",
      answer: "Select your design, verify BIS hallmark, check purity, negotiate making charges if possible, understand all cost components, provide identification, make payment, collect detailed bill with itemization, and keep all documentation safely."
    },
    {
      question: "Are there gold buyer protection laws in Chennai?",
      answer: "Yes, Consumer Protection Act applies to gold purchases. Mandatory BIS hallmarking, proper billing, transparent pricing, and grievance redressal mechanisms protect buyers in Chennai. Report issues to consumer forums."
    },
    {
      question: "What is gold biscuit and where to buy in Chennai?",
      answer: "Gold biscuits are small rectangular pieces of pure 24K gold (typically 5g-100g) with purity markings. Available from reputed jewelers and banks in Chennai, they're popular investment options with easy liquidity."
    },
    {
      question: "How does wedding season affect gold prices in Chennai?",
      answer: "Wedding seasons (November-January, April-May) see increased demand in Chennai, sometimes causing slight price premiums due to market dynamics. Planning purchases in off-season may offer better negotiation opportunities."
    },
    {
      question: "What are gold hallmark symbols?",
      answer: "BIS hallmark includes: BIS logo, purity in karats/fineness (e.g., 22K916), jeweler's identification mark, hallmarking center's mark, and year of marking. All these ensure authenticated quality."
    },
    {
      question: "Can students or young professionals invest in gold in Chennai?",
      answer: "Yes, gold investment suits all demographics. Young investors can start with small gold coins, digital gold, or Sovereign Gold Bonds requiring minimal initial investment. Regular small purchases through jewelry schemes are also popular."
    },
    {
      question: "What is the return policy for gold jewelry in Chennai?",
      answer: "Return policies vary by jeweler. Most Chennai jewelers offer exchange rather than cash returns. Some provide short return windows (7-30 days) with conditions. Always clarify return/exchange policies before purchase."
    },
    {
      question: "How to compare gold prices between Chennai jewelers?",
      answer: "Compare base gold rates (usually similar), making charges (varies widely), design quality, certification, after-sales service, and buyback policies. Don't just focus on the lowest price; consider overall value and reputation."
    },
    {
      question: "What is gold loan-to-value ratio in Chennai?",
      answer: "Gold loans in Chennai typically offer 65-75% of gold's market value as loan amount. The exact percentage depends on the lender, gold purity, and loan scheme. Higher purity gold gets better loan value."
    },
    {
      question: "Are there seasonal gold price patterns in Chennai?",
      answer: "Gold prices in Chennai generally rise during wedding and festival seasons due to increased demand. Monsoon months and post-festival periods may see relatively lower demand and potentially better buying opportunities."
    },
    {
      question: "What is the difference between ornamental and investment gold?",
      answer: "Ornamental gold (22K jewelry) includes making charges, design value, and usage satisfaction. Investment gold (24K coins/bars) focuses on pure gold value, liquidity, and appreciation potential. Choose based on your primary goal."
    },
    {
      question: "How to check if a Chennai jeweler is certified?",
      answer: "Verify if the jeweler is BIS-registered, check for valid business licenses, look for memberships in jewelry associations like GJC, read customer reviews, and ensure they provide proper documentation and bills."
    },
    {
      question: "What is gold savings plan in Chennai jewelers?",
      answer: "Gold savings plans involve monthly contributions for 10-11 months. On maturity, you receive the accumulated value plus bonus/waived making charges to purchase jewelry. Popular for planned purchases like weddings."
    },
    {
      question: "Can I buy gold with credit card in Chennai?",
      answer: "Yes, most major jewelers in Chennai accept credit cards, though some may charge processing fees (2-3%). Consider the benefits like reward points versus additional charges. Large purchases may require special approval."
    },
    {
      question: "What is Akshaya Tritiya significance for gold buying in Chennai?",
      answer: "Akshaya Tritiya is considered the most auspicious day for gold purchases in Chennai. The word 'Akshaya' means eternal prosperity. Jewelers offer special collections and promotions, and buyers believe purchases bring lifelong fortune."
    },
    {
      question: "How to identify quality craftsmanship in Chennai gold jewelry?",
      answer: "Check for smooth finishing, even polishing, secure stone settings, properly working clasps, uniform color, symmetrical design, and fine detailing. Experienced Chennai jewelers in T Nagar and George Town are known for superior craftsmanship."
    },
    {
      question: "What are the benefits of buying gold in Chennai vs other cities?",
      answer: "Chennai offers competitive pricing, wide variety of traditional South Indian designs, skilled craftsmanship, established jewelers with decades of reputation, and cultural authenticity in temple jewelry and antique collections."
    },
    {
      question: "How does the stock market affect gold prices in Chennai?",
      answer: "Gold and stock markets often have inverse relationships. When stock markets are volatile or declining, investors move to gold as a safe haven, potentially increasing Chennai gold prices. Economic uncertainty boosts gold demand."
    },
    {
      question: "What is the best weight of gold to buy for investment in Chennai?",
      answer: "For investment, 8-10 gram gold coins or bars are popular, offering good value without excessive capital requirement. Serious investors may choose 50-100 gram bars. Start small and build your gold portfolio gradually."
    },
    {
      question: "Are there government schemes for gold in Chennai?",
      answer: "The government offers Sovereign Gold Bonds (SGBs) available through banks and post offices in Chennai. These provide 2.5% annual interest plus price appreciation, with 8-year maturity and 5-year exit option."
    },
    {
      question: "What is gold monetization scheme and is it useful in Chennai?",
      answer: "Gold Monetization Scheme allows you to deposit idle gold jewelry with banks to earn interest. Available in Chennai through designated banks, it's useful for earning returns on gold you're not using."
    },
    {
      question: "How to verify current gold rate before buying in Chennai?",
      answer: "Check our website for updated Chennai gold rates, compare with 2-3 local jewelers' quotes, verify on commodity exchange websites, and confirm the rate includes all charges. Always ask for written quotations."
    },
    {
      question: "What is the future outlook for gold prices in Chennai?",
      answer: "Gold price forecasting is complex, influenced by global economics, geopolitics, currency movements, and inflation. Historically, gold has appreciated long-term. Consult financial advisors for personalized investment guidance."
    },
    {
      question: "Can I use gold as collateral for business loans in Chennai?",
      answer: "Yes, many banks and NBFCs in Chennai offer business loans against gold. The process is faster than traditional business loans, requires minimal documentation, and offers flexible repayment options based on your gold's value."
    },
    {
      question: "What is the process to melt old gold in Chennai?",
      answer: "Choose a reputed Chennai jeweler, get your gold weighed and purity tested, decide on new design, understand wastage deductions (typically 5-15%), review cost implications, approve design, and collect after crafting."
    },
    {
      question: "How to gift gold in Chennai traditions?",
      answer: "Gold gifting is significant in Chennai culture, especially during weddings, baby showers (Seemantham), and first birthday (Ayush Homam). Gold coins, jewelry, or gold-plated items are traditional gifts symbolizing blessings and prosperity."
    },
    {
      question: "What is the role of gold in Chennai temple traditions?",
      answer: "Chennai's ancient temples like Kapaleeshwarar Temple hold vast gold treasures. Devotees offer gold as vows, and special deity ornaments are made from donated gold. Temple gold represents divine wealth and devotional heritage."
    },
    {
      question: "Are there gold jewelry trends specific to Chennai?",
      answer: "Chennai preferences include temple jewelry, traditional South Indian designs, Lakshmi coin pendants, long chains (Manga Maalai), antique finish jewelry, and contemporary fusion pieces blending traditional motifs with modern aesthetics."
    },
    {
      question: "What is the impact of global gold reserves on Chennai prices?",
      answer: "Central bank gold reserves influence international gold prices through demand-supply dynamics. Major reserve changes by countries affect global prices, which cascade to Chennai rates within 24-48 hours through commodity market mechanisms."
    },
    {
      question: "How to ensure safe gold delivery when buying online in Chennai?",
      answer: "Choose reputed jewelers with verified online presence, check secure payment gateways, verify insurance coverage during transit, inspect jewelry immediately upon delivery, confirm BIS hallmark and certification, and retain all digital documentation."
    },
    {
      question: "What is the importance of invoice in gold purchase in Chennai?",
      answer: "Gold purchase invoice is crucial for warranty claims, resale, insurance, tax purposes, and legal protection. It should detail: jeweler information, itemized charges, purity, weight, BIS hallmark number, and total amount with GST breakup."
    },
    {
      question: "How does geopolitical tension affect Chennai gold prices?",
      answer: "Geopolitical uncertainties drive investors toward safe-haven assets like gold, potentially increasing prices in Chennai. Wars, trade disputes, and political instability typically correlate with gold price surges globally and locally."
    },
    {
      question: "What is the best way to track gold rates in Chennai?",
      answer: "Use our website for real-time Chennai gold rates with historical charts, set up price alerts on gold tracking apps, follow reputable jewelers' social media updates, and bookmark reliable commodity market websites for daily monitoring."
    },
    {
      question: "Can I exchange gold between different karats in Chennai?",
      answer: "Yes, Chennai jewelers facilitate karat exchanges (e.g., 24K coins for 22K jewelry). The exchange value is calculated based on pure gold content. Some weight loss and making charges apply for new jewelry fabrication."
    },
    {
      question: "What is gold price volatility and how to handle it in Chennai?",
      answer: "Gold prices can fluctuate significantly due to global factors. To manage volatility: diversify investments, use rupee cost averaging (buy regularly in small amounts), avoid panic decisions, and maintain long-term perspective for investments."
    },
    {
      question: "Are there gold investment clubs or groups in Chennai?",
      answer: "Some Chennai jewelers and financial institutions organize gold investment groups offering collective buying power, educational sessions, and structured saving plans. These can provide knowledge sharing and potentially better rates through volume purchases."
    },
    {
      question: "What is the significance of gold during Pongal festival in Chennai?",
      answer: "Pongal, Tamil Nadu's harvest festival, is auspicious for gold purchases in Chennai. New gold jewelry and coins are bought to celebrate prosperity. Jewelers offer special Pongal collections featuring traditional motifs and designs."
    },
    {
      question: "How to assess a jeweler's buyback policy in Chennai?",
      answer: "Evaluate buyback price (should be close to current gold rate), conditions and documentation required, time restrictions, whether making charges are considered, and transparency of the process. Get buyback terms in writing at the time of purchase."
    },
    {
      question: "What is the environmental impact of gold mining and Chennai's role?",
      answer: "Gold mining has environmental concerns including habitat destruction and chemical use. As consumers, Chennai buyers can support responsible jewelers who source ethically, consider recycled gold, and look for certifications like Responsible Jewellery Council (RJC) membership."
    }
  ];

const GoldFAQ = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions About Gold Rates in Chennai
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about buying and investing in gold in Chennai
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {goldFAQData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground text-sm">
              Can't find the answer you're looking for? Our gold rate tracking platform is updated daily with the latest information. 
              For specific queries about current rates, historical data, or investment advice, please check our live rates and charts above or consult with certified jewelers in Chennai.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldFAQ;
