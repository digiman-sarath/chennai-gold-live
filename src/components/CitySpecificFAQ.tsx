import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface CitySpecificFAQProps {
  city: string;
}

const CitySpecificFAQ = ({ city }: CitySpecificFAQProps) => {
  const generateCityFAQs = (cityName: string) => [
    {
      question: `What is today's gold rate in ${cityName}?`,
      answer: `Today's gold rate in ${cityName} is updated daily on this page and matches the live market rates sourced from GoldAPI.io. The price varies for 22K and 24K gold and is displayed per gram. Check the live rates at the top of this page for the most current pricing in ${cityName}.`
    },
    {
      question: `Where can I buy gold in ${cityName}?`,
      answer: `${cityName} has several reputable jewelry stores and gold dealers. Look for jewelers in the main market areas, bazaar streets, and commercial centers. Always ensure you buy from BIS hallmarked certified jewelers who provide proper documentation and bills. Popular areas typically include the main bazaar, market road, and established jewelry shopping districts in ${cityName}.`
    },
    {
      question: `How does ${cityName} gold price compare to Chennai rates?`,
      answer: `Gold prices in ${cityName} are generally similar to Chennai rates as both follow the same international gold price benchmarks. However, minor variations (₹10-50 per gram) may occur due to local taxes, transportation costs, and demand-supply dynamics. The base gold rate remains consistent, but making charges and final pricing can vary between jewelers in ${cityName} and Chennai.`
    },
    {
      question: `What are the best jewelers in ${cityName}?`,
      answer: `${cityName} has several trusted jewelers known for quality and service. Look for established shops with BIS certification, good customer reviews, transparent pricing, and proper hallmarking. Always verify the BIS hallmark, compare prices across multiple jewelers, and check making charges before purchasing gold in ${cityName}.`
    },
    {
      question: `Is GST applicable on gold purchases in ${cityName}?`,
      answer: `Yes, gold purchases in ${cityName} attract 3% GST on the total value including the base gold price and making charges. This is standard across all of India, including ${cityName}. The GST is non-negotiable and applies uniformly to all jewelry stores.`
    },
    {
      question: `What is the difference between 22K and 24K gold available in ${cityName}?`,
      answer: `In ${cityName}, 22K gold contains 91.67% pure gold mixed with other metals for durability, making it ideal for jewelry. 24K gold is 99.99% pure gold, softer, and preferred for investment purposes like coins and bars. Most ${cityName} jewelers stock both varieties, with 22K being more popular for traditional jewelry.`
    },
    {
      question: `Can I exchange old gold in ${cityName}?`,
      answer: `Yes, most jewelers in ${cityName} accept old gold in exchange for new jewelry. The exchange value depends on current gold rates, purity (assessed after melting), and the jeweler's exchange policy. Some ${cityName} jewelers may deduct 3-8% for purity loss and melting charges. Always get quotes from multiple jewelers before exchanging.`
    },
    {
      question: `What are making charges for gold jewelry in ${cityName}?`,
      answer: `Making charges in ${cityName} typically range from 8% to 25% of the base gold price, depending on design complexity, craftsmanship, and the jeweler. Simple designs have lower charges (8-12%), while intricate temple jewelry or handcrafted pieces may attract higher charges (15-25%). These charges are often negotiable in ${cityName}, especially for bulk purchases.`
    },
    {
      question: `Is hallmarking mandatory for gold in ${cityName}?`,
      answer: `Yes, BIS hallmarking is mandatory for all gold jewelry sold in ${cityName} as per government regulations applicable across India. The hallmark certifies purity and protects buyers from fraud. Always verify the BIS hallmark on any gold jewelry purchased in ${cityName} before making payment.`
    },
    {
      question: `What is the best time to buy gold in ${cityName}?`,
      answer: `The best time to buy gold in ${cityName} is when prices are lower, typically during off-season periods (July-September, February-March) when demand is reduced. However, many ${cityName} residents prefer buying during auspicious occasions like Akshaya Tritiya, Diwali, Pongal, and wedding seasons despite higher prices due to cultural significance.`
    },
    {
      question: `Can I get gold loans in ${cityName}?`,
      answer: `Yes, multiple banks and NBFCs in ${cityName} offer gold loans where you can pledge your gold jewelry as collateral. Popular providers include nationalized banks (SBI, Indian Bank, Canara Bank), private banks (HDFC, ICICI, Axis), and NBFCs (Muthoot Finance, Manappuram Finance). Interest rates in ${cityName} typically range from 7-18% per annum depending on the lender.`
    },
    {
      question: `How do I verify gold purity in ${cityName}?`,
      answer: `In ${cityName}, verify gold purity by checking the BIS hallmark on jewelry, which includes purity grade (22K/916, 24K/999), jeweler's mark, and hallmarking center mark. For additional verification, certified assayers and jewelry testing labs in ${cityName} offer purity testing services using electronic machines or chemical tests.`
    },
    {
      question: `What documentation is needed to buy gold in ${cityName}?`,
      answer: `For regular gold purchases in ${cityName}, a valid government ID (Aadhaar, PAN, driving license, passport) is sufficient. For purchases above ₹2 lakhs, PAN card is mandatory as per income tax regulations. Always collect detailed bills showing weight, purity, making charges, and GST breakdown from ${cityName} jewelers.`
    },
    {
      question: `Are digital gold investments available in ${cityName}?`,
      answer: `Yes, ${cityName} residents can invest in digital gold through various mobile apps and platforms like Paytm, PhonePe, Google Pay, Indiagold, and Rupeek. These allow you to buy gold starting from ₹1, backed by 24K physical gold stored in secure vaults. Digital gold offers convenience without the need to visit physical jewelers in ${cityName}.`
    },
    {
      question: `How often are gold rates updated in ${cityName}?`,
      answer: `Gold rates in ${cityName} are typically updated daily, usually in the morning based on international market prices and currency exchange rates. Some jewelers may adjust prices during the day if there are significant international market movements. Our website updates ${cityName} gold rates daily from live API sources.`
    },
    {
      question: `What is the gold purity testing process in ${cityName}?`,
      answer: `${cityName} jewelers and assay centers use various methods to test gold purity: touchstone test (traditional method), electronic gold testing machines (modern, accurate), X-ray fluorescence (XRF), and fire assay (most accurate). Reputed ${cityName} jewelers offer free purity testing for their sold jewelry.`
    },
    {
      question: `Can NRIs buy gold in ${cityName}?`,
      answer: `Yes, Non-Resident Indians can purchase gold in ${cityName} during their visits to India. They must provide valid identification (passport, PAN card) and comply with customs regulations when carrying gold abroad. ${cityName} jewelers treat NRI customers same as resident Indians for purchases.`
    },
    {
      question: `What are gold savings schemes available in ${cityName}?`,
      answer: `Many ${cityName} jewelers offer gold savings schemes where you pay monthly installments for 11 months and receive bonus amount or waived making charges in the 12th month. Terms, bonus amounts, and conditions vary by jeweler in ${cityName}. Read scheme terms carefully before enrolling.`
    },
    {
      question: `How does the wedding season affect gold prices in ${cityName}?`,
      answer: `Wedding seasons (November-January, April-May) see increased gold demand in ${cityName}, sometimes causing slight price variations due to local market dynamics. While base gold rates remain tied to international prices, making charges may be less negotiable during peak wedding season in ${cityName} due to high demand.`
    },
    {
      question: `What types of gold jewelry are popular in ${cityName}?`,
      answer: `${cityName} follows traditional Tamil Nadu jewelry preferences including temple jewelry, antique designs, Bharatanatyam jewelry, traditional South Indian ornaments like bangles, chains, earrings (jhumkas, jimikkis), and wedding jewelry sets. The market also offers contemporary and lightweight designs for daily wear popular among younger ${cityName} residents.`
    },
    {
      question: `Are there any local festivals in ${cityName} when people traditionally buy gold?`,
      answer: `${cityName} residents traditionally purchase gold during major Hindu festivals like Akshaya Tritiya, Diwali (Deepavali), Thai Pongal, Navaratri, Tamil New Year, and during wedding seasons. These occasions are considered auspicious for gold purchases in ${cityName} and across Tamil Nadu.`
    },
    {
      question: `Can I sell gold in ${cityName}?`,
      answer: `Yes, you can sell gold in ${cityName} to jewelers, gold buyers, or through organized exchanges. Get your gold assessed for purity, compare offers from multiple ${cityName} buyers, and ensure proper documentation during the sale. Hallmarked gold typically fetches better resale prices in ${cityName}.`
    },
    {
      question: `What is the buyback policy of jewelers in ${cityName}?`,
      answer: `Buyback policies vary among ${cityName} jewelers. Some offer lifetime buyback at prevailing gold rates minus small deductions (1-3%), while others have specific terms. Always clarify the buyback policy before purchasing gold jewelry in ${cityName} and get it mentioned in the invoice.`
    },
    {
      question: `How do I store gold safely in ${cityName}?`,
      answer: `For safe gold storage in ${cityName}, consider bank lockers available at most nationalized and private banks, home safes (fireproof and burglar-resistant), or professional vault storage services. Always insure your gold jewelry and maintain proper documentation. Many ${cityName} banks offer locker facilities with annual rental charges.`
    },
    {
      question: `What is the gold coin investment scenario in ${cityName}?`,
      answer: `Gold coins (typically 24K) are available in ${cityName} from banks (SBI, HDFC, ICICI) and certified jewelers in various weights (1g, 5g, 10g, etc.). They come with purity certificates and are ideal for investment purposes. ${cityName} investors can purchase gold coins without making charges, paying only a small premium over gold price.`
    },
    {
      question: `Are there any special gold offers or discounts in ${cityName}?`,
      answer: `${cityName} jewelers periodically offer special promotions during festivals (Akshaya Tritiya, Diwali, Pongal), wedding seasons, and store anniversaries. Offers may include waived making charges, discounted pricing, free gold coins with purchases, or gift vouchers. Check with multiple ${cityName} jewelers during festive seasons for best deals.`
    },
    {
      question: `What is the process of customizing jewelry in ${cityName}?`,
      answer: `Many ${cityName} jewelers offer customization services where you can create bespoke designs, modify existing patterns, or recreate family heirlooms. The process involves design consultation, approval of design and quote, creation timeline (typically 2-4 weeks), and final delivery. Customization in ${cityName} may involve higher making charges (18-30%) depending on complexity.`
    },
    {
      question: `How do international gold prices affect ${cityName} rates?`,
      answer: `${cityName} gold rates are directly linked to international prices (LBMA benchmarks) quoted in US dollars. When global prices rise or fall, ${cityName} rates adjust accordingly within 24 hours. Additionally, INR-USD exchange rate fluctuations impact ${cityName} prices - a weaker rupee makes gold more expensive even if international prices remain stable.`
    },
    {
      question: `What is the gold market timing in ${cityName}?`,
      answer: `Most gold jewelry stores in ${cityName} operate from 10:00 AM to 9:00 PM on weekdays and weekends. Timings may vary by individual jeweler and can be extended during festival seasons and wedding periods. Some ${cityName} jewelers may close on specific days or have different timings during local festivals.`
    },
    {
      question: `Can I buy gold online and get it delivered in ${cityName}?`,
      answer: `Yes, many reputed national jewelers and e-commerce platforms deliver gold jewelry to ${cityName}. Ensure the seller is certified, provides BIS hallmarked jewelry, offers proper documentation, authentication certificates, and has a clear return/exchange policy. Some ${cityName}-based jewelers also offer online ordering with local delivery.`
    }
  ];

  const faqs = generateCityFAQs(city);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions About Gold Rates in {city}
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about buying and investing in gold in {city}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Have more questions about gold rates in {city}?</strong> Visit our jewelers in {city} for personalized assistance and expert guidance on gold investments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitySpecificFAQ;