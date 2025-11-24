import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cities = [
  { id: 'chennai', name: 'Chennai', description: 'Capital city & major gold hub' },
  { id: 'coimbatore', name: 'Coimbatore', description: 'Textile capital with rich gold tradition' },
  { id: 'madurai', name: 'Madurai', description: 'Temple city famous for temple jewelry' },
  { id: 'trichy', name: 'Trichy', description: 'Central hub with reliable jewelers' },
  { id: 'salem', name: 'Salem', description: 'Steel city with quality ornaments' },
  { id: 'erode', name: 'Erode', description: 'Growing market with competitive rates' },
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
