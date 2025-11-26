import { getISTDateForSEO } from './date-utils';

interface CityMarketData {
  variations: Array<(price24k: string, price22k: string, price18k: string, date: string) => string>;
}

const cityMarketContent: Record<string, CityMarketData> = {
  Chennai: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Chennai today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. As Tamil Nadu's capital and jewellery hub, Chennai shows strong demand for temple jewellery and traditional designs, with George Town and T Nagar markets driving significant retail activity.`,
      
      (p24k, p22k, p18k, date) =>
        `Chennai's gold market today shows consistent pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. The city's renowned jewellery districts like T Nagar and North Usman Road witness robust wedding season purchases, particularly for Kanchipuram-style gold ornaments and antique collections.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Chennai (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Metropolitan demand reflects strong preference for certified hallmarked jewellery from established retailers, with investment-grade gold coins gaining traction among urban professionals.`
    ]
  },
  
  Coimbatore: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Coimbatore today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Known as the Manchester of South India, Coimbatore's textile business families drive substantial gold purchases, particularly during festival seasons and wedding ceremonies.`,
      
      (p24k, p22k, p18k, date) =>
        `Coimbatore's gold market today reflects stable pricing with 24K at ${p24k}, 22K at ${p22k}, and 18K at ${p18k}. The city's thriving business community shows consistent demand for investment gold alongside traditional jewellery, with RS Puram and Oppanakara Street being key retail centers.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Coimbatore (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial prosperity drives steady jewellery purchases, particularly lightweight modern designs preferred by the city's young professional demographic.`
    ]
  },
  
  Madurai: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Madurai today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. The temple city's gold market thrives on religious purchases, with significant demand for traditional Madurai temple jewellery patterns and antique-finish ornaments.`,
      
      (p24k, p22k, p18k, date) =>
        `Madurai's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Town Hall Road and Avani Moola Street witness strong footfall for heritage jewellery designs, particularly during Chithirai festival and wedding seasons.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Madurai (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cultural heritage drives preference for traditional South Indian jewellery patterns, with temple gold ornaments maintaining consistent demand throughout the year.`
    ]
  },
  
  Salem: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Salem today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Salem's agricultural prosperity and steel industry workforce drive steady gold purchases, particularly during harvest seasons and traditional festivals.`,
      
      (p24k, p22k, p18k, date) =>
        `Salem's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. The city's thriving mangoes and textile trade support consistent jewellery demand, with Cherry Road serving as the primary gold retail hub.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Salem (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial workers and farming communities show balanced interest in both ornamental jewellery and investment-grade gold coins.`
    ]
  },
  
  Tirunelveli: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Tirunelveli today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. This historic city's gold market maintains strong traditional values, with significant demand for temple jewellery and heavy bridal collections.`,
      
      (p24k, p22k, p18k, date) =>
        `Tirunelveli's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Town and Junction areas witness steady purchases driven by agricultural prosperity and traditional wedding ceremonies requiring elaborate gold ornaments.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Tirunelveli (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cultural preferences favor traditional South Indian designs, with families investing in gold as part of agricultural wealth preservation strategies.`
    ]
  },
  
  Tiruchirappalli: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Tiruchirappalli today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Trichy's strategic location drives diverse demand, from temple ornaments to modern lightweight designs, with NSB Road and Big Bazaar Street as key markets.`,
      
      (p24k, p22k, p18k, date) =>
        `Tiruchirappalli's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. The city's educational institutions and industrial workforce create balanced demand for traditional jewellery and contemporary gold accessories.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Tiruchirappalli (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Central Tamil Nadu's commercial hub shows consistent purchases across all gold categories, driven by both agricultural and industrial prosperity.`
    ]
  },
  
  Erode: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Erode today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Known for textile trade and turmeric markets, Erode's business community drives substantial gold investments, particularly during wedding and harvest seasons.`,
      
      (p24k, p22k, p18k, date) =>
        `Erode's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. The city's textile merchants and agricultural traders maintain strong preference for investment gold alongside traditional jewellery for family occasions.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Erode (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Commercial prosperity from textile and turmeric trade translates to consistent gold purchases throughout the year.`
    ]
  },
  
  Vellore: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Vellore today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. The city's educational institutions and leather industry workforce drive modern gold preferences, with increasing demand for lightweight contemporary designs.`,
      
      (p24k, p22k, p18k, date) =>
        `Vellore's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Medical professionals and students show growing interest in certified jewellery and investment-grade gold coins from established retailers.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Vellore (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial growth and educational infrastructure support balanced demand for both traditional ornaments and modern gold accessories.`
    ]
  },
  
  Thanjavur: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Thanjavur today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. The rice bowl of Tamil Nadu maintains strong cultural gold traditions, with significant demand for temple jewellery and Bharatanatyam dance ornaments.`,
      
      (p24k, p22k, p18k, date) =>
        `Thanjavur's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Rich agricultural heritage drives consistent purchases of traditional heavy jewellery patterns, particularly during harvest festivals and temple celebrations.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Thanjavur (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cultural capital status ensures strong preference for antique-finish temple ornaments and classical dance jewellery collections.`
    ]
  },
  
  Kanyakumari: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Kanyakumari today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Coastal trade and tourism drive unique market dynamics, with balanced demand for traditional jewellery and investment gold from fishing and business communities.`,
      
      (p24k, p22k, p18k, date) =>
        `Kanyakumari's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. The district's strategic location and diverse economy support consistent gold purchases across wedding ornaments and savings-oriented investment gold.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Kanyakumari (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Coastal prosperity from fishing and spice trade maintains steady jewellery demand throughout the year.`
    ]
  }
};

// Fallback for cities not in the mapping
const defaultVariations: CityMarketData = {
  variations: [
    (p24k, p22k, p18k, date) =>
      `The live gold price today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Rates remain steady, driven by strong jewellery buying trends and reduced interest in gold coins and biscuits.`,
    
    (p24k, p22k, p18k, date) =>
      `Today's gold market shows consistent pricing, with 24K at ${p24k}, 22K at ${p22k}, and 18K at ${p18k}. Jewellery demand continues to rise steadily, while gold biscuits and coins witness comparatively lower traction.`,
    
    (p24k, p22k, p18k, date) =>
      `Today's live gold rate (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Market stability reflects strong jewellery purchases, with reduced focus on gold coins and investment-grade biscuits.`,
    
    (p24k, p22k, p18k, date) =>
      `The gold rate today is ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Annual price trends show steady movement, supported primarily by jewellery demand.`,
    
    (p24k, p22k, p18k, date) =>
      `Gold prices today (${date}) remain stable at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Consumer behaviour reflects stronger jewellery-related buying.`
  ]
};

export const getCitySpecificContent = (
  city: string,
  price24k: number,
  price22k: number
): string => {
  const price18k = Math.round(price24k * 0.75);
  const currentDate = getISTDateForSEO();
  
  // Format prices with rupee symbol
  const formattedPrice24k = `₹${price24k.toLocaleString('en-IN')}`;
  const formattedPrice22k = `₹${price22k.toLocaleString('en-IN')}`;
  const formattedPrice18k = `₹${price18k.toLocaleString('en-IN')}`;
  
  // Get city-specific variations or use default
  const cityData = cityMarketContent[city] || defaultVariations;
  
  // Select a random variation
  const randomIndex = Math.floor(Math.random() * cityData.variations.length);
  const selectedVariation = cityData.variations[randomIndex];
  
  return selectedVariation(formattedPrice24k, formattedPrice22k, formattedPrice18k, currentDate);
};
