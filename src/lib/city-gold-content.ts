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
  },
  
  Chengalpattu: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Chengalpattu today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Proximity to Chennai and growing industrial corridors drive modern gold preferences, with increasing demand from IT professionals and manufacturing sector employees.`,
      
      (p24k, p22k, p18k, date) =>
        `Chengalpattu's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Rapid urbanization creates balanced demand for traditional temple ornaments and contemporary lightweight designs suited for working professionals.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Chengalpattu (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial growth and satellite city development support consistent gold purchases for both weddings and investment purposes.`
    ]
  },
  
  Dharmapuri: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Dharmapuri today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Agricultural prosperity from mango cultivation and sericulture drives traditional gold buying patterns, with strong preference for heavy ornamental jewellery during harvest seasons.`,
      
      (p24k, p22k, p18k, date) =>
        `Dharmapuri's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Farming communities maintain cultural traditions of gold accumulation, particularly for wedding dowries and festival celebrations.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Dharmapuri (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Border district dynamics and agricultural wealth support steady demand for traditional South Indian jewellery patterns.`
    ]
  },
  
  Dindigul: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Dindigul today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Known for leather and textile industries, the city's business class drives significant gold investments, particularly during biryani festival celebrations and wedding seasons.`,
      
      (p24k, p22k, p18k, date) =>
        `Dindigul's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Lock manufacturing and tannery prosperity translates to consistent purchases of traditional ornaments alongside modern investment-grade gold coins.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Dindigul (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial heritage and agricultural base support balanced gold demand across jewellery and savings categories.`
    ]
  },
  
  Karur: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Karur today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. The textile capital's export-oriented business families drive substantial gold purchases, with Thanthoni area serving as the primary jewellery retail hub.`,
      
      (p24k, p22k, p18k, date) =>
        `Karur's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Home textile exports create affluent buyer base preferring hallmarked jewellery and investment gold for wealth preservation.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Karur (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Textile boom drives year-round gold demand, particularly for elaborate wedding collections and business investment purposes.`
    ]
  },
  
  Namakkal: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Namakkal today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Poultry capital of South India with thriving transport business creates unique market, combining traditional jewellery demand with modern investment gold preferences.`,
      
      (p24k, p22k, p18k, date) =>
        `Namakkal's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Egg production and lorry transport prosperity drives consistent gold purchases, particularly during Moharram and harvest celebrations.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Namakkal (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Commercial success from poultry and logistics industries translates to steady jewellery and investment gold demand.`
    ]
  },
  
  Pudukkottai: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Pudukkottai today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Rich cultural heritage and Chola dynasty legacy maintain strong traditional gold values, with significant demand for antique-finish temple jewellery.`,
      
      (p24k, p22k, p18k, date) =>
        `Pudukkottai's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Historical significance drives preference for heritage designs, particularly during temple festivals and traditional wedding ceremonies.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Pudukkottai (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Agricultural base and cultural traditions ensure consistent demand for heavy ornamental jewellery throughout the year.`
    ]
  },
  
  Ramanathapuram: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Ramanathapuram today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Coastal district with fishing and salt production creates unique market combining traditional ornaments with investment gold from marine export communities.`,
      
      (p24k, p22k, p18k, date) =>
        `Ramanathapuram's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Rameswaram temple proximity drives religious purchases alongside seafood export prosperity supporting steady jewellery demand.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Ramanathapuram (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Maritime economy and pilgrimage tourism support balanced gold purchases across ornamental and investment categories.`
    ]
  },
  
  Sivaganga: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Sivaganga today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Historical district with rich cultural heritage maintains traditional gold buying patterns, particularly for temple ornaments and wedding jewellery.`,
      
      (p24k, p22k, p18k, date) =>
        `Sivaganga's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Agricultural prosperity and cultural traditions drive consistent demand for heavy South Indian jewellery designs.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Sivaganga (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Traditional values ensure strong preference for antique-finish ornaments and temple jewellery patterns.`
    ]
  },
  
  Theni: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Theni today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cardamom capital of South India with Western Ghats prosperity drives substantial gold purchases during spice harvest seasons and festival periods.`,
      
      (p24k, p22k, p18k, date) =>
        `Theni's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Hill station agriculture and cardamom trade create affluent buyer base preferring traditional jewellery and investment gold.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Theni (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Spice cultivation prosperity translates to consistent gold demand for both ornamental and wealth preservation purposes.`
    ]
  },
  
  Thoothukudi: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Thoothukudi today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Major port city with pearl fishing heritage drives unique gold market, combining marine industry wealth with traditional South Indian jewellery preferences.`,
      
      (p24k, p22k, p18k, date) =>
        `Thoothukudi's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Port-based commerce and thermal power sector employees create strong demand for certified hallmarked jewellery and investment coins.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Thoothukudi (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Pearl city legacy and industrial growth support consistent gold purchases across all categories throughout the year.`
    ]
  },
  
  Virudhunagar: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Virudhunagar today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Match and fireworks industry capital creates affluent business community with strong gold investment culture and traditional jewellery preferences.`,
      
      (p24k, p22k, p18k, date) =>
        `Virudhunagar's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Pyrotechnics industry prosperity drives year-round gold demand, particularly for wedding collections and festival purchases.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Virudhunagar (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial success translates to substantial jewellery investments and strong preference for heavy ornamental gold.`
    ]
  },
  
  Cuddalore: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Cuddalore today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Coastal port town with chemical industries and fishing communities drives diverse gold demand from traditional temple jewellery to modern designs.`,
      
      (p24k, p22k, p18k, date) =>
        `Cuddalore's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial workforce and maritime trade support consistent purchases of hallmarked jewellery and investment gold coins.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Cuddalore (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Port city prosperity maintains steady jewellery demand throughout the year across all buyer segments.`
    ]
  },
  
  Nagapattinam: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Nagapattinam today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Ancient port city with rich paddy cultivation drives traditional gold buying, particularly during harvest festivals and coastal temple celebrations.`,
      
      (p24k, p22k, p18k, date) =>
        `Nagapattinam's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Rice bowl prosperity and fishing communities create strong demand for traditional South Indian ornaments.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Nagapattinam (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Agricultural wealth and maritime heritage support consistent gold purchases for weddings and religious purposes.`
    ]
  },
  
  Perambalur: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Perambalur today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cement industry hub with limestone quarrying creates industrial workforce driving modern gold preferences alongside traditional jewellery demand.`,
      
      (p24k, p22k, p18k, date) =>
        `Perambalur's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Mining and cement manufacturing prosperity supports consistent gold purchases for both investment and ornamental purposes.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Perambalur (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial growth drives balanced demand between traditional temple ornaments and contemporary lightweight designs.`
    ]
  },
  
  Ariyalur: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Ariyalur today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cement manufacturing district with industrial workforce maintains steady gold demand, particularly for traditional wedding jewellery and festival purchases.`,
      
      (p24k, p22k, p18k, date) =>
        `Ariyalur's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial prosperity and agricultural base support consistent ornamental gold demand throughout the year.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Ariyalur (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cement industry growth translates to steady jewellery investments across traditional and modern designs.`
    ]
  },
  
  Nilgiris: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Nilgiris today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Hill station district with tea plantation prosperity creates unique market combining traditional tribal jewellery with modern tourist-oriented gold designs.`,
      
      (p24k, p22k, p18k, date) =>
        `Nilgiris' gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Ooty and Coonoor's tourism and tea estates drive demand for both ornamental jewellery and investment-grade gold coins.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Nilgiris (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Hill station economy and plantation wealth support consistent gold purchases across diverse buyer segments.`
    ]
  },
  
  Krishnagiri: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Krishnagiri today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial corridor with mango cultivation drives modern gold preferences, particularly among auto component manufacturing workforce and agricultural communities.`,
      
      (p24k, p22k, p18k, date) =>
        `Krishnagiri's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Border district dynamics and industrial growth create balanced demand for traditional ornaments and contemporary gold accessories.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Krishnagiri (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Manufacturing boom and agricultural prosperity support consistent jewellery and investment gold purchases.`
    ]
  },
  
  Tirupattur: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Tirupattur today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Leather tanning and footwear industry hub creates affluent business class driving substantial gold investments and traditional jewellery purchases.`,
      
      (p24k, p22k, p18k, date) =>
        `Tirupattur's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial prosperity from leather exports translates to year-round demand for hallmarked jewellery and investment gold.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Tirupattur (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Manufacturing success supports consistent gold purchases for both weddings and wealth preservation purposes.`
    ]
  },
  
  Ranipet: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Ranipet today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Leather and chemical industries create industrial workforce with modern gold preferences, balancing traditional ornaments and investment-grade coins.`,
      
      (p24k, p22k, p18k, date) =>
        `Ranipet's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Manufacturing sector prosperity drives consistent demand for certified hallmarked jewellery from established retailers.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Ranipet (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Industrial growth supports steady gold purchases across ornamental and savings-oriented categories.`
    ]
  },
  
  Tiruvannamalai: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Tiruvannamalai today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Sacred temple city with significant pilgrimage tourism drives strong demand for religious gold ornaments and traditional South Indian jewellery patterns.`,
      
      (p24k, p22k, p18k, date) =>
        `Tiruvannamalai's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Annamalai temple proximity ensures consistent purchases of temple jewellery alongside wedding ornaments throughout the year.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Tiruvannamalai (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Spiritual significance and agricultural base maintain traditional gold buying patterns and cultural preferences.`
    ]
  },
  
  Villupuram: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Villupuram today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Agricultural district with growing industrial presence drives balanced gold demand from farming communities and manufacturing workforce.`,
      
      (p24k, p22k, p18k, date) =>
        `Villupuram's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Junction town dynamics create diverse buyer base preferring traditional temple ornaments and modern lightweight designs.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Villupuram (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Strategic location and economic diversity support consistent gold purchases across all categories.`
    ]
  },
  
  Kallakurichi: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Kallakurichi today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. New district with agricultural prosperity and emerging industries maintains traditional gold buying patterns for weddings and festival celebrations.`,
      
      (p24k, p22k, p18k, date) =>
        `Kallakurichi's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Farming communities show strong preference for traditional South Indian ornaments and heavy wedding jewellery.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Kallakurichi (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Agricultural base supports steady demand for ornamental gold and savings-oriented investments.`
    ]
  },
  
  Tenkasi: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Tenkasi today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. New district with rich cultural heritage maintains strong traditional gold values, particularly for temple ornaments and wedding collections.`,
      
      (p24k, p22k, p18k, date) =>
        `Tenkasi's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Courtallam tourist destination and agricultural prosperity drive consistent gold demand for traditional jewellery patterns.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Tenkasi (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cultural traditions and farming wealth support year-round ornamental gold purchases.`
    ]
  },
  
  Mayiladuthurai: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Mayiladuthurai today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Historic temple town with rich Chola heritage drives strong demand for traditional temple jewellery and religious gold ornaments.`,
      
      (p24k, p22k, p18k, date) =>
        `Mayiladuthurai's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cultural significance and agricultural prosperity maintain consistent purchases of antique-finish ornaments and wedding jewellery.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Mayiladuthurai (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Temple city status ensures strong preference for traditional South Indian jewellery patterns throughout the year.`
    ]
  },
  
  Kancheepuram: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Kancheepuram today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Silk city and temple town heritage creates unique market where traditional jewellery complements famous Kanjeevaram sarees, driving substantial gold purchases during wedding seasons.`,
      
      (p24k, p22k, p18k, date) =>
        `Kancheepuram's gold market today shows pricing at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Silk saree industry and temple tourism drive consistent demand for traditional temple ornaments and heavy bridal collections.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's live gold rate in Kancheepuram (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Cultural capital status and silk trade prosperity maintain year-round gold demand for both religious and wedding purposes.`
    ]
  },
  
  Tiruvallur: {
    variations: [
      (p24k, p22k, p18k, date) =>
        `The live gold price in Tiruvallur today (${date}) is ${p24k} per gram for 24K, ${p22k} for 22K, and ${p18k} for 18K. Chennai metropolitan expansion drives modern gold preferences, with IT corridor professionals and industrial workforce creating balanced demand for contemporary and traditional designs.`,
      
      (p24k, p22k, p18k, date) =>
        `Tiruvallur's gold market today reflects rates of ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Suburban development and manufacturing sector growth support consistent purchases of hallmarked jewellery and investment gold coins.`,
      
      (p24k, p22k, p18k, date) =>
        `Today's gold rate in Tiruvallur (${date}) stands at ${p24k} for 24K, ${p22k} for 22K, and ${p18k} for 18K. Rapid urbanization creates diverse buyer base preferring certified jewellery from established retailers.`
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
