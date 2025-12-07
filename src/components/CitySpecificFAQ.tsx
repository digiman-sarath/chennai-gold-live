import { FAQItem } from "@/lib/faq-schema";
import FAQScrollBox from "./FAQScrollBox";

interface CitySpecificFAQProps {
  city: string;
}

// Enhanced FAQ generator with 30+ word answers optimized for user intent and semantic keywords
export const generateCityFAQs = (cityName: string): FAQItem[] => [
  {
    question: `What is today's gold rate in ${cityName}?`,
    answer: `Today's gold rate in ${cityName} is updated daily on this page, sourced directly from GoldAPI.io live market data. The current gold price varies for 22K and 24K gold per gram. Check the live rates displayed at the top of this page for the most accurate and current gold pricing in ${cityName}. Prices typically update every morning based on international gold market benchmarks.`
  },
  {
    question: `Where can I buy gold in ${cityName}?`,
    answer: `${cityName} has several reputable jewelry stores and certified gold dealers in the main market areas, commercial centers, and established bazaar streets. Always purchase from BIS hallmarked certified jewelers who provide proper documentation, authentication certificates, and GST-compliant bills. Look for jewelers registered with the Bureau of Indian Standards for guaranteed purity and quality assurance in ${cityName}.`
  },
  {
    question: `How does ${cityName} gold price compare to Chennai rates?`,
    answer: `Gold prices in ${cityName} are generally similar to Chennai rates since both follow the same international gold price benchmarks set by LBMA. However, minor variations of ₹10-50 per gram may occur due to local transportation costs, demand-supply dynamics, and jeweler margins. The base gold rate remains consistent across Tamil Nadu, but making charges and final pricing can vary between jewelers in ${cityName} and Chennai.`
  },
  {
    question: `What are the best jewelers in ${cityName}?`,
    answer: `${cityName} has several trusted jewelers known for quality craftsmanship, transparent pricing, and excellent customer service. Look for established shops with BIS certification, positive customer reviews, proper hallmarking facilities, and membership in jewelry associations like GJC (Gems & Jewellery Council). Always verify the BIS hallmark, compare making charges across multiple jewelers, and check buyback policies before purchasing gold in ${cityName}.`
  },
  {
    question: `Is GST applicable on gold purchases in ${cityName}?`,
    answer: `Yes, all gold purchases in ${cityName} attract 3% GST (Goods and Services Tax) on the total value including the base gold price and making charges. This is a standard rate applicable across all of India, including ${cityName}. The GST is non-negotiable and applies uniformly to all jewelry stores. Your invoice should clearly show the GST breakdown for proper documentation and future reference.`
  },
  {
    question: `What is the difference between 22K and 24K gold available in ${cityName}?`,
    answer: `In ${cityName}, 22K gold contains 91.67% pure gold mixed with other metals (like copper and silver) for enhanced durability, making it ideal for daily-wear jewelry. 24K gold is 99.99% pure gold, softer in texture, and preferred for investment purposes like coins and bars. Most ${cityName} jewelers stock both varieties, with 22K being more popular for traditional South Indian jewelry and wedding ornaments.`
  },
  {
    question: `Can I exchange old gold in ${cityName}?`,
    answer: `Yes, most established jewelers in ${cityName} accept old gold in exchange for new jewelry, making it a cost-effective way to upgrade your collection. The exchange value depends on current gold rates, purity (assessed after melting), and the jeweler's exchange policy. Some ${cityName} jewelers may deduct 3-8% for purity loss and melting charges. Always get quotes from multiple jewelers before exchanging to ensure you receive fair value.`
  },
  {
    question: `What are making charges for gold jewelry in ${cityName}?`,
    answer: `Making charges in ${cityName} typically range from 8% to 25% of the base gold price, depending on design complexity, craftsmanship involved, and the individual jeweler. Simple chain designs have lower charges (8-12%), while intricate temple jewelry, handcrafted pieces, or antique finish work may attract higher charges (15-25%). These making charges are often negotiable in ${cityName}, especially for bulk purchases, during off-season periods, or for loyal customers.`
  },
  {
    question: `Is BIS hallmarking mandatory for gold in ${cityName}?`,
    answer: `Yes, BIS (Bureau of Indian Standards) hallmarking is mandatory for all gold jewelry sold in ${cityName} as per government regulations applicable across India since June 2021. The hallmark certifies gold purity and protects buyers from fraud and adulteration. Always verify the BIS hallmark on any gold jewelry purchased in ${cityName} before making payment. The hallmark includes purity grade, jeweler's identification mark, and hallmarking center details.`
  },
  {
    question: `What is the best time to buy gold in ${cityName}?`,
    answer: `The best time to buy gold in ${cityName} is when prices are lower, typically during off-season periods (July-September, February-March) when wedding and festival demand is reduced. Tracking gold price trends helps identify favorable buying opportunities. However, many ${cityName} residents prefer buying during auspicious occasions like Akshaya Tritiya, Diwali, Pongal, and Tamil New Year despite potentially higher prices due to cultural and spiritual significance associated with these days.`
  },
  {
    question: `Can I get gold loans in ${cityName}?`,
    answer: `Yes, multiple banks and NBFCs in ${cityName} offer gold loans where you can pledge your gold jewelry as collateral for quick financing. Popular providers include nationalized banks (SBI, Indian Bank, Canara Bank), private banks (HDFC, ICICI, Axis Bank), and specialized NBFCs (Muthoot Finance, Manappuram Finance). Interest rates in ${cityName} typically range from 7-18% per annum depending on the lender, loan amount, and scheme selected.`
  },
  {
    question: `How do I verify gold purity in ${cityName}?`,
    answer: `In ${cityName}, verify gold purity by checking the BIS hallmark on jewelry, which includes purity grade (22K/916, 24K/999), jeweler's identification mark, and hallmarking center mark. For additional verification, certified assayers and jewelry testing labs in ${cityName} offer professional purity testing services using electronic machines, X-ray fluorescence (XRF), or chemical tests. Never purchase gold without proper hallmark certification.`
  },
  {
    question: `What documentation is needed to buy gold in ${cityName}?`,
    answer: `For regular gold purchases in ${cityName}, a valid government ID (Aadhaar, PAN, driving license, passport) is sufficient. For purchases above ₹2 lakhs, PAN card is mandatory as per income tax regulations to prevent money laundering and ensure compliance. Always collect detailed bills showing weight, purity, making charges, stone charges if applicable, and GST breakdown from ${cityName} jewelers. Keep all documentation safely for future resale or insurance claims.`
  },
  {
    question: `Are digital gold investments available in ${cityName}?`,
    answer: `Yes, ${cityName} residents can invest in digital gold through various mobile apps and platforms like Paytm Gold, PhonePe Gold, Google Pay Gold, Indiagold, and Rupeek. These platforms allow you to buy gold starting from just ₹1, backed by 24K physical gold stored in secure, insured vaults. Digital gold offers convenience without the need to visit physical jewelers in ${cityName}, with options to convert to physical gold upon request.`
  },
  {
    question: `How often are gold rates updated in ${cityName}?`,
    answer: `Gold rates in ${cityName} are typically updated daily, usually in the morning between 9-11 AM based on international market prices and INR-USD currency exchange rates. Some jewelers may adjust prices during the day if there are significant international market movements exceeding 1-2%. Our website updates ${cityName} gold rates daily from live API sources to ensure you always have access to accurate, current pricing information.`
  },
  {
    question: `What is the gold purity testing process in ${cityName}?`,
    answer: `${cityName} jewelers and assay centers use various methods to test gold purity: the traditional touchstone test, modern electronic gold testing machines, X-ray fluorescence (XRF) analysis for non-destructive testing, and fire assay which is the most accurate method. Reputed ${cityName} jewelers offer free purity testing for jewelry sold by them and may charge a nominal fee for testing gold from other sources.`
  },
  {
    question: `Can NRIs buy gold in ${cityName}?`,
    answer: `Yes, Non-Resident Indians can purchase gold in ${cityName} during their visits to India without any restrictions. They must provide valid identification (passport, PAN card if applicable) and comply with customs regulations when carrying gold abroad. ${cityName} jewelers treat NRI customers the same as resident Indians for purchases. NRIs should check their destination country's gold import limits and duty implications before buying.`
  },
  {
    question: `What are gold savings schemes available in ${cityName}?`,
    answer: `Many ${cityName} jewelers offer gold savings schemes where you pay monthly installments for 11 months and receive bonus amount (equivalent to one month's installment) or waived making charges in the 12th month. Terms, bonus amounts, lock-in periods, and conditions vary by jeweler in ${cityName}. Read scheme terms carefully before enrolling, verify the jeweler's reputation, and understand the exit policies if you need to discontinue the scheme.`
  },
  {
    question: `How does wedding season affect gold prices in ${cityName}?`,
    answer: `Wedding seasons (November-January, April-May) see significantly increased gold demand in ${cityName}, sometimes causing price premiums of 2-5% due to heightened local market dynamics and jeweler inventory costs. While base gold rates remain tied to international prices, making charges may be less negotiable during peak wedding season in ${cityName} due to high demand and limited craftsman availability.`
  },
  {
    question: `What types of gold jewelry are popular in ${cityName}?`,
    answer: `${cityName} follows traditional Tamil Nadu jewelry preferences including temple jewelry featuring deity motifs, antique designs with oxidized finish, Bharatanatyam jewelry for classical dancers, traditional South Indian ornaments like bangles (valayal), chains (thali kodi), earrings (jhumkas, jimikkis), and comprehensive wedding jewelry sets. The market also offers contemporary lightweight designs for daily wear popular among younger ${cityName} residents.`
  },
  {
    question: `Are there local festivals in ${cityName} when people traditionally buy gold?`,
    answer: `${cityName} residents traditionally purchase gold during major Hindu festivals like Akshaya Tritiya (the most auspicious day), Diwali (Deepavali), Thai Pongal, Navaratri, Tamil New Year (Puthandu), Varalakshmi Vratam, and during wedding seasons. These occasions are considered highly auspicious for gold purchases in ${cityName} and across Tamil Nadu, symbolizing prosperity, good fortune, and blessings from the goddess Lakshmi.`
  },
  {
    question: `Can I sell gold in ${cityName}?`,
    answer: `Yes, you can sell gold in ${cityName} to established jewelers, specialized gold buyers, or through organized gold exchanges. Get your gold assessed for purity at multiple locations, compare offers from several ${cityName} buyers, and ensure proper documentation during the sale including identity proof and GST invoice. Hallmarked gold typically fetches better resale prices in ${cityName} compared to non-hallmarked gold due to verified purity.`
  },
  {
    question: `What is the buyback policy of jewelers in ${cityName}?`,
    answer: `Buyback policies vary among ${cityName} jewelers significantly. Some offer lifetime buyback at prevailing gold rates minus small deductions (1-3%) for purity verification, while others have specific terms, time restrictions, or require original purchase bills. Always clarify the complete buyback policy before purchasing gold jewelry in ${cityName} and get it mentioned clearly in the invoice for future reference.`
  },
  {
    question: `How do I store gold safely in ${cityName}?`,
    answer: `For safe gold storage in ${cityName}, consider bank lockers available at most nationalized and private banks with annual rental charges, high-quality home safes (fireproof and burglar-resistant), or professional vault storage services offered by specialized companies. Always insure your gold jewelry with reputed insurance providers and maintain proper documentation including purchase invoices, photographs, and valuation certificates.`
  },
  {
    question: `What is gold coin investment scenario in ${cityName}?`,
    answer: `Gold coins (typically 24K pure gold) are available in ${cityName} from banks (SBI, HDFC, ICICI), certified jewelers, and authorized dealers in various weights (1g, 2g, 5g, 10g, 50g, 100g). They come with purity certificates and are ideal for investment purposes due to minimal premiums over gold price. ${cityName} investors can purchase gold coins without making charges, paying only a small premium (2-5%) over the spot gold price.`
  },
  {
    question: `Are there special gold offers or discounts in ${cityName}?`,
    answer: `${cityName} jewelers periodically offer special promotions during festivals (Akshaya Tritiya, Diwali, Pongal), wedding seasons, store anniversaries, and clearance sales. Offers may include waived or reduced making charges, discounted pricing on specific collections, free gold coins with purchases above certain thresholds, gift vouchers, or loyalty rewards. Check with multiple ${cityName} jewelers during festive seasons for best deals and compare total costs.`
  },
  {
    question: `What is the process of customizing jewelry in ${cityName}?`,
    answer: `Many ${cityName} jewelers offer customization services where you can create bespoke designs from scratch, modify existing patterns, or recreate family heirlooms. The process involves design consultation with a designer, approval of final design and detailed cost quote, gold procurement and crafting timeline (typically 2-4 weeks depending on complexity), quality checks, and final delivery. Customization in ${cityName} may involve higher making charges (18-30%) depending on design intricacy.`
  },
  {
    question: `How do international gold prices affect ${cityName} rates?`,
    answer: `${cityName} gold rates are directly linked to international prices (LBMA gold benchmarks) quoted in US dollars per troy ounce. When global prices rise or fall, ${cityName} rates adjust accordingly within 24-48 hours. Additionally, INR-USD exchange rate fluctuations significantly impact ${cityName} prices - a weaker rupee makes gold more expensive in India even if international prices remain stable, making currency movements an important factor for gold buyers.`
  },
  {
    question: `What is the gold market timing in ${cityName}?`,
    answer: `Most gold jewelry stores in ${cityName} operate from 10:00 AM to 9:00 PM on weekdays and weekends. Timings may vary by individual jeweler and can be extended during festival seasons, wedding periods, and special promotional events. Some ${cityName} jewelers may close on specific days or observe different timings during local festivals. It's advisable to call ahead or check jeweler websites for current operating hours.`
  },
  {
    question: `Can I buy gold online and get it delivered in ${cityName}?`,
    answer: `Yes, many reputed national jewelers, regional chains, and e-commerce platforms deliver gold jewelry to ${cityName} with secure, insured shipping. Ensure the seller is BIS-certified, provides hallmarked jewelry with proper documentation, offers authentication certificates, and has a clear return/exchange policy. Some ${cityName}-based jewelers also offer online ordering with local delivery or store pickup options for customer convenience.`
  }
];

const CitySpecificFAQ = ({ city }: CitySpecificFAQProps) => {
  const faqs = generateCityFAQs(city);

  return (
    <FAQScrollBox 
      faqs={faqs}
      title={`${city} Gold Rate FAQs - 22K & 24K Gold Price Questions Answered`}
      subtitle={`Find comprehensive answers to frequently asked questions about gold rates, investment strategies, purity verification, BIS hallmarking, making charges, and smart buying tips specific to ${city}. These FAQs address real user queries and popular search intents for gold buyers.`}
      city={city}
    />
  );
};

export default CitySpecificFAQ;