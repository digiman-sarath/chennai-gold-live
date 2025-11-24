import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cities = [
  { id: 'ariyalur', name: 'Ariyalur', description: 'Emerging market in central Tamil Nadu' },
  { id: 'chengalpattu', name: 'Chengalpattu', description: 'Historic town with traditional jewelers' },
  { id: 'chennai', name: 'Chennai', description: 'Capital city & major gold hub' },
  { id: 'coimbatore', name: 'Coimbatore', description: 'Textile capital with rich gold tradition' },
  { id: 'cuddalore', name: 'Cuddalore', description: 'Coastal town with quality gold shops' },
  { id: 'dharmapuri', name: 'Dharmapuri', description: 'Growing jewelry market' },
  { id: 'dindigul', name: 'Dindigul', description: 'Traditional gold market center' },
  { id: 'erode', name: 'Erode', description: 'Growing market with competitive rates' },
  { id: 'kallakurichi', name: 'Kallakurichi', description: 'Developing gold retail hub' },
  { id: 'kancheepuram', name: 'Kancheepuram', description: 'Temple town with gold heritage' },
  { id: 'kanniyakumari', name: 'Kanniyakumari', description: 'Southernmost gold market' },
  { id: 'karur', name: 'Karur', description: 'Traditional jewelry center' },
  { id: 'krishnagiri', name: 'Krishnagiri', description: 'Border district with modern shops' },
  { id: 'madurai', name: 'Madurai', description: 'Temple city famous for temple jewelry' },
  { id: 'mayiladuthurai', name: 'Mayiladuthurai', description: 'Historic gold trading center' },
  { id: 'nagapattinam', name: 'Nagapattinam', description: 'Coastal gold market' },
  { id: 'namakkal', name: 'Namakkal', description: 'Central district with quality jewelers' },
  { id: 'perambalur', name: 'Perambalur', description: 'Traditional jewelry hub' },
  { id: 'pudukkottai', name: 'Pudukkottai', description: 'Heritage town with gold shops' },
  { id: 'ramanathapuram', name: 'Ramanathapuram', description: 'Coastal district jewelry center' },
  { id: 'ranipet', name: 'Ranipet', description: 'Industrial town with gold outlets' },
  { id: 'salem', name: 'Salem', description: 'Steel city with quality ornaments' },
  { id: 'sivaganga', name: 'Sivaganga', description: 'Traditional gold market' },
  { id: 'tenkasi', name: 'Tenkasi', description: 'Southern district gold hub' },
  { id: 'thanjavur', name: 'Thanjavur', description: 'Cultural capital with antique jewelry' },
  { id: 'the-nilgiris', name: 'The Nilgiris', description: 'Hill station with unique offerings' },
  { id: 'theni', name: 'Theni', description: 'Western region gold market' },
  { id: 'thiruvallur', name: 'Thiruvallur', description: 'Northern district with modern shops' },
  { id: 'thiruvarur', name: 'Thiruvarur', description: 'Delta region gold center' },
  { id: 'thoothukkudi', name: 'Thoothukkudi', description: 'Port city with diverse jewelry' },
  { id: 'vellore', name: 'Vellore', description: 'Fort city with traditional jewelers' },
  { id: 'viluppuram', name: 'Viluppuram', description: 'Junction town gold market' },
  { id: 'virudhunagar', name: 'Virudhunagar', description: 'Business hub with gold shops' },
  { id: 'tiruchirappalli', name: 'Tiruchirappalli', description: 'Central hub with reliable jewelers' },
  { id: 'tirunelveli', name: 'Tirunelveli', description: 'Southern metropolis with rich tradition' },
  { id: 'tirupathur', name: 'Tirupathur', description: 'Developing gold retail center' },
  { id: 'tiruppur', name: 'Tiruppur', description: 'Textile city with gold market' },
  { id: 'tiruvannamalai', name: 'Tiruvannamalai', description: 'Temple town with spiritual jewelry' },
];

const TamilNaduCities = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Gold Rates Across Tamil Nadu
            </h2>
            <p className="text-muted-foreground text-lg">
              Check today's gold rates in major cities across Tamil Nadu
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Card 
                key={city.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 group"
                onClick={() => navigate(`/gold-rates/${city.id}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl group-hover:text-primary transition-colors">
                      {city.name}
                    </span>
                    <MapPin className="h-5 w-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {city.description}
                  </p>
                  <p className="text-primary text-sm font-medium mt-3 group-hover:underline">
                    View Gold Rates →
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TamilNaduCities;
