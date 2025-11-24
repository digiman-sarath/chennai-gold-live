import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, TrendingDown, TrendingUp, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import GoldPriceChart from '@/components/GoldPriceChart';
import GoldPriceTable from '@/components/GoldPriceTable';
import GoldCalculator from '@/components/GoldCalculator';
import ComprehensiveGoldGuide from '@/components/ComprehensiveGoldGuide';
import CitySpecificFAQ from '@/components/CitySpecificFAQ';
import AdDisplay from '@/components/AdDisplay';
import { GoldRateSummary } from '@/components/GoldRateSummary';
import { GoldPriceComparison } from '@/components/GoldPriceComparison';


interface GoldPrice {
  date: string;
  price_22k_per_gram: number;
  price_24k_per_gram: number;
  updated_at: string;
}

interface CityInfo {
  name: string;
  description: string;
  marketInfo: string;
  popularAreas: string[];
  highlights: string[];
}

const cityData: Record<string, CityInfo> = {
  ariyalur: {
    name: 'Ariyalur',
    description: 'Ariyalur, known for its cement industry, has a developing gold market serving the local population with quality jewelry options.',
    marketInfo: 'The gold market in Ariyalur features traditional South Indian designs with modern craftsmanship. Local jewelers offer competitive pricing and personalized service.',
    popularAreas: ['Main Bazaar', 'Bus Stand Area', 'Collectorate Road'],
    highlights: ['Emerging market', 'Local craftsmanship', 'Competitive rates', 'Personal service']
  },
  chengalpattu: {
    name: 'Chengalpattu',
    description: 'Chengalpattu, a historic town near Chennai, has a well-established gold market with traditional jewelers serving generations.',
    marketInfo: 'The town\'s gold market is known for authentic South Indian temple jewelry and traditional ornaments with excellent craftsmanship.',
    popularAreas: ['GST Road', 'Main Bazaar', 'Station Road'],
    highlights: ['Historic market', 'Temple jewelry', 'Traditional designs', 'Family jewelers']
  },
  chennai: {
    name: 'Chennai',
    description: 'Chennai, the capital of Tamil Nadu, is one of India\'s major gold markets. The city\'s T Nagar, George Town, and Sowcarpet areas are renowned for their extensive gold jewelry collections and competitive pricing.',
    marketInfo: 'Chennai\'s gold market is characterized by traditional temple jewelry, antique designs, and contemporary collections. Major areas like T Nagar house numerous established jewelers including GRT, Lalitha Jewellery, and Prince Jewellery.',
    popularAreas: ['T Nagar', 'George Town', 'Sowcarpet', 'Mylapore', 'Anna Salai'],
    highlights: ['Major gold trading hub', 'Temple jewelry specialist', 'Competitive pricing', 'Established jewelers']
  },
  coimbatore: {
    name: 'Coimbatore',
    description: 'Coimbatore, the textile capital of South India, has a thriving gold market with a strong tradition of jewelry craftsmanship. The city is known for quality gold ornaments and traditional South Indian designs.',
    marketInfo: 'Coimbatore\'s gold market is concentrated in areas like RS Puram, Town Hall, and Oppanakara Street. The city is famous for traditional South Indian gold jewelry and has several multi-generational jewelers.',
    popularAreas: ['RS Puram', 'Town Hall', 'Oppanakara Street', 'Cross Cut Road', 'Brooke Bond'],
    highlights: ['Traditional craftsmanship', 'South Indian designs', 'Family-owned jewelers', 'Quality assurance']
  },
  cuddalore: {
    name: 'Cuddalore',
    description: 'Cuddalore, a coastal district headquarters, has a traditional gold market with reliable jewelers offering both classic and contemporary designs.',
    marketInfo: 'The gold market serves a diverse customer base with traditional South Indian jewelry and modern lightweight ornaments.',
    popularAreas: ['Bazaar Street', 'Manjakuppam', 'Thirupapuliyur'],
    highlights: ['Coastal market', 'Traditional designs', 'Quality jewelry', 'Trusted jewelers']
  },
  dharmapuri: {
    name: 'Dharmapuri',
    description: 'Dharmapuri, located in northern Tamil Nadu, has a growing gold market with modern showrooms and traditional jewelry shops.',
    marketInfo: 'The market offers a blend of traditional South Indian and contemporary jewelry with competitive pricing for the region.',
    popularAreas: ['Bazaar Street', 'Salem Main Road', 'Collectorate Area'],
    highlights: ['Growing market', 'Modern shops', 'Competitive pricing', 'Traditional & modern mix']
  },
  dindigul: {
    name: 'Dindigul',
    description: 'Dindigul, famous for its locks and tannery industry, also has a vibrant gold market with traditional jewelers.',
    marketInfo: 'The town\'s gold market is known for temple jewelry and traditional South Indian ornaments with excellent workmanship.',
    popularAreas: ['Big Bazaar Street', 'Gandhi Road', 'Palani Road'],
    highlights: ['Traditional market', 'Temple jewelry', 'Quality workmanship', 'Heritage designs']
  },
  erode: {
    name: 'Erode',
    description: 'Erode, strategically located in western Tamil Nadu, has a growing gold market serving the agricultural heartland. The city offers both traditional and contemporary gold jewelry with competitive rates.',
    marketInfo: 'Erode\'s gold market has seen significant growth with modern showrooms complementing traditional jewelry shops. The city\'s central location makes it a convenient gold shopping destination for surrounding districts.',
    popularAreas: ['Brough Road', 'Bazaar Street', 'Rangampalayam', 'Perundurai Road'],
    highlights: ['Growing market', 'Competitive pricing', 'Modern showrooms', 'Agricultural hub advantage']
  },
  kallakurichi: {
    name: 'Kallakurichi',
    description: 'Kallakurichi, one of Tamil Nadu\'s newer districts, has a developing gold retail market with quality jewelers.',
    marketInfo: 'The market features traditional South Indian jewelry with modern retail experiences and competitive pricing.',
    popularAreas: ['Sankarapuram Road', 'Main Bazaar', 'Bus Stand Area'],
    highlights: ['New market', 'Quality jewelry', 'Modern retail', 'Local service']
  },
  kancheepuram: {
    name: 'Kancheepuram',
    description: 'Kancheepuram, the temple city famous for silk sarees, also has a rich heritage in gold jewelry, particularly temple ornaments.',
    marketInfo: 'The gold market is deeply connected to the city\'s temple culture, offering exquisite temple jewelry and traditional designs.',
    popularAreas: ['Big Street', 'Gandhi Road', 'Temple Area'],
    highlights: ['Temple jewelry capital', 'Heritage designs', 'Spiritual significance', 'Traditional craftsmanship']
  },
  kanniyakumari: {
    name: 'Kanniyakumari',
    description: 'Kanniyakumari, at India\'s southern tip, has a unique gold market influenced by coastal and traditional cultures.',
    marketInfo: 'The market offers a mix of Kerala and Tamil Nadu style jewelry with traditional and contemporary designs.',
    popularAreas: ['Main Road', 'Nagercoil Junction', 'Beach Road'],
    highlights: ['Unique designs', 'Coastal influence', 'Cultural blend', 'Tourist destination']
  },
  karur: {
    name: 'Karur',
    description: 'Karur, known for its textile industry, has a strong gold market with traditional jewelers and modern showrooms.',
    marketInfo: 'The market is characterized by quality South Indian jewelry with competitive pricing and excellent craftsmanship.',
    popularAreas: ['Kovai Road', 'Thanthoni Road', 'Bazaar Street'],
    highlights: ['Textile hub', 'Quality jewelry', 'Traditional designs', 'Competitive rates']
  },
  krishnagiri: {
    name: 'Krishnagiri',
    description: 'Krishnagiri, a border district with Karnataka, has a modern gold market serving a diverse customer base.',
    marketInfo: 'The market features both traditional South Indian and contemporary designs with modern retail facilities.',
    popularAreas: ['Rayakottai Road', 'Bargur Road', 'Main Bazaar'],
    highlights: ['Border district', 'Modern facilities', 'Diverse designs', 'Quality service']
  },
  madurai: {
    name: 'Madurai',
    description: 'Madurai, the temple city, has a rich tradition in gold jewelry deeply connected to its cultural heritage. The city is famous for temple jewelry and traditional South Indian gold ornaments.',
    marketInfo: 'Madurai\'s gold market thrives around the famous Meenakshi Temple area. Town Hall Road, Avani Moola Street, and West Masi Street are major jewelry shopping destinations known for authentic temple jewelry.',
    popularAreas: ['Town Hall Road', 'Avani Moola Street', 'West Masi Street', 'North Masi Street'],
    highlights: ['Temple jewelry capital', 'Cultural heritage', 'Authentic designs', 'Religious significance']
  },
  mayiladuthurai: {
    name: 'Mayiladuthurai',
    description: 'Mayiladuthurai, a historic temple town, has a traditional gold market known for temple jewelry and classic designs.',
    marketInfo: 'The market serves pilgrims and locals with traditional temple jewelry and South Indian ornaments.',
    popularAreas: ['Bazaar Street', 'Kutchery Road', 'Temple Street'],
    highlights: ['Temple town', 'Traditional jewelry', 'Classic designs', 'Pilgrim destination']
  },
  nagapattinam: {
    name: 'Nagapattinam',
    description: 'Nagapattinam, a coastal district, has a traditional gold market with reliable jewelers serving the fishing and agricultural communities.',
    marketInfo: 'The market offers traditional South Indian jewelry with coastal influences and competitive pricing.',
    popularAreas: ['Main Road', 'Bazaar Street', 'VOC Street'],
    highlights: ['Coastal market', 'Traditional designs', 'Reliable jewelers', 'Community service']
  },
  namakkal: {
    name: 'Namakkal',
    description: 'Namakkal, known for its transportation and poultry industry, has a vibrant gold market with quality jewelers.',
    marketInfo: 'The market features traditional and modern jewelry with excellent service and competitive rates.',
    popularAreas: ['Bazaar Street', 'Paramathi Road', 'Salem Road'],
    highlights: ['Business hub', 'Quality jewelry', 'Modern & traditional', 'Competitive pricing']
  },
  perambalur: {
    name: 'Perambalur',
    description: 'Perambalur has a traditional gold market serving the local community with quality jewelry and personalized service.',
    marketInfo: 'The market offers South Indian traditional designs with modern craftsmanship and family-oriented service.',
    popularAreas: ['Main Road', 'Bazaar Street', 'Collectorate Area'],
    highlights: ['Traditional market', 'Family service', 'Quality designs', 'Local craftsmanship']
  },
  pudukkottai: {
    name: 'Pudukkottai',
    description: 'Pudukkottai, a heritage town, has a traditional gold market known for antique and temple jewelry.',
    marketInfo: 'The market is characterized by traditional temple jewelry and heritage designs with excellent craftsmanship.',
    popularAreas: ['East Main Street', 'West Main Street', 'Bazaar Street'],
    highlights: ['Heritage town', 'Antique jewelry', 'Temple designs', 'Traditional craftsmanship']
  },
  ramanathapuram: {
    name: 'Ramanathapuram',
    description: 'Ramanathapuram, a coastal district with religious significance, has a traditional gold market serving pilgrims and locals.',
    marketInfo: 'The market offers temple jewelry and traditional South Indian designs with coastal influences.',
    popularAreas: ['Bazaar Street', 'Rameswaram Road', 'Main Road'],
    highlights: ['Coastal district', 'Temple jewelry', 'Pilgrim destination', 'Traditional designs']
  },
  ranipet: {
    name: 'Ranipet',
    description: 'Ranipet, an industrial town, has a growing gold market with modern showrooms and traditional jewelers.',
    marketInfo: 'The market serves the industrial workforce with both traditional and contemporary jewelry options.',
    popularAreas: ['Bazaar Street', 'Arcot Road', 'Main Road'],
    highlights: ['Industrial town', 'Modern shops', 'Growing market', 'Diverse designs']
  },
  salem: {
    name: 'Salem',
    description: 'Salem, known as the "Steel City," also has a prominent position in Tamil Nadu\'s gold market. The city offers a mix of traditional and modern gold jewelry with excellent craftsmanship.',
    marketInfo: 'Salem\'s jewelry market is known for trustworthy dealers and quality gold ornaments. Cherry Road and Bazaar areas house numerous gold shops offering both traditional South Indian and contemporary designs.',
    popularAreas: ['Cherry Road', 'Bazaar Street', 'Fort Main Road', 'Five Roads'],
    highlights: ['Trusted dealers', 'Quality ornaments', 'Traditional & modern mix', 'Steel city prestige']
  },
  sivaganga: {
    name: 'Sivaganga',
    description: 'Sivaganga has a traditional gold market known for heritage jewelry and South Indian designs.',
    marketInfo: 'The market offers traditional temple jewelry and classic South Indian ornaments with personalized service.',
    popularAreas: ['Bazaar Street', 'Madurai Road', 'Main Road'],
    highlights: ['Traditional market', 'Heritage designs', 'Temple jewelry', 'Personal service']
  },
  tenkasi: {
    name: 'Tenkasi',
    description: 'Tenkasi, a temple town in southern Tamil Nadu, has a traditional gold market serving the local and pilgrim community.',
    marketInfo: 'The market features temple jewelry and traditional South Indian designs with quality craftsmanship.',
    popularAreas: ['Bazaar Street', 'Courtallam Road', 'Main Road'],
    highlights: ['Temple town', 'Traditional jewelry', 'Quality craftsmanship', 'Pilgrim service']
  },
  thanjavur: {
    name: 'Thanjavur',
    description: 'Thanjavur, the cultural capital of Tamil Nadu, is famous for its antique jewelry and traditional craftsmanship.',
    marketInfo: 'The market is renowned for Thanjavur-style temple jewelry, antique ornaments, and traditional South Indian designs.',
    popularAreas: ['South Main Street', 'Bazaar Street', 'Gandhi Road'],
    highlights: ['Cultural capital', 'Antique jewelry', 'Traditional craftsmanship', 'Temple jewelry heritage']
  },
  'the-nilgiris': {
    name: 'The Nilgiris',
    description: 'The Nilgiris, a picturesque hill station district, has unique gold retail outlets serving tourists and locals.',
    marketInfo: 'The market offers a blend of traditional South Indian and contemporary designs in a scenic hill station setting.',
    popularAreas: ['Commercial Street', 'Main Bazaar', 'Coonoor Road'],
    highlights: ['Hill station', 'Tourist destination', 'Unique setting', 'Quality jewelry']
  },
  theni: {
    name: 'Theni',
    description: 'Theni, located in the western region, has a traditional gold market serving the agricultural community.',
    marketInfo: 'The market features traditional South Indian jewelry with modern influences and competitive pricing.',
    popularAreas: ['Bazaar Street', 'Periyakulam Road', 'Main Road'],
    highlights: ['Western region', 'Agricultural hub', 'Traditional designs', 'Competitive rates']
  },
  thiruvallur: {
    name: 'Thiruvallur',
    description: 'Thiruvallur, a northern district near Chennai, has a growing gold market with modern and traditional jewelers.',
    marketInfo: 'The market serves the expanding suburban population with quality jewelry and modern retail experiences.',
    popularAreas: ['Bazaar Street', 'Chennai Road', 'Main Road'],
    highlights: ['Suburban market', 'Modern facilities', 'Growing district', 'Quality service']
  },
  thiruvarur: {
    name: 'Thiruvarur',
    description: 'Thiruvarur, in the Cauvery delta region, has a traditional gold market known for temple jewelry.',
    marketInfo: 'The market offers traditional temple jewelry and classic South Indian designs with heritage craftsmanship.',
    popularAreas: ['Main Street', 'Bazaar Street', 'Temple Street'],
    highlights: ['Delta region', 'Temple jewelry', 'Heritage craftsmanship', 'Traditional market']
  },
  thoothukkudi: {
    name: 'Thoothukkudi',
    description: 'Thoothukkudi (Tuticorin), a major port city, has a diverse gold market influenced by coastal trade.',
    marketInfo: 'The market offers a wide variety of designs from traditional temple jewelry to contemporary ornaments.',
    popularAreas: ['Palayamkottai Road', 'Bazaar Street', 'Main Road'],
    highlights: ['Port city', 'Diverse designs', 'Coastal trade', 'Modern facilities']
  },
  vellore: {
    name: 'Vellore',
    description: 'Vellore, the fort city, has a well-established gold market with traditional jewelers and modern showrooms.',
    marketInfo: 'The market is known for quality jewelry, traditional South Indian designs, and excellent customer service.',
    popularAreas: ['Bazaar Street', 'Katpadi Road', 'Long Bazaar'],
    highlights: ['Fort city', 'Established market', 'Quality jewelry', 'Traditional & modern']
  },
  viluppuram: {
    name: 'Viluppuram',
    description: 'Viluppuram, a major junction town, has a traditional gold market serving multiple districts.',
    marketInfo: 'The market offers traditional South Indian jewelry with competitive pricing and quality service.',
    popularAreas: ['Bazaar Street', 'Mundiyambakkam Road', 'Main Road'],
    highlights: ['Junction town', 'Multi-district service', 'Traditional jewelry', 'Competitive rates']
  },
  virudhunagar: {
    name: 'Virudhunagar',
    description: 'Virudhunagar, a business hub in southern Tamil Nadu, has a vibrant gold market with quality jewelers.',
    marketInfo: 'The market is known for traditional South Indian designs, temple jewelry, and competitive pricing.',
    popularAreas: ['Bazaar Street', 'Sivakasi Road', 'Main Road'],
    highlights: ['Business hub', 'Traditional designs', 'Temple jewelry', 'Quality service']
  },
  tiruchirappalli: {
    name: 'Tiruchirappalli',
    description: 'Tiruchirappalli (Trichy), with its strategic central location, is an important gold market in Tamil Nadu. The city combines traditional values with modern shopping experiences.',
    marketInfo: 'Trichy\'s gold market is concentrated in areas like Big Bazaar Street, China Bazaar, and NSB Road. The city is known for reliable jewelers and a good mix of traditional temple jewelry and contemporary designs.',
    popularAreas: ['Big Bazaar Street', 'China Bazaar', 'NSB Road', 'Thillai Nagar'],
    highlights: ['Central location', 'Reliable jewelers', 'Temple & modern jewelry', 'Historic market']
  },
  tirunelveli: {
    name: 'Tirunelveli',
    description: 'Tirunelveli, a major southern metropolis, has a rich gold market tradition with renowned jewelers.',
    marketInfo: 'The market is famous for traditional South Indian temple jewelry, antique designs, and quality craftsmanship.',
    popularAreas: ['Town Bazaar', 'High Ground Road', 'Junction'],
    highlights: ['Southern metropolis', 'Temple jewelry', 'Antique designs', 'Quality craftsmanship']
  },
  tirupathur: {
    name: 'Tirupathur',
    description: 'Tirupathur, a developing district, has a growing gold retail market with modern showrooms.',
    marketInfo: 'The market serves the local population with traditional and contemporary jewelry options.',
    popularAreas: ['Bazaar Street', 'Ambur Road', 'Main Road'],
    highlights: ['Developing market', 'Modern showrooms', 'Growing district', 'Quality jewelry']
  },
  tiruppur: {
    name: 'Tiruppur',
    description: 'Tiruppur, the textile export capital, has a thriving gold market serving the prosperous textile industry workers.',
    marketInfo: 'The market features both traditional South Indian and contemporary designs with modern retail facilities.',
    popularAreas: ['Bazaar Street', 'Palladam Road', 'Avinashi Road'],
    highlights: ['Textile capital', 'Prosperous market', 'Modern facilities', 'Diverse designs']
  },
  tiruvannamalai: {
    name: 'Tiruvannamalai',
    description: 'Tiruvannamalai, a sacred temple town, has a traditional gold market deeply connected to spiritual tourism.',
    marketInfo: 'The market specializes in temple jewelry and traditional South Indian ornaments for pilgrims and devotees.',
    popularAreas: ['Bazaar Street', 'Girivalam Path', 'Polur Road'],
    highlights: ['Sacred temple town', 'Spiritual jewelry', 'Pilgrim destination', 'Traditional designs']
  }
};

const CityGoldRates = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [previousPrice, setPreviousPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);

  const cityInfo = city ? cityData[city.toLowerCase()] : cityData.chennai;
  const cityName = cityInfo?.name || 'Chennai';

  useEffect(() => {
    fetchPrices();
    
    const channel = supabase
      .channel(`city-gold-${city}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gold_prices'
        },
        () => {
          fetchPrices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [city]);

  const fetchPrices = async () => {
    try {
      const { data, error } = await supabase
        .from('gold_prices')
        .select('*')
        .order('date', { ascending: false })
        .limit(2);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (data && data.length > 0) {
        setGoldPrice(data[0]);
        if (data.length > 1) {
          setPreviousPrice(data[1]);
        }
      } else {
        // Fallback data
        setGoldPrice({
          date: new Date().toISOString().split('T')[0],
          price_22k_per_gram: 10632,
          price_24k_per_gram: 11598,
          updated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error fetching gold prices:', error);
      // Set fallback data on error
      setGoldPrice({
        date: new Date().toISOString().split('T')[0],
        price_22k_per_gram: 10632,
        price_24k_per_gram: 11598,
        updated_at: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateChange = (current: number, previous: number | undefined) => {
    if (!previous) return { amount: 0, percentage: 0, isPositive: false };
    const change = current - previous;
    const percentage = (change / previous) * 100;
    return {
      amount: Math.abs(change),
      percentage: Math.abs(percentage),
      isPositive: change > 0
    };
  };

  const calculate18KPrice = (price24k: number) => {
    return Math.round(price24k * 0.75);
  };

  const handleCityChange = (newCity: string) => {
    navigate(`/gold-rates/${newCity}`);
  };

  if (loading || !goldPrice || !cityInfo) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="h-12 bg-muted rounded w-64" />
            <div className="h-48 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  const price24k = goldPrice.price_24k_per_gram;
  const price22k = goldPrice.price_22k_per_gram;
  const price18k = calculate18KPrice(price24k);

  const change24k = calculateChange(price24k, previousPrice?.price_24k_per_gram);
  const change22k = calculateChange(price22k, previousPrice?.price_22k_per_gram);
  const change18k = calculateChange(price18k, previousPrice ? calculate18KPrice(previousPrice.price_24k_per_gram) : undefined);

  const displayDate = format(new Date(goldPrice.date), 'MMMM dd, yyyy');

  return (
    <>
      <Helmet>
        <title>Gold Rate in {cityName} Today - {displayDate} | 22K ₹{price22k.toLocaleString('en-IN')} & 24K ₹{price24k.toLocaleString('en-IN')}</title>
        <meta 
          name="description" 
          content={`Current gold rate in ${cityName} today ${displayDate}. Live 22K gold: ₹${price22k.toLocaleString('en-IN')}/gram, 24K gold: ₹${price24k.toLocaleString('en-IN')}/gram. Get accurate ${cityName} gold prices with daily updates from GoldAPI.io.`}
        />
        <meta name="keywords" content={`gold rate ${cityName.toLowerCase()}, ${cityName} gold price today, 22k gold ${cityName}, 24k gold ${cityName}, gold rate today ${cityName}, ${cityName} jewellery rates`} />
        
        <meta property="og:title" content={`${cityName} Gold Rate Today - ${displayDate} | Live Prices`} />
        <meta property="og:description" content={`Live gold rates in ${cityName}. 22K: ₹${price22k.toLocaleString('en-IN')}, 24K: ₹${price24k.toLocaleString('en-IN')} per gram.`} />
        
        <meta name="twitter:title" content={`${cityName} Gold Rate ${displayDate}`} />
        <meta name="twitter:description" content={`22K: ₹${price22k.toLocaleString('en-IN')}, 24K: ₹${price24k.toLocaleString('en-IN')}/gram`} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What is the gold rate in ${cityName} today?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Today's gold rate in ${cityName} is ₹${price22k.toLocaleString('en-IN')} per gram for 22 Karat gold and ₹${price24k.toLocaleString('en-IN')} per gram for 24 Karat gold as of ${displayDate}.`
                }
              },
              {
                "@type": "Question",
                "name": `Where can I buy gold in ${cityName}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `You can buy gold in ${cityName} from reputed jewelers in areas like ${cityInfo.popularAreas.join(', ')}. Always check for BIS hallmark certification.`
                }
              }
            ]
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://chennai-gold-rates.lovable.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Tamil Nadu Gold Rates",
                "item": "https://chennai-gold-rates.lovable.app/rates"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": `${cityName} Gold Rates`,
                "item": `https://chennai-gold-rates.lovable.app/gold-rates/${city}`
              }
            ]
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `22 Karat Gold - ${cityName}`,
            "description": `22 Karat gold rate in ${cityName} - ₹${price22k.toLocaleString('en-IN')} per gram as of ${displayDate}`,
            "category": "Precious Metals",
            "brand": {
              "@type": "Brand",
              "name": `${cityName} Gold Market`
            },
            "offers": {
              "@type": "Offer",
              "price": price22k,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": goldPrice.date,
              "url": `https://chennai-gold-rates.lovable.app/gold-rates/${city}`
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `24 Karat Gold - ${cityName}`,
            "description": `24 Karat gold rate in ${cityName} - ₹${price24k.toLocaleString('en-IN')} per gram as of ${displayDate}`,
            "category": "Precious Metals",
            "brand": {
              "@type": "Brand",
              "name": `${cityName} Gold Market`
            },
            "offers": {
              "@type": "Offer",
              "price": price24k,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": goldPrice.date,
              "url": `https://chennai-gold-rates.lovable.app/gold-rates/${city}`
            }
          })}
        </script>
        
        <link rel="canonical" href={`https://chennai-gold-rates.lovable.app/gold-rates/${city}`} />
      </Helmet>

      <Header />

      {/* Top Banner Ad */}
      <div className="bg-background py-4">
        <div className="container mx-auto px-4">
          <AdDisplay position="top_banner" />
        </div>
      </div>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-6xl p-6">
          {/* TL;DR Summary */}
          <GoldRateSummary 
            price24k={price24k} 
            price22k={price22k}
            city={cityName}
          />
          
          {/* Header */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Gold Rate in {cityName} Today
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time className="text-lg font-medium">
                {displayDate}
              </time>
            </div>
          </div>

          {/* City Selector */}
          <div className="mb-8 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <Select value={city} onValueChange={handleCityChange}>
              <SelectTrigger className="w-64 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ariyalur">Ariyalur</SelectItem>
                <SelectItem value="chengalpattu">Chengalpattu</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="coimbatore">Coimbatore</SelectItem>
                <SelectItem value="cuddalore">Cuddalore</SelectItem>
                <SelectItem value="dharmapuri">Dharmapuri</SelectItem>
                <SelectItem value="dindigul">Dindigul</SelectItem>
                <SelectItem value="erode">Erode</SelectItem>
                <SelectItem value="kallakurichi">Kallakurichi</SelectItem>
                <SelectItem value="kancheepuram">Kancheepuram</SelectItem>
                <SelectItem value="kanniyakumari">Kanniyakumari</SelectItem>
                <SelectItem value="karur">Karur</SelectItem>
                <SelectItem value="krishnagiri">Krishnagiri</SelectItem>
                <SelectItem value="madurai">Madurai</SelectItem>
                <SelectItem value="mayiladuthurai">Mayiladuthurai</SelectItem>
                <SelectItem value="nagapattinam">Nagapattinam</SelectItem>
                <SelectItem value="namakkal">Namakkal</SelectItem>
                <SelectItem value="perambalur">Perambalur</SelectItem>
                <SelectItem value="pudukkottai">Pudukkottai</SelectItem>
                <SelectItem value="ramanathapuram">Ramanathapuram</SelectItem>
                <SelectItem value="ranipet">Ranipet</SelectItem>
                <SelectItem value="salem">Salem</SelectItem>
                <SelectItem value="sivaganga">Sivaganga</SelectItem>
                <SelectItem value="tenkasi">Tenkasi</SelectItem>
                <SelectItem value="thanjavur">Thanjavur</SelectItem>
                <SelectItem value="the-nilgiris">The Nilgiris</SelectItem>
                <SelectItem value="theni">Theni</SelectItem>
                <SelectItem value="thiruvallur">Thiruvallur</SelectItem>
                <SelectItem value="thiruvarur">Thiruvarur</SelectItem>
                <SelectItem value="thoothukkudi">Thoothukkudi</SelectItem>
                <SelectItem value="vellore">Vellore</SelectItem>
                <SelectItem value="viluppuram">Viluppuram</SelectItem>
                <SelectItem value="virudhunagar">Virudhunagar</SelectItem>
                <SelectItem value="tiruchirappalli">Tiruchirappalli</SelectItem>
                <SelectItem value="tirunelveli">Tirunelveli</SelectItem>
                <SelectItem value="tirupathur">Tirupathur</SelectItem>
                <SelectItem value="tiruppur">Tiruppur</SelectItem>
                <SelectItem value="tiruvannamalai">Tiruvannamalai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="space-y-3">
                <div className="text-lg font-semibold text-foreground">
                  24K Gold <span className="text-sm font-normal text-muted-foreground">/gram</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  ₹{price24k.toLocaleString('en-IN')}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${change24k.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {change24k.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {change24k.isPositive ? '+' : '-'} ₹{Math.round(change24k.amount)} ({change24k.percentage.toFixed(2)}%)
                </div>
              </div>
          </Card>

          {/* Gold Calculator */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Gold Price Calculator</h2>
            <GoldCalculator price22k={price22k} price24k={price24k} />
          </div>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <div className="space-y-3">
                <div className="text-lg font-semibold text-foreground">
                  22K Gold <span className="text-sm font-normal text-muted-foreground">/gram</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  ₹{price22k.toLocaleString('en-IN')}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${change22k.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {change22k.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {change22k.isPositive ? '+' : '-'} ₹{Math.round(change22k.amount)} ({change22k.percentage.toFixed(2)}%)
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <div className="space-y-3">
                <div className="text-lg font-semibold text-foreground">
                  18K Gold <span className="text-sm font-normal text-muted-foreground">/gram</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  ₹{price18k.toLocaleString('en-IN')}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${change18k.isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {change18k.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {change18k.isPositive ? '+' : '-'} ₹{Math.round(change18k.amount)} ({change18k.percentage.toFixed(2)}%)
                </div>
              </div>
            </Card>
          </div>

          {/* Historical Price Comparison */}
          <div className="mb-8">
            <GoldPriceComparison />
          </div>

          {/* City Description */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">About {cityName} Gold Market</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">{cityInfo.description}</p>
              <p className="leading-relaxed">{cityInfo.marketInfo}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Popular Gold Shopping Areas</h3>
                  <ul className="space-y-2">
                    {cityInfo.popularAreas.map((area, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Market Highlights</h3>
                  <ul className="space-y-2">
                    {cityInfo.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>


          {/* Price History Chart */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Price History - {cityName}</h2>
            <GoldPriceChart />
          </div>

          {/* Price Breakdown Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Gold Price Breakdown - {cityName}</h2>
            <GoldPriceTable />
            
            <div className="mt-6 p-4 sm:p-6 bg-card rounded-xl border-l-4 border-primary">
              <p className="text-sm sm:text-base text-muted-foreground">
                <strong className="text-foreground">Related Pages:</strong> <a href="/" className="text-primary hover:underline font-medium mx-2">Chennai Gold Rates</a> | <a href="/rates" className="text-primary hover:underline font-medium mx-2">Compare All Tamil Nadu Cities</a> | <a href="/gold-rates/coimbatore" className="text-primary hover:underline font-medium mx-2">Coimbatore Prices</a> | <a href="https://consumeraffairs.nic.in" target="_blank" rel="nofollow noopener noreferrer" className="text-primary hover:underline font-medium mx-2">Consumer Affairs India<span className="sr-only"> (opens in new tab)</span></a> | <a href="https://www.goodreturns.in/gold-rates/" target="_blank" rel="nofollow noopener noreferrer" className="text-primary hover:underline font-medium mx-2">Gold Rate Reference<span className="sr-only"> (opens in new tab)</span></a>
              </p>
            </div>
          </div>

          {/* In-Content Ad */}
          <AdDisplay position="in_content" />

          {/* Gold Calculator */}
          <GoldCalculator 
            price22k={goldPrice.price_22k_per_gram} 
            price24k={goldPrice.price_24k_per_gram} 
          />

          {/* Data Source Info */}
          <Card className="p-4 bg-muted/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">
                Source: <strong className="text-primary">GoldAPI.io</strong> - Live Market Rates
              </span>
              <span className="text-muted-foreground">
                Last Updated: <strong className="text-foreground">{format(new Date(goldPrice.updated_at), 'h:mm a, MMM dd')}</strong>
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Comprehensive SEO Content - 5000+ words */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <ComprehensiveGoldGuide city={cityName} />
          </div>
        </div>
      </section>

      <CitySpecificFAQ city={cityName} />

      {/* Bottom Banner Ad */}
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <AdDisplay position="bottom_banner" />
        </div>
      </div>

      {/* Mobile Sticky Ad */}
      <AdDisplay position="mobile_sticky" />

      <Footer />
    </>
  );
};

export default CityGoldRates;
